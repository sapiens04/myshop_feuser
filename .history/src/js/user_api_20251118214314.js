const BACKEND_HOST = "http://localhost:8080";        // 👈 host backend
const API_BASE = BACKEND_HOST + "/api/products";     // ghép luôn cho API

async function fetchProducts() {
    const res = await fetch(API_BASE);
    return await res.json();
}

async function fetchProductById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    return await res.json();
}
