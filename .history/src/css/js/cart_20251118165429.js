function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const list = document.getElementById("cartList");
    let total = 0;

    list.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.qty;

        list.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.price.toLocaleString()} VNĐ x ${item.qty}</p>
                </div>

                <div class="cart-actions">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                    <button onclick="removeItem(${item.id})">🗑</button>
                </div>
            </div>
        `;
    });

    document.getElementById("totalPrice").textContent =
        "Tổng tiền: " + total.toLocaleString() + " VNĐ";
}

function changeQty(id, delta) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = cart.find(x => x.id === id);

    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeItem(id);
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter(x => x.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

window.onload = loadCart;
