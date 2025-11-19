window.addEventListener("load", async () => {
    try {
        const products = await fetchProducts();  // gọi API (có BACKEND_HOST)
        const featured = products.slice(0, 4);   // 4 sản phẩm đầu

        const container = document.getElementById("featured");
        container.innerHTML = "";

        featured.forEach(p => {
            // ảnh: nếu có imageUrl thì gắn backend host
            const imgSrc = p.imageUrl
                ? BACKEND_HOST + p.imageUrl
                : "img/sample1.jpg";

            container.innerHTML += `
                <div class="product-card" onclick="location.href='product_detail.html?id=${p.id}'">
