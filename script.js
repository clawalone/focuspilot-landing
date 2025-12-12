document.addEventListener('DOMContentLoaded', () => {

    // --- THEME SWITCHER (Dark Default) ---
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    function setTheme(isLight) {
        if (isLight) {
            html.setAttribute('data-theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            html.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Check storage or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setTheme(true);
    } else {
        setTheme(false); // Default Dark
    }

    themeToggle.addEventListener('click', () => {
        const isLight = html.getAttribute('data-theme') === 'light';
        setTheme(!isLight);
    });

    // --- 3D TILT EFFECT ---
    const tiltElements = document.querySelectorAll('.bento-card, .phone-mockup');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', handleTilt);
        el.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Reduced rotation for cleaner feel
        const rotateY = ((x - centerX) / centerX) * 5;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    }

    function resetTilt(e) {
        e.currentTarget.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    }


    // --- PRICING TOGGLE ---
    const pricingSwitch = document.getElementById('pricing-switch');
    const priceAmounts = document.querySelectorAll('.amount');

    if (pricingSwitch) {
        pricingSwitch.addEventListener('change', () => {
            const isYearly = pricingSwitch.checked;
            priceAmounts.forEach(amount => {
                if (isYearly && amount.dataset.yearly) {
                    amount.innerText = amount.dataset.yearly;
                } else if (!isYearly && amount.dataset.monthly) {
                    amount.innerText = amount.dataset.monthly;
                }
            });
        });
    }

    // --- FAQ ACCORDION ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- NAVBAR & SCROLL ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
    }));

    // Scroll Reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Screenshot Slideshow
    const screens = document.querySelectorAll('.app-screen');
    let currentScreen = 0;

    if (screens.length > 0) {
        setInterval(() => {
            screens[currentScreen].classList.remove('active');
            currentScreen = (currentScreen + 1) % screens.length;
            screens[currentScreen].classList.add('active');
        }, 3000); // Change every 3 seconds
    }
});
