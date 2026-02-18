# 🎰 Raffle Slot Machine

A fully-featured, customizable raffle slot machine web application designed for OBS Browser Source integration. Pick winners with style using classic slot machine mechanics and modern visual effects!

## ✨ Features

### 🎯 Core Functionality
- **Configurable Number of Reels** - Select 1-10 winners at once
- **Realistic Slot Machine Animation** - Smooth spinning reels with staggered stops
- **Duplicate Control** - Choose whether winners can be selected multiple times
- **OBS Interact Mode Compatible** - Click to spin directly in OBS
- **No Server Required** - Pure client-side HTML/CSS/JavaScript
- **Offline Ready** - No external dependencies or CDN requirements

### 🎨 Visual Customization
- **Neon Slot Machine Aesthetic** - Classic design with modern glowing effects
- **Transparent Background** - Perfect for OBS overlay/chromakey
- **Custom Color Themes** - Personalize theme and accent colors
- **Font Customization** - Choose from multiple font families and sizes
- **Celebration Effects** - Confetti particles and flashing lights on win
- **Responsive Design** - Works at common OBS resolutions (1920x1080, 1280x720, etc.)

### 🔊 Audio Features
- **Web Audio API Sounds** - No external audio files required
- **Spin Sound Effects** - Mechanical whirring during spin
- **Reel Stop Clicks** - Satisfying click when each reel stops
- **Winner Celebration Jingle** - Uplifting melody when winners are revealed
- **Volume Control** - Adjustable master volume and individual sound toggles
- **Mute Option** - Quick mute all sounds

### ⚙️ Settings Management
- **Raffle Entry Management** - Add, remove, import, and export participant names
- **Import/Export** - Load entries from text files (one name per line)
- **Live Preview** - See your customizations before going live
- **Persistent Storage** - All settings saved to browser localStorage
- **Easy Reset** - Restore default settings with one click

## 📁 Project Structure

```
raffle-slot-machine/
├── index.html              # Main slot machine display (OBS Browser Source)
├── settings.html           # Configuration page
├── README.md              # This file
├── css/
│   ├── style.css          # Main display styles
│   └── settings.css       # Settings page styles
└── js/
    ├── slot-machine.js    # Core slot machine logic & animation
    ├── settings.js        # Settings page logic
    ├── storage.js         # localStorage helper functions
    ├── audio.js           # Web Audio API sound generation
    └── confetti.js        # Confetti particle effects
```

## 🚀 Quick Start

### 1. Download or Clone
```bash
git clone https://github.com/birdh69/raffle-slot-machine.git
cd raffle-slot-machine
```

### 2. Configure Settings
1. Open `settings.html` in your web browser
2. Add participant names (one per line) in the text area
3. Click "💾 Save Entries"
4. Customize appearance and behavior as desired
5. All settings are automatically saved to your browser

### 3. Add to OBS
1. Open OBS Studio
2. Add a new **Browser Source**
3. Configure the source:
   - **Local file**: Check this box
   - **Local File**: Browse and select `index.html`
   - **Width**: 1920 (or your preferred width)
   - **Height**: 1080 (or your preferred height)
   - **FPS**: 60 (recommended)
   - **Custom CSS**: Leave blank
   - **Shutdown source when not visible**: Uncheck
   - **Refresh browser when scene becomes active**: Check if desired
4. Click **OK**

### 4. Enable Interact Mode
1. Right-click the Browser Source in OBS
2. Select **Interact**
3. Click the **SPIN** button to start the raffle
4. Click **RESET** to prepare for the next spin

## 📖 Detailed Setup Guide

### Adding Raffle Entries

#### Manual Entry
1. Open `settings.html`
2. Type names in the text area, one per line
3. Click "💾 Save Entries"

#### Import from File
1. Create a `.txt` file with names (one per line)
2. In `settings.html`, click "📁 Import from File"
3. Select your text file
4. Entries are automatically loaded and saved

#### Export Entries
- Click "💾 Export to File" to download your current entries as `raffle-entries.txt`

### Customizing Appearance

#### Colors
- **Theme Color**: Main color for borders and accents
- **Accent Color**: Secondary color for highlights and winner text

#### Background
- **Transparent Background**: Enable for OBS overlay (default: ON)
- **Solid Background**: Disable transparency and choose a color

