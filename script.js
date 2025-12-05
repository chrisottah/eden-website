// Eden AI Website Script - Corrected Version

// ======================
// THEME TOGGLE FUNCTIONALITY
// ======================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or prefer-color-scheme
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('eden-theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
    localStorage.setItem('eden-theme', theme);
}

// Initialize theme
const preferredTheme = getPreferredTheme();
applyTheme(preferredTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    applyTheme(isDarkMode ? 'light' : 'dark');
});

// ======================
// TYPING ANIMATION
// ======================
const typingText = document.getElementById('typingText');
const typingCursor = document.querySelector('.typing-cursor');

// Phrases to cycle through
const typingPhrases = [
    "Eden AI",
    "Intelligent Coding",
    "Real-time Debugging",
    "AI Pair Programming",
    "Code Optimization",
    "Secure Development"
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
        // Typing forward
        typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(startTypingAnimation, typingSpeed);
    } else if (!isDeleting && currentCharIndex === currentPhrase.length) {
        // Finished typing, pause then start deleting
        isDeleting = true;
        setTimeout(startTypingAnimation, pauseDuration);
    } else if (isDeleting && currentCharIndex > 0) {
        // Deleting text
        typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(startTypingAnimation, deletingSpeed);
    } else {
        // Finished deleting, move to next phrase
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % typingPhrases.length;
        setTimeout(startTypingAnimation, 500);
    }
}

// ======================
// CODE EDITOR ANIMATIONS
// ======================
function animateCodeLines() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        // Reset
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';
        
        // Animate with delay
        setTimeout(() => {
            line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 100 * (index + 1) + 500);
    });
}

// ======================
// FLOATING ELEMENTS
// ======================
function initFloatingElements() {
    const floatElements = document.querySelectorAll('.float-element');
    floatElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
    });
}

// ======================
// MOBILE MENU TOGGLE
// ======================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// ======================
// SMOOTH SCROLL
// ======================
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
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ======================
// NAVBAR SCROLL EFFECT
// ======================
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
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// ======================
// HOVER EFFECTS
// ======================
function initHoverEffects() {
    // Product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Buttons ripple effect
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Only create ripple if not already rippling
            if (this.querySelector('.ripple')) return;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ======================
// RESPONSIVE BEHAVIOR
// ======================
function handleResponsive() {
    const floatElements = document.querySelectorAll('.float-element');
    if (window.innerWidth <= 768) {
        floatElements.forEach(el => {
            el.style.display = 'none';
        });
    } else {
        floatElements.forEach(el => {
            el.style.display = 'flex';
        });
    }
}

// ======================
// INITIALIZE EVERYTHING
// ======================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Eden AI Website Loaded', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
    
    // Start animations
    setTimeout(startTypingAnimation, 1000);
    animateCodeLines();
    initFloatingElements();
    initHoverEffects();
    handleResponsive();
    
    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Handle window resize
window.addEventListener('resize', handleResponsive);

// Handle visibility change (pause animations when tab not active)
document.addEventListener('visibilitychange', () => {
    if (typingCursor) {
        if (document.hidden) {
            typingCursor.style.animationPlayState = 'paused';
        } else {
            typingCursor.style.animationPlayState = 'running';
        }
    }
});

// Add keyboard shortcuts
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
    }
});

// Particle background effect (optional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Remove existing particles
    document.querySelectorAll('.particle').forEach(p => p.remove());
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            background: var(--accent-blue-light);
            opacity: 0.1;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: floatParticle ${duration}s infinite ease-in-out ${delay}s;
        `;
        
        hero.appendChild(particle);
    }
    
    // Add particle animation to CSS
    if (!document.querySelector('#particle-animation')) {
        const particleAnimation = document.createElement('style');
        particleAnimation.id = 'particle-animation';
        particleAnimation.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(20px, -20px); }
                50% { transform: translate(-10px, -40px); }
                75% { transform: translate(15px, -20px); }
            }
        `;
        document.head.appendChild(particleAnimation);
    }
}

// Uncomment to enable particles:
// document.addEventListener('DOMContentLoaded', createParticles);