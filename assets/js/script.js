// Variables globales
let cartCount = 0;
let cartItems = [];
let cartTotal = 0;

// Mapeo de precios de productos
const productPrices = {
    'Alimento Premium': 25990,
    'Antiparasitario': 12500,
    'Collar Reflectivo': 8990,
    'Juguete Interactivo': 15500
};

// Función para mostrar/ocultar carrito
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Agregar al carrito y lanzar Toast
function addToCart(productName, price) {
    cartCount++;
    cartItems.push({ name: productName, price: price });
    cartTotal += price;
    
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.innerText = cartCount;
    }
    
    updateCartDisplay();
    showToast(`¡${productName} agregado al carrito!`);
    
    // NO cerrar el carrito automáticamente
}

// Actualizar visualización del carrito
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color: #666; text-align: center; padding: 20px 0;">Tu carrito está vacío</p>';
        if (cartTotalEl) {
            cartTotalEl.innerText = '0';
        }
        return;
    }
    
    const itemCounts = {};
    cartItems.forEach(item => {
        if (!itemCounts[item.name]) {
            itemCounts[item.name] = { count: 0, price: item.price };
        }
        itemCounts[item.name].count++;
    });
    
    let html = '';
    for (const [itemName, itemData] of Object.entries(itemCounts)) {
        const subtotal = itemData.price * itemData.count;
        html += `<div class="cart-item">
                    <div class="cart-item-info">
                        <span class="cart-item-name">${itemName}</span>
                        <span class="cart-item-price">$${itemData.price.toLocaleString('es-CL')}</span>
                    </div>
                    <div class="cart-item-controls">
                        <span class="cart-item-count">x${itemData.count}</span>
                        <button class="btn-remove-item" onclick="event.stopPropagation(); removeFromCart('${itemName}', event)" title="Eliminar">×</button>
                    </div>
                 </div>`;
    }
    
    cartItemsContainer.innerHTML = html;
    
    if (cartTotalEl) {
        cartTotalEl.innerText = cartTotal.toLocaleString('es-CL');
    }
}

// Eliminar item del carrito
function removeFromCart(itemName, event) {
    // Prevenir que el click cierre el carrito
    if (event) {
        event.stopPropagation();
    }
    
    const index = cartItems.findIndex(item => item.name === itemName);
    if (index > -1) {
        const removedItem = cartItems[index];
        cartItems.splice(index, 1);
        cartTotal -= removedItem.price;
        cartCount--;
        
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) {
            cartCountEl.innerText = cartCount;
        }
        
        updateCartDisplay();
        showToast(`${itemName} eliminado del carrito`);
        
        // El carrito se mantiene abierto
    }
}

// Mostrar notificación Toast
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    
    toast.innerText = message;
    toast.className = "toast show";
    setTimeout(() => { 
        toast.className = toast.className.replace("show", "").trim(); 
    }, 3000);
}

// Botón de retorno al inicio - mostrar/ocultar según scroll
window.addEventListener('scroll', function() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
}, { passive: true });

// Función para volver al inicio
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// Cerrar carrito al hacer clic en el fondo
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartSidebar && !cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
        if (cartSidebar.classList.contains('active')) {
            cartSidebar.classList.remove('active');
        }
    }
});

// Evento para finalizar compra
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.getElementById('btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validar que haya items en el carrito
            if (cartItems.length === 0) {
                showToast('Tu carrito está vacío');
                return;
            }
            
            // Mostrar mensaje de redirección
            showToast('Te redirigiremos al área de pago...');
            
            // NO LIMPIAR EL CARRITO - Los productos se mantienen
            // Solo cerrar la ventana del carrito después de 1.5 segundos
            setTimeout(function() {
                const cartSidebar = document.getElementById('cart-sidebar');
                if (cartSidebar) {
                    cartSidebar.classList.remove('active');
                }
            }, 1500);
        });
    }
});