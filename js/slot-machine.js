// slot-machine.js - Core slot machine logic and animation

class SlotMachine {
  constructor() {
    this.config = getConfig();
    this.entries = getEntries();
    this.audioManager = new AudioManager();
    this.confettiManager = null;
    this.isSpinning = false;
    this.winners = [];
    this.reels = [];
    
    // Constants for reel population and positioning
    this.REEL_REPEAT_COUNT = 10; // Number of times to repeat entries for smooth scrolling
    this.REEL_ITEM_HEIGHT = 200; // Height in pixels - matches .reel height from CSS
    
    this.init();
  }

  init() {
    this.confettiManager = new ConfettiManager(document.body);
    this.setupReels();
    this.setupButtons();
    this.applyStyles();
    
    // Listen for storage changes from settings page
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEYS.CONFIG || e.key === STORAGE_KEYS.ENTRIES) {
        this.config = getConfig();
        this.entries = getEntries();
        this.audioManager.updateConfig(this.config);
        this.setupReels();
        this.applyStyles();
      }
    });
  }

  setupReels() {
    const reelsContainer = document.getElementById('reels-container');
    reelsContainer.innerHTML = '';
    this.reels = [];
    
    for (let i = 0; i < this.config.numberOfReels; i++) {
      const reel = document.createElement('div');
      reel.className = 'reel';
      
      const reelStrip = document.createElement('div');
      reelStrip.className = 'reel-strip';
      
      reel.appendChild(reelStrip);
      reelsContainer.appendChild(reel);
      
      this.reels.push({
        element: reel,
        strip: reelStrip,
        isSpinning: false
      });
    }
  }

  setupButtons() {
    const spinBtn = document.getElementById('spin-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    spinBtn.addEventListener('click', () => this.spin());
    resetBtn.addEventListener('click', () => this.reset());
  }

  applyStyles() {
    const root = document.documentElement;
    root.style.setProperty('--theme-color', this.config.themeColor);
    root.style.setProperty('--accent-color', this.config.accentColor);
    root.style.setProperty('--font-size', this.config.fontSize + 'px');
    root.style.setProperty('--font-family', this.config.fontFamily);
    
    if (this.config.useTransparentBg) {
      document.body.style.backgroundColor = 'transparent';
    } else {
      document.body.style.backgroundColor = this.config.backgroundColor;
    }
  }

  populateReel(reelStrip, entries) {
    reelStrip.innerHTML = '';
    
    // Create enough entries to fill the reel and create scrolling effect
    const repeats = 20;
    for (let i = 0; i < repeats; i++) {
      entries.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'reel-item';
        item.textContent = entry;
        reelStrip.appendChild(item);
      });
    }
  }

  populateReelWithWinner(reelStrip, winner) {
    reelStrip.innerHTML = '';
    
    // Create a repeating list of all entries
    // We repeat multiple times to ensure smooth scrolling animation
    const allItems = [];
    
    for (let i = 0; i < this.REEL_REPEAT_COUNT; i++) {
      // Shuffle entries for each repeat to create variety
      const shuffled = [...this.entries].sort(() => Math.random() - 0.5);
      shuffled.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'reel-item';
        item.textContent = entry;
        reelStrip.appendChild(item);
        allItems.push({ element: item, name: entry });
      });
    }
    
    // Store the winner and all items for positioning later
    reelStrip.dataset.winner = winner;
    reelStrip.dataset.itemCount = allItems.length;
  }

  async spin() {
    if (this.isSpinning || this.entries.length === 0) return;
    
    // Check if we have enough entries for unique winners
    if (!this.config.allowDuplicates && this.entries.length < this.config.numberOfReels) {
      alert('Not enough entries for unique winners! Either enable duplicates or add more entries.');
      return;
    }
    
    this.isSpinning = true;
    this.winners = [];
    
    const spinBtn = document.getElementById('spin-btn');
    const resetBtn = document.getElementById('reset-btn');
    const winnersDisplay = document.getElementById('winners-display');
    
    spinBtn.disabled = true;
    spinBtn.classList.add('disabled');
    resetBtn.style.display = 'none';
    winnersDisplay.innerHTML = '';
    winnersDisplay.style.display = 'none';
    
    // Initialize audio context on first user interaction
    this.audioManager.initAudio();
    this.audioManager.playSpinSound();
    
    // Pre-select winners before starting animation
    const availableEntries = [...this.entries];
    const selectedWinners = [];
    
    for (let i = 0; i < this.reels.length; i++) {
      let winner;
      if (this.config.allowDuplicates) {
        winner = this.entries[Math.floor(Math.random() * this.entries.length)];
      } else {
        const availableIndex = Math.floor(Math.random() * availableEntries.length);
        winner = availableEntries[availableIndex];
        availableEntries.splice(availableIndex, 1);
      }
      selectedWinners.push(winner);
    }
    
    // Start all reels spinning with the selected winners
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      reel.isSpinning = true;
      
      // Populate reel with entries, ensuring the winner is included
      this.populateReelWithWinner(reel.strip, selectedWinners[i]);
      
      // Start spinning animation with configurable speed
      reel.strip.style.animation = `spin ${this.config.spinSpeed}s linear infinite`;
    }
    
    // Stop reels one by one with stagger delay
    for (let i = 0; i < this.reels.length; i++) {
      await this.delay((this.config.spinDuration * 1000) + (i * this.config.staggerDelay * 1000));
      await this.stopReel(i, selectedWinners[i]);
    }
    
    // All reels stopped
    this.isSpinning = false;
    this.showWinners();
    
    if (this.config.showCelebration) {
      this.celebrate();
    }
    
    resetBtn.style.display = 'block';
  }

  async stopReel(index, winner) {
    const reel = this.reels[index];
    
    this.winners.push(winner);
    
    // Stop spinning animation
    reel.strip.style.animation = 'none';
    reel.isSpinning = false;
    
    // Find all instances of the winner in the reel
    const items = Array.from(reel.strip.children);
    const winnerItems = items.filter(item => item.textContent === winner);
    
    if (winnerItems.length > 0) {
      // Pick a random instance of the winner to display
      const randomWinnerItem = winnerItems[Math.floor(Math.random() * winnerItems.length)];
      const winnerIndex = items.indexOf(randomWinnerItem);
      
      // Calculate the position to center the winner in the reel
      // Note: REEL_ITEM_HEIGHT must match .reel height in style.css
      const offset = winnerIndex * this.REEL_ITEM_HEIGHT;
      
      // Position the reel strip so the winner is visible in the center
      reel.strip.style.transform = `translateY(-${offset}px)`;
      
      // Highlight the winner
      randomWinnerItem.classList.add('winner-item');
    }
    
    // Play stop sound
    this.audioManager.playReelStopSound();
    
    // Flash effect
    reel.element.classList.add('flash');
    await this.delay(200);
    reel.element.classList.remove('flash');
  }

  showWinners() {
    const winnersDisplay = document.getElementById('winners-display');
    winnersDisplay.innerHTML = '';
    winnersDisplay.style.display = 'block';
    
    const title = document.createElement('h2');
    title.textContent = this.winners.length === 1 ? 'Winner!' : 'Winners!';
    title.className = 'winners-title';
    winnersDisplay.appendChild(title);
    
    this.winners.forEach((winner, index) => {
      const winnerEl = document.createElement('div');
      winnerEl.className = 'winner-name';
      winnerEl.textContent = `${index + 1}. ${winner}`;
      winnersDisplay.appendChild(winnerEl);
    });
    
    this.audioManager.playWinnerSound();
  }

  celebrate() {
    // Confetti burst
    this.confettiManager.burst(100);
    
    // Flash border lights
    const frame = document.querySelector('.slot-frame');
    frame.classList.add('celebrating');
    
    setTimeout(() => {
      frame.classList.remove('celebrating');
    }, 3000);
  }

  reset() {
    this.confettiManager.stop();
    
    const spinBtn = document.getElementById('spin-btn');
    const resetBtn = document.getElementById('reset-btn');
    const winnersDisplay = document.getElementById('winners-display');
    
    spinBtn.disabled = false;
    spinBtn.classList.remove('disabled');
    resetBtn.style.display = 'none';
    winnersDisplay.style.display = 'none';
    
    this.winners = [];
    
    // Clear reels
    this.reels.forEach(reel => {
      reel.strip.innerHTML = '';
    });
    
    document.querySelector('.slot-frame').classList.remove('celebrating');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize slot machine when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Check if we have entries
  const entries = getEntries();
  if (entries.length === 0) {
    const message = document.createElement('div');
    message.className = 'no-entries-message';
    message.innerHTML = `
      <h2>No Entries Found</h2>
      <p>Please open settings.html to add raffle entries.</p>
    `;
    document.body.appendChild(message);
  }
  
  new SlotMachine();
});
