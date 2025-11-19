let allProducts = [];

window.onload = async () => {
    allProducts = await fetchProducts();
    renderList();
};

function renderList() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const list = document.getElementById("productList");

    list.innerHTML = "";

    allProducts
        .filter(p => p.name.toLowerCase().includes(term))
        .forEach(p => {
            list.innerHTML += `
                <div class="product-card" onclick="location.href='product_detail.html?id=${p.id}'">
                    <img src="img/sample1.jpg" alt="">
                    <h3>${p.name}</h3>
                    <p class="price">${p.price.toLocaleString()} VNĐ</p>
                </div>
            `;
        });
}
