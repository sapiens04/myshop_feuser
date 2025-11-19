// load giỏ hàng và hiển thị
async function loadCart() {
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (e) {
        cart = [];
    }

    const list = document.getElementById("cartList");
    const totalPriceEl = document.getElementById("totalPrice");
    list.innerHTML = "";

    if (cart.length === 0) {
        list.innerHTML = `<p class="cart-empty">Giỏ hàng trống.</p>`;
        totalPriceEl.textContent = "Tổng tiền: 0 VNĐ";
        if (typeof updateCartCount === "function") updateCartCount();
        return;
    }

    let total = 0;

    // duyệt từng item trong cart
    for (const item of cart) {
        // gọi backend để lấy thông tin sp (ảnh)
        let product = null;
        try {
            product = await fetchProductById(item.id);
        } catch (e) {
            console.error("Lỗi fetchProductById", e);
        }

        // build link ảnh: http://localhost:8080 + /uploads/xxx.png
        let imgSrc = "img/sample1.jpg";
        if (product && product.imageUrl) {
            imgSrc = "http://localhost:8080" + product.imageUrl;
        }

        const lineTotal = item.price * item.qty;
        total += lineTotal;

        list.innerHTML += `
    <div class="cart-item" id="item-${item.id}">
        <img src="${imgSrc}" alt="${item.name}" class="cart-item-img">

        <div class="cart-item-content">
            <div class="cart-item-main">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">Đơn giá: ${item.price.toLocaleString()} VNĐ</p>
            </div>

            <div class="cart-item-right">
                <div class="qty-control">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span id="qty-${item.id}">${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>

                <div class="cart-item-line-total" id="lineTotal-${item.id}">
                    ${(item.price * item.qty).toLocaleString()} VNĐ
                </div>

                <button class="remove-btn" onclick="removeItem(${item.id})">🗑 Xóa</button>
            </div>
        </div>
    </div>
`;


    // ✅ tổng tiền đúng
    totalPriceEl.textContent = "Tổng tiền: " + total.toLocaleString() + " VNĐ";

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }
}

// đổi số lượng
function changeQty(id, delta) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = cart.find(x => x.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(x => x.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // 🎯 Cập nhật UI trực tiếp – không render lại toàn bộ
    const qtySpan = document.querySelector(`#qty-${id}`);
    const lineTotal = document.querySelector(`#lineTotal-${id}`);

    if (item.qty <= 0) {
        // xoá hàng luôn
        document.querySelector(`#item-${id}`).remove();
    } else {
        qtySpan.textContent = item.qty;
        lineTotal.textContent = (item.price * item.qty).toLocaleString() + " VNĐ";
    }

    updateTotalMoney();
    updateCartCount();
}
function updateTotalMoney() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    document.getElementById("totalPrice").textContent =
        "Tổng tiền: " + total.toLocaleString() + " VNĐ";
}


// xóa hẳn sản phẩm khỏi giỏ
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter(x => x.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

window.addEventListener("load", loadCart);
