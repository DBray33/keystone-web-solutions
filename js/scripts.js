// ----------------------------------------
// Service item hover effect for touch devices
// ----------------------------------------
document.addEventListener('DOMContentLoaded', function () {
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

  // ----------------------------------------
  // Handle scroll events (example: log scroll events)
  // ----------------------------------------
  function handleScroll(event) {
    console.log('Scroll event detected');
  }

  document.addEventListener('wheel', handleScroll, { passive: false });

  // ----------------------------------------
  // Sidebar touch-based scrolling for mobile
  // ----------------------------------------
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

  // ----------------------------------------
  // Handle resize events (remove or re-add scroll events)
  // ----------------------------------------
  function handleResize() {
    if (window.innerWidth <= 935) {
      document.removeEventListener('wheel', handleScroll);
    } else {
      document.addEventListener('wheel', handleScroll, { passive: false });
    }
  }

  handleResize();
  window.addEventListener('resize', handleResize, { passive: true });
});
// ----------------------------------------
// Smooth scroll for navbar link clicks
// ----------------------------------------
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

// ----------------------------------------
// Navbar dropdown functionality
// ----------------------------------------
document.querySelectorAll('.navbar-dropdown > a').forEach((dropdownLink) => {
  dropdownLink.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior
    const dropdownMenu = this.nextElementSibling;

    if (dropdownMenu.style.display === 'block') {
      dropdownMenu.style.display = 'none';
      dropdownMenu.style.opacity = 0;
      dropdownMenu.style.visibility = 'hidden';
      dropdownMenu.style.transform = 'translateY(-20px)';
    } else {
      dropdownMenu.style.display = 'block';
      dropdownMenu.style.opacity = 1;
      dropdownMenu.style.visibility = 'visible';
      dropdownMenu.style.transform = 'translateY(0)';
    }
  });
});

// ----------------------------------------
// Navbar scroll effect (runs only after navbar loads)
// ----------------------------------------
function navbarScrollEffect() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) {
    console.error('⚠ Navbar not found. Retrying...');
    setTimeout(navbarScrollEffect, 100); // Retry after 100ms
    return;
  }

  console.log('✅ Navbar detected, initializing scroll effect.');

  // Clear any previous scroll event listeners (prevents duplication)
  window.removeEventListener('scroll', handleScroll);

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Attach new scroll event listener
  window.addEventListener('scroll', handleScroll);
}

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
    threshold: [0, 0.1],
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.1) {
        if (entry.target.classList.contains('pricing-card-1')) {
          entry.target.style.setProperty('--delay', '0s');
        } else if (entry.target.classList.contains('pricing-card-2')) {
          entry.target.style.setProperty('--delay', '0.2s');
        } else if (entry.target.classList.contains('pricing-card-3')) {
          entry.target.style.setProperty('--delay', '0.3s');
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
    threshold: 0, // Trigger when any part of the card intersects
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add class to slide up when in view
        entry.target.classList.add('visible');
      } else {
        const bounding = entry.boundingClientRect;

        // Ensure the card is fully off-screen before removing the visible class
        if (bounding.top > window.innerHeight || bounding.bottom < 0) {
          entry.target.classList.remove('visible');
        }
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

// //////////////////////////////////////////////
// PAGESPEED SCORE CIRCLES //////////////////////////
document.querySelectorAll('.circle .counter').forEach((counter) => {
  let currentNumber = 0;
  const targetNumber = 100; // Final number
  const duration = 4000; // Total duration in milliseconds
  const interval = duration / targetNumber; // Time per increment

  const updateNumber = () => {
    if (currentNumber < targetNumber) {
      currentNumber++;
      counter.textContent = currentNumber;
      setTimeout(updateNumber, interval);
    }
  };

  // Intersection Observer to detect when the counter is in view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger the counter animation when the element comes into view
          updateNumber();
          observer.unobserve(counter); // Stop observing once the animation starts
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  observer.observe(counter);
});
// //////////////////////////////////////////////
// POPUP //////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');

  let popupShown = false; // Ensure the popup shows only once

  function showPopup() {
    if (!popupShown) {
      popup.classList.add('show'); // Add the 'show' class to trigger CSS animation
      popupShown = true;
    }
  }

  // Detect mouse movement for specific areas near the edges
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const topBoundaryHeight = viewportHeight * 0.01; // Top 0.1% thickness
    const leftBoundaryWidth = viewportWidth * 0.01; // Left 0.1% thickness
    const topBoundaryWidth = viewportWidth * 0.2; // Left 5% of the width
    const leftBoundaryHeight = viewportHeight * 0.15; // Top 5% of the height

    // Trigger the popup only for specific regions
    if (
      (clientX <= leftBoundaryWidth && clientY <= leftBoundaryHeight) || // Top 5% of left boundary
      (clientY <= topBoundaryHeight && clientX <= topBoundaryWidth) // Left 5% of top boundary
    ) {
      showPopup();
    }
  });

  // Close the popup
  closePopup.addEventListener('click', () => {
    popup.classList.remove('show'); // Remove the 'show' class to hide the popup
    setTimeout(() => {
      popup.style.display = 'none'; // Fully hide the popup after animation ends
    }, 500); // Match the CSS animation duration
  });
});

