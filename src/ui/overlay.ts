export class RateOverlay {
  private overlay: HTMLDivElement | null = null;
  private overlayTimeout: number | null = null;
  private removeTimeout: number | null = null;

  show(rate: number) {
    // タイムアウトをクリア
    this.clearTimeouts();

    // 既存のオーバーレイを即座に削除
    this.removeOverlay();

    // 新しいオーバーレイ生成
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

    // アニメーション開始（次のフレームで実行）
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (this.overlay === overlay) {
          overlay.style.opacity = "1";
          overlay.style.transform = "translate(-50%, -50%) scale(1)";
        }
      });
    });

    // フェードアウト開始
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
      // 既に正しいコンテナにある場合はスキップ
      if (this.overlay.parentNode !== container) {
        container.appendChild(this.overlay);
      }
    }
  }

  private removeOverlay(): void {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }

  private clearTimeouts(): void {
    if (this.overlayTimeout) {
      clearTimeout(this.overlayTimeout);
      this.overlayTimeout = null;
    }
    if (this.removeTimeout) {
      clearTimeout(this.removeTimeout);
      this.removeTimeout = null;
    }
  }

  destroy(): void {
    this.clearTimeouts();
    this.removeOverlay();
  }
}
