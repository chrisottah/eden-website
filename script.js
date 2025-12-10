// Edenhub Website Script - Updated for Mobile & Animations

// ======================
// THEME TOGGLE FUNCTIONALITY
// ======================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function getPreferredTheme() {
    const savedTheme = localStorage.getItem('edenhub-theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
    localStorage.setItem('edenhub-theme', theme);
}

const preferredTheme = getPreferredTheme();
applyTheme(preferredTheme);

themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    applyTheme(isDarkMode ? 'light' : 'dark');
});

// ======================
// HERO TYPING ANIMATION
// ======================
const typingText = document.getElementById('typingText');
const typingPhrases = [
    "One Intelligent Solution at a Time.",
    "Ethical AI Solutions.",
    "Human-Centered Technology.",
    "Scalable Digital Innovation.",
    "Responsible Automation.",
    "Future-Ready Solutions."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseDuration = 1500;

function startTypingAnimation() {
    const currentPhrase = typingPhrases[currentPhraseIndex];
    
    if (!isDeleting && currentCharIndex < currentPhrase.length) {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(startTypingAnimation, typingSpeed);
    } else if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(startTypingAnimation, pauseDuration);
    } else if (isDeleting && currentCharIndex > 0) {
        typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(startTypingAnimation, deletingSpeed);
    } else {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % typingPhrases.length;
        setTimeout(startTypingAnimation, 500);
    }
}

// ======================
// SCROLL ANIMATIONS
// ======================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.value-card, .service-card, .mission-card, .vision-card, .stat-card');
    
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
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ======================
// MESSAGE ANIMATIONS
// ======================
function initMessageAnimations() {
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.style.animation = 'messageIn 0.5s ease forwards';
        }, index * 300);
    });
}

// ======================
// MOBILE MENU TOGGLE
// ======================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

function initMobileMenu() {
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = isActive 
                ? '<i class="fas fa-bars"></i>' 
                : '<i class="fas fa-times"></i>';
            
            // Prevent body scroll when menu is open on mobile
            if (window.innerWidth <= 768) {
                document.body.style.overflow = isActive ? '' : 'hidden';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            });
        });
    }
}

// ======================
// SMOOTH SCROLL
// ======================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    document.body.style.overflow = '';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ======================
// NAVBAR SCROLL EFFECT
// ======================
function initNavbarScroll() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.style.boxShadow = 'none';
                navbar.style.transform = 'translateY(0)';
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

// ======================
// TOUCH DEVICE OPTIMIZATIONS
// ======================
function initTouchOptimizations() {
    // Add touch-friendly classes
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
    }
    
    // Prevent zoom on double tap for buttons
    document.querySelectorAll('button, .cta-button, .nav-link').forEach(element => {
        element.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
    });
}

// ======================
// PERFORMANCE OPTIMIZATION
// ======================
function initPerformanceOptimizations() {
    // Pause animations when tab not active
    document.addEventListener('visibilitychange', () => {
        const typingCursor = document.querySelector('.typing-cursor');
        if (document.hidden) {
            if (typingCursor) {
                typingCursor.style.animationPlayState = 'paused';
            }
            // Pause all CSS animations
            document.querySelectorAll('*').forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.animationPlayState === 'running') {
                    el.style.animationPlayState = 'paused';
                }
            });
        } else {
            if (typingCursor) {
                typingCursor.style.animationPlayState = 'running';
            }
            // Resume animations
            document.querySelectorAll('*').forEach(el => {
                if (el.style.animationPlayState === 'paused') {
                    el.style.animationPlayState = 'running';
                }
            });
        }
    });
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle responsive adjustments
            if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                document.body.style.overflow = '';
            }
        }, 250);
    });
}

// ======================
// KEYBOARD SHORTCUTS
// ======================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Toggle theme with Alt/Option + T
        if ((e.altKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
        
        // Close mobile menu with Escape
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            document.body.style.overflow = '';
        }
        
        // Navigate with arrow keys when menu is open
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            if (navLinks && navLinks.classList.contains('active')) {
                e.preventDefault();
                const links = document.querySelectorAll('.nav-link');
                const currentIndex = Array.from(links).indexOf(document.activeElement);
                
                if (e.key === 'ArrowDown') {
                    const nextIndex = (currentIndex + 1) % links.length;
                    links[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
                    links[prevIndex].focus();
                }
            }
        }
    });
}

// ======================
// INITIALIZE EVERYTHING
// ======================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🌱 Edenhub Website Loaded', 'color: #10b981; font-size: 16px; font-weight: bold;');
    
    // Start animations
    setTimeout(startTypingAnimation, 1000);
    setTimeout(initScrollAnimations, 500);
    setTimeout(initMessageAnimations, 2000);
    
    // Initialize all functionality
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initTouchOptimizations();
    initPerformanceOptimizations();
    initKeyboardShortcuts();
    
    // Add CSS animations dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        @keyframes floatNode {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes floatNodeMobile {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes messageIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scroll {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(20px); opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);
});

// ======================
// LOADING STATE
// ======================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading indicators if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});