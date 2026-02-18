// settings.js - Settings page logic

class SettingsManager {
  constructor() {
    this.config = getConfig();
    this.entries = getEntries();
    this.init();
  }

  init() {
    this.loadSettings();
    this.loadEntries();
    this.setupEventListeners();
    this.updatePreview();
  }

  loadSettings() {
    // Slot Machine Configuration
    document.getElementById('numberOfReels').value = this.config.numberOfReels;
    document.getElementById('reelsValue').textContent = this.config.numberOfReels;
    
    document.getElementById('spinDuration').value = this.config.spinDuration;
    document.getElementById('durationValue').textContent = this.config.spinDuration + 's';
    
    document.getElementById('spinSpeed').value = this.config.spinSpeed;
    document.getElementById('speedValue').textContent = this.config.spinSpeed + 's';
    
    document.getElementById('staggerDelay').value = this.config.staggerDelay;
    document.getElementById('staggerValue').textContent = this.config.staggerDelay + 's';
    
    document.getElementById('allowDuplicates').checked = this.config.allowDuplicates;
    
    // Visual Customization
    document.getElementById('themeColor').value = this.config.themeColor;
    document.getElementById('accentColor').value = this.config.accentColor;
    document.getElementById('backgroundColor').value = this.config.backgroundColor;
    document.getElementById('useTransparentBg').checked = this.config.useTransparentBg;
    document.getElementById('bgColorGroup').style.display = this.config.useTransparentBg ? 'none' : 'block';
    
    document.getElementById('fontSize').value = this.config.fontSize;
    document.getElementById('fontSizeValue').textContent = this.config.fontSize + 'px';
    
    document.getElementById('fontFamily').value = this.config.fontFamily;
    document.getElementById('showCelebration').checked = this.config.showCelebration;
    
    // Audio Settings
    document.getElementById('masterVolume').value = this.config.masterVolume;
    document.getElementById('volumeValue').textContent = this.config.masterVolume + '%';
    
    document.getElementById('muteAll').checked = this.config.muteAll;
    document.getElementById('enableSpinSounds').checked = this.config.enableSpinSounds;
    document.getElementById('enableWinnerSounds').checked = this.config.enableWinnerSounds;
  }

  loadEntries() {
    const textarea = document.getElementById('entriesText');
    textarea.value = this.entries.join('\n');
    this.updateEntryCount();
  }

