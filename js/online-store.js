// Online Store Page Specific JavaScript

// Category tab functionality
const categoryTabs = document.querySelectorAll('.category-tab');
const productSections = document.querySelectorAll('.products-section');

if (categoryTabs.length > 0) {
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            
            // Show/hide product sections
            productSections.forEach(section => {
                if (section.id === category) {
                    section.style.display = 'block';
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
}

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('shanbaba-cart')) || [];

const createCartSidebar = () => {
    const cartSidebar = document.createElement('div');
    cartSidebar.className = 'cart-sidebar';
    cartSidebar.innerHTML = `
        <div class="cart-header">
            <h3>ショッピングカート</h3>
            <button class="cart-close">&times;</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>合計:</span>
                <span class="total-price">¥0</span>
            </div>
            <button class="checkout-btn">レジに進む</button>
        </div>
    `;
    
    document.body.appendChild(cartSidebar);
    return cartSidebar;
};

let cartSidebar = null;

const updateCartDisplay = () => {
    if (!cartSidebar) {
        cartSidebar = createCartSidebar();
        setupCartEventListeners();
    }
    
    const cartItems = cartSidebar.querySelector('.cart-items');
    const totalPrice = cartSidebar.querySelector('.total-price');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">カートは空です</p>';
        totalPrice.textContent = '¥0';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">¥${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${index})" style="margin-left: 10px; color: #e74c3c; background: none; border: none; cursor: pointer;">削除</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = `¥${total.toLocaleString()}`;
    }
};

const addToCart = (productElement) => {
    const productCard = productElement.closest('.product-card');
    const name = productCard.querySelector('h4').textContent;
    const price = parseInt(productCard.querySelector('.price').textContent.replace('¥', '').replace(',', ''));
    const image = productCard.querySelector('img').src;
    
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1
        });
    }
    
    localStorage.setItem('shanbaba-cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification(`${name}をカートに追加しました`, 'success');
};

const updateQuantity = (index, change) => {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('shanbaba-cart', JSON.stringify(cart));
    updateCartDisplay();
};

const removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('shanbaba-cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('商品をカートから削除しました', 'info');
};

const setupCartEventListeners = () => {
    if (!cartSidebar) return;
    
    // Close cart
    cartSidebar.querySelector('.cart-close').addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
    
    // Checkout
    cartSidebar.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('カートが空です', 'error');
            return;
        }
        
        // In a real application, this would redirect to checkout
        showNotification('チェックアウト機能は準備中です', 'info');
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (cartSidebar && !cartSidebar.contains(e.target) && !e.target.closest('.add-to-cart')) {
            cartSidebar.classList.remove('open');
        }
    });
};

// Add to cart buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        addToCart(e.target);
        
        // Open cart sidebar
        if (!cartSidebar) {
            cartSidebar = createCartSidebar();
            setupCartEventListeners();
        }
        cartSidebar.classList.add('open');
    }
});

// Cart icon in navigation (if exists)
const cartIcon = document.querySelector('.cart-icon');
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        if (!cartSidebar) {
            cartSidebar = createCartSidebar();
            setupCartEventListeners();
        }
        cartSidebar.classList.toggle('open');
    });
}

// Initialize cart display
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    
    // Show all sections initially
    productSections.forEach(section => {
        section.style.display = 'block';
    });
});

// Make functions globally available
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
