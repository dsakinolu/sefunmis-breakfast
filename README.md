# 🥯 Sefunmi's Breakfast

**Live demo:** https://dsakinolu.github.io/sefunmis-breakfast/ 📲 Installable: open the site on your phone and choose "Add to Home Screen."

A bakery storefront with a fully working shopping experience — browse the menu,
fill a cart, check out as a customer, review order history, and manage the
shop's items and customers. Everything runs 100% in the browser.

Originally built as a **Python/Flask CRUD application** for INFO-I 211 at
Indiana University (with CSV data storage and a pytest test suite), then
rebuilt as a fully client-side app so it can be hosted anywhere as a live demo.

---

## ✨ Features

### 🛍️ Shop
- Product grid with photos, playful price tags, and category filter chips
  (Bagels, Donuts, Muffins, Pretzels, Pizza, Pies, Sides, Spreads)
- One-tap **Add to cart** with toast notifications and a live cart badge

### 🧺 Cart & Checkout
- Quantity controls, per-line subtotals, live total
- Checkout as an existing customer **or create a new customer inline**
- Placing an order generates a real order number and moves it into history

### 🧾 Order History
- Expandable order cards showing customer, date, line items, and totals
- Freshly placed orders are highlighted at the top

### ⚙️ Shop Management
- Full **add / edit / delete** for menu items (name, price, category)
- Full **add / edit / delete** for customers (name, email, phone)
- **Reset demo data** button restores the original menu and customers

### 🎨 Design
- Warm bakery design system with steam animation, swinging price tags,
  and hand-drawn SVG illustrations for items without photos
- **Day / evening theme toggle** — an upgrade of the original project's
  theme selector
- Fully responsive; respects the visitor's reduced-motion setting

---

## 🛠️ How it works

| Original (Flask) | This rebuild |
|---|---|
| Python routes render Jinja templates | Vanilla JS renders each page |
| CSV files store items/customers/orders | `localStorage` acts as the database, seeded from the same CSV data |
| Server-side cart | Client-side cart with quantities |
| Runs on a Python server | Runs anywhere — it's just static files |

**Stack:** HTML5 · CSS3 · Vanilla JavaScript · localStorage — no frameworks, no build step.

```
index.html    Shop (filters + product grid)
cart.html     Cart + checkout
orders.html   Order history
manage.html   Items & customers admin
js/data.js    Seed data + localStorage layer
js/app.js     Theme, toasts, cart badge, SVG food art
```

## 💛 Credits

Product photos from the original I211 course assets. Built by
**Sefunmi Akin-Olukunle** — [portfolio](https://dsakinolu.github.io/portfolio/).
