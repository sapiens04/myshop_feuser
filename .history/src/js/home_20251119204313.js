const HOST = (typeof BACKEND_HOST !== "undefined") ? BACKEND_HOST : "";

// Hiển thị 4 sản phẩm nổi bật
window.addEventListener("load", async () => {
    try {
        const products = await fetchProducts();

        const featured = products.slice(0, 4);
        const container = document.getElementById("featured");
        container.innerHTML = "";

        featured.forEach(p => {

            let imgSrc;

            if (p.imageUrl && p.imageUrl.startsWith("/uploads")) {
                imgSrc = HOST + p.imageUrl;                    // ảnh từ backend
            } else if (p.imageUrl) {
                imgSrc = p.imageUrl;                           // URL trực tiếp
            } else {
                imgSrc = "img/sample1.jpg";                    // fallback
            }

            container.insertAdjacentHTML("beforeend", `
                <div class="product-card"
                    onclick="location.href='product_detail.html?id=${p.id}'">
                    <img src="${imgSrc}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p class="price">${p.price.toLocaleString()} VNĐ</p>
                </div>
            `);
        });

    } catch (err) {
        console.error("Lỗi trong home.js:", err);
        alert("Không tải được danh sách sản phẩm!");
    }
});