// //////////////////////////////////////////////
// STANDALONE LOGO //////////////////////////////
document.addEventListener('scroll', () => {
  const logo = document.querySelector('.standalone-logo');
  if (window.scrollY > 0) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// //////////////////////////////////////////////
// FAQ ACCORDION //////////////////////////////
// Accordion functionality
document.addEventListener('click', (event) => {
  const allFaqs = document.querySelectorAll('.faq-item');
  let clickedInsideFaq = false;

  allFaqs.forEach((faq) => {
    const question = faq.querySelector('.faq-question');
    if (faq.contains(event.target)) {
      // Toggle the clicked FAQ item
      if (event.target === question) {
        faq.classList.toggle('open');
      }
      clickedInsideFaq = true;
    } else {
      // Close any other open FAQ item
      faq.classList.remove('open');
    }
  });

  // If the click was outside any FAQ, close all FAQs
  if (!clickedInsideFaq) {
    allFaqs.forEach((faq) => faq.classList.remove('open'));
  }
});

// Slide in from sides animation
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, index * 200); // Stagger the animations for a cascading effect
  });
});

// //////////////////////////////////////////////
// CAROUSEL /////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  let isDragging = false;
  let startX, startY;
  let scrollLeft;
  let autoScrollInterval;
  let isInteracting = false;
  let scrollDirection = 1; // 1 for right, -1 for left

  // Mouse & Touch Start
  const startDragging = (e) => {
    isDragging = true;
    isInteracting = true;
    carousel.classList.add('dragging');
    startX = e.pageX || e.touches[0].pageX;
    startY = e.pageY || e.touches[0].pageY;
    scrollLeft = carousel.scrollLeft;

    // Pause auto-scroll during interaction
    clearInterval(autoScrollInterval);
  };

  // Mouse & Touch Move
  const drag = (e) => {
    if (!isDragging) return;

    const x = e.pageX || e.touches[0].pageX;
    const y = e.pageY || e.touches[0].pageY;
    const deltaX = x - startX;
    const deltaY = y - startY;

    // Horizontal scrolling takes precedence
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault(); // Prevent vertical scrolling
      carousel.scrollLeft = scrollLeft - deltaX;
    }
  };

  // Mouse & Touch End
  const stopDragging = () => {
    isDragging = false;
    carousel.classList.remove('dragging');
    isInteracting = false;

    // Restart auto-scroll after a delay
    setTimeout(() => {
      if (!isInteracting) startAutoScroll();
    }, 1000); // Delay auto-scroll by 1 second
  };

  // Auto-Scroll Functionality
  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      if (!isInteracting) {
        const scrollMax = carousel.scrollWidth - carousel.clientWidth;

        // Reverse direction if at the edges
        if (carousel.scrollLeft >= scrollMax) {
          scrollDirection = -1; // Switch to scrolling left
        } else if (carousel.scrollLeft <= 0) {
          scrollDirection = 1; // Switch to scrolling right
        }

        // Incrementally scroll in the current direction
        carousel.scrollLeft += scrollDirection; // Adjust speed by modifying this value
      }
    }, 20); // Adjust interval for smoothness
  };

  // Pause auto-scroll when the user interacts with the carousel
  const pauseAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  // Start auto-scroll on page load
  startAutoScroll();

  // Event Listeners
  carousel.addEventListener('mousedown', startDragging);
  carousel.addEventListener('mousemove', drag);
  carousel.addEventListener('mouseup', stopDragging);
  carousel.addEventListener('mouseleave', stopDragging);
  carousel.addEventListener('touchstart', startDragging, { passive: true });
  carousel.addEventListener('touchmove', drag, { passive: false });
  carousel.addEventListener('touchend', stopDragging);

  // Pause auto-scroll when manually scrolling
  carousel.addEventListener('scroll', () => {
    pauseAutoScroll();
    setTimeout(() => {
      if (!isInteracting) startAutoScroll();
    }, 1000); // Delay auto-scroll resumption after manual scrolling
  });
});

// //////////////////////////////////////////////
// MAIN CONTENT /////////////////////////////////
// Cards slide in from side when section is scrolled to

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const sectionCards = document.querySelector('.section-cards'); // Target the section containing the cards

  const observerOptions = {
    root: null, // Observe within the viewport
    threshold: 0.1, // Trigger when 10% of the section is visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('swipe-in'); // Add the class to animate in
          }, index * 150); // Stagger the animation
        });
      } else {
        cards.forEach((card) => {
          card.classList.remove('swipe-in'); // Remove the class when out of view
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  if (sectionCards) {
    observer.observe(sectionCards);
  }
});

// //////////////////////////////////////////////
// //////////////////////////////////////////////
// //////////////////////////////////////////////
// //////////////////////////////////////////////
// Show button when scrolling down
window.onscroll = function () {
  let button = document.getElementById('backToTop');
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    button.classList.add('show');
  } else {
    button.classList.remove('show');
  }
};

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
