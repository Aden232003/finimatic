// Main application JavaScript
class FinimateApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initAnimations();
    this.initCustomCursor();
    this.initScrollEffects();
    this.initNavigation();
    this.initForm();
    this.initCounters();
    this.initMagneticElements();
    this.initParallax();
    this.initSolutionsNavigation();
    
    // Initialize after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.onDOMReady();
      });
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    this.revealInitialElements();
    this.startAnimations();
  }

  setupEventListeners() {
    // Window events
    window.addEventListener('scroll', this.throttle(this.onScroll.bind(this), 16));
    window.addEventListener('resize', this.debounce(this.onResize.bind(this), 250));
    window.addEventListener('load', this.onLoad.bind(this));
    
    // Mouse events for custom cursor
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    document.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  // Custom Cursor
  initCustomCursor() {
    this.cursor = {
      dot: document.querySelector('.cursor-dot'),
      outline: document.querySelector('.cursor-outline'),
      text: document.querySelector('.cursor-text')
    };

    this.cursorPosition = { x: 0, y: 0 };
    this.cursorTarget = { x: 0, y: 0 };

    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
      document.querySelector('.cursor-container').style.display = 'none';
      return;
    }

    this.animateCursor();
    this.setupCursorInteractions();
  }

  onMouseMove(e) {
    this.cursorTarget.x = e.clientX;
    this.cursorTarget.y = e.clientY;
  }

  animateCursor() {
    // Smooth cursor movement
    this.cursorPosition.x += (this.cursorTarget.x - this.cursorPosition.x) * 0.15;
    this.cursorPosition.y += (this.cursorTarget.y - this.cursorPosition.y) * 0.15;

    if (this.cursor.dot) {
      this.cursor.dot.style.transform = `translate(${this.cursorPosition.x}px, ${this.cursorPosition.y}px)`;
    }

    if (this.cursor.outline) {
      this.cursor.outline.style.transform = `translate(${this.cursorPosition.x}px, ${this.cursorPosition.y}px)`;
    }

    requestAnimationFrame(this.animateCursor.bind(this));
  }

  setupCursorInteractions() {
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-magnetic]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.outline.style.width = '50px';
        this.cursor.outline.style.height = '50px';
        
        const cursorText = element.getAttribute('cursor-text');
        if (cursorText && this.cursor.text) {
          this.cursor.text.textContent = cursorText;
          this.cursor.text.style.opacity = '1';
        }
      });

      element.addEventListener('mouseleave', () => {
        this.cursor.outline.style.width = '32px';
        this.cursor.outline.style.height = '32px';
        
        if (this.cursor.text) {
          this.cursor.text.style.opacity = '0';
        }
      });
    });
  }

  // Navigation
  initNavigation() {
    const nav = document.querySelector('[data-nav]');
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navMenu = document.querySelector('[data-menu]');
    const navLinks = document.querySelectorAll('[data-nav-link]');

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
      });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }

        // Close mobile menu
        if (navMenu.classList.contains('active')) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.classList.remove('nav-open');
        }
      });
    });

    // Navigation background on scroll
    this.handleNavScroll();
  }

  handleNavScroll() {
    const nav = document.querySelector('[data-nav]');
    if (!nav) return;

    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Scroll Effects
  initScrollEffects() {
    this.observeElements();
    this.initScrollIndicator();
  }

  observeElements() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, options);

    // Observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-fade-up], [data-text-split], [data-text-reveal]');
    animatedElements.forEach(element => {
      this.observer.observe(element);
    });
  }

  animateElement(element) {
    const delay = element.getAttribute('data-delay') || 0;
    
    setTimeout(() => {
      if (element.hasAttribute('data-fade-up')) {
        element.classList.add('animate');
      }
      
      if (element.hasAttribute('data-text-split')) {
        this.animateTextSplit(element);
      }
      
      if (element.hasAttribute('data-text-reveal')) {
        this.animateTextReveal(element);
      }
    }, delay * 1000);
  }

  animateTextSplit(element) {
    element.classList.add('animate');
  }

  animateTextReveal(element) {
    const lines = element.querySelectorAll('.text-reveal-line');
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('animate');
      }, index * 100);
    });
  }

  initScrollIndicator() {
    const indicator = document.querySelector('[data-scroll-indicator]');
    if (!indicator) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const opacity = Math.max(0, 1 - scrollTop / 200);
      indicator.style.opacity = opacity;
    });
  }

  // Parallax Effects
  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      this.observer.observe(element);
    });
  }

  updateParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrollTop * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }

  // Magnetic Elements
  initMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        this.handleMagneticMove(e, element);
      });
      
      element.addEventListener('mouseleave', () => {
        this.handleMagneticLeave(element);
      });
    });
  }

  handleMagneticMove(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const strength = 0.3;
    element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  handleMagneticLeave(element) {
    element.style.transform = 'translate(0px, 0px)';
  }

  // Counters
  initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterOptions = {
      threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, counterOptions);

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (target % 1 === 0) {
        element.textContent = Math.floor(current);
      } else {
        element.textContent = current.toFixed(1);
      }
    }, 16);
  }

  // Form Handling
  initForm() {
    const form = document.querySelector('[data-form]');
    if (!form) return;

    form.addEventListener('submit', this.handleFormSubmit.bind(this));
    
    // Input animations
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('focus', this.handleInputFocus.bind(this));
      input.addEventListener('blur', this.handleInputBlur.bind(this));
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send data to your backend
    console.log('Form submitted:', data);
    
    // Show success message
    this.showNotification('Message sent successfully!', 'success');
    
    // Reset form
    e.target.reset();
  }

  handleInputFocus(e) {
    e.target.parentElement.classList.add('focused');
  }

  handleInputBlur(e) {
    if (!e.target.value) {
      e.target.parentElement.classList.remove('focused');
    }
  }

  // Animations
  initAnimations() {
    // Floating elements
    const floatingElements = document.querySelectorAll('[data-float]');
    floatingElements.forEach((element, index) => {
      const delay = element.getAttribute('data-delay') || 0;
      setTimeout(() => {
        element.classList.add('float-element');
      }, delay * 1000);
    });

    // Ticker animation
    this.initTicker();
  }

  initTicker() {
    const ticker = document.querySelector('[data-ticker]');
    if (!ticker) return;

    // Clone ticker content for seamless loop
    const tickerTrack = ticker.querySelector('.ticker-track');
    const tickerContent = tickerTrack.innerHTML;
    tickerTrack.innerHTML = tickerContent + tickerContent;
  }

  startAnimations() {
    // Start any animations that should begin immediately
    this.animateHeroElements();
  }

  animateHeroElements() {
    // Animate hero text elements
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroCta = document.querySelector('.hero-cta');

    if (heroSubtitle) {
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }, 500);
    }

    if (heroTitle) {
      setTimeout(() => {
        heroTitle.classList.add('animate');
      }, 800);
    }

    if (heroDescription) {
      setTimeout(() => {
        heroDescription.style.opacity = '1';
        heroDescription.style.transform = 'translateY(0)';
      }, 1200);
    }

    if (heroCta) {
      setTimeout(() => {
        heroCta.style.opacity = '1';
        heroCta.style.transform = 'translateY(0)';
      }, 1500);
    }

    // Animate dashboard cards
    this.animateDashboardCards();
  }

  animateDashboardCards() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 1000 + (index * 200));
    });
  }

  revealInitialElements() {
    // Reveal elements that should be visible on load
    const immediateElements = document.querySelectorAll('.hero-subtitle, .hero-description, .hero-cta');
    immediateElements.forEach(element => {
      element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });
  }

  // Event Handlers
  onScroll() {
    this.handleNavScroll();
    this.updateParallax();
  }

  onResize() {
    // Handle resize events
    this.updateLayout();
  }

  onLoad() {
    // Handle load events
    document.body.classList.add('loaded');
  }

  onMouseEnter() {
    document.body.classList.add('cursor-active');
  }

  onMouseLeave() {
    document.body.classList.remove('cursor-active');
  }

  updateLayout() {
    // Update layout calculations on resize
  }

  // Solutions Navigation
  initSolutionsNavigation() {
    const solutionColumns = document.querySelectorAll('.solution-column');
    if (solutionColumns.length === 0) return;

    solutionColumns.forEach((column, idx) => {
      column.addEventListener('mouseenter', () => {
        solutionColumns.forEach(col => col.classList.remove('active'));
        column.classList.add('active');
        // Fix for end cards: use a timeout to ensure layout is ready before scroll
        if (idx === 0) {
          setTimeout(() => {
            column.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
          }, 10);
        } else if (idx === solutionColumns.length - 1) {
          setTimeout(() => {
            column.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'nearest' });
          }, 10);
        } else {
          column.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
      column.addEventListener('mouseleave', () => {
        column.classList.remove('active');
      });
      column.addEventListener('click', () => {
        solutionColumns.forEach(col => col.classList.remove('active'));
        column.classList.add('active');
        if (idx === 0) {
          setTimeout(() => {
            column.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
          }, 10);
        } else if (idx === solutionColumns.length - 1) {
          setTimeout(() => {
            column.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'nearest' });
          }, 10);
        } else {
          column.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });

    // Observe solutions section for scroll animations
    const solutionsSection = document.querySelector('.solutions-section');
    if (solutionsSection) {
      const solutionOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      };
      const solutionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateSolutionsSection();
          }
        });
      }, solutionOptions);
      solutionObserver.observe(solutionsSection);
    }
  }
  
  activateSolutionColumn(activeColumn) {
    const allColumns = document.querySelectorAll('.solution-column');
    
    // Remove active class from all columns
    allColumns.forEach(column => {
      column.classList.remove('active');
    });
    
    // Add active class to the hovered column
    activeColumn.classList.add('active');
    
    // Add subtle animation to inactive columns
    allColumns.forEach(column => {
      if (column !== activeColumn) {
        column.style.transform = 'scale(0.98)';
        setTimeout(() => {
          column.style.transform = '';
        }, 300);
      }
    });
  }
  
  animateSolutionsSection() {
    const solutionColumns = document.querySelectorAll('.solution-column');
    
    solutionColumns.forEach((column, index) => {
      setTimeout(() => {
        column.style.opacity = '1';
        column.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // Utilities
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

// Initialize the application
const app = new FinimateApp();

// Initialize Vimeo Player and Mute Control
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Vimeo player if available
    if (typeof Vimeo !== 'undefined' && document.getElementById('vimeo-player')) {
        const iframe = document.getElementById('vimeo-player');
        const player = new Vimeo.Player(iframe);
        const muteButton = document.getElementById('mute-toggle');
        const muteIcon = muteButton.querySelector('.mute-icon');
        const unmuteIcon = muteButton.querySelector('.unmute-icon');
        
        let isMuted = true; // Start muted for autoplay
        
        // Toggle mute/unmute
        muteButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isMuted) {
                player.setVolume(1);
                muteIcon.style.display = 'none';
                unmuteIcon.style.display = 'block';
                isMuted = false;
            } else {
                player.setVolume(0);
                muteIcon.style.display = 'block';
                unmuteIcon.style.display = 'none';
                isMuted = true;
            }
        });
        
        // Ensure video starts muted
        player.ready().then(function() {
            player.setVolume(0);
        });
    }
});

