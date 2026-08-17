// ===========================================================================
// Cart — quantities, totals, checkout 
// ===========================================================================
(function () {
  const tableEl = document.getElementById("cart-table");
  if (!tableEl) return;
  const checkoutPanel = document.getElementById("checkout-panel");
  const custSel = document.getElementById("co-customer");

  function cartLines() {
    const cart = Store.getCart();
    const items = Store.getItems();
    return Object.entries(cart)
      .map(([id, qty]) => {
        const item = items.find((i) => String(i.id) === String(id));
        return item ? { item, qty } : null;
      })
      .filter(Boolean);
  }

  function render() {
    const lines = cartLines();
    if (!lines.length) {
      tableEl.innerHTML = `<div class="empty-state"><span class="big">🥯</span>Your cart is empty — the menu is calling! <br><a class="btn btn-primary small" style="margin-top:0.9rem" href="index.html">Back to the shop</a></div>`;
      checkoutPanel.hidden = true;
      return;
    }
    checkoutPanel.hidden = false;
    const total = lines.reduce((s, l) => s + l.item.cost * l.qty, 0);
    tableEl.innerHTML = `
      <table>
        <thead><tr><th></th><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th><th></th></tr></thead>
        <tbody>
          ${lines.map((l) => `
            <tr data-id="${l.item.id}">
              <td>${l.item.img ? `<img class="thumb" src="${l.item.img}" alt="">` : `<span class="thumb" style="display:inline-block">${foodArt(l.item.art)}</span>`}</td>
              <td><strong>${l.item.name}</strong></td>
              <td><span class="qty-ctl">
                <button type="button" class="q-minus" aria-label="One less">−</button>
                <strong>${l.qty}</strong>
                <button type="button" class="q-plus" aria-label="One more">+</button>
              </span></td>
              <td class="money">${money(l.item.cost)}</td>
              <td class="money">${money(l.item.cost * l.qty)}</td>
              <td><button class="btn btn-danger small q-remove" type="button">Remove</button></td>
            </tr>`).join("")}
          <tr class="total-row"><td></td><td>Total</td><td></td><td></td><td class="money">${money(total)}</td><td></td></tr>
        </tbody>
      </table>`;

    tableEl.querySelectorAll("tr[data-id]").forEach((row) => {
      const id = row.dataset.id;
      row.querySelector(".q-plus").addEventListener("click", () => changeQty(id, +1));
      row.querySelector(".q-minus").addEventListener("click", () => changeQty(id, -1));
      row.querySelector(".q-remove").addEventListener("click", () => { changeQty(id, -Infinity); });
    });
  }

  function changeQty(id, delta) {
    const cart = Store.getCart();
    cart[id] = (cart[id] || 0) + delta;
    if (!isFinite(cart[id]) || cart[id] <= 0) delete cart[id];
    Store.setCart(cart);
    refreshCartBadge();
    render();
  }

  function renderCustomers() {
    const customers = Store.getCustomers();
    custSel.innerHTML =
      customers.map((c) => `<option value="${c.id}">${c.name}</option>`).join("") +
      `<option value="__new">➕ New customer…</option>`;
  }
  custSel.addEventListener("change", () => {
    const isNew = custSel.value === "__new";
    ["co-name-field", "co-email-field", "co-phone-field"].forEach((f) =>
      (document.getElementById(f).hidden = !isNew));
  });

  document.getElementById("cart-clear").addEventListener("click", () => {
    Store.setCart({});
    refreshCartBadge();
    render();
    toast("Cart emptied");
  });

  document.getElementById("co-place").addEventListener("click", () => {
    const lines = cartLines();
    if (!lines.length) return;

    let customerName;
    if (custSel.value === "__new") {
      customerName = document.getElementById("co-name").value.trim();
      if (!customerName) { toast("Please enter the new customer's name"); return; }
      const customers = Store.getCustomers();
      customers.push({
        id: Math.max(0, ...customers.map((c) => c.id)) + 1,
        name: customerName,
        email: document.getElementById("co-email").value.trim(),
        phone: document.getElementById("co-phone").value.trim(),
      });
      Store.setCustomers(customers);
    } else {
      const c = Store.getCustomers().find((x) => String(x.id) === custSel.value);
      customerName = c ? c.name : "Guest";
    }

    const orders = Store.getOrders();
    const orderId = Math.max(1000, ...orders.map((o) => o.id)) + 1;
    orders.unshift({
      id: orderId,
      customer: customerName,
      date: new Date().toISOString().slice(0, 10),
      lines: lines.map((l) => ({ name: l.item.name, cost: l.item.cost, qty: l.qty })),
    });
    Store.setOrders(orders);
    Store.setCart({});
    location.href = "orders.html?placed=" + orderId;
  });

  renderCustomers();
  render();
})();
