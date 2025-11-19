// ================== LOAD GIỎ HÀNG ==================
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
                    <p>Đơn giá: ${item.price.toLocaleString()} VNĐ</p>
                    <p>Số lượng: ${item.qty}</p>
                </div>

                <div class="cart-actions">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                    <button onclick="removeItem(${item.id})">🗑 Xóa</button>
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

// ================== SỬA SỐ LƯỢNG ==================
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

// ================== XÓA SẢN PHẨM ==================
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter(x => x.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ================== ĐẶT HÀNG (GỬI VỀ BACKEND) ==================
async function checkout() {
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (e) {
        cart = [];
    }

    if (cart.length === 0) {
        alert("Giỏ hàng đang trống, không thể đặt hàng.");
        return;
    }

    // tạm thời hard-code thông tin khách (sau này bạn làm form nhập)
    const orderPayload = {
        customerName: "Khách lẻ",
        phone: "0000000000",
        address: "Chưa cập nhật",
        items: cart.map(it => ({
            productId: it.id,
            name: it.name,
            price: it.price,
            qty: it.qty
        }))
    };

    try {
        const res = await fetch(`${BACKEND_HOST}/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderPayload)
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Lỗi đặt hàng:", res.status, text);
            alert("Có lỗi khi đặt hàng, bạn thử lại sau!");
            return;
        }

        // nếu backend trả về order, bạn có thể dùng res.json() ở đây
        // const order = await res.json();

        // Xóa giỏ hàng local
        localStorage.removeItem("cart");
        loadCart();
        alert("Đặt hàng thành công!");

    } catch (err) {
        console.error(err);
        alert("Có lỗi khi đặt hàng, bạn thử lại sau!");
    }
}

// ================== KHỞI TẠO ==================
window.addEventListener("load", loadCart);
