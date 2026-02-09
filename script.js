// ============================================
// THEME TOGGLE FUNCTIONALITY (Default: Dark)
// ============================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Default to 'dark' if no preference is saved
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('nav a');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    // Simple toggle animation for the burger icon
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = nav.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = nav.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = nav.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
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
    span.textContent = word;
    span.style.animationDelay = `${0.8 + index * 0.15}s`;
    heroSubtitle.appendChild(span);
});

// ============================================
// TECH BACKGROUND ANIMATION (Constellation)
// ============================================
const canvas = document.getElementById('techCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const connectionDistance = 150; // Distance at which lines appear

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Slightly larger particles
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.reset();
        }
    }
    draw() {
        const brandColor = getComputedStyle(document.documentElement).getPropertyValue('--brand-color').trim();
        ctx.fillStyle = brandColor;
        ctx.globalAlpha = 0.4; // Increased opacity for better visibility
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawLines() {
    const brandColor = getComputedStyle(document.documentElement).getPropertyValue('--brand-color').trim();
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                // Lines get fainter as particles move apart
                let opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = brandColor;
                ctx.globalAlpha = opacity * 0.2; // Subtle connecting lines
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawLines();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initCanvas);
initCanvas();
// Created 100 particles for a denser tech look
particles = [];
for (let i = 0; i < 100; i++) particles.push(new Particle());
animateParticles();

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
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
        header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});