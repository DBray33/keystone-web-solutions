// ----------------------------------------
// Service item hover effect for touch devices and scroll animations
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
  // Add slide-in animation classes to service items
  // ----------------------------------------
  serviceItems.forEach((item, index) => {
    if (index % 2 === 0) {
      // 1st, 3rd, 5th (index 0, 2, 4)
      item.classList.add('slide-from-left');
    } else {
      // 2nd, 4th, 6th (index 1, 3, 5)
      item.classList.add('slide-from-right');
    }
  });

  // Initialize the Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Once animated, no need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // Use the viewport as the root
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: '-50px', // Offset when the animation triggers
    }
  );

  // Observe all service items
  serviceItems.forEach((item) => {
    observer.observe(item);
  });

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
    if (window.scrollY > 5) {
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
// Journey elements sliding in and out

document.addEventListener('DOMContentLoaded', () => {
  const journeyElements = document.querySelectorAll(
    '.journey-heading, .journey-subheading, .journey-description, .card-1, .card-2'
  );

  const observerOptions = {
    root: null,
    threshold: 0.2, // 20% visibility to trigger animation
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

  journeyElements.forEach((element) => observer.observe(element));
});
// //////////////////////////////////////////////
// PRICING SECTION //////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const pricingElements = document.querySelectorAll(
    '.pricing-heading, .pricing-description'
  );

  const observerOptions = {
    root: null,
    threshold: 0.2, // Adjusted threshold for smoother detection
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // Ensures fade-out when scrolled out
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  pricingElements.forEach((element) => observer.observe(element));
});

// Pricing cards transition
document.addEventListener('DOMContentLoaded', () => {
  const pricingCards = document.querySelectorAll('.pricing-card');

  const observerOptions = {
    root: null,
    threshold: [0, 0.3], // 0 = fully off-screen, 0.30 = 30% visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.3) {
        entry.target.classList.add('fade-in'); // Fade in when 30% visible
      } else if (entry.intersectionRatio === 0) {
        entry.target.classList.remove('fade-in'); // Fade out only when fully off-screen
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  pricingCards.forEach((card) => observer.observe(card));
});

// /////////////////////////////////////////////////////////////////
// FEES SECTION - Animations ///////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const feeItems = document.querySelectorAll(
    '.fee-item-1, .fee-item-2, .fee-item-3'
  );

  const observerOptions = {
    root: null,
    threshold: 0.3, // Trigger animation when 30% visible
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

  feeItems.forEach((item) => observer.observe(item));
});

// //////////////////////////////////////////////
// QUOTE SECTION //////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const quoteElements = document.querySelectorAll(
    '.quote-section-heading, .quote-card'
  );

  const quoteObserverOptions = {
    root: null,
    threshold: [0, 0.2], // 0 = fully off-screen, 0.20 = 20% visible
  };

  const quoteObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.2) {
        entry.target.classList.add('fade-in-quote'); // Fade in when 20% visible
      } else if (entry.intersectionRatio === 0) {
        entry.target.classList.remove('fade-in-quote'); // Fade out only when fully off-screen
      }
    });
  };

  const quoteObserver = new IntersectionObserver(
    quoteObserverCallback,
    quoteObserverOptions
  );

  quoteElements.forEach((element) => quoteObserver.observe(element));
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
document.addEventListener('DOMContentLoaded', function () {
  let basePath = window.location.pathname.includes('/')
    ? '../nav.html'
    : 'nav.html';

  fetch(basePath)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector('#navbar-container').innerHTML = data;

      // ✅ Ensure all interactive elements are initialized AFTER `nav.html` loads
      requestAnimationFrame(() => {
        initializeProgressBar();
        initializePopup();
      });
    })
    .catch((error) => console.error('⚠ Error loading navbar:', error));
});

// ✅ Initialize Progress Bar (Scroll-Based)
function initializeProgressBar() {
  const progressBar = document.getElementById('progressBar');

  if (!progressBar) {
    console.error('⚠ Progress Bar not found in the DOM!');
    return;
  }

  window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;

    progressBar.style.width = scrollPercentage + '%';
  });

  console.log('✅ Progress Bar initialized.');
}

