/* ============================================
   PORTFOLIO DATA - PROJECTS WITH IMAGES
   ============================================ */
const projects = [
    {
        id: 1,
        name: "Rocio Meyer's Personal Project",
        cover: 'images/project1/005781-018-VK.JPG',
        images: [
            'images/project1/005781-005-VK.JPG',
            'images/project1/005781-007-VK.JPG',
            'images/project1/005781-015-VK.JPG',
            'images/project1/005781-026-VK.JPG',
            'images/project1/005781-033-VK.JPG'
        ],
        credits: {
            photographer: 'Rocio Meyer',
            stylist: 'Rocio Meyer',
            makeup: 'Jul Michèle Buch Vera'
        }
    },
    {
        id: 2,
        name: 'Final Design Project',
        cover: 'images/project2/IMG_0781.JPG',
        images: [
            'images/project2/IMG_0779.JPG',
            'images/project2/IMG_0781.JPG',
            'images/project2/IMG_0784.JPG'
        ],
        credits: {
            photographer: 'Martina Moreno @martinamorenoooo',
            makeup: '@cmakkeup @muaxcelia',
            hair: '@cmakkeup @muaxcelia',
            creative_direction: 'Ana Izquierdo @annaizzzzz'
        }
    },
    {
        id: 3,
        name: 'Personal Project',
        cover: 'images/project3/cover3.JPG',
        images: [
            'images/project3/IMG_1053.JPG',
            'images/project3/IMG_1054.JPG',
            'images/project3/IMG_1055.JPG',
            'images/project3/cover3.JPG'
        ],
        credits: {
            photographer: 'Jack @jacky_varlet',
            stylist: '@almightymey_',
            makeup: 'Flor @florenciaricci_art',
            hair: 'Flor @florenciaricci_art',
            creative_direction: 'Jack'
        }
    },
    {
        id: 4,
        name: 'Personal Project',
        cover: null,
        images: [],
        credits: {
            photographer: 'Jack @jacky_varlet',
            stylist: '@almightymey_',
            makeup: 'Flor @florenciaricci_art',
            hair: 'Flor @florenciaricci_art',
            creative_direction: 'Jack'
        }
    },
    {
        id: 5,
        name: 'Lost in Limbo',
        cover: 'images/project5/cover5.JPG',
        images: [
            'images/project5/IMG_1061.JPG',
            'images/project5/IMG_1065.JPG',
            'images/project5/IMG_1066.JPG',
            'images/project5/IMG_1070.JPG',
            'images/project5/cover5.JPG'
        ],
        credits: {
            photography_post_production: 'Carla @klar_kei',
            stylist: 'Jul Michèle Buch Vera',
            makeup: 'Jennifer Ramos @jennifert.ramos',
            hair: 'Jennifer Ramos @jennifert.ramos'
        }
    },
    {
        id: 6,
        name: 'Wabi-Sabi',
        cover: 'images/project6/IMG_4254.JPG',
        images: [
            'images/project6/IMG_4252.JPG',
            'images/project6/IMG_4253.JPG',
            'images/project6/IMG_4254.JPG'
        ],
        credits: {
            photographer: 'Odeline @fotodeline'
        }
    },
    {
        id: 7,
        name: 'Tou com el ciment',
        cover: 'images/project7/cover7',
        images: [
            'images/project7/125295d1-fa15-46e9-8a35-6a08bd3deeca.JPG',
            'images/project7/8191a390-afba-4766-a71d-a2c894c82af8.JPG',
            'images/project7/945519bc-440d-43dc-b39e-c14cc18c61aa.JPG',
            'images/project7/defcfc8f-97e8-4af3-b1aa-48e31798b998.JPG',
            'images/project7/cover7'
        ],
        credits: {
            photographer: 'Berta @berta.montblanch'
        }
    },
    {
        id: 8,
        name: 'Your Body, My Religion',
        cover: null,
        images: [],
        credits: {
            photographer: 'Paulo Herrera @pauloherrera.foto',
            stylist: 'Elena Alvira @elenaaalvira; Natalia Arroyas @nataliaarroyas; Casilda Ortiz @cassortiz; Sarah Leiva @sarahleiva_',
            designer_creative_direction: 'Alejandra Elizondo @aleelizondodiaz'
        }
    }
];

const polaroids = [
    'images/polaroid-01.jpg',
    'images/polaroid-02.jpg',
    'images/polaroid-03.jpg',
    'images/polaroid-04.jpg',
    'images/polaroid-05.jpg',
    'images/polaroid-06.jpg'
];

const portfolioContainer = document.getElementById('portfolio-container');
const polaroidsContainer = document.getElementById('polaroids-container');
const projectViewer = document.getElementById('project-viewer');
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

