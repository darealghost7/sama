/* Shared header, footer, cart drawer and contact blocks, built from js/config.js. Same markup the old server rendered. */
(() => {
  'use strict';
  const C = window.SAMAROSE_CONFIG || {};
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slot = (l) => `<span class="slot">[Add ${esc(l)}]</span>`;
  const nl = (t) => esc(t).replace(/\n/g, '<br>');
  const waLink = () => (C.whatsapp ? `https://wa.me/${String(C.whatsapp).replace(/\D/g, '')}` : '');

  const ICON = {
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  };

  function contactBlock() {
    const row = (l, h) => `<div class="kv"><dt>${l}</dt><dd>${h}</dd></div>`;
    return '<dl class="contact-list">'
      + row('Phone', C.phone ? `<a class="link" href="tel:${esc(C.phone.replace(/[^\d+]/g, ''))}">${esc(C.phone)}</a>` : slot('phone number'))
      + row('Email', C.email ? `<a class="link" href="mailto:${esc(C.email)}">${esc(C.email)}</a>` : slot('email address'))
      + row('WhatsApp', C.whatsapp ? `<a class="link" href="${esc(waLink())}" rel="noopener">Chat on WhatsApp</a>` : slot('WhatsApp number'))
      + row('Shop address', C.address ? nl(C.address) : slot('shop address'))
      + row('Opening hours', C.hours ? nl(C.hours) : slot('opening hours'))
      + '</dl>';
  }
  function socials() {
    const items = [['facebook', 'Facebook'], ['instagram', 'Instagram'], ['tiktok', 'TikTok']];
    return '<ul class="socials">' + items.map(([k, n]) => `<li>${C[k] ? `<a class="link" href="${esc(C[k])}" target="_blank" rel="noopener noreferrer">${n}</a>` : slot(n + ' link')}</li>`).join('') + '</ul>';
  }

  const NAV = [['index.html', 'home', 'Home'], ['shop.html', 'shop', 'Shop'], ['about.html', 'about', 'About'], ['contact.html', 'contact', 'Contact']];
  const here = document.body.dataset.page;
  const header = () => {
    const links = (cls) => NAV.map(([h, k, l]) => `<a class="${cls}" href="${h}"${k === here ? ' aria-current="page"' : ''}>${l}</a>`).join('');
    return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header" id="top"><div class="wrap bar">
<div class="left"><button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu" data-menu>${ICON.menu}</button><nav class="nav" aria-label="Main">${links('link')}</nav></div>
<a class="brand" href="index.html">${esc(C.shop_name)}</a>
<div class="tools"><a class="icon-btn" href="shop.html#search" aria-label="Search products">${ICON.search}</a><button class="icon-btn" type="button" aria-label="Open cart" data-cart-open>${ICON.bag}<span class="count" data-cart-count hidden>0</span></button></div>
</div><nav class="menu" id="menu" aria-label="Mobile">${links('menu-link')}</nav></header>`;
  };
  const footer = () => `<footer class="site-footer"><div class="wrap foot">
<div><p class="brand sm">${esc(C.shop_name)}</p><p class="muted">Fresh vegetables, beans, rice and more.</p>${socials()}</div>
<div><p class="foot-h">Shop</p><ul class="foot-links"><li><a class="link" href="shop.html">Shop</a></li><li><a class="link" href="about.html">About</a></li><li><a class="link" href="contact.html">Contact</a></li></ul>
<p class="foot-h">Policies</p><ul class="foot-links"><li><a class="link" href="privacy.html">Privacy Policy</a></li><li><a class="link" href="terms.html">Terms and Conditions</a></li><li><a class="link" href="returns.html">Returns and Refund Policy</a></li><li><a class="link" href="delivery.html">Delivery Policy</a></li></ul></div>
<div><p class="foot-h">Contact</p>${contactBlock()}</div>
</div><div class="wrap legal"><span>&copy; ${new Date().getFullYear()} ${esc(C.shop_name)}. Prices in South African Rand (ZAR).</span><span>Website by Darealtech</span></div></footer>
<div class="scrim" data-cart-close></div>
<aside class="drawer" id="cart" aria-label="Shopping cart" aria-hidden="true"><div class="drawer-head"><p class="drawer-title">Your cart</p><button class="icon-btn" type="button" aria-label="Close cart" data-cart-close>${ICON.close}</button></div>
<div class="drawer-body" id="cart-body"></div><div class="drawer-foot" id="cart-foot"></div></aside>`;

  const put = (id, html) => { const el = document.getElementById(id); if (el) el.outerHTML = html; };
  put('site-header', header());
  put('site-footer', footer());

  /* Page placeholders that used to be filled in on the server. */
  document.querySelectorAll('[data-contact]').forEach((el) => el.outerHTML = contactBlock());
  document.querySelectorAll('[data-wa]').forEach((el) => { el.outerHTML = C.whatsapp ? `<a class="btn" href="${esc(waLink())}" rel="noopener">Message us on WhatsApp</a>` : ''; });
  document.querySelectorAll('[data-collection-addr]').forEach((el) => { el.innerHTML = C.collection_address ? nl(C.collection_address) : '<span class="slot">[Add collection address in js/config.js]</span>'; });

  window.SR_LAYOUT = { esc, waLink };
})();
