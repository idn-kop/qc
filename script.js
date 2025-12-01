// ========================================
// QC Service - Interactive JavaScript
// ========================================

// ========================================
// Loading Screen
// ========================================
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
        document.body.style.cursor = 'none';
    }, 1800);
});

// ========================================
// Particle Background
// ========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(199, 0, 11, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.strokeStyle = `rgba(199, 0, 11, ${0.1 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
// Premium Custom Cursor
// ========================================
const cursorCore = document.getElementById('cursorCore');
const cursorRing = document.getElementById('cursorRing');
const cursorGlow = document.getElementById('cursorGlow');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let glowX = 0, glowY = 0;

// Trail particles
const trailParticles = [];
const maxTrailParticles = 15;

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99994;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        opacity: 0.8;
        box-shadow: 0 0 6px var(--primary);
    `;
    cursorTrail.appendChild(particle);
    
    trailParticles.push({
        element: particle,
        life: 1
    });
    
    if (trailParticles.length > maxTrailParticles) {
        const old = trailParticles.shift();
        old.element.remove();
    }
}

// Smooth cursor animation
function animateCursor() {
    // Ring follows with smooth delay
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    // Glow follows slower
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    // Fade trail particles
    trailParticles.forEach((p, i) => {
        p.life -= 0.05;
        p.element.style.opacity = p.life * 0.6;
        p.element.style.transform = `translate(-50%, -50%) scale(${p.life})`;
        if (p.life <= 0) {
            p.element.remove();
            trailParticles.splice(i, 1);
        }
    });
    
    requestAnimationFrame(animateCursor);
}

let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorCore.style.left = mouseX + 'px';
    cursorCore.style.top = mouseY + 'px';
    
    // Create trail particles (throttled)
    const now = Date.now();
    if (now - lastTrailTime > 30) {
        createTrailParticle(mouseX, mouseY);
        lastTrailTime = now;
    }
    
    cursorGlow.classList.add('active');
});

// Start cursor animation
animateCursor();

// Hover effect on interactive elements
const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .device-card, .chip-tab, .category-btn');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorCore.classList.add('hover');
        cursorRing.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorCore.classList.remove('hover');
        cursorRing.classList.remove('hover');
    });
});

// Click effect
document.addEventListener('mousedown', () => {
    cursorCore.classList.add('click');
    cursorRing.classList.add('click');
});

document.addEventListener('mouseup', () => {
    cursorCore.classList.remove('click');
    cursorRing.classList.remove('click');
});

// Hide custom cursor on mobile
if ('ontouchstart' in window) {
    cursorCore.style.display = 'none';
    cursorRing.style.display = 'none';
    cursorGlow.style.display = 'none';
    cursorTrail.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// ========================================
// Counter Animation
// ========================================
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function startCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// ========================================
// Mobile Bottom Navigation Active State
// ========================================
function updateMobileNav() {
    const sections = document.querySelectorAll('section[id]');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item:not(.wa-btn)');
    
    let currentSection = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + currentSection) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateMobileNav);

// ========================================
// Scroll Reveal Animation
// ========================================
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            el.classList.add('active');
            
            // Start counters when stats section is visible
            if (el.classList.contains('stat') && !counterStarted) {
                counterStarted = true;
                startCounters();
            }
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.padding = '20px 0';
        }
    });

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // ========================================
    // Chip Type Switcher (Qualcomm / Kirin)
    // ========================================
    const chipTabs = document.querySelectorAll('.chip-tab');
    const chipSwitches = document.querySelectorAll('.chip-switch');
    const qualcommDevices = document.getElementById('qualcomm-devices');
    const kirinDevices = document.getElementById('kirin-devices');
    const chipTitle = document.getElementById('chipTitle');
    const deviceChipTitle = document.getElementById('deviceChipTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const deviceSubtitle = document.getElementById('deviceSubtitle');

    function switchChip(chip) {
        // Update tabs
        chipTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.chip === chip) tab.classList.add('active');
        });
        
        // Update nav dropdown
        chipSwitches.forEach(sw => {
            sw.classList.remove('active');
            if (sw.dataset.chip === chip) sw.classList.add('active');
        });

        // Switch content
        if (chip === 'qualcomm') {
            qualcommDevices.style.display = 'block';
            kirinDevices.style.display = 'none';
            if (chipTitle) chipTitle.textContent = 'Qualcomm Chip';
            if (deviceChipTitle) deviceChipTitle.textContent = 'Qualcomm';
            if (heroSubtitle) heroSubtitle.textContent = 'The fastest remote service solution for Huawei, Honor, and TDTech devices. Safe and professional Qualcomm chip repair worldwide.';
            if (deviceSubtitle) deviceSubtitle.textContent = 'Complete list of Huawei, Honor & TDTech devices with Qualcomm chipset';
        } else {
            qualcommDevices.style.display = 'none';
            kirinDevices.style.display = 'block';
            if (chipTitle) chipTitle.textContent = 'Kirin Chip';
            if (deviceChipTitle) deviceChipTitle.textContent = 'Kirin';
            if (heroSubtitle) heroSubtitle.textContent = 'The fastest remote service solution for Huawei devices. Safe and professional Kirin chip repair worldwide.';
            if (deviceSubtitle) deviceSubtitle.textContent = 'Complete list of Huawei devices with Kirin chipset';
        }

        // Animate
        const activeContent = chip === 'qualcomm' ? qualcommDevices : kirinDevices;
        activeContent.style.animation = 'none';
        activeContent.offsetHeight; // Trigger reflow
        activeContent.style.animation = 'fadeIn 0.5s ease';
    }

    chipTabs.forEach(tab => {
        tab.addEventListener('click', () => switchChip(tab.dataset.chip));
    });

    chipSwitches.forEach(sw => {
        sw.addEventListener('click', (e) => {
            e.preventDefault();
            switchChip(sw.dataset.chip);
            // Scroll to devices section
            document.getElementById('devices').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ========================================
    // Device Category Filter (Qualcomm)
    // ========================================
    const categoryBtns = document.querySelectorAll('.category-btn');
    const deviceCards = document.querySelectorAll('#qualcomm-devices .device-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.dataset.category;

            deviceCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========================================
    // Device Category Filter (Kirin)
    // ========================================
    const categoryBtnsKirin = document.querySelectorAll('.category-btn-kirin');
    const deviceCardsKirin = document.querySelectorAll('#kirin-devices .device-card');

    categoryBtnsKirin.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtnsKirin.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;

            deviceCardsKirin.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card, .device-card, .step-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========================================
    // Counter Animation for Stats
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            }
        }, 16);
    }

    // ========================================
    // Typing Effect for Hero (Optional)
    // ========================================
    const heroTitle = document.querySelector('.hero h1');
    
    // Add glowing effect to gradient text on mouse move
    document.addEventListener('mousemove', (e) => {
        const gradientTexts = document.querySelectorAll('.gradient-text');
        gradientTexts.forEach(text => {
            const rect = text.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            text.style.backgroundPosition = `${x}px ${y}px`;
        });
    });

    // ========================================
    // WhatsApp Click Tracking (Optional)
    // ========================================
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            // You can add analytics tracking here
        });
    });

    // ========================================
    // Add hover effect to device cards
    // ========================================
    deviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(199, 0, 11, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // ========================================
    // Parallax effect for hero background
    // ========================================
    window.addEventListener('scroll', function() {
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // ========================================
    // Add ripple effect to buttons
    // ========================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========================================
    // Console welcome message
    // ========================================
    console.log('%c QC Service ', 'background: #c7000b; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Huawei Remote Service Specialist ', 'color: #888; font-size: 12px;');

});

// ========================================
// Download Tool Widget Functions
// ========================================
function toggleDownload() {
    const downloadBox = document.getElementById('downloadBox');
    downloadBox.classList.toggle('active');
}

// ========================================
// Live Chat Widget Functions
// ========================================
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('active');
}

function selectOption(option) {
    const chatBody = document.querySelector('.chat-body');
    const chatOptions = document.querySelector('.chat-options');
    
    // Hide options
    chatOptions.style.display = 'none';
    
    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    
    let botResponse = '';
    
    switch(option) {
        case 'price':
            userMsg.innerHTML = '<p style="background: var(--primary); border-radius: 15px 15px 5px 15px; padding: 12px 16px; margin-left: auto; display: inline-block;">💰 Price List</p>';
            botResponse = `
                <p>💰 <strong>Our Price List:</strong></p>
                <p style="margin-top: 10px; font-size: 0.9rem;">
                • Remove ID/FRP: <strong>$15-30</strong><br>
                • Remove Demo Mode: <strong>$20</strong><br>
                • Remove PayJoy: <strong>$25</strong><br>
                • Remove MDM: <strong>$30</strong><br>
                • Qualcomm Chip Repair: <strong>$40-80</strong><br><br>
                📱 Contact us for exact pricing!
                </p>
            `;
            break;
        case 'device':
            userMsg.innerHTML = '<p style="background: var(--primary); border-radius: 15px 15px 5px 15px; padding: 12px 16px; margin-left: auto; display: inline-block;">📱 Check My Device</p>';
            botResponse = `
                <p>📱 <strong>Supported Brands:</strong></p>
                <p style="margin-top: 10px; font-size: 0.9rem;">
                ✅ Huawei (P50, P60, Mate 50, Mate X3, etc.)<br>
                ✅ Honor (50, 60, 70, 80, Magic series)<br>
                ✅ TDTech devices<br>
                ✅ All Qualcomm chipset devices<br><br>
                📋 Check full list on our website or ask us!
                </p>
            `;
            break;
        case 'how':
            userMsg.innerHTML = '<p style="background: var(--primary); border-radius: 15px 15px 5px 15px; padding: 12px 16px; margin-left: auto; display: inline-block;">❓ How It Works</p>';
            botResponse = `
                <p>🔧 <strong>How It Works:</strong></p>
                <p style="margin-top: 10px; font-size: 0.9rem;">
                1️⃣ Contact us via WhatsApp<br>
                2️⃣ Send device model & problem<br>
                3️⃣ We connect remotely to your device<br>
                4️⃣ Done in minutes! ⚡<br><br>
                🔒 100% Safe & Secure!
                </p>
            `;
            break;
        case 'contact':
            userMsg.innerHTML = '<p style="background: var(--primary); border-radius: 15px 15px 5px 15px; padding: 12px 16px; margin-left: auto; display: inline-block;">💬 Talk to Human</p>';
            botResponse = `
                <p>👨‍💻 <strong>Let's Talk!</strong></p>
                <p style="margin-top: 10px; font-size: 0.9rem;">
                Click the button below to chat with our team directly on WhatsApp.<br><br>
                ⏰ We respond within minutes!
                </p>
            `;
            break;
    }
    
    chatBody.appendChild(userMsg);
    
    // Bot response after delay
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.innerHTML = `<p>${botResponse}</p>`;
        chatBody.appendChild(botMsg);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // Show back button
        setTimeout(() => {
            const backBtn = document.createElement('button');
            backBtn.className = 'chat-option';
            backBtn.style.marginTop = '15px';
            backBtn.innerHTML = '← Back to Menu';
            backBtn.onclick = () => {
                // Reset chat
                chatBody.innerHTML = `
                    <div class="chat-message bot">
                        <p>Hi! 👋 Welcome to AOS UNLOCKER!</p>
                    </div>
                    <div class="chat-message bot">
                        <p>How can I help you today? Choose an option below:</p>
                    </div>
                    <div class="chat-options">
                        <button class="chat-option" onclick="selectOption('price')">💰 Price List</button>
                        <button class="chat-option" onclick="selectOption('device')">📱 Check My Device</button>
                        <button class="chat-option" onclick="selectOption('how')">❓ How It Works</button>
                        <button class="chat-option" onclick="selectOption('contact')">💬 Talk to Human</button>
                    </div>
                `;
            };
            chatBody.appendChild(backBtn);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 300);
        
    }, 500);
}

// ========================================
// Add CSS for ripple effect dynamically
// ========================================
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        padding: 20px;
        gap: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(rippleStyle);
