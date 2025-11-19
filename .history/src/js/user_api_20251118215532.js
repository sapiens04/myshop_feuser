// HOST backend Spring Boot
const BACKEND_HOST = "http://localhost:8080";

// API lấy danh sách sản phẩm
const API_BASE = BACKEND_HOST + "/api/products";

async function fetchProducts() {
    const res = await fetch(API_BASE);
    if (!res.ok) {
        console.error("fetchProducts lỗi:", res.status);
        return [];
    }
    return await res.json();
}

async function fetchProductById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) {
        console.error("fetchProductById lỗi:", res.status);
        return null;
    }
    return await res.json();
}

