// Home Page Specific JavaScript

// Menu category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (categoryButtons.length > 0 && menuItems.length > 0) {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    item.classList.add('show');
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });
        });
    });
}

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-nav">
                <button class="lightbox-prev">&lt;</button>
                <button class="lightbox-next">&gt;</button>
            </div>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    lightboxImg.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
    `;
    
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    lightboxClose.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        background: none;
        border: none;
    `;
    
    const lightboxNav = lightbox.querySelector('.lightbox-nav');
    lightboxNav.style.cssText = `
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
    `;
    
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    [lightboxPrev, lightboxNext].forEach(btn => {
        btn.style.cssText = `
            background: rgba(212, 175, 55, 0.8);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            transition: background 0.3s ease;
        `;
    });
    
    document.body.appendChild(lightbox);
    return lightbox;
};

let lightbox = null;
let currentImageIndex = 0;
let galleryImages = [];

// Initialize gallery
galleryItems.forEach((item, index) => {
    const img = item.querySelector('.gallery-img');
    if (img) {
        galleryImages.push({
            src: img.src,
            alt: img.alt
        });
        
        item.addEventListener('click', () => {
            if (!lightbox) {
                lightbox = createLightbox();
            }
            currentImageIndex = index;
            showLightboxImage();
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
});

const showLightboxImage = () => {
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    }
};

// Lightbox event listeners
document.addEventListener('click', (e) => {
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.target.classList.contains('lightbox-close') || e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        if (e.target.classList.contains('lightbox-prev')) {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showLightboxImage();
        }
        
        if (e.target.classList.contains('lightbox-next')) {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            showLightboxImage();
        }
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showLightboxImage();
        }
        if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            showLightboxImage();
        }
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        const requiredFields = ['name', 'email', 'date', 'time'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!input || !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#e0e0e0';
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('ご予約ありがとうございます！確認のため、お電話またはメールでご連絡いたします。', 'success');
            contactForm.reset();
        } else {
            showNotification('必須項目を入力してください。', 'error');
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in-up');
    }
    
    // Add loading animation to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});