// SignalStack Workflow Diagram Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize workflow diagram interactions
    initWorkflowDiagram();
    
    // Initialize scroll animations
    initScrollAnimations();
});

function initWorkflowDiagram() {
    const workflowCards = document.querySelectorAll('.workflow-card');
    const aiTools = document.querySelectorAll('.ai-tool');
    const coreCircle = document.querySelector('.core-circle');
    
    // Add hover effects to workflow cards
    workflowCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 107, 53, 0.1);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add interactive effects to AI tools
    aiTools.forEach(tool => {
        tool.addEventListener('mouseenter', function() {
            // Pause core rotation temporarily
            if (coreCircle) {
                coreCircle.style.animationPlayState = 'paused';
            }
            
            // Highlight the tool
            this.style.zIndex = '10';
            
            // Add glow effect
            const toolIcon = this.querySelector('.tool-icon');
            if (toolIcon) {
                toolIcon.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.6)';
            }
        });
        
        tool.addEventListener('mouseleave', function() {
            // Resume core rotation
            if (coreCircle) {
                coreCircle.style.animationPlayState = 'running';
            }
            
            this.style.zIndex = '1';
            
            // Remove glow effect
            const toolIcon = this.querySelector('.tool-icon');
            if (toolIcon) {
                toolIcon.style.boxShadow = '';
            }
        });
    });
    
    // Add click handlers for workflow cards
    workflowCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 100);
            
            // You can add more functionality here, like showing details
            console.log('Clicked on:', this.dataset.input || this.dataset.output);
        });
    });
}

