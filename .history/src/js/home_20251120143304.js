const HOST = (typeof BACKEND_HOST !== "undefined") ? BACKEND_HOST : "http://localhost:8080";

window.addEventListener("load", async () => {
    try {
        // 1. Lấy dữ liệu từ Backend
        const products = await fetchProducts(); // Giả sử hàm này ok
        
        console.log("Dữ liệu nhận được:", products); // Bật cái này để debug xem có dữ liệu ko

        // 2. Định nghĩa các vị trí cần điền
        const featuredContainer = document.getElementById("featured");   // Dành cho index.html
        const listContainer = document.getElementById("productList");    // Dành cho products.html

        // 3. Logic render (Hàm vẽ HTML chung)
        const renderProductHTML = (p) => {
            let imgSrc = "img/sample1.jpg"; // Ảnh mặc định
            if (p.imageUrl) {
                if (p.imageUrl.startsWith("/uploads")) imgSrc = HOST + p.imageUrl;
                else if (p.imageUrl.startsWith("http")) imgSrc = p.imageUrl;
            }

            return `
                <div class="product-card" onclick="location.href='product_detail.html?id=${p.id}'">
                    <img src="${imgSrc}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p class="price">${p.price.toLocaleString()} VNĐ</p>
                </div>
            `;
        };

        // 4. Kiểm tra: Nếu đang ở trang chủ (có #featured)
        if (featuredContainer) {
            featuredContainer.innerHTML = "";
            // Chỉ lấy 4 bài đầu làm nổi bật
            products.slice(0, 4).forEach(p => {
                featuredContainer.insertAdjacentHTML("beforeend", renderProductHTML(p));
            });
        }

        // 5. Kiểm tra: Nếu đang ở trang sản phẩm (có #productList) <-- Đây là cái bạn đang thiếu
        if (listContainer) {
            listContainer.innerHTML = "";
            // Render tất cả sản phẩm
            products.forEach(p => {
                listContainer.insertAdjacentHTML("beforeend", renderProductHTML(p));
            });
            
            // Gán dữ liệu vào biến toàn cục để dùng cho chức năng tìm kiếm (hàm renderList ở input)
            window.allProductsData = products; 
        }

    } catch (err) {
        console.error("Lỗi hiển thị sản phẩm:", err);
    }
});

// Hàm tìm kiếm (để khớp với oninput="renderList()" trong HTML của bạn)
function renderList() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const listContainer = document.getElementById("productList");
    
    if (!listContainer || !window.allProductsData) return;

    listContainer.innerHTML = "";
    
    const filtered = window.allProductsData.filter(p => p.name.toLowerCase().includes(keyword));
    
    // Tái sử dụng logic render (nếu bạn muốn code gọn hơn thì tách hàm renderProductHTML ra ngoài window.load)
    // Ở đây viết tạm render lại thủ công cho nhanh:
    filtered.forEach(p => {
         let imgSrc = "img/sample1.jpg";
         if (p.imageUrl && p.imageUrl.startsWith("/uploads")) imgSrc = HOST + p.imageUrl;
         
         const html = `
            <div class="product-card" onclick="location.href='product_detail.html?id=${p.id}'">
                <img src="${imgSrc}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">${p.price.toLocaleString()} VNĐ</p>
            </div>
        `;
        listContainer.insertAdjacentHTML("beforeend", html);
    });
}