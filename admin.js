/* =========================================================
   ExamPro — Admin Panel JS
   ========================================================= */

/* ---------- THEME ---------- */
(function initTheme() {
  const saved = localStorage.getItem('exampro-admin-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.setAttribute('data-theme', 'dark');
})();

function bindAdminThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('exampro-admin-theme', next);
  });
}

/* ---------- SIDEBAR (mobile) ---------- */
function bindAdminSidebar() {
  const btn = document.getElementById('adminMenuBtn');
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('adminBackdrop');
  if (!btn || !sidebar) return;

  const close = () => {
    sidebar.classList.remove('open');
    backdrop?.classList.remove('show');
  };
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    backdrop?.classList.toggle('show');
  });
  backdrop?.addEventListener('click', close);
  sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

/* ---------- ACTIVE NAV ---------- */
function highlightAdminNav() {
  const path = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.admin-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href.endsWith(path));
  });
}

/* ---------- AUTH GUARD ---------- */
function requireAdmin() {
  const admin = localStorage.getItem('exampro-admin');
  if (!admin) {
    window.location.href = 'index.html';
    return null;
  }
  try { return JSON.parse(admin); } catch { return null; }
}

function setAdminSession(user) {
  localStorage.setItem('exampro-admin', JSON.stringify(user));
}
function clearAdminSession() {
  localStorage.removeItem('exampro-admin');
}

/* ---------- DEMO DATA ---------- */
const ADMIN_USERS = [
  { id: 1, name: 'Rahul Singh',    email: 'rahul@example.com',  target: 'SSC CGL',    status: 'active',  joined: '2026-01-12' },
  { id: 2, name: 'Neha Kumari',    email: 'neha@example.com',   target: 'RRB NTPC',   status: 'active',  joined: '2026-01-10' },
  { id: 3, name: 'Amit Patel',     email: 'amit@example.com',   target: 'BPSC CCE',   status: 'pending', joined: '2026-01-08' },
  { id: 4, name: 'Priya Sharma',   email: 'priya@example.com',  target: 'SSC CHSL',   status: 'active',  joined: '2026-01-05' },
  { id: 5, name: 'Vikram Yadav',   email: 'vikram@example.com', target: 'Banking',    status: 'blocked', joined: '2025-12-28' },
  { id: 6, name: 'Sunita Devi',    email: 'sunita@example.com', target: 'Bihar Police',status:'active',  joined: '2025-12-20' },
];

const ADMIN_EXAMS = [
  { id: 1, code: 'CGL',  name: 'SSC CGL',           category: 'SSC',     tests: 4, questions: 320, status: 'published' },
  { id: 2, code: 'CHSL', name: 'SSC CHSL',          category: 'SSC',     tests: 2, questions: 150, status: 'published' },
  { id: 3, code: 'MTS',  name: 'SSC MTS',           category: 'SSC',     tests: 3, questions: 200, status: 'published' },
  { id: 4, code: 'NTPC', name: 'RRB NTPC',          category: 'Railway', tests: 5, questions: 400, status: 'published' },
  { id: 5, code: 'BPSC', name: 'BPSC CCE',          category: 'Bihar',   tests: 2, questions: 180, status: 'draft' },
  { id: 6, code: 'BANK', name: 'Banking (IBPS/SBI)',category: 'Other',   tests: 0, questions: 0,   status: 'draft' },
];

const ADMIN_QUESTIONS = [
  { id: 1, exam: 'SSC CGL', subject: 'Mathematics', difficulty: 'Easy',   status: 'published', text: 'If a train travels 240 km in 3 hours, what is its average speed?' },
  { id: 2, exam: 'SSC CGL', subject: 'Reasoning',   difficulty: 'Medium', status: 'published', text: 'Find the next number: 2, 6, 12, 20, 30, ?' },
  { id: 3, exam: 'SSC CGL', subject: 'English',     difficulty: 'Easy',   status: 'published', text: 'Choose the correct synonym of "abundant".' },
  { id: 4, exam: 'RRB NTPC', subject: 'GK',         difficulty: 'Medium', status: 'draft',     text: 'Who wrote the Indian National Anthem?' },
  { id: 5, exam: 'SSC CGL', subject: 'Mathematics', difficulty: 'Hard',   status: 'published', text: 'Solve: 15% of 400 + 25% of 200 = ?' },
];

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  bindAdminThemeToggle();
  bindAdminSidebar();
  highlightAdminNav();
});