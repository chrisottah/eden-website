// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ============================================
// ANIMATED HERO TEXT
// ============================================
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');

const titleText = 'EDENHUB';
const subtitleText = 'building the future, one intelligent solution at a time';

// Animate title letters one by one
titleText.split('').forEach((letter, index) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = letter;
    span.style.animationDelay = `${index * 0.1}s`;
    heroTitle.appendChild(span);
});

// Animate subtitle words one by one
subtitleText.split(' ').forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word + ' ';
    span.style.animationDelay = `${0.8 + index * 0.15}s`;
    heroSubtitle.appendChild(span);
});

// ============================================
// SCROLL ANIMATION OBSERVER
// ============================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow to header when scrolled
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ============================================
// CUSTOM FUNCTIONALITY - ADD YOUR CODE BELOW
// ============================================

/*
 * Example: Add form validation, contact form submission, 
 * analytics tracking, or any other custom features here.
 */