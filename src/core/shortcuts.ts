// キーバインド定義
const KEY_BINDINGS: Record<string, string> = {
  ";": "back0_25", // 0.25-
  "'": "forward0_25", // 0.25+
  "[": "back0_5", // 0.5-
  "]": "forward0_5", // 0.5+
  "-": "back1", // 1-
  "=": "forward1", // 1+
  "`": "rate0_5", // 0.5x
  "1": "rate1", // 1.0x
  "2": "rate2", // 2.0x
  "3": "rate3", // 3.0x
  "4": "rate4", // 4.0x
};

const RATE_LIMITS = {
  QUARTER: 0.25,
  HALF: 0.5,
  BASE: 1,
  MAX: 16,
};

export class ShortcutManager {
  constructor(
    private videoController: {
      getRate: () => number;
      setRate: (rate: number) => void;
      showRateOverlay: () => void;
    }
  ) {}

  init(): void {
    document.addEventListener("keydown", (e) => {
      // 入力フィールドでは無効化
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.contentEditable === "true")
      ) {
        return;
      }

      // 修飾キー使用時は無効化
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      const action = KEY_BINDINGS[e.key];
      if (!action) return;

      e.preventDefault();
      this.handleRateAction(action);
    });
  }

  private handleRateAction(action: string): void {
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
