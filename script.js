(function () {
    'use strict';

    // Current year in footer
    var yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Navbar scroll effect
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Mobile menu toggle
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for anchor links (enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Resume download: ensure download attribute and optional feedback
    document.querySelectorAll('a[href="Mandvi_PEV_CV.pdf"]').forEach(function (btn) {
        btn.setAttribute('download', 'Mandvi-Singh-Resume.pdf');
    });

    // Certificate PDF modal
    var certModal = document.getElementById('certModal');
    var certModalIframe = document.getElementById('certModalIframe');
    var certModalClose = document.getElementById('certModalClose');
    var certModalTitle = document.getElementById('certModalTitle');

    function openCertModal(pdfUrl, title) {
        if (!certModal || !certModalIframe) return;
        certModalTitle.textContent = title || 'Certificate';
        certModalIframe.src = pdfUrl;
        certModal.classList.add('is-open');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        if (!certModal || !certModalIframe) return;
        certModal.classList.remove('is-open');
        certModal.setAttribute('aria-hidden', 'true');
        certModalIframe.src = 'about:blank';
        document.body.style.overflow = '';
    }

    if (certModalClose) {
        certModalClose.addEventListener('click', closeCertModal);
    }

    if (certModal) {
        certModal.addEventListener('click', function (e) {
            if (e.target === certModal) closeCertModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && certModal.classList.contains('is-open')) closeCertModal();
        });
    }

    document.querySelectorAll('.btn-cert-view').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var pdf = this.getAttribute('data-pdf');
            var title = this.closest('.cert-item') ? this.closest('.cert-item').querySelector('h3').textContent : 'Certificate';
            if (pdf) openCertModal(pdf, title);
        });
    });

    // Contact form: frontend-only submission with green success bar
    var contactForm = document.getElementById('contactForm');
    var contactSuccessBar = document.getElementById('contactSuccessBar');
    if (contactForm && contactSuccessBar) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            contactSuccessBar.classList.add('is-visible');
            contactForm.reset();
            contactSuccessBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
})();
