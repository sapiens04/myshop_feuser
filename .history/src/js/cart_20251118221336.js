// Lấy giỏ hàng từ localStorage
function getCart() {
    try {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (e) {
        return [];
    }
}

// Lưu giỏ hàng
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Cập nhật tổng tiền ở dưới cùng
function updateTotalMoney() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalEl = document.getElementById("totalPrice");
    if (totalEl) {
        totalEl.textContent = "Tổng tiền: " + total.toLocaleString() + " VNĐ";
    }
}

// Render toàn bộ giỏ hàng (dùng khi load trang hoặc xóa 1 item)
async function loadCart() {
    const cart = getCart();
    const list = document.getElementById("cartList");
    const totalPriceEl = document.getElementById("totalPrice");

    if (!list || !totalPriceEl) return;

    list.innerHTML = "";

    if (cart.length === 0) {
        list.innerHTML = `<p class="cart-empty">Giỏ hàng trống.</p>`;
        totalPriceEl.textContent = "Tổng tiền: 0 VNĐ";
        if (typeof updateCartCount === "function") updateCartCount();
        return;
    }

    // Với ít sản phẩm, gọi tuần tự là ổn
    for (const item of cart) {
        let imgSrc = "img/sample1.jpg";

        // Lấy ảnh từ backend (nếu dùng Spring Boot)
        try {
            if (typeof fetchProductById === "function") {
                const product = await fetchProductById(item.id);
                if (product && product.imageUrl) {
                    imgSrc = "http://localhost:8080" + product.imageUrl;
                }
            }
        } catch (e) {
            console.error("Lỗi lấy sản phẩm từ backend", e);
        }

        const lineTotal = item.price * item.qty;

        list.innerHTML += `
            <div class="cart-item" id="item-${item.id}">
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
                            <span id="qty-${item.id}">${item.qty}</span>
                            <button onclick="changeQty(${item.id}, 1)">+</button>
                        </div>

                        <div class="cart-item-line-total" id="lineTotal-${item.id}">
                            Thành tiền: ${lineTotal.toLocaleString()} VNĐ
                        </div>

                        <button class="remove-btn" onclick="removeItem(${item.id})">
                            🗑 Xóa
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    updateTotalMoney();
    if (typeof updateCartCount === "function") updateCartCount();
}

// Thay đổi số lượng 1 sản phẩm, không render lại toàn bộ
function changeQty(id, delta) {
    let cart = getCart();
    const item = cart.find(x => x.id === id);
    if (!item) return;

    item.qty += delta;

    if (item.qty <= 0) {
        // nếu về 0 thì xóa luôn
        cart = cart.filter(x => x.id !== id);
        saveCart(cart);

        const row = document.getElementById(`item-${id}`);
        if (row) row.remove();

        // nếu sau khi xóa mà giỏ trống
        if (cart.length === 0) {
            const list = document.getElementById("cartList");
            if (list) {
                list.innerHTML = `<p class="cart-empty">Giỏ hàng trống.</p>`;
            }
        }
    } else {
        // cập nhật lại số lượng + thành tiền trên giao diện
        saveCart(cart);

        const qtySpan = document.getElementById(`qty-${id}`);
        const lineTotalEl = document.getElementById(`lineTotal-${id}`);

        if (qtySpan) qtySpan.textContent = item.qty;
        if (lineTotalEl) {
            lineTotalEl.textContent =
                "Thành tiền: " + (item.price * item.qty).toLocaleString() + " VNĐ";
        }
    }

    updateTotalMoney();
    if (typeof updateCartCount === "function") updateCartCount();
}

// Xóa hẳn 1 sản phẩm khỏi giỏ
function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(x => x.id !== id);
    saveCart(cart);

    const row = document.getElementById(`item-${id}`);
    if (row) row.remove();

    if (cart.length === 0) {
        const list = document.getElementById("cartList");
        if (list) {
            list.innerHTML = `<p class="cart-empty">Giỏ hàng trống.</p>`;
        }
    }

    updateTotalMoney();
    if (typeof updateCartCount === "function") updateCartCount();
}

window.addEventListener("load", loadCart);
