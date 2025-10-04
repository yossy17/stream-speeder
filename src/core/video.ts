import { RateStorage } from "../storage";
import { RateOverlay } from "../ui/overlay";

const CONFIG = {
  VIDEO_SELECTOR: ".watch-video video, #dv-web-player video",
  VIDEO_DELAY: 500,
  RATE_CHECK_INTERVAL: 1000,
};

export class VideoController {
  private rate = 1;
  private isApplyingRate = false;
  private overlay = new RateOverlay();
  private observers: MutationObserver[] = [];
  private intervals: number[] = [];

  constructor() {
    this.rate = RateStorage.load();
  }

  getRate(): number {
    return this.rate;
  }

  setRate(rate: number): void {
    this.rate = rate;
    this.applyRateToVideo();
    RateStorage.save(this.rate);
  }

  private applyRateToVideo(video?: HTMLVideoElement | null): void {
    const targetVideo =
      video || document.querySelector<HTMLVideoElement>(CONFIG.VIDEO_SELECTOR);

    if (targetVideo) {
      this.isApplyingRate = true;
      targetVideo.playbackRate = this.rate;
      setTimeout(() => (this.isApplyingRate = false), 100);
    }
  }

  showRateOverlay(): void {
    this.overlay.show(this.rate);
  }

  setupFullscreenHandler(): void {
    document.addEventListener("fullscreenchange", () => {
      this.overlay.moveToFullscreen();
    });
  }

  setupVideoWatcher(): void {
    let videoEl: HTMLVideoElement | null = null;

    const checkAndSetVideo = () => {
      const newVideo = document.querySelector<HTMLVideoElement>(
        CONFIG.VIDEO_SELECTOR
      );

      if (newVideo && newVideo !== videoEl) {
        this.handleNewVideo(newVideo);
        videoEl = newVideo;
      }
    };

    // URL変更監視
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

    // DOM変更監視
    const domObserver = new MutationObserver(checkAndSetVideo);
    domObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
    this.observers.push(domObserver);

    checkAndSetVideo();
  }

  private handleNewVideo(video: HTMLVideoElement): void {
    this.rate = RateStorage.load();

    // 初期適用
    setTimeout(() => this.applyRateToVideo(video), CONFIG.VIDEO_DELAY);

    // 定期チェック
    this.clearIntervals();
    const intervalId = window.setInterval(() => {
      if (video.playbackRate !== this.rate && !this.isApplyingRate) {
        this.applyRateToVideo(video);
      }
    }, CONFIG.RATE_CHECK_INTERVAL);
    this.intervals.push(intervalId);

    // ratechange イベント
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

  private clearIntervals(): void {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }

  destroy(): void {
    this.clearIntervals();
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}
