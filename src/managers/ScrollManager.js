// managers/ScrollManager.js
class ScrollManager {
  constructor() {
    this.animationHandlers = new Map();
    this.isListening = false;
    this.handleScroll = this.handleScroll.bind(this);
  }

  register(componentId, animationFn) {
    this.animationHandlers.set(componentId, animationFn);

    // Start listening if this is the first registration
    if (!this.isListening && this.animationHandlers.size > 0) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      this.isListening = true;

      // Trigger initial animation
      setTimeout(this.handleScroll, 100);
    }

    return () => this.unregister(componentId);
  }

  unregister(componentId) {
    this.animationHandlers.delete(componentId);

    // Stop listening if no more handlers
    if (this.isListening && this.animationHandlers.size === 0) {
      window.removeEventListener('scroll', this.handleScroll);
      this.isListening = false;
    }
  }

  handleScroll() {
    const scrollY = window.scrollY;

    // Execute all registered animation handlers
    this.animationHandlers.forEach(handler => {
      handler(scrollY);
    });
  }
}

// Create a singleton instance
const scrollManager = new ScrollManager();
export default scrollManager;
