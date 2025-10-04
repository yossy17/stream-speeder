import { VideoController } from "./core/video";
import { ShortcutManager } from "./core/shortcuts";
import { RateStorage } from "./storage";

function init() {
  const videoController = new VideoController();
  const shortcutManager = new ShortcutManager(videoController);

  console.log("Initial rate:", RateStorage.load());

  shortcutManager.init(); // ショートカット有効化
  videoController.setupFullscreenHandler();
  videoController.setupVideoWatcher();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
