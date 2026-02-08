/* =========================
   VARIABLES GLOBALES
========================= */
let cartItems = {};
let cartCount = 0;
let cartTotal = 0;

/* =========================
   ABRIR / CERRAR CARRITO
 ========================= */
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('active');
}

/* =========================
   AGREGAR AL CARRITO
========================= */
function addToCart(productName, price) {
    if (!cartItems[productName]) {
        cartItems[productName] = {
            name: productName,
            price: price,
            qty: 1
        };
    } else {
        cartItems[productName].qty++;
    }

    cartCount++;
    cartTotal += price;

    document.getElementById('cart-count').innerText = cartCount;
    updateCartDisplay();
    showToast(`¡${productName} agregado! 🐾`);
}

/* =========================
   QUITAR UNA UNIDAD
========================= */
function removeFromCart(productName) {
    if (!cartItems[productName]) return;

    cartItems[productName].qty--;
    cartCount--;
    cartTotal -= cartItems[productName].price;

    if (cartItems[productName].qty <= 0) {
        delete cartItems[productName];
    }

    document.getElementById('cart-count').innerText = cartCount;
    updateCartDisplay();
    showToast("Producto eliminado 🗑️");
}

/* =========================
   RENDER DEL CARRITO
========================= */
function updateCartDisplay() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (!container || !totalEl) return;

    if (Object.keys(cartItems).length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px;">Tu carrito está vacío</p>';
        totalEl.innerText = '0';
        return;
    }

    container.innerHTML = Object.values(cartItems).map(item => `
        <div class="cart-item" onclick="event.stopPropagation()">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">
                    $${item.price.toLocaleString('es-CL')} x ${item.qty}
                </span>
            </div>
            <button class="btn-remove-item"
                onclick="removeFromCart('${item.name}'); event.stopPropagation();">
                ×
            </button>
        </div>
    `).join('');

    totalEl.innerText = cartTotal.toLocaleString('es-CL');
}

/* =========================
   TOAST
========================= */
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


/* =========================
   FINALIZAR COMPRA
========================= */
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('btn-checkout');

    if (!checkoutBtn) return;

    checkoutBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (cartCount === 0) {
            showToast("Tu carrito está vacío 🛒");
            return;
        }

        // Mensaje de pago
        showToast("Gracias por tu compra 💳✨ Te llevaremos al sitio de pago...");

        // Simulamos redirección bancaria 🏦
        setTimeout(() => {
            // Vaciar carrito
            cartItems = {};
            cartCount = 0;
            cartTotal = 0;

            document.getElementById('cart-count').innerText = 0;
            updateCartDisplay();

            // Cerrar carrito
            document.getElementById('cart-sidebar').classList.remove('active');
        }, 2000);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Gracias por tu mensaje, nos contactaremos en breve 🐾");
        form.reset();
    });
});


/* =====================
   SCROLL TO TOP ()
===================== */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================
   TOAST GLOBAL
 ===================== */
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/* =====================
   NAVBAR STICKY CON EFECTO SCROLL
 ===================== */
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});


