// ===========================================================================
// Sefunmi's Breakfast — data layer

// ===========================================================================

const SEED_ITEMS = [
  { id: 1, name: "Chive Cream Cheese", cost: 3.39, cat: "Spreads", img: "images/chive-cream-cheese.jpg" },
  { id: 2, name: "Chocolate Donut", cost: 1.99, cat: "Donuts", img: "images/chocolate-donut.jpg" },
  { id: 3, name: "Cream Cheese", cost: 2.36, cat: "Spreads", img: "images/cream-cheese.jpg" },
  { id: 4, name: "Glazed Donut", cost: 1.48, cat: "Donuts", img: "images/glazed-donut.jpg" },
  { id: 5, name: "Poppy Seed Bagel", cost: 3.49, cat: "Bagels", img: "images/poppy-seed-bagel.jpg" },
  { id: 6, name: "Sesame Bagel", cost: 3.59, cat: "Bagels", img: "images/sesame-bagel.jpg" },
  { id: 7, name: "Strawberry Muffin", cost: 4.56, cat: "Muffins", art: "muffin-pink" },
  { id: 8, name: "Blueberry Muffin", cost: 4.76, cat: "Muffins", art: "muffin-blue" },
  { id: 9, name: "Salted Pretzel", cost: 1.00, cat: "Pretzels", art: "pretzel" },
  { id: 10, name: "Cinnamon Pretzel", cost: 1.50, cat: "Pretzels", art: "pretzel-cin" },
  { id: 11, name: "Cheese Pizza", cost: 8.00, cat: "Pizza", art: "pizza" },
  { id: 12, name: "Plain Pretzel", cost: 1.00, cat: "Pretzels", art: "pretzel" },
  { id: 13, name: "Pepperoni Pizza", cost: 10.20, cat: "Pizza", art: "pizza-pep" },
  { id: 14, name: "Fish Pie", cost: 19.99, cat: "Pies", art: "pie" },
  { id: 15, name: "Meat Pie", cost: 21.99, cat: "Pies", art: "pie" },
  { id: 16, name: "Spring Roll", cost: 2.15, cat: "Sides", art: "roll" },
  { id: 17, name: "Peach Bagel", cost: 5.00, cat: "Bagels", art: "bagel-peach" },
];

const SEED_CUSTOMERS = [
  { id: 1, name: "Bill Johnson", email: "bjohn5821@gmail.com", phone: "555-123-4567" },
  { id: 2, name: "Mary Smith", email: "msmitha@hotmail.com", phone: "585-234-5679" },
  { id: 3, name: "Jane Doe", email: "janedoe@icloudmail.com", phone: "317-345-6789" },
  { id: 4, name: "John Adams", email: "john.adams@uimail.org", phone: "555-456-7890" },
  { id: 5, name: "Susan Lee", email: "susan.lee@pennstate.edu", phone: "929-567-8901" },
  { id: 6, name: "Tom Richards", email: "tommyrich@iu.edu", phone: "555-678-9012" },
  { id: 7, name: "Lisa Brown", email: "lisa.brown@indiana.edu", phone: "505-789-0123" },
];

const SEED_ORDERS = [
  {
    id: 1081, customer: "Bill Johnson", date: "2026-08-02",
    lines: [{ name: "Chive Cream Cheese", cost: 3.39, qty: 1 }, { name: "Chocolate Donut", cost: 1.99, qty: 1 }, { name: "Poppy Seed Bagel", cost: 3.49, qty: 1 }]
  },
  {
    id: 1003, customer: "Jane Doe", date: "2026-08-05",
    lines: [{ name: "Cream Cheese", cost: 2.36, qty: 1 }, { name: "Poppy Seed Bagel", cost: 3.49, qty: 1 }, { name: "Chocolate Donut", cost: 1.99, qty: 1 }]
  },
  {
    id: 1074, customer: "John Adams", date: "2026-08-09",
    lines: [{ name: "Glazed Donut", cost: 1.48, qty: 2 }]
  },
];

// ---------------------------------------------------------------------------
// Store: tiny localStorage wrapper
// ---------------------------------------------------------------------------
const Store = {
  load(key, seed) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* fall through to seed */ }
    const copy = JSON.parse(JSON.stringify(seed));
    this.save(key, copy);
    return copy;
  },
  save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage may be unavailable */ }
  },

  getItems() { return this.load("sb_items", SEED_ITEMS); },
  setItems(v) { this.save("sb_items", v); },
  getCustomers() { return this.load("sb_customers", SEED_CUSTOMERS); },
  setCustomers(v) { this.save("sb_customers", v); },
  getOrders() { return this.load("sb_orders", SEED_ORDERS); },
  setOrders(v) { this.save("sb_orders", v); },
  getCart() { return this.load("sb_cart", {}); },       // { itemId: qty }
  setCart(v) { this.save("sb_cart", v); },

  cartCount() {
    const cart = this.getCart();
    return Object.values(cart).reduce((a, b) => a + b, 0);
  },

  addToCart(id) {
    const cart = this.getCart();
    cart[id] = (cart[id] || 0) + 1;
    this.setCart(cart);
  },

  reset() {
    ["sb_items", "sb_customers", "sb_orders", "sb_cart"].forEach((k) => localStorage.removeItem(k));
  },
};

const money = (n) => "$" + n.toFixed(2);
