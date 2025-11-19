// Dùng BACKEND_HOST nếu có, nếu không thì để chuỗi rỗng
const HOST = (typeof BACKEND_HOST !== "undefined") ? BACKEND_HOST : "";

// Hiển thị 4 sản phẩm nổi bật ở trang chủ
window.addEventListener("load", async () => {
    try {
        const products = await fetchProducts();      // gọi API backend
        console.log("Products loaded:", products);   // để bạn xem trong Console

        const featured = products.slice(0, 4);       // lấy 4 sản phẩm đầu
        const container = document.getElementById("featured");
        container.innerHTML = "";

        featured.forEach(p => {
            // ảnh: nếu có imageUrl → ghép với HOST (http://localhost:8080)
            // nếu không có → dùng ảnh mẫu
            const imgSrc = p.imageUrl
                ? HOST + p.imageUrl
                : "img/sample1.jpg";

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
        alert("Không tải được danh sách sản phẩm. Kiểm tra lại backend hoặc file JS.");
    }
});
