// Contact Page Specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validation
            const requiredFields = ['name', 'email', 'inquiry-type', 'message', 'privacy'];
            let isValid = true;
            let errorMessage = '';
            
            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                if (!input || !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    if (field === 'privacy') {
                        errorMessage = 'プライバシーポリシーへの同意が必要です';
                    } else {
                        errorMessage = '必須項目を入力してください';
                    }
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            // Email validation
            const email = data['email'];
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                isValid = false;
                contactForm.querySelector('[name="email"]').style.borderColor = '#e74c3c';
                errorMessage = '正しいメールアドレスを入力してください';
            }
            
            if (isValid) {
                // Show success message
                showNotification('お問い合わせありがとうございます！確認のため、お電話またはメールでご連絡いたします。', 'success');
                contactForm.reset();
                
                // Reset all border colors
                contactForm.querySelectorAll('input, select, textarea').forEach(input => {
                    input.style.borderColor = '#e0e0e0';
                });
            } else {
                showNotification(errorMessage, 'error');
            }
        });
    }
    
    // Form field interactions
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#d4af37';
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                input.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    // Map placeholder click
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', () => {
            showNotification('地図機能は準備中です', 'info');
        });
    }
    
    // FAQ items interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add click animation
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'translateY(-3px)';
            }, 150);
        });
    });
    
    // Contact method cards interaction
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', () => {
            // Add click animation
            method.style.transform = 'scale(0.98)';
            setTimeout(() => {
                method.style.transform = 'translateY(-3px)';
            }, 150);
        });
    });
    
    // Store hours interaction
    const hoursItems = document.querySelectorAll('.hours-item');
    hoursItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });
    });
    
    // Form submission animation
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            submitBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
});
