document.addEventListener('DOMContentLoaded', function() {
    // Collapsible section functionality
    document.querySelectorAll('.collapsible-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content && content.classList.contains('collapsible-content')) {
                header.classList.toggle('collapsed');
                content.classList.toggle('collapsed');
            }
        });

        // Initialize state based on class presence
        const contentElement = header.nextElementSibling;
        if (contentElement && contentElement.classList.contains('collapsible-content')) {
            if (header.classList.contains('start-open')) {
                header.classList.remove('collapsed');
                contentElement.classList.remove('collapsed');
            } else {
                header.classList.add('collapsed');
                contentElement.classList.add('collapsed');
            }
        }
    });

    // Scroll-to-Top Button Functionality
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        // Attach click listener for scrolling to top
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
});

// Make scrollToTop globally accessible for inline onclick, just in case
// It's better to rely on the event listener above.
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}
