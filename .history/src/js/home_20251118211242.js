const BACKEND_HOST = "http://localhost:8080"; // cùng host với backend Spring Boot

window.onload = async () => {
    const products = await fetchProducts();
    const featured = products.slice(0, 4); // 4 sản phẩm đầu

    const container = document.getElementById("featured");
    featured.forEach(p => {
        // map URL ảnh: nếu có imageUrl → ghép với host, nếu không → dùng ảnh mặc định
        const imgSrc = p.imageUrl
            ? BACKEND_HOST + p.imageUrl
            : "img/sample1.jpg";

        container.innerHTML += `
            <div class="product-card" onclick="location.href='product_detail.html?id=${p.id}'">
                <img src="${imgSrc}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">${p.price.toLocaleString()} VNĐ</p>
            </div>
        `;
    });
};
