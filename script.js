document.addEventListener('DOMContentLoaded', () => {
  const langSwitchers = document.querySelectorAll('[data-lang-switcher]');
  const mainLangSwitcher = document.getElementById('langSwitcher');
  let currentLang = 'en';

  const translations = {
    food:      { en: 'Food',         fr: 'Nourriture' },
    tea:       { en: 'Tea',          fr: 'Thé' },
    cocktails: { en: 'Cocktails',    fr: 'Cocktails' },
    coffee:    { en: 'Coffee',       fr: 'Café' },
    shelf:     { en: 'Discover our Coffee Shelf', fr: 'Découvrez notre étagère à café' },
    review:    { en: 'Leave us a review',         fr: 'Laissez-nous un avis' }
  };

  function updateLabels() {
    document.querySelectorAll('.label').forEach(el => {
      const key = el.getAttribute('data-key');
      if (translations[key]) {
        el.textContent = translations[key][currentLang];
      }
    });
  }

  function syncLanguageSwitchers() {
    langSwitchers.forEach(sw => {
      sw.classList.toggle('eng-active', currentLang === 'en');
      sw.classList.toggle('fra-active', currentLang === 'fr');
    });
  }

  const teaImage = document.getElementById('teaImage');
  const coffeeImage = document.getElementById('coffeeImage');
  const foodMenuEn = document.getElementById('foodMenuEn');
  const foodMenuFr = document.getElementById('foodMenuFr');

  const teaImages = {
    en: 'Assets/menus/tea-eng.png',
    fr: 'Assets/menus/tea-fra.png'
  };

  const coffeeImages = {
    en: 'Assets/menus/coffee-eng.png',
    fr: 'Assets/menus/coffee-fra.png'
  };

  const foodMenus = {
    en: `
      <h3>Breakfast Sandwich <span class="price">$12</span></h3>
      <p>brioche bun, smoked cheddar cheese, vegan garlic mayo, avocado, sunny egg, pickled onion, micro-greens.</p>
      <p><strong>Option:</strong> Add bacon or sausage! ($)</p>

      <h3>Smash Burger <span class="price">$14</span></h3>
      <p>brioche bun, butter, two smash patties, onion, house burger sauce, house garlic dill pickles, cheddar cheese.</p>

      <h3>Classic French Toast <span class="price">$17</span></h3>
      <p>french toast with cinnamon sugar, seasonal compote, fresh berries and maple syrup.</p>

      <h3>Staff Meal <span class="price">$22</span></h3>
      <p>two eggs sunnyside, seasonal salad, avocado, country bread with herby cream cheese, bacon.</p>

      <h3>Deli Sandwich <span class="price">$16</span></h3>
      <p>ciabatta, smoked turkey, salami, capocollo ham, provolone, vegan garlic mayo, dijon mustard, banana pepper, micro-greens.</p>

      <h3>Veggie Sandwich <span class="price">$14</span></h3>
      <p>ciabatta, smoked cheddar cheese, vegan garlic mayo, avocado, chickpea salad, pickled onion, micro-greens.</p>

      <h3>Avocado Toast <span class="price">$17</span></h3>
      <p>country bread, vegan garlic mayo, avocado, cherry tomatoes, flaky salt, pepper, and basil oil.</p>
      <p><strong>Option:</strong> Add bacon and/or an egg! ($).</p>

      <h3>Palmier Poke Bowl <span class="price">$22</span></h3>
      <p>sticky rice, tuna, avocado, seasonal salad, spicy mayo. available vegan with chickpea salad.</p>

      <h3>Yogurt &amp; Granola <span class="price">$14</span></h3>
      <p>yogurt, granola, fresh fruit, seasonal compote, bruléed banana, maple syrup and a seedy sprinkle.</p>

      <h3>Chia <span class="price">$14</span></h3>
      <p>strawberry and matcha chia pudding, black pepper strawberry coulis, fresh berries, and shredded coconut.</p>

      <h2>À La Carte (Add)</h2>
      <dl>
        <dt>Salad</dt><dd>$10.00 or $6.00</dd>
        <dt>Bacon</dt><dd>$4.00 or $3.00</dd>
        <dt>House Made Turkey Sausage</dt><dd>$6.00 or $4.00</dd>
        <dt>Bread</dt><dd>$2.50</dd>
        <dt>Gluten Free Bread</dt><dd>$1.50</dd>
        <dt>Egg</dt><dd>$2.50 or $1.50</dd>
      </dl>
    `,
    fr: `
      <h3>Sandwich<br />Petit-Déjeuner <span class="price">$12</span></h3>
      <p>petit pain brioche, fromage cheddar fumé, mayo à l'ail végétalienne, avocat, oeuf miroir, oignons marinés, micro-pousses.</p>
      <p><strong>Option :</strong> Ajouter bacon ou saucisse! ($)</p>

      <h3>"Smash Burger" <span class="price">$14</span></h3>
      <p>pain brioché, beurre, deux boulettes smash, oignon, sauce maison, cornichons maison à l'ail et à l'aneth, cheddar.</p>

      <h3>Classique Pain Doré <span class="price">$17</span></h3>
      <p>pain doré avec sucre à la cannelle, compote de saison, baies fraîches, et sirop d'érable.</p>

      <h3>Le "Staff Meal" <span class="price">$22</span></h3>
      <p>deux oeufs miroirs, salade saisonnière, avocat, pain de campagne avec fromage à la crème aux herbes, bacon.</p>

      <h3>Sandwich Deli <span class="price">$16</span></h3>
      <p>ciabatta, dinde fumée, salami, jambon capocollo, fromage provolone, mayo à l'ail végétalienne, moutarde dijon, piments forts, micro-pousses.</p>

      <h3>Sandwich Végé <span class="price">$14</span></h3>
      <p>ciabatta, fromage cheddar fumé, mayo à l'ail végétalienne, avocat, salade de pois chiches, oignons marinés, micro-pousses.</p>

      <h3>"Toast" Avocat <span class="price">$17</span></h3>
      <p>pain de campagne, mayo à l'ail végétalienne, avocat, tomates cerises, sel, poivre et huile de basilic.</p>
      <p><strong>Option :</strong> Ajouter bacon et/ou un oeuf! ($).</p>

      <h3>Bol Poke Palmier <span class="price">$22</span></h3>
      <p>riz sushi, thon, avocat, salade saisonnière, mayo épicé. *option végétalienne avec salade de pois chiches.</p>

      <h3>Yogourt &amp; Granola <span class="price">$14</span></h3>
      <p>yogourt, granola, fruits frais, compote de saison, banane brulée, sirop d'érable, et mélange de grains.</p>

      <h3>Chia <span class="price">$14</span></h3>
      <p>pudding aux fraises et au chia matcha, coulis de fraises au poivre noir, baies fraîches et noix de coco râpée.</p>

      <h2>À La Carte (Ajouter)</h2>
      <dl>
        <dt>Salade</dt><dd>$10.00 ou $6.00</dd>
        <dt>Bacon</dt><dd>$4.00 ou $3.00</dd>
        <dt>Saucisse de dinde faite maison</dt><dd>$6.00 ou $4.00</dd>
        <dt>Pain</dt><dd>$2.50</dd>
        <dt>Pain sans gluten</dt><dd>$1.50</dd>
        <dt>Oeuf</dt><dd>$2.50 ou $1.50</dd>
      </dl>
    `
  };

  function setTeaImage() {
    if (!teaImage) return;
    const src = teaImages[currentLang] || teaImages.en;
    teaImage.src = src;
    teaImage.alt = currentLang === 'en' ? 'Tea menu (English)' : 'Menu de thé (français)';
  }

  function setCoffeeImage() {
    if (!coffeeImage) return;
    const src = coffeeImages[currentLang] || coffeeImages.en;
    coffeeImage.src = src;
    coffeeImage.alt = currentLang === 'en' ? 'Coffee menu (English)' : 'Menu de café (français)';
  }

  function setFoodMenu() {
    if (!foodMenuEn || !foodMenuFr) return;
    foodMenuEn.innerHTML = foodMenus.en;
    foodMenuFr.innerHTML = foodMenus.fr;
    foodMenuEn.hidden = currentLang !== 'en';
    foodMenuFr.hidden = currentLang !== 'fr';
  }

  function setLanguage(lang) {
    currentLang = lang;
    syncLanguageSwitchers();
    updateLabels();
    setTeaImage();
    setCoffeeImage();
    setFoodMenu();
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'en' ? 'fr' : 'en');
  }

  langSwitchers.forEach(sw => {
    sw.addEventListener('click', (event) => {
      event.preventDefault();
      toggleLanguage();
    });
  });

  const pressReleaseTimers = new Map();
  const DEFAULT_PRESS_RELEASE_DELAY = 220;
  const TRANSITION_PRESS_RELEASE_DELAY = 600;
  const PAGE_TRANSITION_DELAY = 110;

  function registerPressed(el) {
    if (!el) return;
    clearTimeout(pressReleaseTimers.get(el));
    el.classList.add('pressed');
  }

  function schedulePressedRelease(el, delay = DEFAULT_PRESS_RELEASE_DELAY) {
    if (!el) return;
    clearTimeout(pressReleaseTimers.get(el));
    const timer = window.setTimeout(() => {
      el.classList.remove('pressed');
      pressReleaseTimers.delete(el);
    }, delay);
    pressReleaseTimers.set(el, timer);
  }

  function forcePressedRelease(el) {
    if (!el) return;
    clearTimeout(pressReleaseTimers.get(el));
    pressReleaseTimers.delete(el);
    el.classList.remove('pressed');
  }

  function holdPressedDuringTransition(el, delay = TRANSITION_PRESS_RELEASE_DELAY) {
    if (!el) return;
    schedulePressedRelease(el, delay);
  }

  function runAfterPressVisual(callback, delay = PAGE_TRANSITION_DELAY) {
    if (delay <= 0) {
      callback();
      return;
    }

    const start = performance.now();
    function tick() {
      const elapsed = performance.now() - start;
      if (elapsed >= delay) {
        callback();
      } else {
        window.requestAnimationFrame(tick);
      }
    }

    window.requestAnimationFrame(tick);
  }

  function setupPressEffects() {
    const pressTargets = document.querySelectorAll('.social-btn, .tile, .large-button, .review-card, .back-button, .nav-btn, .shelf-card');

    pressTargets.forEach(el => {
      if (window.PointerEvent) {
        el.addEventListener('pointerdown', (event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) return;
          registerPressed(el);
        });
        el.addEventListener('pointerup', (event) => {
          const delay = event.pointerType === 'mouse'
            ? DEFAULT_PRESS_RELEASE_DELAY
            : TRANSITION_PRESS_RELEASE_DELAY;
          schedulePressedRelease(el, delay);
        });
        el.addEventListener('pointercancel', (event) => {
          if (event.pointerType === 'mouse') {
            forcePressedRelease(el);
          } else {
            schedulePressedRelease(el, TRANSITION_PRESS_RELEASE_DELAY);
          }
        });
        el.addEventListener('pointerleave', (event) => {
          if (event.pointerType === 'mouse') {
            forcePressedRelease(el);
          }
        });
      } else {
        el.addEventListener('touchstart', () => registerPressed(el));
        el.addEventListener('mousedown', (event) => {
          if (event.button !== 0) return;
          registerPressed(el);
        });
        el.addEventListener('touchend', () => schedulePressedRelease(el));
        el.addEventListener('touchcancel', () => forcePressedRelease(el));
        el.addEventListener('mouseup', () => schedulePressedRelease(el));
        el.addEventListener('mouseleave', () => forcePressedRelease(el));
      }
    });
  }
  setupPressEffects();

  const homePage = document.getElementById('homePage');
  const foodPage = document.getElementById('foodPage');
  const teaPage = document.getElementById('teaPage');
  const coffeePage = document.getElementById('coffeePage');
  const cocktailsPage = document.getElementById('cocktailsPage');
  const shelfPage = document.getElementById('shelfPage');

  const foodBtn = document.getElementById('foodBtn');
  const teaBtn = document.getElementById('teaBtn');
  const coffeeBtn = document.getElementById('coffeeBtn');
  const cocktailsBtn = document.getElementById('cocktailsBtn');
  const shelfBtn = document.getElementById('shelfBtn');
  const reviewBtn = document.getElementById('reviewBtn');

  const backFoodBtn = document.getElementById('backHome');
  const backTeaBtn = document.getElementById('backTea');
  const backCoffeeBtn = document.getElementById('backCoffee');
  const backCocktailsBtn = document.getElementById('backCocktails');
  const backShelfBtn = document.getElementById('backShelf');

  function clearPressed() {
    pressReleaseTimers.forEach(timer => clearTimeout(timer));
    pressReleaseTimers.clear();
    document.querySelectorAll('.pressed').forEach(el => el.classList.remove('pressed'));
  }

  function hideAllPages() {
    [foodPage, teaPage, coffeePage, cocktailsPage, shelfPage].forEach(page => {
      if (page) {
        page.classList.remove('show');
        page.style.display = 'none';
      }
    });
  }

  function showPage(page) {
    if (!page) return;
    page.style.display = 'block';
    requestAnimationFrame(() => page.classList.add('show'));
  }

  function prepareTriggerForTransition(event) {
    const trigger = event?.currentTarget;
    if (trigger) {
      if (!trigger.classList.contains('pressed')) {
        registerPressed(trigger);
      }
      holdPressedDuringTransition(trigger);
    }
    return trigger;
  }

  function openFoodPage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      hideAllPages();
      setFoodMenu();
      showPage(foodPage);
      homePage.style.display = 'none';
      if (mainLangSwitcher) mainLangSwitcher.style.display = '';
    });
  }

  function closeFoodPage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      if (!foodPage) return;
      foodPage.classList.remove('show');
      setTimeout(() => {
        if (foodPage) foodPage.style.display = 'none';
        homePage.style.display = 'block';
        if (mainLangSwitcher) mainLangSwitcher.style.display = '';
        clearPressed();
      }, 400);
    });
  }

  function openTeaPage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      hideAllPages();
      setTeaImage();
      showPage(teaPage);
      homePage.style.display = 'none';
      if (mainLangSwitcher) mainLangSwitcher.style.display = 'none';
      syncLanguageSwitchers();
    });
  }

  function closeTeaPage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      if (!teaPage) return;
      teaPage.classList.remove('show');
      setTimeout(() => {
        if (teaPage) teaPage.style.display = 'none';
        homePage.style.display = 'block';
        if (mainLangSwitcher) mainLangSwitcher.style.display = '';
        clearPressed();
      }, 400);
    });
  }

  function openCoffeePage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      hideAllPages();
      setCoffeeImage();
      showPage(coffeePage);
      homePage.style.display = 'none';
      if (mainLangSwitcher) mainLangSwitcher.style.display = 'none';
      syncLanguageSwitchers();
    });
  }

  function closeCoffeePage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      if (!coffeePage) return;
      coffeePage.classList.remove('show');
      setTimeout(() => {
        if (coffeePage) coffeePage.style.display = 'none';
        homePage.style.display = 'block';
        if (mainLangSwitcher) mainLangSwitcher.style.display = '';
        clearPressed();
      }, 400);
    });
  }

  function openCocktailsPage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      hideAllPages();
      showPage(cocktailsPage);
      homePage.style.display = 'none';
      if (mainLangSwitcher) mainLangSwitcher.style.display = 'none';
    });
  }

  function closeCocktailsPage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      if (!cocktailsPage) return;
      cocktailsPage.classList.remove('show');
      setTimeout(() => {
        if (cocktailsPage) cocktailsPage.style.display = 'none';
        homePage.style.display = 'block';
        if (mainLangSwitcher) mainLangSwitcher.style.display = '';
        clearPressed();
      }, 400);
    });
  }

  function openShelfPage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      hideAllPages();
      showPage(shelfPage);
      homePage.style.display = 'none';
      if (mainLangSwitcher) mainLangSwitcher.style.display = '';
    });
  }

  function closeShelfPage(event) {
    prepareTriggerForTransition(event);
    runAfterPressVisual(() => {
      if (!shelfPage) return;
      shelfPage.classList.remove('show');
      setTimeout(() => {
        if (shelfPage) shelfPage.style.display = 'none';
        homePage.style.display = 'block';
        if (mainLangSwitcher) mainLangSwitcher.style.display = '';
        clearPressed();
      }, 400);
    });
  }

  if (foodBtn) foodBtn.addEventListener('click', openFoodPage);
  if (backFoodBtn) backFoodBtn.addEventListener('click', closeFoodPage);

  if (teaBtn) teaBtn.addEventListener('click', openTeaPage);
  if (backTeaBtn) backTeaBtn.addEventListener('click', closeTeaPage);

  if (coffeeBtn) coffeeBtn.addEventListener('click', openCoffeePage);
  if (backCoffeeBtn) backCoffeeBtn.addEventListener('click', closeCoffeePage);

  if (cocktailsBtn) cocktailsBtn.addEventListener('click', openCocktailsPage);
  if (backCocktailsBtn) backCocktailsBtn.addEventListener('click', closeCocktailsPage);

  if (shelfBtn) shelfBtn.addEventListener('click', openShelfPage);
  if (backShelfBtn) backShelfBtn.addEventListener('click', closeShelfPage);

  const REVIEW_URL = 'https://www.google.com/search?sca_esv=f60ecab60e0aa489&sxsrf=AE3TifOqxmle3mCawmW8QMBLC3AjyoMUhg:1761669360921&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E8q7DkqADv5wRTdBpYumF5gqCEfO6tp_bZRoBSIm_7g3w6n0sxuVia957VyiU3Lyx1bNyMTgKWSmBKbTs44Z0-tiwanV&q=Palmier+Reviews&sa=X&ved=2ahUKEwiYr-DjqceQAxXmFjQIHeLbDtkQ0bkNegQILhAD&biw=1457&bih=817&dpr=2';
  function openReview() {
    window.open(REVIEW_URL, '_blank', 'noopener,noreferrer');
  }
  if (reviewBtn) {
    reviewBtn.addEventListener('click', openReview);
    reviewBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openReview();
      }
    });
  }

  setLanguage('en');
});
