/**
 * ونش راشد لإنقاذ السيارات (winch-rashed.com)
 * Main Interactive Script:
 * 1. Mobile Drawer Navigation with Animated Icon & Outside Click
 * 2. Sticky Header Scroll Effect
 * 3. Typewriter News Ticker Effect
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle with Close (X) Icon & Outside Click
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (mobileToggle && mobileDrawer) {
    const hamburgerSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    const closeSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>';

    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? closeSvg : hamburgerSvg;
    });

    // Close when clicking anywhere outside the header
    document.addEventListener('click', function (e) {
      if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = hamburgerSvg;
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = hamburgerSvg;
      }
    });
  }

  // 2. Sticky Header Elevation on Scroll
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
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
  if (typewriterElement) {
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
});