function initScrollAnimations() {
    const workflowSection = document.querySelector('.signalstack-workflow-diagram');
    
    if (!workflowSection) return;
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateWorkflowElements();
            }
        });
    }, observerOptions);
    
    observer.observe(workflowSection);
}

function animateWorkflowElements() {
    const workflowCards = document.querySelectorAll('.workflow-card');
    const connectors = document.querySelectorAll('.workflow-connector');
    const aiTools = document.querySelectorAll('.ai-tool');
    
    // Animate workflow cards with stagger
    workflowCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Add a subtle bounce effect
            setTimeout(() => {
                card.style.transform = 'translateY(-4px)';
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, 200);
        }, index * 100);
    });
    
    // Animate connectors
    setTimeout(() => {
        connectors.forEach((connector, index) => {
            setTimeout(() => {
                const line = connector.querySelector('.connector-line');
                const arrow = connector.querySelector('.flow-arrow');
                
                if (line) {
                    line.style.animation = 'slideDown 0.8s ease-out forwards';
                }
                
                if (arrow) {
                    setTimeout(() => {
                        arrow.style.opacity = '1';
                        arrow.style.animation = 'arrowPulse 2s ease-in-out infinite';
                    }, 400);
                }
            }, index * 200);
        });
    }, 600);
    
    // Animate AI tools in sequence
    setTimeout(() => {
        aiTools.forEach((tool, index) => {
            setTimeout(() => {
                tool.style.opacity = '1';
                tool.style.transform = tool.style.transform + ' scale(1)';
                
                // Add a pop effect
                const toolIcon = tool.querySelector('.tool-icon');
                if (toolIcon) {
                    toolIcon.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        toolIcon.style.transform = 'scale(1)';
                    }, 200);
                }
            }, index * 100);
        });
    }, 1000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            height: 0;
            opacity: 0;
        }
        to {
            height: 80px;
            opacity: 1;
        }
    }
    
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    .workflow-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .ai-tool {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .workflow-connector .flow-arrow {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .workflow-card,
        .ai-tool,
        .workflow-connector .flow-arrow {
            animation: none !important;
            transition: none !important;
        }
    }
`;

document.head.appendChild(style);

// Workflow Modal Functions
function openWorkflowModal() {
    console.log('openWorkflowModal called'); // Debug log
    const modal = document.getElementById('workflowModal');
    console.log('Modal element:', modal); // Debug log
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add escape key listener
        document.addEventListener('keydown', handleModalKeydown);
        
        // Add click outside to close
        modal.addEventListener('click', handleModalBackdropClick);
    } else {
        console.error('Modal element not found');
    }
}

function closeWorkflowModal() {
    const modal = document.getElementById('workflowModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Remove listeners
        document.removeEventListener('keydown', handleModalKeydown);
        modal.removeEventListener('click', handleModalBackdropClick);
    }
}

function handleModalKeydown(event) {
    if (event.key === 'Escape') {
        closeWorkflowModal();
    }
}

function handleModalBackdropClick(event) {
    const modal = document.getElementById('workflowModal');
    if (event.target === modal) {
        closeWorkflowModal();
    }
}

// Make functions globally available
window.openWorkflowModal = openWorkflowModal;
window.closeWorkflowModal = closeWorkflowModal;

// Universal Image Modal Functions
function openImageModal(imageSrc, imageAlt) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = createImageModal();
    }
    
    const modalImage = modal.querySelector('.image-modal-img');
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add escape key listener
    document.addEventListener('keydown', handleImageModalKeydown);
    
    // Add click outside to close
    modal.addEventListener('click', handleImageModalBackdropClick);
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Remove listeners
        document.removeEventListener('keydown', handleImageModalKeydown);
        modal.removeEventListener('click', handleImageModalBackdropClick);
    }
}

function createImageModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'workflow-modal';
    modal.innerHTML = `
        <div class="workflow-modal-content">
            <button class="workflow-modal-close" onclick="closeImageModal()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <img class="workflow-modal-image image-modal-img" src="" alt="">
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function handleImageModalKeydown(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
}

function handleImageModalBackdropClick(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeImageModal();
    }
}

