function loadCart() {
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (e) {
        cart = [];
    }

    const list = document.getElementById("cartList");
    let total = 0;

    list.innerHTML = "";

    if (cart.length === 0) {
        list.innerHTML = "<p>Giỏ hàng trống.</p>";
        document.getElementById("totalPrice").textContent = "";
        if (typeof updateCartCount === "function") updateCartCount();
        return;
    }

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

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }
}

function changeQty(id, delta) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
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