#### Typography
- **Font Size**: Adjust name text size (24-96px)
- **Font Family**: Choose from 8 web-safe fonts

#### Effects
- **Show Celebration Effects**: Enable/disable confetti on win

### Slot Machine Settings

#### Number of Reels (1-10)
- Determines how many winners are selected
- Example: 3 reels = 3 winners

#### Spin Duration (2-15 seconds)
- How long reels spin before stopping
- Longer = more suspense

#### Roller Speed (0.1-2 seconds)
- Speed of the rolling animation
- Lower values = faster scrolling
- Higher values = slower, easier to see names

#### Stagger Delay (0.5-3 seconds)
- Delay between each reel stopping
- Creates dramatic reveal effect

#### Allow Duplicate Winners
- **OFF**: Each reel picks a unique winner (requires enough entries)
- **ON**: Same person can win multiple times

### Audio Settings

#### Master Volume (0-100%)
- Controls overall sound level

#### Sound Toggles
- **Mute All**: Quick mute
- **Enable Spin Sounds**: Mechanical effects during spin
- **Enable Winner Sounds**: Celebration jingle

## 🎬 OBS Setup Tips

### Recommended Settings
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **FPS**: 60 for smooth animations
- **Transparency**: Enable "Shutdown source when not visible" to save resources

### Scene Setup Ideas
1. **Main Scene**: Full-screen slot machine on transparent background
2. **Lower Third**: Smaller slot machine in corner during gameplay
3. **Intermission**: Center slot machine with custom background

### Performance
- The application uses CSS transforms for GPU acceleration
- Confetti may impact performance on low-end systems (can be disabled)
- Recommended to test on your system before live use

## 🎮 Usage Instructions

### During Stream/Event

1. **Prepare**: Ensure entries are loaded and settings configured
2. **Start**: In OBS, right-click Browser Source → Interact
3. **Spin**: Click the **SPIN** button
4. **Wait**: Watch as reels spin and stop one by one
5. **Celebrate**: Winners are displayed with celebration effects
6. **Reset**: Click **RESET** to spin again
7. **Close**: Close interact window when done

### Keyboard Shortcuts
- None by default (click-based for OBS compatibility)
- Can be added via custom JavaScript if needed

## 🔧 Customization Guide

### Advanced Color Schemes

#### Neon Blue
- Theme: \`#00ccff\`
- Accent: \`#00ff88\`

#### Royal Gold
- Theme: \`#ffd700\`
- Accent: \`#ff6b35\`

#### Purple Haze
- Theme: \`#9b59b6\`
- Accent: \`#e74c3c\`

### Modifying Code

#### Changing Animation Speed
Edit \`js/slot-machine.js\`:
\`\`\`javascript
// Line with animation duration
reel.strip.style.animation = \`spin \${this.config.spinDuration}s linear infinite\`;
\`\`\`

#### Adding Custom Sounds
Edit \`js/audio.js\` to customize Web Audio API frequencies and patterns

#### Styling Tweaks
- \`css/style.css\` - Main display styles
- \`css/settings.css\` - Settings page styles

## 🐛 Troubleshooting

### Entries Not Appearing
- Ensure you clicked "💾 Save Entries" in settings
- Check browser console for errors (F12)
- Verify localStorage is enabled in browser

### Spin Button Not Working
- Make sure you have entries added
- Check if duplicates are disabled but not enough unique entries
- Verify OBS interact window is active

### Transparent Background Not Working
- Ensure "Transparent Background" is enabled in settings
- Verify OBS Browser Source doesn't have a background color set
- Check that you're not using solid background mode

### No Sound
- Verify "Mute All" is not enabled
- Check browser and OBS audio settings
- Ensure Master Volume is above 0%
- Web Audio API requires user interaction to initialize

### Performance Issues
- Disable celebration effects if confetti lags
- Reduce number of reels
- Lower OBS Browser Source FPS to 30
- Close other resource-intensive applications

## 📝 License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🙏 Acknowledgments

- Built with vanilla HTML5, CSS3, and JavaScript
- Web Audio API for sound generation
- CSS animations for smooth visual effects
- No external libraries or frameworks

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share your customizations

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Enjoy your raffle slot machine! 🎰✨**
