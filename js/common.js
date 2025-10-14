// Common JavaScript for Multi-page Website

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Page transition animation - DISABLED to fix image display issue
// document.addEventListener('DOMContentLoaded', () => {
//     const pageContent = document.querySelector('body');
//     if (pageContent) {
//         pageContent.classList.add('page-transition');
//         setTimeout(() => {
//             pageContent.classList.add('loaded');
//         }, 100);
//     }
// });

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card, .restaurant-card, .product-card, .gallery-item, .feature, .contact-item').forEach(el => {
    observer.observe(el);
});

// Lazy loading for images - DISABLED to fix hero image display issue
// const lazyImages = document.querySelectorAll('img[src]');
// const imageObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const img = entry.target;
//             img.style.opacity = '0';
//             img.style.transition = 'opacity 0.3s ease';
//             
//             img.onload = () => {
//                 img.style.opacity = '1';
//             };
//             
//             imageObserver.unobserve(img);
//         }
//     });
// });

// lazyImages.forEach(img => {
//     imageObserver.observe(img);
// });

// Notification system
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    if (type === 'success') {
        notification.style.background = '#2e7d32';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else {
        notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
};

// Dropdown menu functionality
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    dropdown.addEventListener('mouseenter', () => {
        dropdownContent.style.display = 'block';
    });
    
    dropdown.addEventListener('mouseleave', () => {
        dropdownContent.style.display = 'none';
    });
});

// Mobile dropdown functionality
if (window.innerWidth <= 768) {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        dropdownLink.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
    });
}

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #d4af37 !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .page-transition {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    .page-transition.loaded {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
