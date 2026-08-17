// ===========================================================================
// Manage — CRUD for menu items and customers 
// ===========================================================================
(function () {
  const zoneItems = document.getElementById("zone-items");
  if (!zoneItems) return;
  const zoneCust = document.getElementById("zone-customers");
  const tabItems = document.getElementById("tab-items");
  const tabCust = document.getElementById("tab-customers");

  function setTab(which) {
    zoneItems.classList.toggle("active", which === "items");
    zoneCust.classList.toggle("active", which === "cust");
    tabItems.className = which === "items" ? "btn btn-dark" : "btn btn-ghost";
    tabCust.className = which === "cust" ? "btn btn-dark" : "btn btn-ghost";
  }
  tabItems.addEventListener("click", () => setTab("items"));
  tabCust.addEventListener("click", () => setTab("cust"));

  // ---------------- Items ----------------
  const ifName = document.getElementById("if-name");
  const ifCost = document.getElementById("if-cost");
  const ifCat = document.getElementById("if-cat");
  const itemFormTitle = document.getElementById("item-form-title");
  const itemCancel = document.getElementById("item-cancel");
  let editingItem = null;

  function renderItems() {
    const items = Store.getItems();
    document.getElementById("items-table").innerHTML = `
      <table>
        <thead><tr><th></th><th>Item</th><th>Category</th><th>Price</th><th></th></tr></thead>
        <tbody>
          ${items.map((i) => `
            <tr data-id="${i.id}">
              <td>${i.img ? `<img class="thumb" src="${i.img}" alt="">` : `<span class="thumb" style="display:inline-block">${foodArt(i.art)}</span>`}</td>
              <td><strong>${i.name}</strong></td>
              <td>${i.cat}</td>
              <td class="money">${money(i.cost)}</td>
              <td><span class="row-actions">
                <button class="btn btn-ghost small e-item" type="button">Edit</button>
                <button class="btn btn-danger small d-item" type="button">Delete</button>
              </span></td>
            </tr>`).join("")}
        </tbody>
      </table>`;
    document.querySelectorAll(".e-item").forEach((b) =>
      b.addEventListener("click", () => startEditItem(b.closest("tr").dataset.id)));
    document.querySelectorAll(".d-item").forEach((b) =>
      b.addEventListener("click", () => deleteItem(b.closest("tr").dataset.id)));
  }

  function startEditItem(id) {
    const item = Store.getItems().find((i) => String(i.id) === String(id));
    if (!item) return;
    editingItem = item.id;
    ifName.value = item.name;
    ifCost.value = item.cost;
    ifCat.value = item.cat;
    itemFormTitle.textContent = "Edit: " + item.name;
    itemCancel.hidden = false;
    ifName.focus();
  }

  function resetItemForm() {
    editingItem = null;
    ifName.value = ""; ifCost.value = "";
    itemFormTitle.textContent = "Add a menu item";
    itemCancel.hidden = true;
  }

  function deleteItem(id) {
    const items = Store.getItems().filter((i) => String(i.id) !== String(id));
    Store.setItems(items);
    const cart = Store.getCart();
    delete cart[id];
    Store.setCart(cart);
    refreshCartBadge();
    renderItems();
    toast("Item removed");
  }

  document.getElementById("item-save").addEventListener("click", () => {
    const name = ifName.value.trim();
    const cost = parseFloat(ifCost.value);
    if (!name || isNaN(cost) || cost < 0) { toast("Please enter a name and a valid price"); return; }
    const items = Store.getItems();
    if (editingItem !== null) {
      const it = items.find((i) => i.id === editingItem);
      it.name = name; it.cost = cost; it.cat = ifCat.value;
      toast("Item updated");
    } else {
      items.push({ id: Math.max(0, ...items.map((i) => i.id)) + 1, name, cost, cat: ifCat.value, art: "default" });
      toast("Item added to the menu");
    }
    Store.setItems(items);
    resetItemForm();
    renderItems();
  });
  itemCancel.addEventListener("click", resetItemForm);

  // ---------------- Customers ----------------
  const cfName = document.getElementById("cf-name");
  const cfEmail = document.getElementById("cf-email");
  const cfPhone = document.getElementById("cf-phone");
  const custFormTitle = document.getElementById("cust-form-title");
  const custCancel = document.getElementById("cust-cancel");
  let editingCust = null;

  function renderCust() {
    const customers = Store.getCustomers();
    document.getElementById("cust-table").innerHTML = `
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th></th></tr></thead>
        <tbody>
          ${customers.map((c) => `
            <tr data-id="${c.id}">
              <td><strong>${c.name}</strong></td>
              <td>${c.email || "—"}</td>
              <td>${c.phone || "—"}</td>
              <td><span class="row-actions">
                <button class="btn btn-ghost small e-cust" type="button">Edit</button>
                <button class="btn btn-danger small d-cust" type="button">Delete</button>
              </span></td>
            </tr>`).join("")}
        </tbody>
      </table>`;
    document.querySelectorAll(".e-cust").forEach((b) =>
      b.addEventListener("click", () => startEditCust(b.closest("tr").dataset.id)));
    document.querySelectorAll(".d-cust").forEach((b) =>
      b.addEventListener("click", () => {
        Store.setCustomers(Store.getCustomers().filter((c) => String(c.id) !== b.closest("tr").dataset.id));
        renderCust();
        toast("Customer removed");
      }));
  }

  function startEditCust(id) {
    const c = Store.getCustomers().find((x) => String(x.id) === String(id));
    if (!c) return;
    editingCust = c.id;
    cfName.value = c.name; cfEmail.value = c.email; cfPhone.value = c.phone;
    custFormTitle.textContent = "Edit: " + c.name;
    custCancel.hidden = false;
    cfName.focus();
  }

  function resetCustForm() {
    editingCust = null;
    cfName.value = ""; cfEmail.value = ""; cfPhone.value = "";
    custFormTitle.textContent = "Add a customer";
    custCancel.hidden = true;
  }

  document.getElementById("cust-save").addEventListener("click", () => {
    const name = cfName.value.trim();
    if (!name) { toast("Please enter a name"); return; }
    const customers = Store.getCustomers();
    if (editingCust !== null) {
      const c = customers.find((x) => x.id === editingCust);
      c.name = name; c.email = cfEmail.value.trim(); c.phone = cfPhone.value.trim();
      toast("Customer updated");
    } else {
      customers.push({ id: Math.max(0, ...customers.map((c) => c.id)) + 1, name, email: cfEmail.value.trim(), phone: cfPhone.value.trim() });
      toast("Customer added");
    }
    Store.setCustomers(customers);
    resetCustForm();
    renderCust();
  });
  custCancel.addEventListener("click", resetCustForm);

  // ---------------- Reset ----------------
  document.getElementById("reset-data").addEventListener("click", () => {
    Store.reset();
    refreshCartBadge();
    renderItems();
    renderCust();
    toast("Demo data restored to the original menu");
  });

  renderItems();
  renderCust();
})();
