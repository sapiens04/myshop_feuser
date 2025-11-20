const HOST = (typeof BACKEND_HOST !== "undefined") ? BACKEND_HOST : "http://localhost:8080";

// Hiển thị 4 sản phẩm nổi bật
window.addEventListener("load", async () => {
    try {
        const products = await fetchProducts();

        const featured = products; 
        const container = document.getElementById("featured");
        container.innerHTML = "";

        featured.forEach(p => {

            let imgSrc = "";

            if (p.imageUrl) {

                // Nếu ảnh từ backend
                if (p.imageUrl.startsWith("/uploads")) {
                    imgSrc = HOST + p.imageUrl;  
                } 
                // Ảnh URL online
                else if (p.imageUrl.startsWith("http")) {
                    imgSrc = p.imageUrl;
                }

            } else {
                // Fallback ảnh mẫu (đúng path frontend)
                imgSrc = "img/sample1.jpg";
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
