// ==UserScript==
// @name Stream Speeder
// @name:ja Stream Speeder
// @name:zh-CN Stream Speeder
// @name:ko Stream Speeder
// @description Adjust the playback speed on Netflix and Prime Video
// @description:ja Netflix, Prime Video で再生速度を調整できます
// @description:zh-CN 调整 Netflix 和 Prime Video 的播放速度
// @description:ko Netflix 및 Prime Video 에서 재생 속도 조정
// @version 0.1.1
 // @author Yos_sy
 // @match *://*.amazon.com/*
// @match *://*.amazon.ca/*
// @match *://*.amazon.com.mx/*
// @match *://*.amazon.co.uk/*
// @match *://*.amazon.de/*
// @match *://*.amazon.fr/*
// @match *://*.amazon.it/*
// @match *://*.amazon.es/*
// @match *://*.amazon.nl/*
// @match *://*.amazon.se/*
// @match *://*.amazon.pl/*
// @match *://*.amazon.co.jp/*
// @match *://*.amazon.com.au/*
// @match *://*.amazon.in/*
// @match *://*.amazon.cn/*
// @match *://*.amazon.com.br/*
// @match *://*.amazon.sa/*
// @match *://*.amazon.ae/*
// @match *://*.amazon.sg/*
// @match *://*.amazon.com.tr/*
// @match *://*.netflix.com/*
// @namespace http://tampermonkey.net/
 // @icon https://github.com/yossy17/stream-speeder/raw/master/images/icons/normal/icon-48.webp
 // @license MIT
 // @updateURL https://github.com/yossy17/stream-speeder/raw/master/dist/userscript.user.js
 // @downloadURL https://github.com/yossy17/stream-speeder/raw/master/dist/userscript.user.js
 // @supportURL https://github.com/yossy17/stream-speeder
 // ==/UserScript==

