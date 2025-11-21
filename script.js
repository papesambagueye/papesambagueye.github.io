// DONNÉES DES PROJETS PERSONNALISÉES
let projects = [];

// Charger les projets depuis un fichier externe
async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        const data = await response.json();
        projects = data.projects || data;
        initCarousel();
    } catch (error) {
        console.log('Chargement des projets échoué, utilisation des données par défaut', error);
        projects = getDefaultProjects();
        initCarousel();
    }
}

// TES PROJETS PERSONNELS
function getDefaultProjects() {
    return [
        {
            id: 1,
            title: "Maquette publicitaire Shell Select",
            description: "Conception et concrétisation des affiches pour l'entreprise BIMA CASH de SHELL",
            image: "images/shell-select.jpg",
            technologies: ["Adobe Creative Suite", "Figma", "Photoshop", "Illustrator", "Design Print", "UI/UX"],
            demoLink: "#",
            codeLink: "#",
            features: [
                "Conception visuelle sur-mesure",
                "Adaptation multi-supports",
                "Respect de la charte graphique Shell",
                "Optimisation pour l'impression",
                "Variations créatives selon campagnes"
            ],
            developerHighlight: "Création de visuels impactants alignés avec l'identité de marque",
            challenges: "Adapter le message BIMA CASH à l'univers visuel Shell tout en maintenant une forte attractivité",
            role: "Designer Graphique - Conception visuelle et direction artistique",
            status: "complété"
        },
        {
            id: 2,
            title: "Portfolio Personnel",
            description: "Site portfolio interactif avec carrousel 3D et design moderne",
            image: "images/portfolio.jpg",
            technologies: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub Pages"],
            demoLink: "#",
            codeLink: "#",
            features: [
                "Carrousel 3D responsive",
                "Design avec effets fluorescents animés",
                "Optimisation SEO et performances",
                "Interface utilisateur intuitive",
                "Compatibilité mobile et desktop"
            ],
            developerHighlight: "Carrousel 3D innovant avec mise en avant des projets",
            challenges: "Création d'un carrousel 3D fluide et responsive",
            role: "Développeur Frontend - Design et développement complet",
            status: "complété"
        },
        {
            id: 3,
            title: "AutoFlow",
            description: "Plateforme d'automatisation d'entreprise avec assistance IA intégrée",
            image: "images/autoflow.jpg",
            technologies: ["React", "Node.js", "Express", "MySQL", "IA intégrée", "Electron"],
            demoLink: "#",
            codeLink: "#",
            features: [
                "Interface guidée pour configurations étape par étape",
                "Assistance IA intégrée pour optimisations",
                "Gestion sécurisée des données d'entreprise",
                "Test et prévisualisation des automatisations",
                "Version desktop possible avec Electron"
            ],
            developerHighlight: "IA intégrée locale pour guider les utilisateurs sans API externe",
            challenges: "Intégration d'IA locale capable d'assister sans dépendances externes",
            role: "Développeur Principal - Frontend, backend et intégration IA",
            status: "en-développement"
        },
        {
            id: 4,
            title: "Shop221",
            description: "Plateforme e-commerce pour vendeurs locaux sénégalais avec géolocalisation et QR codes uniques",
            image: "images/shop221.jpg",
            technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL", "Leaflet.js", "QR Code", "JWT"],
            demoLink: "#",
            codeLink: "#",
            features: [
                "Création de comptes vendeurs avec approbation admin",
                "QR codes uniques pour chaque boutique",
                "Géolocalisation des boutiques proches",
                "Catalogue produits avec photos et prix",
                "Système de recherche avancé"
            ],
            developerHighlight: "Soutien aux petits vendeurs locaux avec une solution complète",
            challenges: "Gestion de la géolocalisation et affichage dynamique des boutiques",
            role: "Développeur Fullstack - Création frontend, backend et base de données",
            status: "en-développement"
        },
        {
            id: 5,
            title: "Système de Gestion Longrich Saint-Louis",
            description: "Plateforme intégrée de suivi commercial avec gestion automatique des stocks, analyse prédictive et reporting avancé",
            image: "images/longrich-system.jpg",
            technologies: ["PHP 8", "MySQL Avancé", "JavaScript", "Bootstrap 5", "API REST", "Electron Desktop"],
            demoLink: "#",
            codeLink: "#",
            features: [
                "Monitoring Temps Réel des Stocks et Ventes",
                "Analyse Prédictive et Intelligence Business",
                "Gestion Centralisée Clients et Transactions",
                "Tableaux de Bord Interactifs et Rapports Dynamiques",
                "Alertes Intelligentes et Recommandations"
            ],
            developerHighlight: "Développement d'un moteur d'IA local pour l'optimisation automatique et les prévisions business",
            challenges: "Création d'algorithmes de machine learning autonomes sans dépendances externes cloud",
            role: "Développeur Full-Stack - Architecture, backend, frontend et intelligence artificielle",
            status: "complété"
        }
    ];
}

