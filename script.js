/* ============================================
   PORTFOLIO DATA
   ============================================ */
const portfolioItems = [
    {
        id: 1,
        title: 'Editorial Series',
        category: 'Editorial',
        image: 'images/portfolio-1.jpg'
    },
    {
        id: 2,
        title: 'Fashion Campaign',
        category: 'Fashion',
        image: 'images/portfolio-2.jpg'
    },
    {
        id: 3,
        title: 'Runway Show',
        category: 'Fashion',
        image: 'images/portfolio-3.jpg'
    },
    {
        id: 4,
        title: 'Magazine Cover',
        category: 'Editorial',
        image: 'images/portfolio-4.jpg'
    },
    {
        id: 5,
        title: 'Lookbook',
        category: 'Fashion',
        image: 'images/portfolio-5.jpg'
    },
    {
        id: 6,
        title: 'Studio Portraits',
        category: 'Editorial',
        image: 'images/portfolio-6.jpg'
    }
];

/* ============================================
   DOM ELEMENTS
   ============================================ */
const portfolioContainer = document.getElementById('portfolio-container');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCurrent = document.getElementById('lightbox-current');
const lightboxTotal = document.getElementById('lightbox-total');
const navbar = document.getElementById('navbar');

let currentLightboxIndex = 0;

/* ============================================
   PORTFOLIO RENDERING
   ============================================ */
function renderPortfolio() {
    portfolioContainer.innerHTML = '';
    lightboxTotal.textContent = portfolioItems.length;

    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <img 
                src="${item.image}" 
                alt="${item.title}" 
                class="portfolio-image"
                loading="lazy"
            >
            <div class="portfolio-overlay">
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-category">${item.category}</p>
            </div>
        `;

        portfolioItem.addEventListener('click', () => {
            openLightbox(index);
        });

        portfolioContainer.appendChild(portfolioItem);
    });
}

/* ============================================
   LIGHTBOX FUNCTIONS
   ============================================ */
function openLightbox(index) {
    currentLightboxIndex = index;
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
    const item = portfolioItems[currentLightboxIndex];
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxCurrent.textContent = currentLightboxIndex + 1;
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % portfolioItems.length;
    updateLightboxImage();
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + portfolioItems.length) % portfolioItems.length;
    updateLightboxImage();
}

/* ============================================
   LIGHTBOX EVENT LISTENERS
   ============================================ */
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbar);

/* ============================================
   SMOOTH SCROLL FOR NAVIGATION LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   INTERSECTION OBSERVER - FADE IN ANIMATIONS
   ============================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to portfolio items
function observePortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

/* ============================================
   INITIALIZATION
   ============================================ */
function init() {
    renderPortfolio();
    updateNavbar();
    
    // Observe portfolio items after rendering
    setTimeout(observePortfolioItems, 100);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
