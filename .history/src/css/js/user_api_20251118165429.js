const API_BASE = "http://localhost:8080/api/products";

async function fetchProducts() {
    const res = await fetch(API_BASE);
    return await res.json();
}

async function fetchProductById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    return await res.json();
}
