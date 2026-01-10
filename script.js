// Smooth scroll for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Unobserve after animation completes
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that need scroll animations
const animatedElements = document.querySelectorAll('.section-header, .feature-card, .cta-content');
animatedElements.forEach(el => observer.observe(el));

// Parallax effect on hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        // Subtle parallax - content moves slower than scroll
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.8;
    }
});

// Add staggered animation delay to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Enhanced hover effect for CTA buttons
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Dynamic gradient on mouse move for hero section
hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { width, height } = hero.getBoundingClientRect();

    const xPercent = (clientX / width) * 100;
    const yPercent = (clientY / height) * 100;

    hero.style.background = `
        radial-gradient(
            circle at ${xPercent}% ${yPercent}%,
            #1a1f3a 0%,
            #0a0e27 50%,
            #050816 100%
        )
    `;
});

// Reset hero background on mouse leave
hero.addEventListener('mouseleave', () => {
    hero.style.background = 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Optional: Add floating animation to hero image
const heroImage = document.querySelector('.hero-img');
if (heroImage) {
    let floatDirection = 1;
    let floatPosition = 0;

    setInterval(() => {
        floatPosition += 0.3 * floatDirection;

        if (floatPosition > 10 || floatPosition < -10) {
            floatDirection *= -1;
        }

        heroImage.style.transform = `translateY(${floatPosition}px)`;
    }, 50);
}

// Add subtle tilt effect to feature cards
featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Log ready message
console.log('🚀 AI Education website loaded successfully!');
