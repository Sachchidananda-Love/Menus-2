/* COLORS ARE ALL IN CSS — palette restricted to 4 site colors */

/** State **/
const state = {
  lang: localStorage.getItem('palmier-lang') || 'eng', // 'eng' | 'fra'
  currentView: 'home',
  pdf: {
    file: '/Assets/menus/evening.pdf', // easy switch: change to '/Assets/menus/morning.pdf'
    page: 1,
    pages: 1
  }
};

/** Elements **/
const views = {
  home: document.getElementById('view-home'),
  food: document.getElementById('view-food'),
  tea: document.getElementById('view-tea'),
  cocktails: document.getElementById('view-cocktails'),
  coffee: document.getElementById('view-coffee'),
  beans: document.getElementById('view-beans')
};
const topbar = document.getElementById('topbar');
const backBtn = topbar.querySelector('.back-link');
const langToggle = document.getElementById('langToggle');
const langToggleHome = document.getElementById('langToggleHome');

const i18n = {
  eng: {
    back: 'Back',
    food: 'FOOD',
    tea: 'TEA',
    cocktails: 'COCKTAILS',
    coffee: 'COFFEE',
    discoverShelf: 'Discover our Coffee Shelf',
    leaveReview: 'Leave us a review'
  },
  fra: {
    back: 'Retour',
    food: 'NOURRITURE',
    tea: 'THÉS',
    cocktails: 'COCKTAILS',
    coffee: 'CAFÉ',
    discoverShelf: 'Découvrez notre étagère à café',
    leaveReview: 'Laissez-nous un avis'
  }
};

/** Helpers **/
function setLang(lang) {
  state.lang = lang;
  localStorage.setItem('palmier-lang', lang);
  const t = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  // Toggle visuals
  [langToggle, langToggleHome].forEach(tg => {
    if (!tg) return;
    tg.classList.remove('eng', 'fra');
    tg.classList.add(lang);
  });

  // swap images for Tea & Coffee
  document.getElementById('teaImage').src =
    lang === 'fra' ? '/Assets/menus/tea-fra.png' : '/Assets/menus/tea-eng.png';

  document.getElementById('coffeeImage').src =
    lang === 'fra' ? '/Assets/menus/coffee-fra.png' : '/Assets/menus/coffee-eng.png';
}

function showTopbar(show){
  if(show) topbar.classList.add('show');
  else topbar.classList.remove('show');
}

let animLock = false;
function nav(to, {fromLeft=false} = {}) {
  if (animLock || !views[to]) return;
  animLock = true;

  const from = views[state.currentView];
  const toView = views[to];

  // prepare incoming
  toView.classList.add('active');
  toView.style.transform = `translateX(${fromLeft?'-100%':'100%'})`;
  toView.style.opacity = 0;

  requestAnimationFrame(() => {
    // outgoing
    from.style.transform = `translateX(${fromLeft?'100%':'-100%'})`;
    from.style.opacity = 0;

    // incoming
    toView.style.transform = `translateX(0)`;
    toView.style.opacity = 1;

    setTimeout(() => {
      from.classList.remove('active');
      from.style.transform = '';
      from.style.opacity = '';
      state.currentView = to;

      showTopbar(to !== 'home');
      animLock = false;
    }, 250);
  });
}

/** Wire up buttons **/
document.querySelectorAll('[data-nav]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = btn.getAttribute('data-nav');
    // home → others slide from right
    nav(target, {fromLeft:false});
  });
});
backBtn.addEventListener('click', ()=>{
  // back always returns home, sliding from left
  nav('home', {fromLeft:true});
});

/** Language toggles **/
function toggleLang(){
  setLang(state.lang === 'eng' ? 'fra' : 'eng');
}
langToggle.addEventListener('click', toggleLang);
langToggleHome.addEventListener('click', toggleLang);

/** FOOD PDF viewer **/
const foodIframe = document.getElementById('foodPdf');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');

// If you switch morning/evening later, change state.pdf.file (or add a small UI)
function loadPdf(page=1){
  state.pdf.page = page;
  // Use #page= to display specific page — supported on most mobile browsers
  foodIframe.src = `${state.pdf.file}#page=${page}&zoom=auto,-16,0`;
  pageIndicator.textContent = `${state.pdf.page}/${state.pdf.pages}`;
}
// If you know the page count, set it here; we’ll default to 2 because your mock shows 1/2.
state.pdf.pages = 2; // adjust if needed
loadPdf(1);

prevPage.addEventListener('click', ()=>{
  const p = Math.max(1, state.pdf.page - 1);
  loadPdf(p);
});
nextPage.addEventListener('click', ()=>{
  const p = Math.min(state.pdf.pages, state.pdf.page + 1);
  loadPdf(p);
});

/** Init **/
setLang(state.lang);
showTopbar(false);
