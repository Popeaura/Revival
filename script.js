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
});

// Handle donation button click
function handleDonate() {
    alert('Thank you for your interest in donating! This would typically redirect to a secure payment processor.');
    // In a real implementation, this would redirect to a payment processor
    // window.location.href = 'https://donate.revival.org';
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
    if (!data.firstName || !data.lastName || !data.email) {
        alert('Please fill in all fields.');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    console.log('Newsletter signup:', data);
    alert(`Thank you ${data.firstName}! You've been subscribed to our newsletter.`);
    
    // Reset form
    event.target.reset();
    
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

// Add scroll-to-top functionality (optional)
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
        transition: opacity 0.3s ease;
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
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Add loading state for forms
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.textContent = 'Loading...';
    } else {
        button.disabled = false;
        button.textContent = 'Sign Up';
    }
}

// Enhanced form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.firstName.trim()) {
        errors.push('First name is required');
    }
    
    if (!formData.lastName.trim()) {
        errors.push('Last name is required');
    }
    
    if (!formData.email.trim()) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    return errors;
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Allow Enter key to submit forms
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        const form = e.target.closest('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Allow Escape key to close any modals (if added later)
    if (e.key === 'Escape') {
        // Close modal functionality would go here
    }
});