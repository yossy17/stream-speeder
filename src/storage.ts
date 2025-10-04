// 再生速度ストレージ定義
export const STORAGE_KEY = "stream_rate";

export class RateStorage {
  // 再生速度の保存
  static save(rate: number): void {
    localStorage.setItem(STORAGE_KEY, rate.toString());
  }

  // 再生速度の読み込み
  static load(): number {
    const savedRate = localStorage.getItem(STORAGE_KEY);
    return savedRate ? Number.parseFloat(savedRate) : 1;
  }
}
