document.addEventListener('DOMContentLoaded', function () {
  // Service item hover effect
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach((item) => {
    item.addEventListener(
      'touchstart',
      function () {
        serviceItems.forEach((el) => el.classList.remove('service-item-hover'));
        this.classList.add('service-item-hover');
      },
      { passive: true }
    );
  });

  document.addEventListener(
    'touchstart',
    function (event) {
      if (!event.target.closest('.service-item')) {
        serviceItems.forEach((el) => el.classList.remove('service-item-hover'));
      }
    },
    { passive: true }
  );

  // Handle scroll events
  function handleScroll(event) {
    console.log('Scroll event detected');
  }

  document.addEventListener('wheel', handleScroll, { passive: false });

  let touchStartY = 0;
  const sidebarContent = document.querySelector('.sidebar-content');
  const mainContent = document.querySelector('.main-content');

  if (sidebarContent && mainContent) {
    sidebarContent.addEventListener(
      'touchstart',
      function (event) {
        touchStartY = event.touches[0].clientY;
      },
      { passive: true }
    );

    sidebarContent.addEventListener(
      'touchmove',
      function (event) {
        const touchEndY = event.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;

        mainContent.scrollBy({
          top: deltaY,
          behavior: 'auto',
        });

        touchStartY = touchEndY;
      },
      { passive: true }
    );
  }

  function handleResize() {
    if (window.innerWidth <= 935) {
      document.removeEventListener('wheel', handleScroll);
    } else {
      document.addEventListener('wheel', handleScroll, { passive: false });
    }
  }

  handleResize();
  window.addEventListener('resize', handleResize, { passive: true });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll for navbar links
  document.querySelectorAll('.navbar-links a').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      }
    });
  });
});

// /////////////////////////////////////////////////////////////////
// WEBSITE GUIDE / JOURNEY SECTION /////////////////////////////////
// Journey intro text phasing in
document.addEventListener('DOMContentLoaded', () => {
  const journeyIntro = document.querySelector('.journey-section-intro');

  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  if (journeyIntro) {
    observer.observe(journeyIntro);
  }
});

// Journey cards sliding in and out
document.addEventListener('DOMContentLoaded', () => {
  const journeyCards = document.querySelectorAll('.card-1, .card-2');

  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  journeyCards.forEach((card) => observer.observe(card));
});

// //////////////////////////////////////////////
// PRICING SECTION //////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const pricingCards = document.querySelectorAll('.pricing-card');

  const observerOptions = {
    root: null,
    threshold: [0, 0.2],
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.2) {
        if (entry.target.classList.contains('pricing-card-1')) {
          entry.target.style.setProperty('--delay', '0s');
        } else if (entry.target.classList.contains('pricing-card-2')) {
          entry.target.style.setProperty('--delay', '0.2s');
        } else if (entry.target.classList.contains('pricing-card-3')) {
          entry.target.style.setProperty('--delay', '0.4s');
        }
        entry.target.classList.add('visible');
      } else if (entry.intersectionRatio === 0) {
        entry.target.classList.remove('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  pricingCards.forEach((card) => observer.observe(card));
});

// //////////////////////////////////////////////
// QUOTE SECTION //////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const quoteCards = document.querySelectorAll('.quote-card');

  // Observer options
  const observerOptions = {
    root: null, // Use the viewport as the container
    threshold: 0.2, // Trigger when 20% of the card is visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.2) {
        // Add class to slide up when in view
        entry.target.classList.add('visible');
      } else {
        // Remove class to slide away when out of view
        entry.target.classList.remove('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  quoteCards.forEach((card) => observer.observe(card));
});

// //////////////////////////////////////////////
// FIXED INTRO BACKGROUND UNTIL JOURNEY SECTION //////////////////////////
document.addEventListener('scroll', () => {
  const mainContent = document.querySelector('.main-content');
  const journeySection = document.querySelector('.journey-section');
  const journeyPosition = journeySection.getBoundingClientRect().top;

  if (journeyPosition <= 0) {
    mainContent.style.backgroundAttachment = 'scroll'; // Change to normal scroll
  } else {
    mainContent.style.backgroundAttachment = 'fixed'; // Keep it fixed
  }
});
