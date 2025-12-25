// ==================== //
// Particles.js Configuration - NEON THEME
// ==================== //
particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#ff00ff', '#00ffff', '#00ff00']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.2,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.5,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ff00ff',
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.8
                }
            },
            push: {
                particles_nb: 6
            }
        }
    },
    retina_detect: true
});

// ==================== //
// Mobile Navigation
// ==================== //
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ==================== //
// Header Scroll Effect
// ==================== //
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.8)';
        header.style.boxShadow = 'none';
    }
});

// ==================== //
// Chip Type Tabs
// ==================== //
const chipTabs = document.querySelectorAll('.chip-tab');
const qualcommSection = document.getElementById('qualcomm-section');
const kirinSection = document.getElementById('kirin-section');

chipTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all tabs
        chipTabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked tab
        tab.classList.add('active');

        const chipType = tab.getAttribute('data-chip');

        if (chipType === 'qualcomm') {
            qualcommSection.classList.remove('hidden');
            kirinSection.classList.add('hidden');
            // Reset filter for qualcomm section
            resetFilters('qualcomm');
        } else {
            qualcommSection.classList.add('hidden');
            kirinSection.classList.remove('hidden');
            // Reset filter for kirin section
            resetFilters('kirin');
        }
    });
});

function resetFilters(chipType) {
    const section = chipType === 'qualcomm' ? qualcommSection : kirinSection;
    const filterBtns = section.querySelectorAll('.filter-btn');
    const modelCards = section.querySelectorAll('.model-card');
    
    filterBtns.forEach((btn, index) => {
        if (index === 0) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    modelCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

// ==================== //
// Models Filter (Updated for both sections)
// ==================== //
function setupModelFilters(section) {
    const filterBtns = section.querySelectorAll('.filter-btn');
    const modelCards = section.querySelectorAll('.model-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from buttons in this section only
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            modelCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const isAllFilter = filter.startsWith('all-');
                
                if (isAllFilter || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize filters for both sections
if (qualcommSection) setupModelFilters(qualcommSection);
if (kirinSection) setupModelFilters(kirinSection);

// ==================== //
// Smooth Scroll for Anchor Links
// ==================== //
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

// ==================== //
// Intersection Observer for Animations
// ==================== //
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

// Observe all animatable elements
document.querySelectorAll('.service-card, .model-card, .why-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ==================== //
// Counter Animation (if needed)
// ==================== //
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ==================== //
// Typing Effect (Optional)
// ==================== //
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== //
// Add some extra interactions
// ==================== //

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Model cards stagger animation
document.querySelectorAll('.model-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
});

// Console Easter Egg - NEON THEME
console.log('%c⚡ HOS - Huawei Online Service', 'font-size: 20px; font-weight: bold; color: #ff00ff; text-shadow: 0 0 10px #ff00ff;');
console.log('%c🔧 Professional Device Unlock Services', 'font-size: 14px; color: #00ffff; text-shadow: 0 0 10px #00ffff;');
console.log('%c💬 Need help? Join our WhatsApp group!', 'font-size: 12px; color: #00ff00;');

// ==================== //
// Loading Screen
// ==================== //
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Start counter animation after loading
        startCounterAnimation();
    }, 1500);
});

// ==================== //
// Custom Cursor
// ==================== //
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
        }, 50);
    });

    // Add hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .service-card, .model-card, .why-card, .stat-card, .faq-question, .brand-item, .payment-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ==================== //
// Stats Counter Animation
// ==================== //
function startCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                const suffix = stat.getAttribute('data-suffix') || '';
                animateStatCounter(stat, target, suffix);
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
}

function animateStatCounter(element, target, suffix) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// ==================== //
// FAQ Accordion
// ==================== //
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ==================== //
// Back to Top Button
// ==================== //
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== //
// Mobile Bottom Nav - Scroll to Top
// ==================== //
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== //
// Step Cards Animation
// ==================== //
const stepCards = document.querySelectorAll('.step-card');

stepCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
});

const stepsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            stepCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }
    });
}, { threshold: 0.3 });

const stepsContainer = document.querySelector('.steps-container');
if (stepsContainer) {
    stepsObserver.observe(stepsContainer);
}

// ==================== //
// Stat Cards Animation
// ==================== //
const statCards = document.querySelectorAll('.stat-card');

statCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
});

const statCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statCardsObserver.observe(statsSection);
}

// ==================== //
// Brand Slider Pause on Hover
// ==================== //
const brandsTrack = document.querySelector('.brands-track');

if (brandsTrack) {
    brandsTrack.addEventListener('mouseenter', () => {
        brandsTrack.style.animationPlayState = 'paused';
    });
    
    brandsTrack.addEventListener('mouseleave', () => {
        brandsTrack.style.animationPlayState = 'running';
    });
}

// ==================== //
// Download Section - Tabs & Accordion
// ==================== //

// Download Tabs
const downloadTabs = document.querySelectorAll('.download-tab');
const downloadCategories = document.querySelectorAll('.download-category');

downloadTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all tabs
        downloadTabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked tab
        tab.classList.add('active');
        
        const category = tab.dataset.category;
        
        downloadCategories.forEach(cat => {
            if (category === 'all') {
                cat.classList.remove('hidden');
            } else {
                if (cat.dataset.cat === category) {
                    cat.classList.remove('hidden');
                } else {
                    cat.classList.add('hidden');
                }
            }
        });
    });
});

// Download Accordion
const categoryHeaders = document.querySelectorAll('.category-header');

categoryHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const category = header.parentElement;
        category.classList.toggle('open');
    });
});

// Sub-Accordion for nested items (like Kirin 710)
const subAccordionHeaders = document.querySelectorAll('.sub-accordion-header');

subAccordionHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent parent accordion from toggling
        const subAccordion = header.parentElement;
        subAccordion.classList.toggle('open');
    });
});

// Open first category by default
const firstCategory = document.querySelector('.download-category');
if (firstCategory) {
    firstCategory.classList.add('open');
}
