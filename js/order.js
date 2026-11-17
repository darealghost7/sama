(async () => {
  const { $, esc, money, config } = SR;
  const root = $('#order'); if (!root) return;
  const CFG = window.SAMAROSE_CONFIG || {};
  const cfg = await config();

  /* The order travels in the page link (#o=...) and is also kept on this device, so it opens without a server. */
  const unb64 = (t) => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(t.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))));
  let o = null;
  try { const m = location.hash.match(/^#o=([\w-]+)/); if (m) o = unb64(m[1]); } catch { o = null; }
  if (!o) { try { const all = JSON.parse(localStorage.getItem('samarose.orders.v1') || '{}'), refs = Object.values(all); o = refs.length ? refs[refs.length - 1] : null; } catch { o = null; } }
  if (!o || !Array.isArray(o.items) || !o.ref) { root.innerHTML = '<p class="notice bad">We could not find that order. Open the link from the page you saw after checkout, or contact the shop.</p>'; return; }

  const n = (v) => Number(v) || 0;
  o.items = o.items.map((i) => ({ name: String(i.name), size: String(i.size || ''), unit_price_cents: n(i.unit_price_cents), qty: n(i.qty) }));
  const b = { name: CFG.bank_name, holder: CFG.bank_account_holder, number: CFG.bank_account_number, branch: CFG.bank_branch_code, type: CFG.bank_account_type, note: CFG.eft_note, email: CFG.email };
  const msg = ['Your order is placed. Please pay by EFT using the details below. We prepare it once your payment reflects in our account.', ''];
  const row = ([k, v]) => `<div class="kv"><dt>${esc(k)}</dt><dd>${v}</dd></div>`;
  const a = o.address || {};
  const addr = o.method === 'delivery' ? [a.street, a.suburb, a.city, a.province, a.postal_code].filter(Boolean).join(', ') : 'Collect from the shop';
  const when = new Date(o.created_at).toLocaleString('en-ZA');
  const bank = [['Bank', b.name], ['Account holder', b.holder], ['Account number', b.number], ['Branch code', b.branch], ['Account type', b.type], ['Amount to pay', money(n(o.total_cents))], ['Payment reference', o.ref]].filter(([, v]) => v);

  /* If no mail service is set up, the customer must send the order to the shop themselves. */
  const told = o.notified === true;
  const text = (told ? 'Hi, here is my proof of payment for order ' + o.ref + '.' : 'Hi, I would like to confirm my order. I will send my proof of payment here.') + '\n\n' + SR.orderText({ ...o, total_cents: n(o.total_cents), subtotal_cents: n(o.subtotal_cents), delivery_fee_cents: n(o.delivery_fee_cents) });
  const proofLinks = [
    cfg.whatsapp ? `<a class="btn" href="https://wa.me/${esc(cfg.whatsapp)}?text=${encodeURIComponent(text)}" rel="noopener">${told ? 'Send proof on WhatsApp' : 'Send my order on WhatsApp'}</a>` : '',
    b.email ? `<a class="btn btn-ghost" href="mailto:${esc(b.email)}?subject=${encodeURIComponent((told ? 'Proof of payment ' : 'Order ') + o.ref)}&body=${encodeURIComponent(text)}">${told ? 'Email proof of payment' : 'Email my order'}</a>` : '',
  ].join('');
  root.innerHTML = `<p class="notice ${msg[1]}">${esc(msg[0])}</p>
    ${told ? '' : '<p class="notice bad"><strong>One more step:</strong> please send your order to the shop using the WhatsApp or email button below so that we receive it.</p>'}
    <div class="panel"><p class="kvl">Pay by EFT</p><dl class="contact-list">${bank.map(([k, v]) => row([k, esc(v)])).join('')}</dl>
      <p class="muted"><strong>Use ${esc(o.ref)} as your payment reference</strong> so we can match your payment.${b.note ? ' ' + esc(b.note) : ''}</p><div class="actions">${proofLinks}</div></div>
    <div class="order-box"><dl class="contact-list">${[['Order number', esc(o.ref)], ['Placed', esc(when)], ['Order status', `<span class="badge">${esc(o.status || 'Pending')}</span>`], [o.method === 'delivery' ? 'Delivery to' : 'Collection', esc(addr)]].map(row).join('')}</dl>
    ${o.items.map((i) => `<div class="sline"><span>${i.qty} &times; ${esc(i.name)}${i.size ? `<small>${esc(i.size)}</small>` : ''}</span><span>${money(i.qty * i.unit_price_cents)}</span></div>`).join('')}
    <div class="tot"><span>Subtotal</span><span>${money(n(o.subtotal_cents))}</span></div>
    <div class="tot"><span>Delivery fee</span><span>${n(o.delivery_fee_cents) ? money(n(o.delivery_fee_cents)) : 'Free'}</span></div>
    <div class="tot big"><span>Total</span><span>${money(n(o.total_cents))}</span></div>
    <div class="actions"><a class="btn btn-ghost" href="shop.html">Continue shopping</a></div></div>`;
})();
