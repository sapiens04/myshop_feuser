// Địa chỉ backend
const BACKEND_HOST = "http://localhost:8080";

// API sản phẩm
const API_PRODUCTS = `${BACKEND_HOST}/api/products`;

// API đơn hàng
const API_ORDERS = `${BACKEND_HOST}/api/orders`;

async function fetchProducts() {
    const res = await fetch(API_PRODUCTS);
    return await res.json();
}

async function fetchProductById(id) {
    const res = await fetch(`${API_PRODUCTS}/${id}`);
    return await res.json();
}
