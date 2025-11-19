let product;

window.onload = async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    product = await fetchProductById(id);

    document.getElementById("name").textContent = product.name;
    document.getElementById("price").textContent = product.price.toLocaleString() + " VNĐ";
};

function addToCart() {
    // đọc giỏ hàng hiện tại
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // tìm sản phẩm đã có chưa
    const found = cart.find(x => x.id === product.id);

    if (found) {
        found.qty++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1
        });
    }

    // lưu lại
    localStorage.setItem("cart", JSON.stringify(cart));

    // cập nhật badge nếu có
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    alert("Đã thêm vào giỏ hàng!");
}