  setupEventListeners() {
    // Slot Machine Configuration
    document.getElementById('numberOfReels').addEventListener('input', (e) => {
      this.config.numberOfReels = parseInt(e.target.value);
      document.getElementById('reelsValue').textContent = e.target.value;
      this.saveAndUpdate();
    });

    document.getElementById('spinDuration').addEventListener('input', (e) => {
      this.config.spinDuration = parseFloat(e.target.value);
      document.getElementById('durationValue').textContent = e.target.value + 's';
      this.saveAndUpdate();
    });

    document.getElementById('spinSpeed').addEventListener('input', (e) => {
      this.config.spinSpeed = parseFloat(e.target.value);
      document.getElementById('speedValue').textContent = e.target.value + 's';
      this.saveAndUpdate();
    });

    document.getElementById('staggerDelay').addEventListener('input', (e) => {
      this.config.staggerDelay = parseFloat(e.target.value);
      document.getElementById('staggerValue').textContent = e.target.value + 's';
      this.saveAndUpdate();
    });

    document.getElementById('allowDuplicates').addEventListener('change', (e) => {
      this.config.allowDuplicates = e.target.checked;
      this.saveAndUpdate();
    });

    // Visual Customization
    document.getElementById('themeColor').addEventListener('input', (e) => {
      this.config.themeColor = e.target.value;
      this.saveAndUpdate();
    });

    document.getElementById('accentColor').addEventListener('input', (e) => {
      this.config.accentColor = e.target.value;
      this.saveAndUpdate();
    });

    document.getElementById('backgroundColor').addEventListener('input', (e) => {
      this.config.backgroundColor = e.target.value;
      this.saveAndUpdate();
    });

    document.getElementById('useTransparentBg').addEventListener('change', (e) => {
      this.config.useTransparentBg = e.target.checked;
      document.getElementById('bgColorGroup').style.display = e.target.checked ? 'none' : 'block';
      this.saveAndUpdate();
    });

    document.getElementById('fontSize').addEventListener('input', (e) => {
      this.config.fontSize = parseInt(e.target.value);
      document.getElementById('fontSizeValue').textContent = e.target.value + 'px';
      this.saveAndUpdate();
    });

    document.getElementById('fontFamily').addEventListener('change', (e) => {
      this.config.fontFamily = e.target.value;
      this.saveAndUpdate();
    });

    document.getElementById('showCelebration').addEventListener('change', (e) => {
      this.config.showCelebration = e.target.checked;
      this.saveAndUpdate();
    });

    // Audio Settings
    document.getElementById('masterVolume').addEventListener('input', (e) => {
      this.config.masterVolume = parseInt(e.target.value);
      document.getElementById('volumeValue').textContent = e.target.value + '%';
      this.saveAndUpdate();
    });

    document.getElementById('muteAll').addEventListener('change', (e) => {
      this.config.muteAll = e.target.checked;
      this.saveAndUpdate();
    });

    document.getElementById('enableSpinSounds').addEventListener('change', (e) => {
      this.config.enableSpinSounds = e.target.checked;
      this.saveAndUpdate();
    });

    document.getElementById('enableWinnerSounds').addEventListener('change', (e) => {
      this.config.enableWinnerSounds = e.target.checked;
      this.saveAndUpdate();
    });

    // Entry Management
    document.getElementById('entriesText').addEventListener('input', (e) => {
      this.updateEntryCount();
    });

    document.getElementById('saveEntries').addEventListener('click', () => {
      this.saveEntriesFromTextarea();
    });

    document.getElementById('clearEntries').addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all entries?')) {
        document.getElementById('entriesText').value = '';
        this.entries = [];
        saveEntries(this.entries);
        this.updateEntryCount();
      }
    });

    document.getElementById('importEntries').addEventListener('click', () => {
      document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', (e) => {
      this.importFromFile(e.target.files[0]);
    });

    document.getElementById('exportEntries').addEventListener('click', () => {
      this.exportToFile();
    });

    // Reset button
    document.getElementById('resetDefaults').addEventListener('click', () => {
      if (confirm('Reset all settings to defaults? Entries will not be affected.')) {
        resetConfig();
        this.config = getConfig();
        this.loadSettings();
        this.updatePreview();
      }
    });
  }

  saveEntriesFromTextarea() {
    const textarea = document.getElementById('entriesText');
    const lines = textarea.value.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    this.entries = lines;
    saveEntries(this.entries);
    this.updateEntryCount();
    this.showNotification('Entries saved successfully!');
  }

  updateEntryCount() {
    const textarea = document.getElementById('entriesText');
    const lines = textarea.value.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    document.getElementById('entryCount').textContent = lines.length;
  }

  importFromFile(file) {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      document.getElementById('entriesText').value = lines.join('\n');
      this.entries = lines;
      saveEntries(this.entries);
      this.updateEntryCount();
      this.showNotification(`Imported ${lines.length} entries`);
    };
    reader.readAsText(file);
  }

  exportToFile() {
    const content = this.entries.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'raffle-entries.txt';
    a.click();
    URL.revokeObjectURL(url);
    this.showNotification('Entries exported successfully!');
  }

  saveAndUpdate() {
    saveConfig(this.config);
    this.updatePreview();
  }

  updatePreview() {
    const preview = document.getElementById('preview');
    preview.style.setProperty('--theme-color', this.config.themeColor);
    preview.style.setProperty('--accent-color', this.config.accentColor);
    preview.style.fontFamily = this.config.fontFamily;
    
    if (this.config.useTransparentBg) {
      preview.style.backgroundColor = '#2a2a2a';
    } else {
      preview.style.backgroundColor = this.config.backgroundColor;
    }
    
    const previewText = preview.querySelector('.preview-text');
    if (previewText) {
      previewText.style.fontSize = (this.config.fontSize * 0.5) + 'px';
    }
  }

  showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}

// Initialize settings manager when page loads
document.addEventListener('DOMContentLoaded', () => {
  new SettingsManager();
});
