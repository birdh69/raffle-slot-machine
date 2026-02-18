// audio.js - Web Audio API sound generation and playback

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.config = getConfig();
    this.initAudio();
  }

  initAudio() {
    try {
      // Create audio context on first user interaction
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        this.updateVolume();
      }
    } catch (e) {
      console.error('Web Audio API not supported:', e);
    }
  }

  updateVolume() {
    if (this.masterGain) {
      const volume = this.config.muteAll ? 0 : (this.config.masterVolume / 100);
      this.masterGain.gain.value = volume;
    }
  }

  updateConfig(config) {
    this.config = config;
    this.updateVolume();
  }

  // Generate spin sound (mechanical whirring)
  playSpinSound() {
    if (!this.config.enableSpinSounds || this.config.muteAll || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, now);
    oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.5);
    
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.start(now);
    oscillator.stop(now + 0.5);
  }

  // Generate reel stop click sound
  playReelStopSound() {
    if (!this.config.enableSpinSounds || this.config.muteAll || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }

  // Generate winner celebration sound (upward melody)
  playWinnerSound() {
    if (!this.config.enableWinnerSounds || this.config.muteAll || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C (major chord)
    
    notes.forEach((freq, i) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      const startTime = now + (i * 0.15);
      const duration = 0.3;
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
  }

  // Generate tick sound for spinning animation
  playTickSound() {
    if (!this.config.enableSpinSounds || this.config.muteAll || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }
}
