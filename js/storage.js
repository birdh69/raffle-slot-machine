// storage.js - localStorage helper for raffle slot machine configuration

const STORAGE_KEYS = {
  CONFIG: 'raffleSlotConfig',
  ENTRIES: 'raffleEntries'
};

const DEFAULT_CONFIG = {
  // Slot Machine Configuration
  numberOfReels: 3,
  spinDuration: 5,
  staggerDelay: 1,
  allowDuplicates: false,
  
  // Visual Customization
  themeColor: '#ff3366',
  accentColor: '#ffd700',
  backgroundColor: 'transparent',
  useTransparentBg: true,
  fontSize: 48,
  fontFamily: 'Arial, sans-serif',
  showCelebration: true,
  
  // Audio Settings
  masterVolume: 70,
  muteAll: false,
  enableSpinSounds: true,
  enableWinnerSounds: true
};

// Get configuration from localStorage
function getConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (stored) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error loading config:', e);
  }
  return { ...DEFAULT_CONFIG };
}

// Save configuration to localStorage
function saveConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    return true;
  } catch (e) {
    console.error('Error saving config:', e);
    return false;
  }
}

// Get raffle entries from localStorage
function getEntries() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading entries:', e);
  }
  return [];
}

// Save raffle entries to localStorage
function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
    return true;
  } catch (e) {
    console.error('Error saving entries:', e);
    return false;
  }
}

// Reset configuration to defaults
function resetConfig() {
  return saveConfig(DEFAULT_CONFIG);
}

// Clear all data
function clearAllData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.ENTRIES);
    return true;
  } catch (e) {
    console.error('Error clearing data:', e);
    return false;
  }
}
