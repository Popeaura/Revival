// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Add interactive hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(anchor => {
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

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(22, 163, 74, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)';
            header.style.backdropFilter = 'none';
        }
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

// Handle donation button click
function handleDonate() {
    alert('Thank you for your interest in donating! This would typically redirect to a secure payment processor.');
    // In a real implementation, this would redirect to a payment processor
    // window.location.href = 'https://donate.revival.org';
}

// Handle subscribe button click
function handleSubscribe() {
    const email = prompt('Enter your email address to subscribe to our newsletter:');
    if (email && validateEmail(email)) {
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        // In a real implementation, this would be handled by the newsletter form
    } else if (email) {
        alert('Please enter a valid email address.');
    }
}

// Handle newsletter form submission
function handleNewsletter(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email')
    };
    
    // Validate form data
    const errors = validateForm(data);
    if (errors.length > 0) {
        alert('Please fix the following errors:\n' + errors.join('\n'));
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    setLoadingState(submitButton, true);
    
    // Simulate API call
    setTimeout(() => {
        console.log('Newsletter signup:', data);
        alert(`Thank you ${data.firstName}! You've been subscribed to our newsletter.`);
        
        // Reset form and loading state
        event.target.reset();
        setLoadingState(submitButton, false);
    }, 1000);
    
    // In a real implementation, you would send this data to your server
    // fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // });
}

// Handle social media links
function openSocial(platform) {
    const urls = {
        facebook: 'https://facebook.com/revivalforcommunity',
        twitter: 'https://twitter.com/revivalforcommunity',
        instagram: 'https://instagram.com/revivalforcommunity',
        youtube: 'https://youtube.com/revivalforcommunity'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank', 'noopener,noreferrer');
    }
}

// Utility Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.firstName || !formData.firstName.trim()) {
        errors.push('First name is required');
    }
    
    if (!formData.lastName || !formData.lastName.trim()) {
        errors.push('Last name is required');
    }
    
    if (!formData.email || !formData.email.trim()) {
        errors.push('Email is required');
    } else if (!validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    return errors;
}

function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.textContent = 'Loading...';
        button.style.opacity = '0.7';
    } else {
        button.disabled = false;
        button.textContent = 'Sign Up';
        button.style.opacity = '1';
    }
}

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #16a34a;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.background = '#15803d';
        scrollButton.style.transform = 'scale(1.1)';
    });

    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.background = '#16a34a';
        scrollButton.style.transform = 'scale(1)';
    });
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Allow Enter key to submit forms
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        const form = e.target.closest('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Allow Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add counter animation for highlights
function animateCounters() {
    const counters = document.querySelectorAll('.highlight-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/,/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Trigger counter animation when highlights section is visible
const highlightsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            highlightsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const highlightsSection = document.querySelector('.highlights');
    if (highlightsSection) {
        highlightsObserver.observe(highlightsSection);
    }
});