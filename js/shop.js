// ===========================================================================
// Shop — category filters + product grid + add to cart
// ===========================================================================
(function () {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  const chipRow = document.getElementById("chip-row");
  let activeCat = "All";

  function renderChips() {
    const items = Store.getItems();
    const cats = ["All", ...new Set(items.map((i) => i.cat))];
    chipRow.innerHTML = "";
    cats.forEach((c) => {
      const b = document.createElement("button");
      b.className = "chip" + (c === activeCat ? " active" : "");
      b.type = "button";
      b.textContent = c;
      b.addEventListener("click", () => { activeCat = c; renderChips(); renderGrid(); });
      chipRow.appendChild(b);
    });
  }

  function renderGrid() {
    const items = Store.getItems().filter((i) => activeCat === "All" || i.cat === activeCat);
    grid.innerHTML = "";
    items.forEach((item, idx) => {
      const card = document.createElement("article");
      card.className = "product";
      card.style.animationDelay = (idx * 45) + "ms";
      card.innerHTML = `
        <div class="photo">${itemVisual(item)}</div>
        <span class="price-tag">${money(item.cost)}</span>
        <div class="body">
          <span class="cat">${item.cat}</span>
          <h3>${item.name}</h3>
          <button class="btn btn-primary small" type="button">Add to cart</button>
        </div>`;
      card.querySelector("button").addEventListener("click", () => {
        Store.addToCart(item.id);
        refreshCartBadge();
        toast(`🧺 ${item.name} added to cart`);
      });
      grid.appendChild(card);
    });
  }

  renderChips();
  renderGrid();
})();
