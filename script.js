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
            status: "complété"
        },
        {
            id: 2,
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
            id: 3,
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
        }
    ];
}

// VARIABLES GLOBALES CARROUSEL
let currentSlide = 0;
let autoSlideInterval;
const ROTATION_DELAY = 20000; // 20 secondes

function initCarousel() {
    create3DCarouselCards();
    createDots();
    createTimer();
    startAutoSlide();
    setupCarouselEvents();
    updateCarousel();
}

function create3DCarouselCards() {
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card-3d';
        card.setAttribute('data-project-id', project.id);
        
        card.innerHTML = `
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/320x180/0a0a1a/00f0ff?text=${encodeURIComponent(project.title)}'">
                     
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

function createTimer() {
    const timerHTML = `
        <div class="carousel-timer">
            <div class="timer-bar">
                <div class="timer-progress" id="timerProgress"></div>
            </div>
        </div>
    `;
    
    const nav = document.querySelector('.carousel-nav');
    if (nav && !document.querySelector('.carousel-timer')) {
        nav.insertAdjacentHTML('beforebegin', timerHTML);
    }
}

function updateCarousel() {
    const cards = document.querySelectorAll('.project-card-3d');
    const total = cards.length;
    
    cards.forEach((card, index) => {
        // Calcul de la position relative
        let position = index - currentSlide;
        
        // Ajustement pour le défilement circulaire
        if (position > Math.floor(total / 2)) {
            position -= total;
        } else if (position < -Math.floor(total / 2)) {
            position += total;
        }
        
        const angle = position * (360 / total);
        const distance = 400; // Distance du centre
        
        // Calcul de la position 3D
        const x = Math.sin(angle * Math.PI / 180) * distance;
        const z = -Math.cos(angle * Math.PI / 180) * distance;
        
        // Réinitialiser toutes les classes
        card.classList.remove('active', 'left-card', 'right-card');
        
        // Appliquer les transformations de base
        card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg)`;
        
        if (position === 0) {
            // 🎯 CARTE ACTIVE - TRÈS GRANDE ET NETTE
            card.classList.add('active');
            card.style.transform = `translateX(${x}px) translateZ(${z}px) scale(var(--active-scale)) rotateY(${-angle}deg)`;
            card.style.opacity = '1';
            card.style.filter = 'blur(0) brightness(var(--active-brightness))';
            
        } else if (Math.abs(position) === 1) {
            // 🔄 CARTES ADJACENTES - PETITES ET FLOUES
            if (position === -1) card.classList.add('left-card');
            if (position === 1) card.classList.add('right-card');
            
            card.style.transform = `translateX(${x}px) translateZ(${z}px) scale(var(--adjacent-scale)) rotateY(${-angle}deg)`;
            card.style.opacity = 'var(--adjacent-opacity)';
            card.style.filter = 'blur(4px) brightness(0.8)';
            
        } else {
            // 🌫️ CARTES ÉLOIGNÉES - TRÈS PETITES ET TRÈS FLOUES
            card.style.transform = `translateX(${x}px) translateZ(${z}px) scale(var(--distant-scale)) rotateY(${-angle}deg)`;
            card.style.opacity = 'var(--distant-opacity)';
            card.style.filter = 'blur(8px) brightness(0.6)';
        }
    });
    
    // Mettre à jour les dots de navigation
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

function startTimer() {
    const timerProgress = document.getElementById('timerProgress');
    if (timerProgress) {
        timerProgress.classList.remove('animating');
        // Réinitialiser l'animation
        void timerProgress.offsetWidth;
        timerProgress.classList.add('animating');
    }
}

function startAutoSlide() {
    startTimer();
    autoSlideInterval = setInterval(nextSlide, ROTATION_DELAY);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function setupCarouselEvents() {
    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
    
    // Pause on hover
    const carousel = document.querySelector('.carousel-3d-container');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
        const timerProgress = document.getElementById('timerProgress');
        if (timerProgress) timerProgress.classList.remove('animating');
    });
    
    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === ' ') { // Espace pour pause/play
            e.preventDefault();
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
                document.getElementById('timerProgress')?.classList.remove('animating');
            } else {
                startAutoSlide();
            }
        }
    });
    
    // Glissement tactile pour mobile
    let startX = 0;
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Seuil de glissement
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
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
            e.preventDefault(); // Empêche la soumission normale
            
            // Afficher le loading
            if (submitBtn) {
                submitBtn.disabled = true;
                if (btnText) btnText.style.display = 'none';
                if (btnLoading) btnLoading.style.display = 'inline-block';
            }
            
            showFormMessage('Envoi du message en cours...', 'loading');
            
            try {
                // Envoyer via Formspree API
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
    // Supprimer l'ancien message
    const oldMessage = document.querySelector('.form-message');
    if (oldMessage) oldMessage.remove();
    
    // Créer le nouveau message
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    
    // Ajouter après le formulaire
    const form = document.getElementById('contactForm');
    form.appendChild(messageEl);
    
    // Afficher avec animation
    setTimeout(() => messageEl.classList.add('show'), 10);
    
    // Cacher après 5 secondes
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
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animation Burger
            burger.classList.toggle('toggle');
            
            // Animation Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
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

    // Observer les sections
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