window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;

// Initialize workflow modal when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const workflowCard = document.getElementById('workflowDiagramCard');
    const modalCloseBtn = document.querySelector('.workflow-modal-close');
    
    if (workflowCard) {
        workflowCard.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Workflow card clicked'); // Debug log
            openWorkflowModal();
        });
        
        // Add custom cursor effect
        setupWorkflowCursor(workflowCard);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeWorkflowModal();
        });
    }
    
    // Initialize all service images with click functionality
    initializeServiceImages();
});

// Custom cursor for workflow card
function setupWorkflowCursor(workflowCard) {
    let cursorBlip = null;
    
    workflowCard.addEventListener('mouseenter', function() {
        // Create cursor blip
        cursorBlip = document.createElement('div');
        cursorBlip.className = 'workflow-cursor-blip';
        cursorBlip.textContent = 'Click Here';
        document.body.appendChild(cursorBlip);
        
        // Hide default cursor elements
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        if (cursorDot) cursorDot.style.opacity = '0';
        if (cursorOutline) cursorOutline.style.opacity = '0';
    });
    
    workflowCard.addEventListener('mousemove', function(e) {
        if (cursorBlip) {
            cursorBlip.style.left = e.clientX + 15 + 'px';
            cursorBlip.style.top = e.clientY - 10 + 'px';
        }
    });
    
    workflowCard.addEventListener('mouseleave', function() {
        if (cursorBlip) {
            cursorBlip.remove();
            cursorBlip = null;
        }
        
        // Restore default cursor elements
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorOutline) cursorOutline.style.opacity = '1';
    });
}

