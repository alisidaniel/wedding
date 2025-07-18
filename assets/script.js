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