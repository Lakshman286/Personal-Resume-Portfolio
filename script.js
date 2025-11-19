// =====================
// Modern Typing Animation Loader
// =====================
class TypingLoader {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.mainContent = document.getElementById('main-content');
    this.typedText = document.querySelector('.typed-text');
    this.cursor = document.querySelector('.cursor');
    this.progressFill = document.querySelector('.progress-fill');
    this.progressPercent = document.querySelector('.progress-percent');
    
    this.fullName = "Golla Vara Lakshman Naidu";
    this.currentText = "";
    this.currentIndex = 0;
    this.isDeleting = false;
    this.typeSpeed = 100;
    this.deleteSpeed = 50;
    this.pauseTime = 2000;
    
    this.init();
  }
  
  init() {
    this.startLoading();
    this.startTyping();
    this.preloadAssets();
    
    // Set timeout for 4-5 seconds loading
    setTimeout(() => {
      this.completeLoading();
    }, 4500);
  }
  
  startLoading() {
    this.loadingScreen.style.display = 'flex';
    this.mainContent.style.display = 'none';
    document.body.style.overflow = 'hidden';
    this.createParticles();
  }
  
  startTyping() {
    const type = () => {
      if (this.isDeleting) {
        // Deleting text
        this.currentText = this.fullName.substring(0, this.currentIndex - 1);
        this.currentIndex--;
        this.typeSpeed = this.deleteSpeed;
      } else {
        // Typing text
        this.currentText = this.fullName.substring(0, this.currentIndex + 1);
        this.currentIndex++;
        this.typeSpeed = 100;
      }
      
      this.typedText.textContent = this.currentText;
      
      if (!this.isDeleting && this.currentIndex === this.fullName.length) {
        // Finished typing, pause then start deleting
        this.typeSpeed = this.pauseTime;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentIndex === 0) {
        // Finished deleting, pause then start typing again
        this.typeSpeed = 500;
        this.isDeleting = false;
      }
      
      setTimeout(type, this.typeSpeed);
    };
    
    // Start typing animation
    setTimeout(type, 1000);
  }
  
  createParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = Math.random() * 6 + 2;
      const delay = Math.random() * 8;
      const duration = Math.random() * 4 + 4;
      
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      // Random color from accent colors
      const colors = ['#8be9fd', '#7b61ff', '#ff6bcb'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = randomColor;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  preloadAssets() {
    const criticalImages = [
      'hero-bg.jpg',
      'project1.jpg', 
      'project2.png'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Simulate progress
    this.simulateProgress();
  }
  
  simulateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
      }
      this.updateProgress(progress);
    }, 300);
  }
  
  updateProgress(percent) {
    this.progressFill.style.width = percent + '%';
    this.progressPercent.textContent = Math.round(percent) + '%';
    
    // Add subtle pulse effect
    this.progressFill.style.transform = 'scaleX(1.02)';
    setTimeout(() => {
      this.progressFill.style.transform = 'scaleX(1)';
    }, 150);
  }
  
  completeLoading() {
    // Hide cursor
    this.cursor.style.display = 'none';
    
    // Ensure final progress
    this.updateProgress(100);
    
    // Fade out loading screen
    this.loadingScreen.style.opacity = '0';
    
    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
      
      // Show main content with fade in
      this.mainContent.style.display = 'block';
      document.body.style.overflow = '';
      
      setTimeout(() => {
        this.mainContent.classList.add('loaded');
        this.initLazyLoading();
        this.initScrollAnimations();
      }, 100);
      
    }, 800);
  }
  
  initLazyLoading() {
    const sections = document.querySelectorAll('.section');
    
    // Add visible class to first section immediately
    sections[0]?.classList.add('visible');
    
    // Set up intersection observer for other sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 200);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach((section, index) => {
      if (index > 0) {
        observer.observe(section);
      }
    });
  }
  
  initScrollAnimations() {
    let ticking = false;
    
    const updateOnScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll-based animations can be added here
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
  }
}

// =====================
// Initialize everything when DOM is ready
// =====================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the modern typing loader
  new TypingLoader();
  
  // Initialize all other functionality after loading
  setTimeout(() => {
    initParallax();
    initNavigation();
    initPortfolio();
    initSkills();
    initContact();
    initBackToTop();
    initFooter();
  }, 5000);
});

// =====================
// Parallax shapes
// =====================
function initParallax() {
  const shapes = document.querySelectorAll('#bg-shapes .shape');
  let ticking = false;
  
  const handleMouseMove = (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        shapes.forEach((s, i) => {
          const speed = (i + 1) * 0.6;
          s.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
}

// =====================
// Navigation
// =====================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      smoothScrollTo(href);
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const offset = 100;
    const targetPosition = target.offsetTop - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  
  // Update active nav on scroll with throttle
  let scrollTicking = false;
  
  const updateNavOnScroll = () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        let current = '';
        document.querySelectorAll('section').forEach(sec => {
          const top = window.scrollY;
          const offset = sec.offsetTop - 160;
          const height = sec.offsetHeight;
          if (top >= offset && top < offset + height) current = sec.getAttribute('id');
        });
        
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href').includes(current));
        });
        
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };
  
  window.addEventListener('scroll', updateNavOnScroll, { passive: true });
}

