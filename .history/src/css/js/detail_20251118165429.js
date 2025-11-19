let product;

window.onload = async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    product = await fetchProductById(id);

    document.getElementById("name").textContent = product.name;
    document.getElementById("price").textContent = product.price.toLocaleString() + " VNĐ";
};

function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const found = cart.find(x => x.id === product.id);

    if (found) {
        found.qty++;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
}