(function() {
  "use strict";
  const STORAGE_KEY = "stream_rate";
  class RateStorage {
    // 再生速度の保存
    static save(rate) {
      localStorage.setItem(STORAGE_KEY, rate.toString());
    }
    // 再生速度の読み込み
    static load() {
      const savedRate = localStorage.getItem(STORAGE_KEY);
      return savedRate ? Number.parseFloat(savedRate) : 1;
    }
  }
  class RateOverlay {
    constructor() {
      this.overlay = null;
      this.overlayTimeout = null;
      this.removeTimeout = null;
    }
    show(rate) {
      this.clearTimeouts();
      this.removeOverlay();
      const overlay = document.createElement("div");
      overlay.id = "rate-overlay";
      overlay.textContent = `${rate}x`;
      overlay.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.5);
      background: rgba(10, 10, 15, 0.75);
      backdrop-filter: blur(10px) saturate(180%);
      color: #fff;
      width: 96px;
      height: 96px;
      font-size: 24px;
      font-weight: bold;
      border-radius: 50%;
      z-index: calc(infinity);
      opacity: 0;
      transition: opacity 0.3s ease-out, transform 0.3s ease-out;
      pointer-events: none;
    `;
      const container = document.fullscreenElement || document.body;
      container.appendChild(overlay);
      this.overlay = overlay;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (this.overlay === overlay) {
            overlay.style.opacity = "1";
            overlay.style.transform = "translate(-50%, -50%) scale(1)";
          }
        });
      });
      this.overlayTimeout = window.setTimeout(() => {
        if (this.overlay === overlay) {
          overlay.style.opacity = "0";
          overlay.style.transform = "translate(-50%, -50%) scale(0.5)";
        }
      }, 500);
    }
    moveToFullscreen() {
      if (this.overlay && this.overlay.parentNode) {
        const container = document.fullscreenElement || document.body;
        if (this.overlay.parentNode !== container) {
          container.appendChild(this.overlay);
        }
      }
    }
    removeOverlay() {
      if (this.overlay) {
        this.overlay.remove();
        this.overlay = null;
      }
    }
    clearTimeouts() {
      if (this.overlayTimeout) {
        clearTimeout(this.overlayTimeout);
        this.overlayTimeout = null;
      }
      if (this.removeTimeout) {
        clearTimeout(this.removeTimeout);
        this.removeTimeout = null;
      }
    }
    destroy() {
      this.clearTimeouts();
      this.removeOverlay();
    }
  }
  const CONFIG = {
    VIDEO_SELECTOR: ".watch-video video, div[id^='dv-web-player'] video",
    VIDEO_DELAY: 500,
    RATE_CHECK_INTERVAL: 1e3
  };
  class VideoController {
    constructor() {
      this.rate = 1;
      this.isApplyingRate = false;
      this.overlay = new RateOverlay();
      this.observers = [];
      this.intervals = [];
      this.rate = RateStorage.load();
    }
    getRate() {
      return this.rate;
    }
    setRate(rate) {
      this.rate = rate;
      this.applyRateToVideo();
      RateStorage.save(this.rate);
    }
    applyRateToVideo(video) {
      const targetVideo = video || document.querySelector(CONFIG.VIDEO_SELECTOR);
      if (targetVideo) {
        this.isApplyingRate = true;
        targetVideo.playbackRate = this.rate;
        setTimeout(() => this.isApplyingRate = false, 100);
      }
    }
    showRateOverlay() {
      this.overlay.show(this.rate);
    }
    setupFullscreenHandler() {
      document.addEventListener("fullscreenchange", () => {
        this.overlay.moveToFullscreen();
      });
    }
    setupVideoWatcher() {
      let videoEl = null;
      const checkAndSetVideo = () => {
        const newVideo = document.querySelector(
          CONFIG.VIDEO_SELECTOR
        );
        if (newVideo && newVideo !== videoEl) {
          this.handleNewVideo(newVideo);
          videoEl = newVideo;
        }
      };
      let lastUrl = location.href;
      const urlObserver = new MutationObserver(() => {
        if (location.href !== lastUrl) {
          lastUrl = location.href;
          this.rate = RateStorage.load();
          videoEl = null;
          this.clearIntervals();
          checkAndSetVideo();
        }
      });
      urlObserver.observe(document, { subtree: true, childList: true });
      this.observers.push(urlObserver);
      const domObserver = new MutationObserver(checkAndSetVideo);
      domObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
      this.observers.push(domObserver);
      checkAndSetVideo();
    }
    handleNewVideo(video) {
      this.rate = RateStorage.load();
      setTimeout(() => this.applyRateToVideo(video), CONFIG.VIDEO_DELAY);
      this.clearIntervals();
      const intervalId = window.setInterval(() => {
        if (video.playbackRate !== this.rate && !this.isApplyingRate) {
          this.applyRateToVideo(video);
        }
      }, CONFIG.RATE_CHECK_INTERVAL);
      this.intervals.push(intervalId);
      video.addEventListener("ratechange", () => {
        if (!this.isApplyingRate) {
          const current = video.playbackRate;
          if (current === 1 && this.rate !== 1) {
            setTimeout(() => this.applyRateToVideo(video), 100);
          } else if (current !== this.rate) {
            this.rate = current;
            RateStorage.save(this.rate);
            this.overlay.show(this.rate);
          }
        }
      });
    }
    clearIntervals() {
      this.intervals.forEach((id) => clearInterval(id));
      this.intervals = [];
    }
    destroy() {
      this.clearIntervals();
      this.observers.forEach((observer) => observer.disconnect());
      this.observers = [];
    }
  }
  const KEY_BINDINGS = {
    ";": "back0_25",
    // 0.25-
    "'": "forward0_25",
    // 0.25+
    "[": "back0_5",
    // 0.5-
    "]": "forward0_5",
    // 0.5+
    "-": "back1",
    // 1-
    "=": "forward1",
    // 1+
    "`": "rate0_5",
    // 0.5x
    "1": "rate1",
    // 1.0x
    "2": "rate2",
    // 2.0x
    "3": "rate3",
    // 3.0x
    "4": "rate4"
    // 4.0x
  };
  const RATE_LIMITS = {
    QUARTER: 0.25,
    HALF: 0.5,
    BASE: 1,
    MAX: 16
  };
  class ShortcutManager {
    constructor(videoController) {
      this.videoController = videoController;
    }
    init() {
      document.addEventListener("keydown", (e) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLElement && e.target.contentEditable === "true") {
          return;
        }
        if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
        const action = KEY_BINDINGS[e.key];
        if (!action) return;
        e.preventDefault();
        this.handleRateAction(action);
      });
    }
    handleRateAction(action) {
      const currentRate = this.videoController.getRate();
      let newRate = currentRate;
      switch (action) {
        case "rate0_5":
          newRate = 0.5;
          break;
        case "rate1":
          newRate = 1;
          break;
        case "rate2":
          newRate = 2;
          break;
        case "rate3":
          newRate = 3;
          break;
        case "rate4":
          newRate = 4;
          break;
        case "back0_25":
          if (currentRate > RATE_LIMITS.QUARTER)
            newRate = currentRate - RATE_LIMITS.QUARTER;
          break;
        case "forward0_25":
          if (currentRate < RATE_LIMITS.MAX)
            newRate = currentRate + RATE_LIMITS.QUARTER;
          break;
        case "back0_5":
          if (currentRate > RATE_LIMITS.HALF)
            newRate = currentRate - RATE_LIMITS.HALF;
          break;
        case "forward0_5":
          if (currentRate < RATE_LIMITS.MAX)
            newRate = currentRate + RATE_LIMITS.HALF;
          break;
        case "back1":
          if (currentRate > RATE_LIMITS.BASE)
            newRate = currentRate - RATE_LIMITS.BASE;
          break;
        case "forward1":
          if (currentRate < RATE_LIMITS.MAX)
            newRate = currentRate + RATE_LIMITS.BASE;
          break;
      }
      if (newRate !== currentRate) {
        this.videoController.setRate(newRate);
        this.videoController.showRateOverlay();
      }
    }
  }
  function init() {
    const videoController = new VideoController();
    const shortcutManager = new ShortcutManager(videoController);
    console.log("Initial rate:", RateStorage.load());
    shortcutManager.init();
    videoController.setupFullscreenHandler();
    videoController.setupVideoWatcher();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
//# sourceMappingURL=userscript.user.js.map