// VARIABLES GLOBALES CARROUSEL
let currentSlide = 0;
let autoSlideInterval;
const ROTATION_DELAY = 5000; // 5 secondes

function initCarousel() {
    createCarouselCards();
    createDots();
    setupCarouselEvents();
    updateCarousel();
    startAutoSlide();
}

function createCarouselCards() {
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card-3d';
        card.setAttribute('data-project-id', project.id);
        
        // Utiliser des placeholders SVG générés dynamiquement
        const placeholderSVG = generateProjectPlaceholder(project.title, project.status);
        
        card.innerHTML = `
            <div class="project-image-container">
                <div class="project-image-placeholder">
                    ${placeholderSVG}
                </div>
                <div class="project-status project-status-${project.status}">
                    ${project.status === 'complété' ? 'Complété' : 'En Développement'}
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                
                <div class="project-features">
                    ${project.features.slice(0, 3).map(feature => 
                        `<div class="project-feature">
                            <i class="fas fa-check-circle"></i>
                            <span>${feature}</span>
                        </div>`
                    ).join('')}
                </div>
                
                <div class="project-highlight">
                    <div class="project-highlight-text">
                        <i class="fas fa-star"></i>
                        ${project.developerHighlight}
                    </div>
                </div>
                
                <div class="project-tech">
                    ${project.technologies.slice(0, 5).map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                
                <div class="project-links-container">
                    <div class="project-links">
                        <a href="${project.demoLink}" class="project-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Voir la démo
                        </a>
                        <a href="${project.codeLink}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i> Code source
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            goToSlide(index);
        });
        
        track.appendChild(card);
    });
}

// Fonction pour générer des placeholders SVG
function generateProjectPlaceholder(title, status) {
    const colors = {
        'complété': '#00ff88',
        'en-développement': '#ffc800'
    };
    
    const color = colors[status] || '#00f0ff';
    
    return `
        <svg width="380" height="200" viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="200" fill="#0a0a1a"/>
            <rect x="10" y="10" width="360" height="180" fill="#050510" stroke="${color}" stroke-width="2"/>
            <text x="190" y="80" text-anchor="middle" fill="${color}" font-family="Arial" font-size="18" font-weight="bold">${title}</text>
            <text x="190" y="110" text-anchor="middle" fill="#ffffff" font-family="Arial" font-size="14">Projet ${status === 'complété' ? 'Complété' : 'En Développement'}</text>
            <circle cx="190" cy="140" r="20" fill="none" stroke="${color}" stroke-width="2">
                <animate attributeName="r" from="15" to="25" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="1" to="0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
        </svg>
    `;
}

function createDots() {
    const dotsContainer = document.getElementById('carouselDots');
    dotsContainer.innerHTML = '';
    
    projects.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === currentSlide ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const cardWidth = 380 + 32; // largeur carte + gap
    track.scrollTo({
        left: currentSlide * cardWidth,
        behavior: 'smooth'
    });
    
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % projects.length;
    updateCarousel();
    resetAutoSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + projects.length) % projects.length;
    updateCarousel();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, ROTATION_DELAY);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function setupCarouselEvents() {
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Pause on hover
    const carousel = document.querySelector('.carousel-3d-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
}

// FORMULAIRE DE CONTACT AVEC FORMSPREE
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Afficher le loading
            if (submitBtn) {
                submitBtn.disabled = true;
                if (btnText) btnText.style.display = 'none';
                if (btnLoading) btnLoading.style.display = 'inline-block';
            }
            
            showFormMessage('Envoi du message en cours...', 'loading');
            
            try {
                const formData = new FormData(form);
                
                const response = await fetch('https://formspree.io/f/manvdylv', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormMessage('✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
                    form.reset();
                } else {
                    throw new Error('Erreur d\'envoi');
                }
                
            } catch (error) {
                showFormMessage('❌ Erreur lors de l\'envoi. Contactez-moi directement à papisgye05@gmail.com', 'error');
            } finally {
                // Réactiver le bouton
                if (submitBtn) {
                    submitBtn.disabled = false;
                    if (btnText) btnText.style.display = 'inline-block';
                    if (btnLoading) btnLoading.style.display = 'none';
                }
            }
        });
    }
}

function showFormMessage(message, type) {
    const oldMessage = document.querySelector('.form-message');
    if (oldMessage) oldMessage.remove();
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.appendChild(messageEl);
    
    setTimeout(() => messageEl.classList.add('show'), 10);
    
    if (type !== 'error') {
        setTimeout(() => {
            messageEl.classList.remove('show');
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 500);
        }, 5000);
    }
}

// NAVIGATION MOBILE
function setupMobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav && burger) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
}

// ANIMATIONS AU SCROLL
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// INITIALISATION AU CHARGEMENT
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupMobileNav();
    setupContactForm();
    setupScrollAnimations();
});

// UTILITAIRES
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Redimensionnement responsive
window.addEventListener('resize', debounce(() => {
    updateCarousel();
}, 250));
