# Sama-R Shop (static version)

Plain HTML, CSS and JavaScript. No Node.js, npm, database or server. Same design, pages, products and images as the original.

## Folder layout

```
index.html shop.html about.html contact.html checkout.html order.html
privacy.html terms.html returns.html delivery.html 404.html   <- pages (at the top so the host finds index.html)
css/    site.css (design), theme.css (accent colour)
js/     config.js    shop settings: phone, address, bank details, delivery fee, mail service
        products.js  the product list
        layout.js    header, footer, cart drawer, contact blocks
        site.js      cart, product cards, shop search and sorting
        checkout.js  order.js  contact.js
assets/images/products/   product photos        assets/images/hero/   home page photo
.htaccess   HostAfrica (Apache) settings        vercel.json   Vercel settings
```

## Deploy on HostAfrica (cPanel)
1. cPanel > File Manager > `public_html`. Upload the **contents** of this folder (so `index.html` sits directly in `public_html`, plus the `css`, `js`, `assets` folders and `.htaccess`). Or upload the zip and Extract.
2. Turn on "Show hidden files" so you can see `.htaccess`.
3. Make sure SSL is active (cPanel > SSL/TLS Status > Run AutoSSL). `.htaccess` then forces HTTPS.

## Deploy on Vercel
Put the folder in a GitHub repo and import it at vercel.com (Framework: **Other**, no build command, output directory blank), or run `npx vercel` in this folder. `vercel.json` is already set up.

## Managing products (replaces Admin > Products)
Open `js/products.js` in a text editor. Each product is one block. To add one: copy a block, give it a new unique `id`, set `name`, `price_cents` (R140.00 = `14000`), `stock`, optional `category`, `sizes` and `description`, and put the photo in `assets/images/products/` and point `image` at it. Set `stock` to 0 for "Out of stock". Save, re-upload `js/products.js` and the new photo.
Tip: compress photos to WebP under about 300 KB each.

## Shop settings (replaces Admin > Settings)
Everything is in `js/config.js`: phone, email, WhatsApp, address, hours, social links, delivery fee, free-delivery threshold and bank details. Page text (About, Privacy, Terms, Returns, Delivery, home page wording) is edited directly in the matching `.html` file. The yellow `[ ... ]` markers are placeholders still to be filled in.
After changing the shop name, also update it in the HTML pages (it is written into the page text).

## How orders and messages reach you
A static site cannot receive data on its own, so choose one:
- **Recommended:** make a free form at formspree.io or web3forms.com and put its details in `forms` in `js/config.js`. Orders and contact messages are then emailed to you automatically.
- **Without a service (the default now):** after checkout the customer sees the EFT details and a **Send my order on WhatsApp / Email my order** button with the whole order pre-written. You only receive the order when they press send. The contact form opens the visitor's email app.

## What changed from the Node version
- Removed: Express server, SQLite database, admin panel, login, server-side order storage, Nodemailer, `package.json`, `.env`.
- The order page now opens from a link containing the order (`order.html#o=...`) and a copy kept on the customer's device. It no longer shows live status.
- You can no longer mark orders "Paid", and stock does not reduce automatically. Update `stock` in `js/products.js` when you sell items.
- Prices are calculated in the browser from `js/products.js`. Always check the EFT amount matches the order before you hand over goods.
- Bank details are in `js/config.js`, so they are visible to anyone who views the site's code (customers already see them after ordering).
