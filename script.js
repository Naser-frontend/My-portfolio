// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
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
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Animated text rotation with improved typewriter effect
    const texts = ['Front End Developer', 'Code Explorer', 'AI Explorer'];
    let currentIndex = 0;
    let currentText = '';
    let letterIndex = 0;
    let isDeleting = false;
    const animatedText = document.getElementById('animated-text');

    function typeWriter() {
        if (animatedText) {
            const fullText = texts[currentIndex];
            
            if (!isDeleting) {
                // Typing - show cursor
                animatedText.classList.add('typing');
                currentText = fullText.substring(0, letterIndex + 1);
                letterIndex++;
                
                if (letterIndex === fullText.length) {
                    // Finished typing, hide cursor and wait
                    animatedText.classList.remove('typing');
                    setTimeout(() => {
                        isDeleting = true;
                        animatedText.classList.add('typing'); // Show cursor for deleting
                    }, 2000);
                }
            } else {
                // Deleting - show cursor
                animatedText.classList.add('typing');
                currentText = fullText.substring(0, letterIndex - 1);
                letterIndex--;
                
                if (letterIndex === 0) {
                    // Finished deleting, hide cursor and move to next text
                    animatedText.classList.remove('typing');
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % texts.length;
                    setTimeout(() => {
                        animatedText.classList.add('typing'); // Show cursor for next typing
                    }, 500);
                }
            }
            
            animatedText.textContent = currentText;
            
            // Adjust speed: slower for typing, faster for deleting
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
    }

    // Handle window resize for responsive text
    function handleResize() {
        const animatedText = document.getElementById('animated-text');
        if (animatedText && window.innerWidth < 640) {
            // Ensure text fits on small screens
            animatedText.style.fontSize = '1.25rem';
        } else if (animatedText && window.innerWidth < 768) {
            animatedText.style.fontSize = '1.5rem';
        }
    }

    // Start typewriter effect after initial delay
    setTimeout(() => {
        if (animatedText) {
            animatedText.classList.remove('typewriter');
            animatedText.classList.add('typing'); // Show cursor when starting
            typeWriter();
        }
    }, 1000);

    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> SENDING...';
            submitBtn.disabled = true;
            
            // Simulate sending delay
            setTimeout(() => {
                // Create mailto link
                const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                const mailtoLink = `mailto:naserahmad13.mohammady@gmail.com?subject=${subject}&body=${body}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                showNotification('Thank you for your message! Your email client should open now.', 'success');
                
                // Reset form and button
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('nav');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('bg-gray-900');
                navbar.classList.remove('bg-gray-900/90');
            } else {
                navbar.classList.add('bg-gray-900/90');
                navbar.classList.remove('bg-gray-900');
            }
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Initialize first section as visible
    const homeSection = document.querySelector('#home');
    if (homeSection) {
        homeSection.style.opacity = '1';
        homeSection.style.transform = 'translateY(0)';
    }

    // Particle background animation
    createParticles();

    // Add skill tag hover effects
    addSkillTagEffects();

    // Initialize progress bars
    initializeProgressBars();
});

// Download CV function
function downloadCV() {
    try {
        // Create a link element to download the CV image
        const a = document.createElement('a');
        a.href = 'my-informaition/naser ahmad CV.png';
        a.download = 'Naser_Ahmad_Mohammady_CV.png';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showNotification('CV download started!', 'success');
    } catch (error) {
        console.error('Download error:', error);
        showNotification('Failed to download CV', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
    notification.classList.add(bgColor);
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2 text-white">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Create floating particles
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particleContainer.appendChild(particle);
        }
    }
}

// Add skill tag effects
function addSkillTagEffects() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize progress bars for skills
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Typing effect for code block
function typeCode() {
    const codeElement = document.querySelector('.code-typing');
    if (!codeElement) return;
    
    const code = codeElement.textContent;
    codeElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < code.length) {
            codeElement.textContent += code.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
}

// Add loading animation to buttons
function addButtonLoadingEffect() {
    const buttons = document.querySelectorAll('.btn-animate');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.classList.add('loading-btn');
                setTimeout(() => {
                    this.classList.remove('loading-btn');
                }, 2000);
            }
        });
    });
}

// Initialize all effects when page loads
window.addEventListener('load', function() {
    addButtonLoadingEffect();
    
    // Add entrance animations with delay
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
        }, index * 200);
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust orbit radius for mobile
    const orbits = document.querySelectorAll('.orbit');
    if (window.innerWidth < 768) {
        orbits.forEach(orbit => {
            orbit.style.setProperty('--orbit-radius', '80px');
        });
    } else {
        orbits.forEach(orbit => {
            orbit.style.setProperty('--orbit-radius', '150px');
        });
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();