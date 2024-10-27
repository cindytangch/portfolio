AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

document.addEventListener('DOMContentLoaded', function() {
    // Remove the URL hash without reloading the page
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const customLink = document.querySelector('.link-custom');

    // Smooth scroll to the target section
    function smoothScroll(target) {
        const section = document.getElementById(target);
        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Add click event listeners to navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const target = this.getAttribute('data-target');
            smoothScroll(target);
        });
    });

    // Add click event listener to the custom link
    if (customLink) {
        customLink.addEventListener('click', function(event) {
            event.preventDefault();
            const target = this.getAttribute('href').substring(1);
            smoothScroll(target);
        });
    }

    // Function to activate the correct navbar link based on scroll position
    function activateLink() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Check if the section is in the viewport
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        // Default to the first section if no section is found
        if (!currentSection) {
            currentSection = sections[0].getAttribute('id');
        }

        // Update active class on navbar links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === currentSection) {
                link.classList.add('active');
            }
        });

        // Update active class on the custom link
        if (customLink) {
            if (customLink.getAttribute('href').substring(1) === currentSection) {
                customLink.classList.add('active');
            } else {
                customLink.classList.remove('active');
            }
        }
    }

    // Add scroll event listener to update active link on scroll
    window.addEventListener('scroll', activateLink);

    // Initial call to set the correct active link when the page loads
    activateLink();
});
