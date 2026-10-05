/**
 * ونش راشد لإنقاذ السيارات (winch-rashed.com)
 * Main Interactive Script:
 * 1. Typewriter News Ticker Effect
 * 2. Mobile Drawer Navigation
 * 3. Sticky Header Scroll Effect
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Sticky Header Elevation on Scroll
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
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
    const typeSpeed = 40;
    const deleteSpeed = 20;
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
