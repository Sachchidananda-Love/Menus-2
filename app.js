/* Global language + nav + PDF paging */

const state = {
  lang: localStorage.getItem('palmier-lang') || 'eng', // 'eng' | 'fra'
  currentView: 'home',
  pdf: {
    file: 'Assets/menus/evening.pdf', // change to morning.pdf when needed
    page: 1,
    pages: 2 // adjust if your PDF has different count
  }
};

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

function setLang(lang){
  state.lang = lang;
  localStorage.setItem('palmier-lang', lang);

  const t = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(n=>{
    const k = n.getAttribute('data-i18n');
    if(t[k]) n.textContent = t[k];
  });

  // pill visuals
  [langToggle, langToggleHome].forEach(p=>{
    if(!p) return;
    p.classList.remove('eng','fra'); p.classList.add(lang);
  });

  // swap menu images
  document.getElementById('teaImage').src =
    lang==='fra' ? 'Assets/menus/tea-fra.png' : 'Assets/menus/tea-eng.png';
  document.getElementById('coffeeImage').src =
    lang==='fra' ? 'Assets/menus/coffee-fra.png' : 'Assets/menus/coffee-eng.png';
}

function showTopbar(show){
  if(show) topbar.classList.add('show');
  else topbar.classList.remove('show');
}

let animLock = false;
function nav(to, {fromLeft=false}={}){
  if(animLock || !views[to]) return;
  animLock = true;

  const from = views[state.currentView];
  const incoming = views[to];

  incoming.classList.add('active');
  incoming.style.transform = `translateX(${fromLeft ? '-100%' : '100%'})`;
  incoming.style.opacity = 0;

  requestAnimationFrame(()=>{
    from.style.transform = `translateX(${fromLeft ? '100%' : '-100%'})`;
    from.style.opacity = 0;

    incoming.style.transform = `translateX(0)`;
    incoming.style.opacity = 1;

    setTimeout(()=>{
      from.classList.remove('active');
      from.style.transform = ''; from.style.opacity = '';
      state.currentView = to;
      showTopbar(to !== 'home');
      animLock = false;
    }, 250);
  });
}

// Hook up home buttons
document.querySelectorAll('[data-nav]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = btn.getAttribute('data-nav');
    nav(target, {fromLeft:false}); // slide in from right
  });
});

// Back always returns home from left
backBtn.addEventListener('click', ()=> nav('home', {fromLeft:true}) );

// Language toggles
function toggleLang(){ setLang(state.lang==='eng' ? 'fra' : 'eng'); }
langToggle.addEventListener('click', toggleLang);
langToggleHome.addEventListener('click', toggleLang);

// FOOD PDF
const foodIframe = document.getElementById('foodPdf');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');

function loadPdf(page=1){
  state.pdf.page = page;
  foodIframe.src = `${state.pdf.file}#page=${page}&zoom=auto,-16,0`;
  pageIndicator.textContent = `${state.pdf.page}/${state.pdf.pages}`;
}
prevPage.addEventListener('click', ()=> loadPdf(Math.max(1, state.pdf.page-1)) );
nextPage.addEventListener('click', ()=> loadPdf(Math.min(state.pdf.pages, state.pdf.page+1)) );

// Init
setLang(state.lang);
showTopbar(false);
loadPdf(1);
