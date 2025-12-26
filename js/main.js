// ============================================
// LUXURY DOCUMENTATION HUB - MAIN JAVASCRIPT
// ============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close if clicking dropdown toggle
            if (!link.classList.contains('dropdown-toggle')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Active navigation link highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Copy to clipboard functionality
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const code = button.getAttribute('data-code') || button.parentElement.querySelector('code').textContent;
        
        try {
            await navigator.clipboard.writeText(code);
            
            // Visual feedback
            const originalHTML = button.innerHTML;
            button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// FAQ Search Filter
const faqSearch = document.getElementById('faqSearch');
const faqList = document.getElementById('faqList');

if (faqSearch && faqList) {
    faqSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const faqItems = faqList.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Hero search functionality
const heroSearch = document.getElementById('heroSearch');

function performSearch(query) {
    if (!query.trim()) return;
    
    // Simple search implementation - can be enhanced
    const searchTerm = query.toLowerCase();
    const allText = document.body.textContent.toLowerCase();
    
    if (allText.includes(searchTerm)) {
        // Scroll to first matching section or highlight
        console.log('Searching for:', searchTerm);
        // You can implement more sophisticated search here
    }
}

if (heroSearch) {
    heroSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(e.target.value);
        }
    });
}

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Reset previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        let isValid = true;
        
        // Validate name
        if (!name || name.trim().length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (!subject || subject.trim().length < 3) {
            showError('subject', 'Subject must be at least 3 characters');
            isValid = false;
        }
        
        // Validate message
        if (!message || message.trim().length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Simulate form submission (replace with actual API call)
        const formMessage = document.getElementById('formMessage');
        formMessage.className = 'form-message';
        formMessage.textContent = 'Sending...';
        formMessage.style.display = 'block';
        
        // Simulate API delay
        setTimeout(() => {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Theme toggle (optional dark mode)
const themeToggle = document.getElementById('themeToggle');

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    const isDarkMode = savedTheme === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Load saved theme preference immediately
initTheme();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        }
    });
}

// Code tab switching
const codeTabs = document.querySelectorAll('.code-tab');

codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabContainer = tab.closest('.code-tabs');
        const codeContent = tabContainer.nextElementSibling;
        const targetPanel = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and panels
        tabContainer.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
        codeContent.querySelectorAll('.code-panel').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        codeContent.querySelector(`[data-panel="${targetPanel}"]`).classList.add('active');
    });
});

// Lazy loading images
const images = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Floating animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.step-card, .doc-card, .endpoint-item, .faq-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Logo click scroll to top
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Dropdown menu functionality
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = toggle.closest('.nav-dropdown');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Close all other dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(item => {
            if (item !== dropdown) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Documentation Hub loaded successfully');
});