function renderPortfolio() {
    portfolioContainer.innerHTML = '';

    projects.forEach((project) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        const coverImage = project.cover;

        portfolioItem.innerHTML = `
            ${coverImage
                ? `<img src="${coverImage}" alt="${project.name}" class="portfolio-image" loading="lazy">`
                : '<div class="portfolio-image portfolio-image-placeholder" aria-label="Image coming soon"></div>'}
            <div class="portfolio-overlay">
                <div class="portfolio-overlay-content">
                    <h3 class="portfolio-title">${project.name}</h3>
                </div>
            </div>
        `;

        portfolioItem.addEventListener('click', () => openProject(project.id - 1));
        portfolioContainer.appendChild(portfolioItem);
    });
}

function renderPolaroids() {
    polaroidsContainer.innerHTML = '';

    polaroids.forEach((imageUrl, index) => {
        const polaroidItem = document.createElement('div');
        polaroidItem.className = 'polaroid-item';
        polaroidItem.innerHTML = `
            <div class="polaroid-frame">
                <div class="polaroid-image-wrapper">
                    <img src="${imageUrl}" alt="Polaroid ${index + 1}" class="polaroid-image" loading="lazy">
                </div>
                <p class="polaroid-label">Polaroid ${index + 1}</p>
            </div>
        `;
        polaroidItem.addEventListener('click', () => openPolaroid(index));
        polaroidsContainer.appendChild(polaroidItem);
    });
}

function openProject(projectIndex) {
    currentProject = projectIndex;
    currentImageIndex = 0;
    isViewingPolaroid = false;
    projectInfo.style.display = '';
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
    projectTitle.textContent = project.name;
    projectDescription.textContent = '';
    updateCredits(project.credits);

    if (totalImages === 0) {
        projectImage.removeAttribute('src');
        projectImage.alt = 'Images coming soon';
        projectCounter.textContent = '—';
        projectNavPrev.style.display = 'none';
        projectNavNext.style.display = 'none';
        return;
    }

    projectImage.src = project.images[currentImageIndex];
    projectImage.alt = project.name;
    projectCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;
    projectNavPrev.style.display = 'flex';
    projectNavNext.style.display = 'flex';
}

function updatePolaroidViewer() {
    const totalPolaroids = polaroids.length;
    projectImage.src = polaroids[currentPolaroidIndex];
    projectImage.alt = `Polaroid ${currentPolaroidIndex + 1}`;
    projectTitle.textContent = '';
    projectDescription.textContent = '';
    projectCredits.innerHTML = '';
    projectInfo.style.display = 'none';
    projectCounter.textContent = `${currentPolaroidIndex + 1} / ${totalPolaroids}`;
    projectNavPrev.style.display = 'flex';
    projectNavNext.style.display = 'flex';
}

function updateCredits(credits) {
    projectCredits.innerHTML = '';
    const creditsOrder = [
        { key: 'photographer', label: 'Photography' },
        { key: 'photography_post_production', label: 'Photography & Post-Production' },
        { key: 'stylist', label: 'Styling' },
        { key: 'makeup', label: 'Makeup' },
        { key: 'hair', label: 'Hair' },
        { key: 'creative_direction', label: 'Creative Direction' },
        { key: 'designer_creative_direction', label: 'Designer & Creative Director' }
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
        return;
    }
    if (currentProject === null || projects[currentProject].images.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % projects[currentProject].images.length;
    updateProjectViewer();
}

function prevProjectImage() {
    if (isViewingPolaroid) {
        currentPolaroidIndex = (currentPolaroidIndex - 1 + polaroids.length) % polaroids.length;
        updatePolaroidViewer();
        return;
    }
    if (currentProject === null || projects[currentProject].images.length === 0) return;
    const totalImages = projects[currentProject].images.length;
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateProjectViewer();
}

projectViewerClose.addEventListener('click', closeProject);
projectNavNext.addEventListener('click', nextProjectImage);
projectNavPrev.addEventListener('click', prevProjectImage);
projectViewer.addEventListener('click', (event) => {
    if (event.target === projectViewer) closeProject();
});

document.addEventListener('keydown', (event) => {
    if (!projectViewer.classList.contains('active')) return;
    if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextProjectImage();
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevProjectImage();
    } else if (event.key === 'Escape') {
        closeProject();
    }
});

let touchStartX = 0;
let touchEndX = 0;
projectImageContainer.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
});
projectImageContainer.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) diff > 0 ? nextProjectImage() : prevProjectImage();
});

function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}
window.addEventListener('scroll', updateNavbar);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

function observeItems(selector) {
    document.querySelectorAll(selector).forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

function init() {
    renderPortfolio();
    renderPolaroids();
    updateNavbar();
    setTimeout(() => {
        observeItems('.portfolio-item');
        observeItems('.polaroid-item');
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