// ✅ Initialize Popup with 5-Minute Delay on Reappearance
function initializePopup() {
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');

  if (!popup || !closePopup) {
    console.error('⚠ Popup elements not found! Retrying...');
    setTimeout(initializePopup, 100); // Retry after 100ms if not found
    return;
  }

  function getLastPopupTime() {
    return localStorage.getItem('popupLastShown') || 0;
  }

  function setLastPopupTime() {
    localStorage.setItem('popupLastShown', Date.now());
  }

  function canShowPopup() {
    const lastShown = parseInt(getLastPopupTime(), 10);
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

    return now - lastShown > fiveMinutes;
  }

  function showPopup() {
    if (canShowPopup()) {
      popup.classList.add('show');
      popup.style.display = 'block'; // ✅ Ensure it appears
      popup.style.opacity = '1'; // ✅ Make visible
      popup.style.visibility = 'visible';
      setLastPopupTime();
      console.log('✅ Popup shown.');
    } else {
      console.log('⏳ Popup blocked: Waiting for 5-minute cooldown.');
    }
  }

  // ✅ Detect mouse movement for specific areas near the edges
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const topBoundaryHeight = viewportHeight * 0.01;
    const leftBoundaryWidth = viewportWidth * 0.01;
    const topBoundaryWidth = viewportWidth * 0.2;
    const leftBoundaryHeight = viewportHeight * 0.15;

    if (
      (clientX <= leftBoundaryWidth && clientY <= leftBoundaryHeight) ||
      (clientY <= topBoundaryHeight && clientX <= topBoundaryWidth)
    ) {
      showPopup();
    }
  });

  // ✅ Close the popup
  closePopup.addEventListener('click', () => {
    popup.classList.remove('show');
    popup.style.opacity = '0'; // ✅ Fade out
    setTimeout(() => {
      popup.style.display = 'none'; // ✅ Fully hide after fade
    }, 300); // Match CSS animation duration
    console.log('❌ Popup closed.');
  });

  console.log('✅ Popup initialized.');
}
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
// MAIN CONTENT /////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.nav-item');
  const cards = document.querySelectorAll('.card');
  let currentCard = document.querySelector('.card.active');

  navItems.forEach((item) => {
    item.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetCard = document.getElementById(targetId);

      // Don't do anything if clicking the already active item
      if (this.classList.contains('active')) {
        return;
      }

      // Update navigation active states
      navItems.forEach((navItem) => navItem.classList.remove('active'));
      this.classList.add('active');

      // Animate current card out
      if (currentCard) {
        // First, animate the current card sliding up and fading out
        currentCard.style.transform = 'translateY(-20px)';
        currentCard.style.opacity = '0';

        // After animation completes, hide it and prepare new card
        setTimeout(() => {
          currentCard.classList.remove('active');

          // Prepare the new card for entrance animation
          targetCard.classList.add('active');
          targetCard.style.transform = 'translateY(20px)';
          targetCard.style.opacity = '0';

          // Force a reflow to ensure the styles are applied before the animation
          void targetCard.offsetWidth;

          // Animate the new card in
          targetCard.style.transform = 'translateY(0)';
          targetCard.style.opacity = '1';

          // Update the current card reference
          currentCard = targetCard;
        }, 300); // This matches your CSS transition time
      } else {
        // If there's no current card, just show the target (first load)
        targetCard.classList.add('active');
        targetCard.style.transform = 'translateY(0)';
        targetCard.style.opacity = '1';
        currentCard = targetCard;
      }
    });
  });
});

// line graph /////////////////////////////

// BACK TO TOP /////////////////////////////////
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
// //////////////////////////////////////////////
// //////////////////////////////////////////////
// //////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  // ✅ Determine the correct path to `nav.html` dynamically
  let basePath = window.location.pathname.includes('/')
    ? '../nav.html'
    : 'nav.html';

  // ✅ Ensure top-level pages still load correctly
  if (window.location.pathname.split('/').filter(Boolean).length === 1) {
    basePath = 'nav.html';
  }

  // ✅ Load Navbar Dynamically with Correct Path
  fetch(basePath)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector('#navbar-container').innerHTML = data;

      // ✅ Run progress bar initialization AFTER navbar loads
      requestAnimationFrame(() => {
        initializeProgressBar();
      });
    })
    .catch((error) => console.error('Error loading navbar:', error));
});

// ✅ Function to Initialize the Progress Bar
function initializeProgressBar() {
  const progressBar = document.getElementById('progressBar');

  if (!progressBar) {
    console.error('⚠ Progress Bar not found in the DOM!');
    return;
  }

  window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
  });

  console.log('✅ Progress Bar initialized successfully.');
}

// ----------------------------------------
// ----------------------------------------
// ----------------------------------------
// ----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const subheadings = document.querySelectorAll('.subheading');
  let index = 0;

  function showNextSubheading() {
    // Remove 'active' class from all subheadings
    subheadings.forEach((sub) => sub.classList.remove('active'));

    // Set 'active' class on the current subheading
    subheadings[index].classList.add('active');

    // Increment index for the next iteration
    index = (index + 1) % subheadings.length;
  }

  // Show first subheading immediately
  showNextSubheading();

  // Set interval to change subheading every 3 seconds
  setInterval(showNextSubheading, 1000);
});
