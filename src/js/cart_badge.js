function getCartItems() {
    try {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (e) {
        return [];
    }
}

function updateCartCount() {
    const cart = getCartItems();
    const total = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

    const badges = document.querySelectorAll(".cart-count");
    badges.forEach(badge => {
        badge.textContent = total > 0 ? String(total) : "";
    });
}

window.addEventListener("load", updateCartCount);

window.addEventListener("storage", (e) => {
    if (e.key === "cart") {
        updateCartCount();
    }
});
