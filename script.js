/* ============================================
   PORTFOLIO DATA - PROJECTS WITH IMAGES
   ============================================ */
const projects = [
    {
        id: 1,
        name: 'Editorial Series',
        description: 'A collection of editorial portraits exploring light and shadow in contemporary fashion photography.',
        images: [
            'images/portfolio-1.jpg',
            'images/portfolio-2.jpg',
            'images/portfolio-3.jpg'
        ],
        credits: {
            photographer: 'John Doe',
            stylist: 'Jane Smith',
            makeup: 'Artist Name',
            hair: 'Hair Stylist Name',
            creative_direction: 'Creative Director',
            model: 'Model Name'
        }
    },
    {
        id: 2,
        name: 'Fashion Campaign',
        description: 'A sophisticated campaign featuring bold minimalist styling and natural lighting.',
        images: [
            'images/portfolio-4.jpg',
            'images/portfolio-5.jpg'
        ],
        credits: {
            photographer: 'John Doe',
            stylist: 'Jane Smith',
            model: 'Model Name'
        }
    },
    {
        id: 3,
        name: 'Studio Portraits',
        description: 'Intimate studio portraits showcasing personality and presence.',
        images: [
            'images/portfolio-6.jpg'
        ],
        credits: {
            photographer: 'John Doe',
            makeup: 'Artist Name',
            model: 'Model Name'
        }
    }
];

/* ============================================
   POLAROIDS DATA
   ============================================ */
const polaroids = [
    'images/polaroid-01.jpg',
    'images/polaroid-02.jpg',
    'images/polaroid-03.jpg',
    'images/polaroid-04.jpg',
    'images/polaroid-05.jpg',
    'images/polaroid-06.jpg'
];

/* ============================================
   DOM ELEMENTS
   ============================================ */
const portfolioContainer = document.getElementById('portfolio-container');
const polaroidsContainer = document.getElementById('polaroids-container');
const projectViewer = document.getElementById('project-viewer');
const projectViewerContent = document.getElementById('project-viewer-content');
const projectViewerClose = document.getElementById('project-viewer-close');
const projectImageContainer = document.getElementById('project-image-container');
const projectImage = document.getElementById('project-image');
const projectInfo = document.getElementById('project-info');
const projectTitle = document.getElementById('project-title');
const projectDescription = document.getElementById('project-description');
const projectCredits = document.getElementById('project-credits');
const projectNavPrev = document.getElementById('project-nav-prev');
const projectNavNext = document.getElementById('project-nav-next');
const projectCounter = document.getElementById('project-counter');
const navbar = document.getElementById('navbar');

let currentProject = null;
let currentImageIndex = 0;
let currentPolaroidIndex = 0;
let isViewingPolaroid = false;

/* ============================================
   PORTFOLIO RENDERING - GRID VIEW
   ============================================ */
function renderPortfolio() {
    portfolioContainer.innerHTML = '';

    projects.forEach((project) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        const coverImage = project.images[0];
        
        portfolioItem.innerHTML = `
            <img 
                src="${coverImage}" 
                alt="${project.name}" 
                class="portfolio-image"
                loading="lazy"
            >
            <div class="portfolio-overlay">
                <div class="portfolio-overlay-content">
                    <h3 class="portfolio-title">${project.name}</h3>
                    <p class="portfolio-description">${project.description}</p>
                </div>
            </div>
        `;

        portfolioItem.addEventListener('click', () => {
            openProject(project.id - 1);
        });

        portfolioContainer.appendChild(portfolioItem);
    });
}

/* ============================================
   POLAROIDS RENDERING
   ============================================ */
function renderPolaroids() {
    polaroidsContainer.innerHTML = '';

    polaroids.forEach((imageUrl, index) => {
        const polaroidItem = document.createElement('div');
        polaroidItem.className = 'polaroid-item';
        
        polaroidItem.innerHTML = `
            <div class="polaroid-frame">
                <div class="polaroid-image-wrapper">
                    <img 
                        src="${imageUrl}" 
                        alt="Polaroid ${index + 1}" 
                        class="polaroid-image"
                        loading="lazy"
                    >
                </div>
                <p class="polaroid-label">Polaroid ${index + 1}</p>
            </div>
        `;

        polaroidItem.addEventListener('click', () => {
            openPolaroid(index);
        });

        polaroidsContainer.appendChild(polaroidItem);
    });
}

/* ============================================
   PROJECT VIEWER FUNCTIONS
   ============================================ */
