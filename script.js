document.addEventListener('DOMContentLoaded', () => {
  // Language toggle logic
  const langSwitcher = document.getElementById('langSwitcher');
  let currentLang = 'en';

  const translations = {
    food:      { en: 'Food',         fr: 'Nourriture' },
    tea:       { en: 'Tea',          fr: 'Thé' },
    cocktails: { en: 'Cocktails',    fr: 'Cocktails' },
    coffee:    { en: 'Coffee',       fr: 'Café' },
    shelf:     { en: 'Discover our Coffee Shelf', fr: 'Découvrez notre étagère à café' },
    review:    { en: 'Leave us a review',         fr: 'Laissez-nous un avis' }
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

  // Press effect support: keep buttons depressed on click/touch
  function setupPressEffects() {
    const pressTargets = document.querySelectorAll('.social-btn, .tile, .large-button, .review-button, .back-button, .nav-btn');
    pressTargets.forEach(el => {
      el.addEventListener('touchstart', () => el.classList.add('pressed'));
      el.addEventListener('mousedown', () => el.classList.add('pressed'));
    });
  }
  setupPressEffects();

  // Food page navigation and PDF switching
  const homePage = document.getElementById('homePage');
  const foodPage = document.getElementById('foodPage');
  const foodBtn = document.getElementById('foodBtn');
  const backBtn = document.getElementById('backHome');
  const pdfViewer = document.getElementById('pdfViewer');
  const pageIndicator = document.getElementById('pageIndicator');
  const prevPdfBtn = document.getElementById('prevPdf');
  const nextPdfBtn = document.getElementById('nextPdf');

  // Replace with your actual PDF file names in Assets
  const foodPdfs = [
    'Assets/menu-morning.pdf',
    'Assets/menu-evening.pdf'
  ];
  let currentPdfIndex = 0;

  function loadFoodPdf(index) {
    currentPdfIndex = index;
    pdfViewer.setAttribute('data', foodPdfs[index] || '');
    pageIndicator.textContent = `${index + 1}/${foodPdfs.length}`;
  }

  function openFoodPage() {
    document.querySelectorAll('.pressed').forEach(el => el.classList.remove('pressed'));
    loadFoodPdf(0);
    foodPage.style.display = 'block';
    requestAnimationFrame(() => foodPage.classList.add('show'));
    homePage.style.display = 'none';
  }

  function closeFoodPage() {
    foodPage.classList.remove('show');
    setTimeout(() => {
      foodPage.style.display = 'none';
      homePage.style.display = 'block';
    }, 400);
    document.querySelectorAll('.pressed').forEach(el => el.classList.remove('pressed'));
  }

  if (foodBtn) foodBtn.addEventListener('click', openFoodPage);
  if (backBtn) backBtn.addEventListener('click', closeFoodPage);
  if (prevPdfBtn) prevPdfBtn.addEventListener('click', () => {
    if (currentPdfIndex > 0) loadFoodPdf(currentPdfIndex - 1);
  });
  if (nextPdfBtn) nextPdfBtn.addEventListener('click', () => {
    if (currentPdfIndex < foodPdfs.length - 1) loadFoodPdf(currentPdfIndex + 1);
  });
});
