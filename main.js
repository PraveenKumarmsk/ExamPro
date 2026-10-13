/* =======================================================
   ExamPro — shared JS
   ======================================================= */

/* ---------- THEME ---------- */
(function initTheme() {
  const saved = localStorage.getItem('exampro-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.setAttribute('data-theme', 'dark');
})();

function bindThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('exampro-theme', next);
  });
}

/* ---------- MOBILE MENU ---------- */
function bindMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const primaryNav = document.getElementById('primaryNav');
  if (!menuBtn || !primaryNav) return;
  menuBtn.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- YEAR ---------- */
function bindYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

/* ---------- SMOOTH ANCHORS ---------- */
function bindSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length <= 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ---------- HEADER SEARCH ---------- */
function bindHeaderSearch() {
  const input = document.getElementById('headerSearch');
  if (!input) return;
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const q = input.value.trim();
      window.location.href = q ? `exams.html?q=${encodeURIComponent(q)}` : 'exams.html';
    }
  });
}

/* ---------- FORM VALIDATION HELPERS ---------- */
function showError(inputEl, msg) {
  const err = inputEl.parentElement.querySelector('.form-error');
  if (err) {
    err.textContent = msg;
    err.classList.add('show');
  }
}
function clearError(inputEl) {
  const err = inputEl.parentElement.querySelector('.form-error');
  if (err) err.classList.remove('show');
}
function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/* ---------- AUTH DEMO (localStorage only, NOT secure) ---------- */
function saveUser(user) {
  localStorage.setItem('exampro-user', JSON.stringify(user));
}
function getUser() {
  try { return JSON.parse(localStorage.getItem('exampro-user') || 'null'); }
  catch { return null; }
}
function logout() {
  localStorage.removeItem('exampro-user');
  window.location.href = 'index.html';
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  bindThemeToggle();
  bindMenu();
  bindYear();
  bindSmoothAnchors();
  bindHeaderSearch();
});
