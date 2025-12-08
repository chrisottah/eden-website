// Edenhub Website Script

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
// VALUES TYPING ANIMATION
// ======================
function initValuesTyping() {
    const valueCards = document.querySelectorAll('.value-card');
    let currentValueIndex = 0;
    let isAnimating = false;
    
    function typeNextValue() {
        if (isAnimating || currentValueIndex >= valueCards.length) return;
        
        isAnimating = true;
        const card = valueCards[currentValueIndex];
        const descriptionElement = card.querySelector('.value-description');
        const text = descriptionElement.dataset.text;
        let charIndex = 0;
        
        descriptionElement.textContent = '';
        card.classList.remove('typing-done');
        
        function typeChar() {
            if (charIndex < text.length) {
                descriptionElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            } else {
                card.classList.add('typing-done');
                isAnimating = false;
                currentValueIndex++;
                if (currentValueIndex < valueCards.length) {
                    setTimeout(typeNextValue, 300);
                } else {
                    // Reset and start over after pause
                    setTimeout(() => {
                        currentValueIndex = 0;
                        valueCards.forEach(card => {
                            card.classList.remove('typing-done');
                            card.querySelector('.value-description').textContent = '';
                        });
                        setTimeout(typeNextValue, 1000);
                    }, 3000);
                }
            }
        }
        
        typeChar();
    }
    
    // Start the animation
    setTimeout(typeNextValue, 2000);
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
            navbar.style.transform = 'translateY(-100%)';
        } else {
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
    // Cards hover effects
    document.querySelectorAll('.value-card, .service-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Social links hover effect
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ======================
// INITIALIZE EVERYTHING
// ======================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🌱 Edenhub Website Loaded', 'color: #10b981; font-size: 16px; font-weight: bold;');
    
    // Start animations
    setTimeout(startTypingAnimation, 1000);
    setTimeout(initValuesTyping, 1500);
    setTimeout(initMessageAnimations, 2000);
    initHoverEffects();
    
    // Add CSS animations
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
        
        @keyframes messageIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scroll {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(20px); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
});

// ======================
// RESPONSIVE BEHAVIOR
// ======================
function handleResponsive() {
    // Hide AI nodes on mobile
    const aiNodes = document.querySelectorAll('.ai-node');
    if (window.innerWidth <= 480) {
        aiNodes.forEach(node => {
            node.style.display = 'none';
        });
    } else {
        aiNodes.forEach(node => {
            node.style.display = 'flex';
        });
    }
}

window.addEventListener('resize', handleResponsive);
document.addEventListener('DOMContentLoaded', handleResponsive);

// ======================
// PERFORMANCE OPTIMIZATION
// ======================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab not active
        const typingCursor = document.querySelector('.typing-cursor');
        if (typingCursor) {
            typingCursor.style.animationPlayState = 'paused';
        }
    } else {
        // Resume animations when tab becomes active
        const typingCursor = document.querySelector('.typing-cursor');
        if (typingCursor) {
            typingCursor.style.animationPlayState = 'running';
        }
    }
});

// ======================
// KEYBOARD SHORTCUTS
// ======================
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

// ======================
// LOADING STATE
// ======================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});