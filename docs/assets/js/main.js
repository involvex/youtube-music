// YTMusic Involvex-Edition Documentation - Main JavaScript
(function () {
  'use strict';

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const tabButtons = document.querySelectorAll('.tab-button');
  const configTabButtons = document.querySelectorAll('.config-tab-button');

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeNavigation();
    initializeTabs();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeMobileMenu();
    initializeScrollSpy();
    initializePerformanceMonitoring();
    initializePluginShowcase();
  });

  // Plugin Showcase Initialization
  function initializePluginShowcase() {
    // Plugin showcase initializes itself via plugins.js DOMContentLoaded listener
    console.log('Plugin showcase will initialize independently via plugins.js');
  }

  // Theme Management
  function initializeTheme() {
    // Get saved theme or default to system
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    setTheme(theme);

    // Listen for system theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      });

    // Theme toggle button
    themeToggle.addEventListener('click', toggleTheme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update theme toggle icon
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    if (theme === 'dark') {
      sunIcon.style.opacity = '0';
      moonIcon.style.opacity = '1';
    } else {
      sunIcon.style.opacity = '1';
      moonIcon.style.opacity = '0';
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Add subtle animation
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  // Navigation
  function initializeNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
  }

  function handleNavbarScroll() {
    const scrolled = window.pageYOffset;
    const shouldElevate = scrolled > 50;

    if (shouldElevate) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.boxShadow = 'none';
    }

    // Update active nav link
    updateActiveNavLink();
  }

  // Scroll Spy for Navigation
  function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
      const scrollPos = window.pageYOffset + navbar.offsetHeight + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', throttle(updateActiveLink, 100));
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.pageYOffset + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Tabs System
  function initializeTabs() {
    // Installation tabs
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        switchTab(button, targetTab, '.tab-button', '.tab-pane');
      });
    });

    // Configuration tabs
    configTabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-config');
        switchTab(button, targetTab, '.config-tab-button', '.config-tab-pane');
      });
    });
  }

  function switchTab(activeButton, targetId, buttonSelector, paneSelector) {
    // Remove active class from all buttons and panes
    document
      .querySelectorAll(buttonSelector)
      .forEach(btn => btn.classList.remove('active'));
    document
      .querySelectorAll(paneSelector)
      .forEach(pane => pane.classList.remove('active'));

    // Add active class to clicked button
    activeButton.classList.add('active');

    // Show corresponding pane
    const targetPane = document.getElementById(targetId);
    if (targetPane) {
      targetPane.classList.add('active');
    }
  }

  // Smooth Scrolling
  function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - navbar.offsetHeight;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  // Mobile Menu
  function initializeMobileMenu() {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking outside
    document.addEventListener('click', e => {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');

    // Update ARIA attributes for accessibility
    const isExpanded = navMenu.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);

    // Prevent body scroll when menu is open
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');

    // Reset ARIA attributes
    mobileMenuToggle.setAttribute('aria-expanded', 'false');

    // Restore body scroll
    document.body.style.overflow = '';
  }

  // Scroll Animations
  function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.feature-card, .plugin-card, .dev-card, .step'
    );

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
            entry.target.classList.add('animate-on-scroll', 'animated');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    animatedElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }

  // Performance Monitoring
  function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          console.log('LCP:', entry.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }

    // Monitor page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        console.log(
          'Page Load Time:',
          navigation.loadEventEnd - navigation.loadEventStart
        );
      }, 0);
    });
  }

  // Utility Functions
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Error Handling
  window.addEventListener('error', e => {
    console.error('Script Error:', e.error);
    // Could send error reports to analytics service
  });

  // Accessibility Enhancements
  function initializeAccessibility() {
    // Keyboard navigation for custom elements
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });

    // Focus management
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.modal');

    if (modal) {
      const focusableContent = modal.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableContent[0];
      const lastFocusableElement =
        focusableContent[focusableContent.length - 1];

      document.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
      });
    }
  }

  // Initialize accessibility
  initializeAccessibility();

  // Export functions for testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      setTheme,
      toggleTheme,
      throttle,
      debounce,
    };
  }
})();
