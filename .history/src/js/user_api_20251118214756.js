// ĐỊA CHỈ BACKEND
const BACKEND_HOST = "http://localhost:8080";

// API lấy sản phẩm
const API_BASE = BACKEND_HOST + "/api/products";

async function fetchProducts() {
    const res = await fetch(API_BASE);
    if (!res.ok) {
        throw new Error("Lỗi fetchProducts: " + res.status);
    }
    return await res.json();
}

async function fetchProductById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) {
        throw new Error("Lỗi fetchProductById: " + res.status);
    }
    return await res.json();
}
