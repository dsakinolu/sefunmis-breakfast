// ===========================================================================
// nav, cart badge, theme toggle, toast, food illustrations
// ===========================================================================

// Mobile nav
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

// Cart badge
function refreshCartBadge() {
  const el = document.getElementById("cart-badge");
  if (el) el.textContent = Store.cartCount();
}
refreshCartBadge();

// Theme toggle (day ☀️ / evening 🌙) 
const themeBtn = document.getElementById("theme-btn");
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  if (themeBtn) themeBtn.textContent = t === "evening" ? "☀️" : "🌙";
  Store.save("sb_theme", t);
}
applyTheme(Store.load("sb_theme", "day"));
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") === "evening" ? "day" : "evening";
    applyTheme(cur);
  });
}

// Toast
let toastTimer;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

// ---------------------------------------------------------------------------
// Flat SVG illustrations for items without photos
// ---------------------------------------------------------------------------
function foodArt(kind) {
  const wrap = (inner, bg) =>
    `<svg viewBox="0 0 200 200" role="img" aria-hidden="true"><rect width="200" height="200" fill="${bg}"/>${inner}</svg>`;
  switch (kind) {
    case "muffin-pink":
      return wrap(`<path d="M55 105 h90 l-12 60 a8 8 0 0 1 -8 7 h-50 a8 8 0 0 1 -8 -7 z" fill="#c98d5a"/>
        <path d="M45 105 a55 42 0 0 1 110 0 z" fill="#f2a1b5"/>
        <circle cx="80" cy="82" r="4" fill="#d94f70"/><circle cx="112" cy="72" r="4" fill="#d94f70"/><circle cx="128" cy="92" r="4" fill="#d94f70"/>`, "#fdeee6");
    case "muffin-blue":
      return wrap(`<path d="M55 105 h90 l-12 60 a8 8 0 0 1 -8 7 h-50 a8 8 0 0 1 -8 -7 z" fill="#c98d5a"/>
        <path d="M45 105 a55 42 0 0 1 110 0 z" fill="#e8c98f"/>
        <circle cx="82" cy="80" r="5" fill="#4456a6"/><circle cx="110" cy="70" r="5" fill="#4456a6"/><circle cx="126" cy="92" r="5" fill="#4456a6"/><circle cx="95" cy="95" r="5" fill="#4456a6"/>`, "#eef1fb");
    case "pretzel":
      return wrap(`<path d="M100 55 c-34 0 -52 24 -52 46 c0 26 20 44 40 44 c14 0 20 -8 12 -18 l-22 -30 M100 55 c34 0 52 24 52 46 c0 26 -20 44 -40 44 c-14 0 -20 -8 -12 -18 l22 -30" fill="none" stroke="#b5713a" stroke-width="17" stroke-linecap="round"/>
        <circle cx="76" cy="70" r="2.6" fill="#fff"/><circle cx="124" cy="70" r="2.6" fill="#fff"/><circle cx="100" cy="120" r="2.6" fill="#fff"/><circle cx="62" cy="105" r="2.6" fill="#fff"/><circle cx="138" cy="105" r="2.6" fill="#fff"/>`, "#fdf3e0");
    case "pretzel-cin":
      return wrap(`<path d="M100 55 c-34 0 -52 24 -52 46 c0 26 20 44 40 44 c14 0 20 -8 12 -18 l-22 -30 M100 55 c34 0 52 24 52 46 c0 26 -20 44 -40 44 c-14 0 -20 -8 -12 -18 l22 -30" fill="none" stroke="#9c5a28" stroke-width="17" stroke-linecap="round"/>
        <g fill="#e8c98f"><rect x="72" y="66" width="8" height="3" rx="1.5" transform="rotate(20 76 67)"/><rect x="118" y="66" width="8" height="3" rx="1.5" transform="rotate(-15 122 67)"/><rect x="94" y="116" width="9" height="3" rx="1.5"/><rect x="60" y="100" width="8" height="3" rx="1.5" transform="rotate(30 64 101)"/><rect x="132" y="100" width="8" height="3" rx="1.5" transform="rotate(-25 136 101)"/></g>`, "#fbeedd");
    case "pizza":
      return wrap(`<circle cx="100" cy="100" r="62" fill="#e8a13c"/><circle cx="100" cy="100" r="52" fill="#f6c453"/>
        <g stroke="#e8762c" stroke-width="3"><line x1="100" y1="48" x2="100" y2="152"/><line x1="48" y1="100" x2="152" y2="100"/><line x1="63" y1="63" x2="137" y2="137"/><line x1="137" y1="63" x2="63" y2="137"/></g>`, "#fdf0dc");
    case "pizza-pep":
      return wrap(`<circle cx="100" cy="100" r="62" fill="#e8a13c"/><circle cx="100" cy="100" r="52" fill="#f6c453"/>
        <g fill="#c94f3d"><circle cx="84" cy="82" r="9"/><circle cx="120" cy="92" r="9"/><circle cx="95" cy="120" r="9"/><circle cx="126" cy="124" r="8"/><circle cx="70" cy="110" r="8"/></g>`, "#fdf0dc");
    case "pie":
      return wrap(`<path d="M40 105 h120 v10 a14 14 0 0 1 -14 14 h-92 a14 14 0 0 1 -14 -14 z" fill="#b5713a"/>
        <path d="M46 105 a58 34 0 0 1 108 0 z" fill="#d69a5b"/>
        <path d="M56 96 q10 -10 20 0 q10 -10 20 0 q10 -10 20 0 q10 -10 20 0" fill="none" stroke="#9c5a28" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="100" cy="60" rx="7" ry="10" fill="#fff" opacity="0.65"/>`, "#f7ead6");
    case "roll":
      return wrap(`<rect x="42" y="82" width="116" height="38" rx="19" fill="#e8c98f" transform="rotate(-12 100 100)"/>
        <rect x="42" y="82" width="116" height="38" rx="19" fill="none" stroke="#c98d5a" stroke-width="4" transform="rotate(-12 100 100)"/>
        <g stroke="#4c9a62" stroke-width="4" stroke-linecap="round"><line x1="66" y1="88" x2="72" y2="78"/><line x1="140" y1="118" x2="146" y2="108"/></g>`, "#eef7ee");
    case "bagel-peach":
      return wrap(`<circle cx="100" cy="100" r="55" fill="#f0b083"/><circle cx="100" cy="100" r="22" fill="#fdeee6"/>
        <path d="M60 78 a55 55 0 0 1 80 0" fill="none" stroke="#e8946a" stroke-width="10" stroke-linecap="round" opacity="0.7"/>`, "#fdf1e8");
    default:
      return wrap(`<circle cx="100" cy="100" r="55" fill="#d69a5b"/><circle cx="100" cy="100" r="20" fill="#fff6e9"/>`, "#f7ead6");
  }
}

function itemVisual(item) {
  return item.img
    ? `<img src="${item.img}" alt="${item.name}" loading="lazy">`
    : foodArt(item.art);
}
