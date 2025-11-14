// Toggle Navigation Drawer
const menuToggle = document.getElementById('menuToggle');
const navDrawer = document.getElementById('navDrawer');

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navDrawer.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const sliderContainer = document.querySelector('.slider-container');
    let currentIndex = 2; // Start with the third slide as active
    let isTransitioning = false; // Prevent multiple transitions at the same time

    // Clone the first and last slides for seamless looping
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[slides.length - 1].cloneNode(true);
    sliderContainer.appendChild(firstSlide);
    sliderContainer.insertBefore(lastSlide, slides[0]);

    // Update slides after cloning
    const updatedSlides = document.querySelectorAll('.slide');

    // Function to update the active slide
    function updateSlides() {
        if (isTransitioning) return; // Prevent overlapping transitions
        isTransitioning = true;

        updatedSlides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentIndex) {
                slide.classList.add('active');
            }
        });

        // Adjust the transform to center the active slide
        const offset = currentIndex * 20; // Each slide takes up 20% of the width
        sliderContainer.style.transition = 'transform 0.5s ease-in-out';
        sliderContainer.style.transform = `translateX(-${offset}%)`;

        // Handle infinite loop effect
        sliderContainer.addEventListener('transitionend', () => {
            if (currentIndex === 0) {
                currentIndex = updatedSlides.length - 2; // Jump to the last real slide
                sliderContainer.style.transition = 'none';
                sliderContainer.style.transform = `translateX(-${currentIndex * 20}%)`;
            } else if (currentIndex === updatedSlides.length - 1) {
                currentIndex = 1; // Jump to the first real slide
                sliderContainer.style.transition = 'none';
                sliderContainer.style.transform = `translateX(-${currentIndex * 20}%)`;
            }
            isTransitioning = false;
        });
    }

    // Auto-slide functionality
    function autoSlide() {
        currentIndex = (currentIndex + 1) % updatedSlides.length; // Move to the next slide
        updateSlides();
    }

    // Click event for slides
    updatedSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (isTransitioning) return; // Prevent clicks during transitions
            currentIndex = index; // Set the clicked slide as active
            updateSlides();
        });
    });

    // Start auto-slide
    setInterval(autoSlide, 3000); // Slide every 3 seconds

    // Initialize the first active slide
    updateSlides();
});
















// Countdown Timer Script
const weddingDate = new Date("July 31, 2026 00:00:00").getTime();

const countdown = setInterval(function() {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
  document.getElementById("hours").innerHTML = hours.toString().padStart(2, "0");
  document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, "0");
  
  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown-timer").innerHTML = "<div class='countdown-ended'>We're married!</div>";
  }
}, 1000);




function updateBannerCountdown() {
    const weddingDate = new Date('July 31, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update banner countdown
    updateCircleValue('banner-days', days, 365);
    updateCircleValue('banner-hours', hours, 24);
    updateCircleValue('banner-minutes', minutes, 60);
    updateCircleValue('banner-seconds', seconds, 60);
}

function updateCircleValue(elementId, value, max) {
    const element = document.getElementById(elementId);
    const previousValue = parseInt(element.textContent);
    
    // Add animation class if value changed
    if (previousValue !== value) {
        element.classList.add('changing');
        setTimeout(() => {
            element.classList.remove('changing');
        }, 300);
    }
    
    // Update the number
    element.textContent = value.toString().padStart(2, '0');
    
    // Update progress circle
    const progressElement = element.closest('.circle-progress');
    const circle = progressElement.querySelector('.progress-ring-circle');
    const radius = 31; // Match the r attribute in SVG
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / max) * circumference;
    
    circle.style.strokeDashoffset = offset;
}

// Initialize progress circles
function initializeProgressCircles() {
    const circles = document.querySelectorAll('.progress-ring-circle');
    circles.forEach(circle => {
        const radius = parseInt(circle.getAttribute('r'));
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
    });
}

// Update countdown every second
setInterval(updateBannerCountdown, 1000);

// Initialize when page loads
window.addEventListener('load', () => {
    initializeProgressCircles();
    updateBannerCountdown();
});




// Gallery Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.nav-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
    
    // View More Button Functionality
    const viewMoreBtn = document.querySelector('.view-more-btn');
    viewMoreBtn.addEventListener('click', function() {
        // Simulate loading more images
        this.innerHTML = '<span>Loading Memories...</span><i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            this.innerHTML = '<span>No More Memories</span><i class="fas fa-heart"></i>';
            this.style.opacity = '0.6';
            this.style.cursor = 'not-allowed';
        }, 2000);
    });
    
    // Image loading animation
    const images = document.querySelectorAll('.image-wrapper img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.parentElement.classList.remove('loading');
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('attendanceForm');
    const submitBtn = form.querySelector('.submit-btn');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const confirmationDetails = document.getElementById('confirmationDetails');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('guestName');
        const email = formData.get('guestEmail');
        const guests = formData.get('guestCount');
        const message = formData.get('guestMessage');
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            // Show confirmation message
            confirmationDetails.textContent = `We've recorded ${guests} guest(s) from ${name}.`;
            confirmationMessage.classList.add('show');
            
            // Reset form
            form.reset();
            
            // Reset button
            setTimeout(() => {
                submitBtn.classList.remove('loading');
            }, 500);
            
            // Hide confirmation after 5 seconds
            setTimeout(() => {
                confirmationMessage.classList.remove('show');
            }, 5000);
            
            // Here you would typically send the data to your server
            console.log('RSVP Submission:', {
                name: name,
                email: email,
                guests: guests,
                message: message
            });
            
        }, 1500);
    });

    // Add focus effects to form elements
    const formElements = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.style.background = '#f8f8f8');
            this.style.background = 'rgba(212, 175, 55, 0.1)';
            this.style.border = '2px solid #d4af37';
        });
    });

    // Gift contribution buttons
    const contributeBtns = document.querySelectorAll('.contribute-btn, .primary-btn');
    
    contributeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.href) return; // Allow link buttons to work normally
            
            e.preventDefault();
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.style.opacity = '0.8';
            this.style.cursor = 'not-allowed';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Thank You!';
                this.style.background = '#4CAF50';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.style.opacity = '1';
                    this.style.cursor = 'pointer';
                }, 2000);
            }, 1500);
        });
    });

    // Secondary button actions
    const secondaryBtns = document.querySelectorAll('.secondary-btn');
    
    secondaryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            alert(`${action} feature would be implemented here!`);
        });
    });
});