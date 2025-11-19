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
        list.innerHTML = `<p class="cart-empty">Giỏ hàng trống.</p>`;
        document.getElementById("totalPrice").textContent = "";
        if (typeof updateCartCount === "function") updateCartCount();
        return;
    }

    cart.forEach(item => {
        const lineTotal = item.price * item.qty;
        total += lineTotal;

        // nếu sau này bạn lưu imageUrl vào cart thì sẽ hiện đúng,
        // còn hiện tại sẽ dùng ảnh mẫu
        const imgSrc = item.imageUrl || "img/sample1.jpg";

        list.innerHTML += `
            <div class="cart-item">
                <img src="${imgSrc}" alt="${item.name}" class="cart-item-img">

                <div class="cart-item-content">
                    <div class="cart-item-main">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-price">
                            Đơn giá: ${item.price.toLocaleString()} VNĐ
                        </p>
                    </div>

                    <div class="cart-item-right">
                        <div class="qty-control">
                            <button onclick="changeQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${item.id}, 1)">+</button>
                        </div>

                        <div class="cart-item-line-total">
                            Thành tiền: ${lineTotal.toLocaleString()} VNĐ
                        </div>

                        <button class="remove-btn" onclick="removeItem(${item.id})">
                            🗑 Xóa
                        </button>
                    </div>
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
        cart = cart.filter(x => x.id !== id);
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
