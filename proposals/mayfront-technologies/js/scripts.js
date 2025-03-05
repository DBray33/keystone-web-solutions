// --------------------------------------------
// HERO
// Card hover image display
document.addEventListener('DOMContentLoaded', function () {
  const heroCards = document.querySelectorAll('.hero-card');
  const heroImage = document.getElementById('hero-image');
  const heroImageText = document.getElementById('hero-image-text');

  function updateImage(imageType) {
    let newSrc = '';
    let newText = '';

    if (imageType === 'dental') {
      newSrc =
        'https://storage.googleapis.com/kws-clientele/Mayfront%20Technologies/hero/dental-hero.jpg?v=2';
      newText = 'Patients are your priority... IT support is ours';
      heroImage.alt = 'Dental IT Support';
    } else if (imageType === 'healthcare') {
      newSrc =
        'https://storage.googleapis.com/kws-clientele/Mayfront%20Technologies/hero/medical-hero.jpg?v=1';
      newText = 'Experienced, trusted... RELIABLE';
      heroImage.alt = 'Healthcare IT Support';
    }

    // Prevent unnecessary updates if the image is already displayed
    if (heroImage.src !== newSrc) {
      heroImage.style.opacity = '0'; // Fade out
      setTimeout(() => {
        heroImage.src = newSrc;
        heroImage.style.opacity = '1'; // Fade back in
      }, 150); // Short delay for smoother transition
    }

    // Update the text inside the image
    heroImageText.textContent = newText;
  }

  // ✅ Set default active state (Dental IT)
  updateImage('dental');
  const defaultCard = document.querySelector('.hero-card[data-image="dental"]');

  if (defaultCard) {
    defaultCard.classList.add('active', 'hover-effect'); // Adds hover effect class
  }

  heroCards.forEach((card) => {
    card.addEventListener('mouseover', function () {
      const imageType = this.getAttribute('data-image');
      updateImage(imageType);

      // ✅ Reset all cards, then highlight the hovered one
      heroCards.forEach((c) => c.classList.remove('active', 'hover-effect'));
      this.classList.add('active', 'hover-effect');
    });
  });
});

// --------------------------------------------
// SERVICES CAROUSEL - Resize Fix + Pre-Scaling
document.addEventListener('DOMContentLoaded', function () {
  const carouselTrack = document.querySelector('.carousel-track');
  const cards = Array.from(document.querySelectorAll('.carousel-card'));
  let scrollAmount = cards[0].offsetWidth + 35; // ✅ Width + gap
  let interval;
  let resizing = false;

  function updateActiveCard() {
    if (resizing) return; // ✅ Prevent updates during resizing

    const viewportWidth = window.innerWidth;
    const expandStart = viewportWidth * 0.35; // ✅ Expand slightly before center
    const expandEnd = viewportWidth * 0.65; // ✅ End expansion slightly before leaving
    const shrinkStart = viewportWidth * 0.1; // ✅ Shrink sooner
    const shrinkEnd = viewportWidth * 0.9; // ✅ Shrink completely before leaving

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      let scaleValue = 0.85; // ✅ Default smaller size

      if (cardCenter >= expandStart && cardCenter <= expandEnd) {
        scaleValue = 1.12; // ✅ Expand in center area
        card.classList.add('active');
      } else if (cardCenter < shrinkStart || cardCenter > shrinkEnd) {
        scaleValue = 0.85; // ✅ Shrink earlier before it exits
        card.classList.remove('active');
      }

      // ✅ Apply scaling & opacity smoothly
      card.style.transform = `scale(${scaleValue})`;
      card.style.opacity = scaleValue === 1.12 ? '1' : '0.6'; // ✅ Dimmed when small
    });
  }

  function moveCarousel() {
    carouselTrack.style.transition = 'transform 1s ease-in-out';
    carouselTrack.style.transform = `translateX(-${scrollAmount}px)`;

    setTimeout(() => {
      const firstCard = carouselTrack.firstElementChild;
      carouselTrack.appendChild(firstCard);

      carouselTrack.style.transition = 'none';
      carouselTrack.style.transform = `translateX(0)`;

      updateActiveCard();
    }, 1000);
  }

  function startCarousel() {
    interval = setInterval(() => {
      moveCarousel();
    }, 3000);
  }

  function stopCarousel() {
    clearInterval(interval);
  }

  // ✅ Handle viewport resize properly
  window.addEventListener('resize', function () {
    resizing = true; // ✅ Pause updates during resize

    clearTimeout(resizing);
    setTimeout(() => {
      resizing = false;
      updateActiveCard();
    }, 500); // ✅ Delay after resizing stops
  });

  // ✅ Start the carousel
  startCarousel();

  // ✅ Pause on hover
  carouselTrack.addEventListener('mouseenter', stopCarousel);
  carouselTrack.addEventListener('mouseleave', startCarousel);

  // ✅ Initial setup
  updateActiveCard();
});

// ----------------------------------
// BACK TO TOP
// --------------------------------------------
// BACK TO TOP BUTTON FUNCTIONALITY
// --------------------------------------------
// BACK TO TOP BUTTON FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
  const backToTopButton = document.getElementById('back-to-top');

  function toggleBackToTop() {
    if (window.scrollY > 100) {
      backToTopButton.classList.add('show');
      backToTopButton.classList.remove('hide');
    } else {
      backToTopButton.classList.add('hide');
      setTimeout(() => backToTopButton.classList.remove('show'), 300);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ✅ Show/Hide Button on Scroll
  window.addEventListener('scroll', toggleBackToTop);

  // ✅ Scroll to Top on Click
  backToTopButton.addEventListener('click', scrollToTop);
});
