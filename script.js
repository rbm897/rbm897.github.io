/**
 * Ram Bhajan Mishra — Portfolio & Resume Scripts
 * - Theme Switcher (Dark/Light with localStorage persistence)
 * - Mobile Navigation Handling
 * - Skills Category Filter
 * - One-Click Copy with Toast Notification
 * - Active Navigation Spy via IntersectionObserver
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Theme Management (Dark / Light)
     -------------------------------------------------------------------------- */
  var themeToggle = document.getElementById('theme-toggle');
  var storageKey = 'rbm-theme-preference';

  function getPreferredTheme() {
    var savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Listen for system color scheme changes if user hasn't explicitly set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(storageKey)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* --------------------------------------------------------------------------
     2. Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Skills Matrix Category Filter
     -------------------------------------------------------------------------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var skillCards = document.querySelectorAll('.skill-category-card');

  if (filterButtons.length && skillCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filterValue = this.getAttribute('data-filter');

        // Update active button state
        filterButtons.forEach(function (btn) {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-selected', 'false');
        });
        this.classList.add('is-active');
        this.setAttribute('aria-selected', 'true');

        // Filter cards
        skillCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. One-Click Copy with Toast Notification
     -------------------------------------------------------------------------- */
  var copyButtons = document.querySelectorAll('.copy-btn');
  var toast = document.getElementById('toast');
  var toastMessage = document.getElementById('toast-message');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    toast.classList.add('is-visible');

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2800);
  }

  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var textToCopy = this.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          showToast('Copied to clipboard: ' + textToCopy);
        }).catch(function () {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard: ' + text);
    } catch (err) {
      showToast('Failed to copy: ' + text);
    }
    document.body.removeChild(textArea);
  }

  /* --------------------------------------------------------------------------
     5. Scroll Spy Navigation Highlight
     -------------------------------------------------------------------------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinksList = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window && sections.length && navLinksList.length) {
    var observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var currentId = entry.target.getAttribute('id');
          navLinksList.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === '#' + currentId) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }
})();