// =====================
// Portfolio functionality
// =====================
function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');
  const modal = document.getElementById('portfolioModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const modalDemo = document.getElementById('modalDemo');
  const modalCode = document.getElementById('modalCode');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  
  let activeTrigger = null;
  let cleanupFocusTrap = null;

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (f === 'all' || item.dataset.category === f) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Modal functionality
  function trapFocus(modalEl){
    const focusable = modalEl.querySelectorAll('a, button, textarea, input, [tabindex]:not([tabindex="-1"])');
    if(!focusable.length) return null;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function keyHandler(e){
      if(e.key !== 'Tab') return;
      if(e.shiftKey && document.activeElement === first){ 
        e.preventDefault(); 
        last.focus(); 
      }
      else if(!e.shiftKey && document.activeElement === last){ 
        e.preventDefault(); 
        first.focus(); 
      }
    }
    modalEl.addEventListener('keydown', keyHandler);
    return () => modalEl.removeEventListener('keydown', keyHandler);
  }

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      activeTrigger = document.activeElement;
      const title = item.dataset.title || '';
      const img = item.dataset.image || '';
      const desc = item.dataset.desc || '';
      const tech = item.dataset.tech || '';
      
      modalImage.src = img;
      modalImage.alt = title;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalTech.textContent = `Tech: ${tech}`;
      modalDemo.href = '#';
      modalCode.href = '#';
      
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      
      cleanupFocusTrap = trapFocus(modal);
      
      // Focus first focusable element
      const f = modal.querySelector('button, a, input, textarea');
      f && f.focus();
    });
  });

  function closeModal(){
    if(!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    cleanupFocusTrap && cleanupFocusTrap();
    // Restore focus
    activeTrigger && activeTrigger.focus();
  }

  modalClose && modalClose.addEventListener('click', closeModal);
  modalBackdrop && modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { 
    if(e.key === 'Escape') closeModal(); 
  });
}

// =====================
// Skills animation
// =====================
function initSkills() {
  const skillProgresses = document.querySelectorAll('.skill-progress');
  let skillsDone = false;
  let skillsTicking = false;
  
  const animateSkillsOnScroll = () => {
    if (!skillsTicking && !skillsDone) {
      requestAnimationFrame(() => {
        const resume = document.getElementById('resume');
        if (!resume) return;
        
        const rect = resume.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
          skillsDone = true;
          
          // Animate each skill with staggered delay
          skillProgresses.forEach((progress, index) => {
            setTimeout(() => {
              const percent = parseInt(progress.dataset.percent || '0', 10);
              progress.style.width = percent + '%';
            }, index * 200); // 0.2 second delay between each
          });
        }
        
        skillsTicking = false;
      });
      skillsTicking = true;
    }
  };
  
  window.addEventListener('scroll', animateSkillsOnScroll, { passive: true });
}

// =====================
// Contact functionality
// =====================
function initContact() {
  const contacts = document.querySelectorAll('.contact-item');
  const form = document.getElementById('contactForm');
  const fm = document.getElementById('formMessage');
  
  // Copy to clipboard
  contacts.forEach(c => {
    c.addEventListener('click', () => {
      const text = c.getAttribute('data-copy');
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        c.classList.add('copied');
        setTimeout(() => { 
          c.classList.remove('copied'); 
        }, 1200);
      }).catch(() => {});
    });
    
    c.addEventListener('keypress', (e) => { 
      if (e.key === 'Enter' || e.key === ' ') c.click(); 
    });
  });
  
  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show UI feedback
      fm.className = 'form-message success';
      fm.textContent = 'Message sent — thank you!';
      
      // Actually submit the form
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          form.reset();
        }
      }).catch(error => {
        console.error('Form submission error:', error);
      });
      
      setTimeout(() => { 
        fm.className = 'form-message'; 
        fm.textContent = ''; 
      }, 4500);
    });
  }
}

// =====================
// Back to top
// =====================
function initBackToTop() {
  const back = document.getElementById('backToTop');
  let backTicking = false;
  
  const updateBackToTop = () => {
    if (!backTicking) {
      requestAnimationFrame(() => {
        if (back) back.classList.toggle('show', window.scrollY > 420);
        backTicking = false;
      });
      backTicking = true;
    }
  };
  
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  
  back && back.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

// =====================
// Footer year
// =====================
function initFooter() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// =====================
// Fallback: if something goes wrong with loading
// =====================
setTimeout(() => {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  
  if (loadingScreen && loadingScreen.style.display !== 'none') {
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';
    document.body.style.overflow = '';
  }
}, 8000); // 8 second timeout as safety net