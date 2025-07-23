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
const weddingDate = new Date("July 30, 2026 15:00:00").getTime();

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

// RSVP Buttons (example functionality)
document.querySelectorAll('.rsvp-btn').forEach(button => {
  button.addEventListener('click', function() {
    const response = this.classList.contains('attending') ? 'attending' : 'not attending';
    alert(`Thank you for your response! We've recorded you as ${response}.`);
    // In real implementation, connect to your backend/database
  });
});