// Initialize all service images with click and cursor effects
function initializeServiceImages() {
    // Find all clickable images in service pages
    const serviceImages = document.querySelectorAll(
        '.integration-diagram, .workflow-diagram-image, .service-image, img'
    );
    
    serviceImages.forEach(image => {
        // Skip video elements and buttons
        if (image.closest('video, button, .video-container, .nav, .footer')) return;
        
        // Add cursor effect and click handler
        setupImageCursor(image);
        
        image.addEventListener('click', function(e) {
            e.preventDefault();
            openImageModal(image.src, image.alt || 'Service Image');
        });
        
        // Add hover effect
        image.style.cursor = 'pointer';
    });
}

// Custom cursor for service images
function setupImageCursor(imageElement) {
    let cursorBlip = null;
    
    imageElement.addEventListener('mouseenter', function() {
        // Create cursor blip
        cursorBlip = document.createElement('div');
        cursorBlip.className = 'workflow-cursor-blip';
        cursorBlip.textContent = 'View Full Size';
        document.body.appendChild(cursorBlip);
        
        // Hide default cursor elements
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        if (cursorDot) cursorDot.style.opacity = '0';
        if (cursorOutline) cursorOutline.style.opacity = '0';
    });
    
    imageElement.addEventListener('mousemove', function(e) {
        if (cursorBlip) {
            cursorBlip.style.left = e.clientX + 15 + 'px';
            cursorBlip.style.top = e.clientY - 10 + 'px';
        }
    });
    
    imageElement.addEventListener('mouseleave', function() {
        if (cursorBlip) {
            cursorBlip.remove();
            cursorBlip = null;
        }
        
        // Restore default cursor elements
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorOutline) cursorOutline.style.opacity = '1';
    });
}