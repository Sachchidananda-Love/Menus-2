document.addEventListener('DOMContentLoaded', () => {
  // … existing language toggle and updateText …

  // Setup press effects on all button-like elements (including back and nav)
  function setupPressEffects() {
    const pressTargets = document.querySelectorAll('.social-btn, .tile, .large-button, .review-button, .back-button, .nav-btn');
    pressTargets.forEach(el => {
      el.addEventListener('touchstart', () => el.classList.add('pressed'));
      el.addEventListener('mousedown', () => el.classList.add('pressed'));
    });
  }
  setupPressEffects();

  // Food page variables and PDF list
  const homePage = document.getElementById('homePage');
  const foodPage = document.getElementById('foodPage');
  const foodBtn = document.getElementById('foodBtn');
  const backBtn = document.getElementById('backHome');
  const pdfViewer = document.getElementById('pdfViewer');
  const pageIndicator = document.getElementById('pageIndicator');
  const prevPdfBtn = document.getElementById('prevPdf');
  const nextPdfBtn = document.getElementById('nextPdf');
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
    // Clear any pressed classes
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

  // Event bindings
  if (foodBtn) foodBtn.addEventListener('click', openFoodPage);
  if (backBtn) backBtn.addEventListener('click', closeFoodPage);
  if (prevPdfBtn) prevPdfBtn.addEventListener('click', () => {
    if (currentPdfIndex > 0) loadFoodPdf(currentPdfIndex - 1);
  });
  if (nextPdfBtn) nextPdfBtn.addEventListener('click', () => {
    if (currentPdfIndex < foodPdfs.length - 1) loadFoodPdf(currentPdfIndex + 1);
  });
});
