window.onload = async () => {
    const products = await fetchProducts();
    const featured = products.slice(0, 4); // 4 sản phẩm đầu

    const container = document.getElementById("featured");
    featured.forEach(p => {
        container.innerHTML += `
            <div class="product-card" onclick="location.href='product_detail.html?id=${p.id}'">
                <img src="${p.imageUrl || 'img/sample1.jpg'}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">${p.price.toLocaleString()} VNĐ</p>
            </div>
        `;
    });
};
