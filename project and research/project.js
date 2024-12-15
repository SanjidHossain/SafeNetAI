const carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
    const scrollContainer = carousel.querySelector('.scroll-container');
    const leftArrow = carousel.querySelector('.left-arrow');
    const rightArrow = carousel.querySelector('.right-arrow');

    let isAutoScrolling = false; // Tracks if auto-scroll is active
    let autoScrollInterval;

    // Clone cards for seamless infinite scrolling
    const cloneCards = () => {
        const cards = Array.from(scrollContainer.children);
        cards.forEach((card) => {
            const clone = card.cloneNode(true);
            scrollContainer.appendChild(clone);
        });
    };

    // Start auto-scroll
    const startAutoScroll = () => {
        if (isAutoScrolling) return; // Prevent multiple intervals
        isAutoScrolling = true;
        autoScrollInterval = setInterval(() => {
            scrollContainer.scrollLeft += 1; // Move 1px per interval
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0; // Reset to start for seamless loop
            }
        }, 10); // Speed of auto-scroll
    };

    // Stop auto-scroll
    const stopAutoScroll = () => {
        isAutoScrolling = false;
        clearInterval(autoScrollInterval);
    };

    // Handle manual navigation
    const manualScroll = (direction) => {
        stopAutoScroll();
        const cardWidth = scrollContainer.querySelector('.card').offsetWidth + 15; // Card width + gap
        if (direction === 'right') {
            scrollContainer.scrollLeft += cardWidth;
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0; // Reset to start
            }
        } else if (direction === 'left') {
            if (scrollContainer.scrollLeft <= 0) {
                scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2; // Reset to end
            }
            scrollContainer.scrollLeft -= cardWidth;
        }
        setTimeout(startAutoScroll, 3000); // Restart auto-scroll after 3 seconds
    };

    // Event listeners for arrows
    rightArrow.addEventListener('click', () => manualScroll('right'));
    leftArrow.addEventListener('click', () => manualScroll('left'));

    // Clone cards and initialize auto-scroll
    cloneCards();
    startAutoScroll();

    // Pause auto-scroll on hover
    scrollContainer.addEventListener('mouseover', stopAutoScroll);
    scrollContainer.addEventListener('mouseleave', startAutoScroll);
});
