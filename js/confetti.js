// confetti.js - Confetti particle celebration effects

class ConfettiManager {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.animationId = null;
  }

  createParticle() {
    const colors = ['#ff3366', '#ffd700', '#00ff88', '#00ccff', '#ff00ff', '#ffaa00'];
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    
    const x = Math.random() * window.innerWidth;
    const y = -20;
    const rotation = Math.random() * 360;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = color;
    particle.style.transform = `rotate(${rotation}deg)`;
    
    this.container.appendChild(particle);
    
    return {
      element: particle,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 5,
      vy: Math.random() * 3 + 2,
      rotation: rotation,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.2,
      life: 150
    };
  }

  update() {
    this.particles = this.particles.filter(particle => {
      particle.life--;
      if (particle.life <= 0) {
        particle.element.remove();
        return false;
      }
      
      particle.vy += particle.gravity;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.rotation += particle.rotationSpeed;
      
      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
      particle.element.style.transform = `rotate(${particle.rotation}deg)`;
      particle.element.style.opacity = particle.life / 150;
      
      return true;
    });
    
    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.update());
    } else {
      this.animationId = null;
    }
  }

  burst(count = 50) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
    
    if (!this.animationId) {
      this.update();
    }
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles.forEach(particle => particle.element.remove());
    this.particles = [];
  }
}
