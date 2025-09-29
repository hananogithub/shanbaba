// Restaurants Page Specific JavaScript

// Restaurant card interactions
document.addEventListener('DOMContentLoaded', () => {
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        
        // Add click animation
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn')) {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-10px)';
                }, 150);
            }
        });
    });
    
    // Map functionality (placeholder)
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', () => {
            showNotification('地図機能は準備中です', 'info');
        });
    }
    
    // Restaurant filtering (if needed in the future)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                restaurantCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.classList.add('fade-in-up');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Smooth scroll to restaurant sections
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight the target card briefly
            targetElement.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
            setTimeout(() => {
                targetElement.style.boxShadow = '';
            }, 2000);
        }
    });
});