function openProject(projectIndex) {
    currentProject = projectIndex;
    currentImageIndex = 0;
    isViewingPolaroid = false;
    projectViewer.classList.add('active');
    updateProjectViewer();
    document.body.style.overflow = 'hidden';
}

function openPolaroid(polaroidIndex) {
    currentPolaroidIndex = polaroidIndex;
    isViewingPolaroid = true;
    projectViewer.classList.add('active');
    updatePolaroidViewer();
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    projectViewer.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProject = null;
    isViewingPolaroid = false;
}

function updateProjectViewer() {
    if (currentProject === null) return;

    const project = projects[currentProject];
    const totalImages = project.images.length;
    
    // Update image
    projectImage.src = project.images[currentImageIndex];
    projectImage.alt = project.name;
    
    // Update info
    projectTitle.textContent = project.name;
    projectDescription.textContent = project.description;
    
    // Update credits
    updateCredits(project.credits);
    
    // Update counter
    projectCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;
    
    // Hide/show navigation buttons
    if (totalImages <= 1) {
        projectNavPrev.style.display = 'none';
        projectNavNext.style.display = 'none';
    } else {
        projectNavPrev.style.display = 'flex';
        projectNavNext.style.display = 'flex';
    }
}

function updatePolaroidViewer() {
    const totalPolaroids = polaroids.length;
    
    // Update image
    projectImage.src = polaroids[currentPolaroidIndex];
    projectImage.alt = `Polaroid ${currentPolaroidIndex + 1}`;
    
    // Update info - hide project-specific info for polaroids
    projectTitle.textContent = '';
    projectDescription.textContent = '';
    projectCredits.innerHTML = '';
    projectInfo.style.display = 'none';
    
    // Update counter
    projectCounter.textContent = `${currentPolaroidIndex + 1} / ${totalPolaroids}`;
    
    // Show navigation buttons
    if (totalPolaroids <= 1) {
        projectNavPrev.style.display = 'none';
        projectNavNext.style.display = 'none';
    } else {
        projectNavPrev.style.display = 'flex';
        projectNavNext.style.display = 'flex';
    }
}

function updateCredits(credits) {
    projectCredits.innerHTML = '';
    
    const creditsOrder = [
        { key: 'photographer', label: 'Photography' },
        { key: 'stylist', label: 'Styling' },
        { key: 'makeup', label: 'Makeup' },
        { key: 'hair', label: 'Hair' },
        { key: 'creative_direction', label: 'Creative Direction' },
        { key: 'model', label: 'Model' }
    ];
    
    creditsOrder.forEach(({ key, label }) => {
        if (credits[key]) {
            const creditItem = document.createElement('p');
            creditItem.className = 'credit-item';
            creditItem.innerHTML = `<span class="credit-label">${label}:</span> <span class="credit-value">${credits[key]}</span>`;
            projectCredits.appendChild(creditItem);
        }
    });
}

function nextProjectImage() {
    if (isViewingPolaroid) {
        currentPolaroidIndex = (currentPolaroidIndex + 1) % polaroids.length;
        updatePolaroidViewer();
    } else {
        if (currentProject === null) return;
        const totalImages = projects[currentProject].images.length;
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateProjectViewer();
    }
}

function prevProjectImage() {
    if (isViewingPolaroid) {
        currentPolaroidIndex = (currentPolaroidIndex - 1 + polaroids.length) % polaroids.length;
        updatePolaroidViewer();
    } else {
        if (currentProject === null) return;
        const totalImages = projects[currentProject].images.length;
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateProjectViewer();
    }
}

/* ============================================
   PROJECT VIEWER EVENT LISTENERS
   ============================================ */
projectViewerClose.addEventListener('click', closeProject);
projectNavNext.addEventListener('click', nextProjectImage);
projectNavPrev.addEventListener('click', prevProjectImage);

projectViewer.addEventListener('click', (e) => {
    if (e.target === projectViewer) {
        closeProject();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!projectViewer.classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextProjectImage();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevProjectImage();
    } else if (e.key === 'Escape') {
        closeProject();
    }
});

// Touch navigation for mobile
let touchStartX = 0;
let touchEndX = 0;

projectImageContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

projectImageContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next image
            nextProjectImage();
        } else {
            // Swiped right - previous image
            prevProjectImage();
        }
    }
}

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

function observePortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

function observePolaroidItems() {
    const polaroidItems = document.querySelectorAll('.polaroid-item');
    polaroidItems.forEach(item => {
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
    renderPolaroids();
    updateNavbar();
    
    setTimeout(() => {
        observePortfolioItems();
        observePolaroidItems();
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
