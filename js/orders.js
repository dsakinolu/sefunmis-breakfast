// ===========================================================================
// Orders — expandable order history
// ===========================================================================
(function () {
  const list = document.getElementById("orders-list");
  if (!list) return;
  const placedId = new URLSearchParams(location.search).get("placed");
  if (placedId) toast(`🎉 Order #${placedId} placed — thank you!`);

  const orders = Store.getOrders();
  if (!orders.length) {
    list.innerHTML = `<div class="empty-state panel"><span class="big">🧾</span>No orders yet — go grab something tasty!</div>`;
    return;
  }

  orders.forEach((o) => {
    const total = o.lines.reduce((s, l) => s + l.cost * (l.qty || 1), 0);
    const count = o.lines.reduce((s, l) => s + (l.qty || 1), 0);
    const card = document.createElement("div");
    card.className = "order-card" + (String(o.id) === placedId ? " flash open" : "");
    card.innerHTML = `
      <button class="order-head" type="button" aria-expanded="${String(o.id) === placedId}">
        <span class="oid">Order #${o.id}</span>
        <span class="meta">${o.customer} · ${o.date} · ${count} item${count === 1 ? "" : "s"}</span>
        <span class="money">${money(total)}</span>
      </button>
      <div class="order-body">
        <div class="table-wrap"><table>
          <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
          <tbody>
            ${o.lines.map((l) => `<tr><td>${l.name}</td><td>${l.qty || 1}</td><td class="money">${money(l.cost)}</td><td class="money">${money(l.cost * (l.qty || 1))}</td></tr>`).join("")}
          </tbody>
        </table></div>
      </div>`;
    card.querySelector(".order-head").addEventListener("click", () => {
      const open = card.classList.toggle("open");
      card.querySelector(".order-head").setAttribute("aria-expanded", String(open));
    });
    list.appendChild(card);
  });
})();
