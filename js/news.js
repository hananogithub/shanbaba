// News Page Specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // News filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            newsItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in-up');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('メールマガジンに登録いただき、ありがとうございます！', 'success');
                newsletterForm.reset();
            } else {
                showNotification('メールアドレスを入力してください。', 'error');
            }
        });
    }

    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading more news
            showNotification('追加のニュースを読み込み中...', 'info');
            
            setTimeout(() => {
                showNotification('すべてのニュースを表示しています', 'info');
            }, 1000);
        });
    }

    // News item click animation
    newsItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.read-more')) {
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = 'translateY(-5px)';
                }, 150);
            }
        });
    });

    // Read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('詳細ページは準備中です', 'info');
        });
    });
});
