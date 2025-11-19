let product;

window.onload = async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (!id) {
        alert("Không tìm thấy ID sản phẩm trên URL");
        return;
    }

    // gọi API backend để lấy thông tin sản phẩm
    product = await fetchProductById(id);

    document.getElementById("name").textContent = product.name;
    document.getElementById("price").textContent =
        product.price.toLocaleString() + " VNĐ";

    const BACKEND_HOST = "http://localhost:8080";

document.getElementById("product-image").src =
    product.imageUrl
        ? BACKEND_HOST + product.imageUrl
        : "img/sample1.jpg";
   
};

// CHỈ DÙNG KEY "cart" TRONG localStorage
function addToCart() {
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (e) {
        cart = [];
    }

    const found = cart.find(x => x.id === product.id);

    if (found) {
        found.qty++;
    } else {
        cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    qty: 1,
    imageUrl: product.imageUrl   // 👈 thêm dòng này
});

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    alert("Đã thêm vào giỏ hàng!");
}
