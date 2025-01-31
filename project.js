// ==UserScript==
// @name                Stream Speeder
// @description         speed up/down video
// @version             0.1.1
// @author              Yos_sy
// @match               *://*.amazon.com/gp/video/*
// @match               *://*.amazon.ca/gp/video/*
// @match               *://*.amazon.com.mx/gp/video/*
// @match               *://*.amazon.co.uk/gp/video/*
// @match               *://*.amazon.de/gp/video/*
// @match               *://*.amazon.fr/gp/video/*
// @match               *://*.amazon.it/gp/video/*
// @match               *://*.amazon.es/gp/video/*
// @match               *://*.amazon.nl/gp/video/*
// @match               *://*.amazon.se/gp/video/*
// @match               *://*.amazon.pl/gp/video/*
// @match               *://*.amazon.co.jp/gp/video/*
// @match               *://*.amazon.com.au/gp/video/*
// @match               *://*.amazon.in/gp/video/*
// @match               *://*.amazon.cn/gp/video/*
// @match               *://*.amazon.com.br/gp/video/*
// @match               *://*.amazon.sa/gp/video/*
// @match               *://*.amazon.ae/gp/video/*
// @match               *://*.amazon.sg/gp/video/*
// @match               *://*.amazon.com.tr/gp/video/*
// @match               *://*.netflix.com/*
// @namespace           http://tampermonkey.net/
// @icon                https://www.google.com/s2/favicons?sz=64&domain=netflix.com
// @license             MIT
// @run-at              document-start
// ==/UserScript==

(function () {
  "use strict";

  // 再生速度
  let rate = 1;

  // 定数
  const CONFIG = {
    STORAGE_KEY: "stream_rate",
    TITLE_SELECTOR: ".watch-video h4, h1.atvwebplayersdk-title-text",
    VIDEO_SELECTOR: ".rendererContainer video, .watch-video--player-view video",
  };

  // キーボードイベントリスナー
  const keyMap = {
    back0_25: ";", // 0.25-
    forward0_25: "'", // 0.25+
    back0_5: "[", // 0.5-
    forward0_5: "]", // 0.5+
    back1: "-", // 1-
    forward1: "=", // 1+
    rate0_5: "`", // 0.5x
    rate1: "1", // 1.0x
    rate2: "2", // 2.0x
    rate3: "3", // 3.0x
    rate4: "4", // 4.0x
  };

  // 再生速度の保存と読み込み
  const rateStorage = {
    save(rate) {
      localStorage.setItem(CONFIG.STORAGE_KEY, rate.toString());
    },
    load() {
      const savedRate = localStorage.getItem(CONFIG.STORAGE_KEY);
      return savedRate ? parseFloat(savedRate) : 1;
    },
  };

  // ビデオ要素の制御
  const videoController = {
    setRate(el = null) {
      el = el || document.querySelector(CONFIG.VIDEO_SELECTOR);
      if (el) {
        console.debug(`rate: ${rate}x`);
        el.playbackRate = rate;
      }
    },

    // タイトルに再生速度を表示
    updateTitle() {
      const titleEl = document.querySelector(CONFIG.TITLE_SELECTOR);
      if (titleEl) {
        const title = titleEl.innerText.replace(/^\[.*\] /, "");
        titleEl.innerHTML = `[${rate}x] ${title}`;
      }
    },
  };

  // キーイベントリスナー
  function handleKeyPress(e) {
    let newRate = rate;

    // 固定速度
    if (e.key === keyMap.rate0_5) newRate = 0.5;
    else if (e.key === keyMap.rate1) newRate = 1;
    else if (e.key === keyMap.rate2) newRate = 2;
    else if (e.key === keyMap.rate3) newRate = 3;
    else if (e.key === keyMap.rate4) newRate = 4;
    // 増減速
    else if (e.key === keyMap.back0_25 && rate > 0.25) newRate = rate - 0.25;
    else if (e.key === keyMap.forward0_25 && rate < 16) newRate = rate + 0.25;
    else if (e.key === keyMap.back0_5 && rate > 0.5) newRate = rate - 0.5;
    else if (e.key === keyMap.forward0_5 && rate < 16) newRate = rate + 0.5;
    else if (e.key === keyMap.back1 && rate > 1) newRate = rate - 1;
    else if (e.key === keyMap.forward1 && rate < 16) newRate = rate + 1;
    else {
      return;
    }

    // 再生速度を更新
    rate = newRate;
    videoController.setRate();
    videoController.updateTitle();
    rateStorage.save(rate);
  }

  // ビデオ要素の監視設定
  function setupVideoWatcher() {
    let videoEl = null;
    let rateObserver = null;

    // ビデオ要素の確認と設定
    function checkAndSetVideo() {
      const newVideoEl = document.querySelector(CONFIG.VIDEO_SELECTOR);
      if (newVideoEl && newVideoEl !== videoEl) {
        videoEl = newVideoEl;

        // ビデオの読み込み完了後に速度設定
        if (videoEl.readyState >= 1) {
          videoController.setRate(videoEl);
          videoController.updateTitle();
        } else {
          videoEl.addEventListener(
            "loadedmetadata",
            () => {
              videoController.setRate(videoEl);
              videoController.updateTitle();
            },
            { once: true }
          );
        }

        // 再生速度の変更を監視
        if (rateObserver) {
          rateObserver.disconnect();
        }
        rateObserver = new MutationObserver(() => {
          if (videoEl.playbackRate !== rate) {
            rate = videoEl.playbackRate;
            videoController.updateTitle();
            rateStorage.save(rate);
          }
        });
        rateObserver.observe(videoEl, {
          attributes: true,
          attributeFilter: ["playbackrate"],
        });
      }
    }

    // URL変更の監視
    let lastUrl = location.href;
    const urlObserver = new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        console.log("URL changed, resetting video rate");
        rate = rateStorage.load();
        checkAndSetVideo();
      }
    });
    urlObserver.observe(document, { subtree: true, childList: true });

    // DOM変更の監視
    const pageObserver = new MutationObserver(() => {
      checkAndSetVideo();
    });
    pageObserver.observe(document.body, { childList: true, subtree: true });

    // クリーンアップ関数を返す
    return () => {
      if (rateObserver) rateObserver.disconnect();
      urlObserver.disconnect();
      pageObserver.disconnect();
    };
  }

  // 初期化
  function init() {
    // 保存された再生速度を読み込む
    rate = rateStorage.load();
    console.log("Initial rate:", rate);

    // キーボードイベントリスナーを設定
    window.addEventListener("keydown", handleKeyPress);

    // ビデオ監視を設定
    window.addEventListener("unload", setupVideoWatcher());
  }

  // DOMContentLoaded イベントで初期化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
