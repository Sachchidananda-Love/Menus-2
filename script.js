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

  /**
   * Update every label on the page to the selected language.
   */
  function updateText() {
    document.querySelectorAll('.label').forEach(el => {
      const key = el.getAttribute('data-key');
      if (translations[key]) {
        el.textContent = translations[key][currentLang];
      }
    });
  }

  /**
   * Toggle between English and French. Adjust the switcher styles
   * and update all visible text accordingly.
   */
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

  // Attach event listener to the language switcher.
  langSwitcher.addEventListener('click', (event) => {
    // Prevent selecting text on double tap.
    event.preventDefault();
    toggleLanguage();
  });

  // Initialize default text.
  updateText();
});

