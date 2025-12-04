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

    // Fancy Background Toggle
    const fancyToggleBtn = document.getElementById('fancy-bg-toggle');
    const fancyBgCode = document.getElementById('fancy-bg-code');

    if (fancyToggleBtn && fancyBgCode) {
        fancyToggleBtn.addEventListener('click', () => {
            if (fancyBgCode.style.display === 'none') {
                fancyBgCode.style.display = 'block';
                fancyToggleBtn.textContent = 'Hide Fancy Background ✨';
            } else {
                fancyBgCode.style.display = 'none';
                fancyToggleBtn.textContent = 'Want Fancy Background? ✨';
            }
        });
    }

    // Copy to Clipboard Functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.nextElementSibling.querySelector('code');
            const textToCopy = codeBlock.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalIcon = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = originalIcon;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
});

// Make scrollToTop globally accessible for inline onclick, just in case
// It's better to rely on the event listener above.
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}
