         function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Update active navigation button based on scroll position
        function updateActiveSection() {
            const sections = document.querySelectorAll('.section');
            const navButtons = document.querySelectorAll('.section-nav button');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = section.id;
                }
            });
            
            navButtons.forEach(button => {
                button.classList.remove('active');
                if (button.getAttribute('data-section') === currentSection.replace('section', '')) {
                    button.classList.add('active');
                }
            });
        }

        // Listen for scroll events
        window.addEventListener('scroll', updateActiveSection);

        // Initialize
        updateActiveSection();

        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            const currentActive = document.querySelector('.section-nav button.active');
            const currentNumber = parseInt(currentActive.getAttribute('data-section'));
            
            if (e.key === 'ArrowDown' && currentNumber < 9) {
                scrollToSection(`section${currentNumber + 1}`);
            } else if (e.key === 'ArrowUp' && currentNumber > 1) {
                scrollToSection(`section${currentNumber - 1}`);
            }
        });
    