/**
 * Shared state & utilities for Raffle Slot Machine
 * Uses localStorage so Settings page and OBS Display stay in sync.
 */
const DEFAULT_CONFIG = {
  // Roller settings
  rollerCount: 3,
  spinDurationMs: 3000,
  staggerDelayMs: 500,

  // Appearance
  rollerWidth: 180,
  rollerHeight: 220,
  fontSize: 28,
  fontFamily: "'Segoe UI', Arial, sans-serif",
  textColor: "#ffffff",
  bgColor: "#1a1a2e",
  rollerBgColor: "#16213e",
  highlightColor: "#e94560",
  borderColor: "#0f3460",
  titleText: "🎰 RAFFLE SLOT MACHINE 🎰",
  winnerText: "🎉 WINNER! 🎉",

  // Sound
  enableSound: true,
  spinVolume: 0.5,

  // Behaviour
  removeWinnersFromPool: true,
  autoHideWinnerMs: 0, // 0 = never auto-hide

  // Entrants
  entries: [
    "Alice", "Bob", "Charlie", "Diana", "Edward",
    "Fiona", "George", "Hannah", "Isaac", "Julia",
    "Kevin", "Luna", "Mason", "Nora", "Oscar"
  ],
  removedEntries: [],
  lastWinners: []
};

class RaffleStore {
  static CONFIG_KEY = "raffleSM_config";

  static load() {
    try {
      const raw = localStorage.getItem(this.CONFIG_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (e) {
      console.warn("Failed to load config, using defaults", e);
    }
    return { ...DEFAULT_CONFIG };
  }

  static save(config) {
    localStorage.setItem(this.CONFIG_KEY, JSON.stringify(config));
    // Broadcast change to other tabs / OBS browser source
    window.dispatchEvent(new StorageEvent("storage", {
      key: this.CONFIG_KEY,
      newValue: JSON.stringify(config)
    }));
  }

  static reset() {
    localStorage.removeItem(this.CONFIG_KEY);
  }

  static getActiveEntries(config) {
    if (config.removeWinnersFromPool) {
      return config.entries.filter(e => !config.removedEntries.includes(e));
    }
    return [...config.entries];
  }
}