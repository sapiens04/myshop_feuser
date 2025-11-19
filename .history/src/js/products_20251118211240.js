let allProducts = [];

window.onload = async () => {
    allProducts = await fetchProducts();
    renderList();
};

function renderList() {
    const term = document.getElementById("searchInput")?.value.toLowerCase() || "";
    const list = document.getElementById("productList");

    list.innerHTML = "";

    allProducts
        .filter(p => p.name.toLowerCase().includes(term))
        .forEach(p => {
            list.innerHTML += `
                <div class="product-card" onclick="location.href='product_detail.html?id=${p.id}'">
                    
                const imgSrc = p.imageUrl
            ? BACKEND_HOST + p.imageUrl
            : "img/sample1.jpg";
                
                <h3>${p.name}</h3>
                    <p class="price">${p.price.toLocaleString()} VNĐ</p>
                    <button onclick="addToCartFromList(${p.id}, '${p.name}', ${p.price}); event.stopPropagation();">
                        🛒 Thêm vào giỏ
                    </button>
                </div>
            `;
        });
}

function addToCartFromList(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(p => p.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    if (typeof updateCartCount === "function") updateCartCount();
}
