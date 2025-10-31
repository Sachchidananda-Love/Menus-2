// script.js
// Handles language toggling and dynamic text replacement.

document.addEventListener('DOMContentLoaded', () => {
  const langSwitcher = document.getElementById('langSwitcher');
  const toggleEl = document.getElementById('langToggle');
  let currentLang = 'en';

  // Translation table mapping keys to their English/French equivalents.
  const translations = {
    food: { en: 'Food', fr: 'Nourriture' },
    tea: { en: 'Tea', fr: 'Thé' },
    cocktails: { en: 'Cocktails', fr: 'Cocktails' },
    coffee: { en: 'Coffee', fr: 'Café' },
    shelf: { en: 'Discover our Coffee Shelf', fr: 'Découvrez notre étagère à café' },
    review: { en: 'Leave us a review', fr: 'Laissez-nous un avis' }
  };

  function updateText() {
    document.querySelectorAll('.label').forEach(el => {
      const key = el.getAttribute('data-key');
      if (translations[key]) {
        el.textContent = translations[key][currentLang];
      }
    });
  }

  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    if (currentLang === 'en') {
      langSwitcher.classList.remove('fra-active');
      langSwitcher.classList.add('eng-active');
    } else {
      langSwitcher.classList.remove('eng-active');
      langSwitcher.classList.add('fra-active');
    }
    updateText();
  }

  langSwitcher.addEventListener('click', (event) => {
    event.preventDefault();
    toggleLanguage();
  });

  updateText();

  // Set up press effects for better mobile support.
  function setupPressEffects() {
    const pressTargets = document.querySelectorAll('.social-btn, .tile, .large-button, .review-button');
    pressTargets.forEach(el => {
      // Touch events: add the 'pressed' class on touchstart and keep it until navigation.
      el.addEventListener('touchstart', () => {
        el.classList.add('pressed');
      });
      // Mouse events for desktop: add the 'pressed' class on mousedown and keep it.
      el.addEventListener('mousedown', () => {
        el.classList.add('pressed');
      });
    });
  }

  setupPressEffects();
});
