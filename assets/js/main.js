/**
 * ونش راشد لإنقاذ السيارات (winch-rashed.com)
 * Main Interactive Script:
 * 1. Mobile Drawer Navigation (Idempotent, Touch-Optimized, Backdrop Support)
 * 2. Sticky Header Scroll Effect
 * 3. Typewriter News Ticker Effect
 */

(function () {
  'use strict';

  function initApp() {
    // 1. Mobile Drawer Navigation
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileBackdrop = document.getElementById('mobileBackdrop');

    if (mobileToggle && mobileDrawer) {
      // Prevent attaching duplicate listeners if script runs multiple times
      if (mobileToggle.dataset.bound === 'true') {
        return;
      }
      mobileToggle.dataset.bound = 'true';

      function toggleMenu(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileToggle.classList.toggle('is-active', isOpen);
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        if (mobileBackdrop) {
          mobileBackdrop.classList.toggle('active', isOpen);
        }

        // Prevent body scrolling when drawer is open
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }

      function closeMenu() {
        if (mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          mobileToggle.classList.remove('is-active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          if (mobileBackdrop) {
            mobileBackdrop.classList.remove('active');
          }
          document.body.style.overflow = '';
        }
      }

      // Support click and touchend seamlessly
      mobileToggle.addEventListener('click', toggleMenu);

      // Close when clicking the backdrop
      if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeMenu);
      }

      // Close on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeMenu();
        }
      });
    }

    // 2. Sticky Header Elevation on Scroll
    const siteHeader = document.getElementById('siteHeader');
    if (siteHeader && siteHeader.dataset.bound !== 'true') {
      siteHeader.dataset.bound = 'true';
      window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // 3. Typewriter Effect for News & Services Strip
    const typewriterElement = document.getElementById('typewriterText');
    if (typewriterElement && typewriterElement.dataset.bound !== 'true') {
      typewriterElement.dataset.bound = 'true';
      const phrases = [
        "ونش انقاذ راشد: أسرع ونش إنقاذ سيارات نصلك خلال 15 دقيقة بالعاشر من رمضان وطريق السويس والإسماعيلية بخصم 20%.",
        "خدمة طوارئ 24 ساعة: سحب سيارات ملاكي، فارهة، سيارات حوادث، وشاحنات المصانع بأحدث أسطول هيدروليكي.",
        "تسعير عادل وشفاف 100%: ممنوع دفع أي إكرامية أو رسوم خفية نهائياً | الخط الساخن: 01273486236",
        "تغطية جغرافية شاملة: العاشر من رمضان، طريق السويس، طريق الإسماعيلية، الشروق، مدينتي، بدر، العبور، والعاصمة.",
        "أمان تام لسيارتك: سطحات هيدروليكية كاملة النزول على الأرض (Zero Angle) لحماية الشاسيه والجنوط."
      ];

      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typeSpeed = 35;
      const deleteSpeed = 18;
      const endPause = 2200;
      const startPause = 350;

      function tick() {
        const current = phrases[phraseIndex];

        if (!isDeleting) {
          typewriterElement.textContent = current.substring(0, charIndex + 1);
          charIndex++;

          if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(tick, endPause);
            return;
          }
          setTimeout(tick, typeSpeed);
        } else {
          typewriterElement.textContent = current.substring(0, charIndex - 1);
          charIndex--;

          if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(tick, startPause);
            return;
          }
          setTimeout(tick, deleteSpeed);
        }
      }

      tick();
    }

    // 5. Cookie Consent Banner & Consent Mode v2 Manager
    const consentBanner = document.getElementById('cookieConsentBanner');
    const acceptConsentBtn = document.getElementById('acceptConsentBtn');
    if (consentBanner && acceptConsentBtn) {
      try {
        const consentGiven = localStorage.getItem('cookie_consent');
        if (!consentGiven) {
          setTimeout(function () {
            consentBanner.style.display = 'block';
          }, 1200);
        }
      } catch (err) {}

      acceptConsentBtn.addEventListener('click', function () {
        try {
          localStorage.setItem('cookie_consent', 'granted');
        } catch (err) {}
        consentBanner.style.display = 'none';
        if (typeof window.gtag === 'function') {
          window.gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
          });
        }
      });
    }

    // 4. Google Ads Conversion Tracking for Calls & WhatsApp
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-18495850150',
            'event_category': 'Phone Call',
            'event_label': href
          });
        }
      } else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-18495850150',
            'event_category': 'WhatsApp',
            'event_label': href
          });
        }
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
