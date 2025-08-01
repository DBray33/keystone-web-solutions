/**
 * TABLE OF CONTENTS
 * ----------------
 * 1. Service Item Functionality
 * 2. Navbar & Navigation
 * 3. Scroll Effects & Animations
 * 4. Section-Specific Animations
 *    - Journey Section
 *    - Pricing Section
 *    - Fees Section
 *    - Quote Section
 * 5. Background Effects
 * 6. Visual Elements
 *    - PageSpeed Score Circles
 *    - Progress Bar
 * 7. Interactive Components
 *    - Popup System
 *    - FAQ Accordion
 *    - Main Content Card System
 * 8. Utility Functions
 *    - Back to Top Button
 *    - Dynamic Content Loading
 *    - Animated Subheadings
 * 9. Custom Web Design Page Functions
 */

// ==========================================================================
// 1. SERVICE ITEM FUNCTIONALITY
// ==========================================================================
document.addEventListener('DOMContentLoaded', function () {
  const serviceItems = document.querySelectorAll('.service-item');

  // Touch device hover effect for service items
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

  // Remove hover effect when touching outside service items
  document.addEventListener(
    'touchstart',
    function (event) {
      if (!event.target.closest('.service-item')) {
        serviceItems.forEach((el) => el.classList.remove('service-item-hover'));
      }
    },
    { passive: true }
  );

  // Add slide-in animation classes to service items
  serviceItems.forEach((item, index) => {
    if (index % 2 === 0) {
      // 1st, 3rd, 5th (index 0, 2, 4)
      item.classList.add('slide-from-left');
    } else {
      // 2nd, 4th, 6th (index 1, 3, 5)
      item.classList.add('slide-from-right');
    }
  });

  // Initialize the Intersection Observer for service items
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animate class immediately with no delay
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, 10); // Tiny timeout to ensure proper execution
          // Once animated, no need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // Use the viewport as the root
      threshold: 0.1, // Reduced from 0.2 - trigger when only 10% is visible
      rootMargin: '-20px', // Changed from -50px for earlier triggering
    }
  );

  // Observe all service items
  serviceItems.forEach((item) => {
    observer.observe(item);
  });
});

// ==========================================================================
// 2. NAVBAR & NAVIGATION
// ==========================================================================

// Smooth scroll for navbar link clicks
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

// Navbar dropdown functionality
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

// Navbar scroll effect (runs only after navbar loads)
function navbarScrollEffect() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) {
    console.error('⚠ Navbar not found. Retrying...');
    setTimeout(navbarScrollEffect, 100); // Retry after 100ms
    return;
  }

  console.log('✅ Navbar detected, initializing scroll effect.');

  // Clear any previous scroll event listeners (prevents duplication)
  window.removeEventListener('scroll', handleNavbarScroll);

  function handleNavbarScroll() {
    if (window.scrollY > 5) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Attach new scroll event listener
  window.addEventListener('scroll', handleNavbarScroll);
}

// ==========================================================================
// 3. SCROLL EFFECTS & ANIMATIONS
// ==========================================================================

// Handle scroll events
function handleScroll(event) {
  console.log('Scroll event detected');
}

document.addEventListener('wheel', handleScroll, { passive: false });

// Sidebar touch-based scrolling for mobile
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

// Handle resize events (remove or re-add scroll events)
function handleResize() {
  if (window.innerWidth <= 935) {
    document.removeEventListener('wheel', handleScroll);
  } else {
    document.addEventListener('wheel', handleScroll, { passive: false });
  }
}

handleResize();
window.addEventListener('resize', handleResize, { passive: true });

// ==========================================================================
// JOURNEY SECTION ANIMATIONS - DARK THEME
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Journey Cards Animation
  const journeyCards = document.querySelectorAll('.journey-card');

  if (journeyCards.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '-50px 0px',
    };

    let animationDelay = 0;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add staggered animation delay
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, animationDelay);

          animationDelay += 150; // 150ms delay between each card

          // Don't observe this element anymore
          journeyObserver.unobserve(entry.target);
        }
      });
    };

    const journeyObserver = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Reset delay when section comes into view
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animationDelay = 0;
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const journeySection = document.querySelector('.journey-section');
    if (journeySection) {
      sectionObserver.observe(journeySection);
    }

    journeyCards.forEach((card) => journeyObserver.observe(card));
  }

  // Smooth scroll for the pricing link
  const pricingLink = document.querySelector(
    '.journey-card-link[href="#pricing-section"]'
  );
  if (pricingLink) {
    pricingLink.addEventListener('click', (e) => {
      e.preventDefault();
      const pricingSection = document.querySelector('#pricing-section');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Optional: Add parallax effect to background
  const journeySection = document.querySelector('.journey-section');
  if (journeySection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rect = journeySection.getBoundingClientRect();
      const speed = 0.5;

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(scrolled * speed);
        journeySection.style.backgroundPosition = `center ${yPos}px`;
      }
    });
  }
});

// PRICING SECTION - Heading and description animations (only fade in, no fade out)
document.addEventListener('DOMContentLoaded', () => {
  const pricingElements = document.querySelectorAll(
    '.pricing-heading, .pricing-description'
  );

  const observerOptions = {
    root: null,
    threshold: 0.2, // Trigger when 20% visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once the animation is applied, unobserve the element
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  pricingElements.forEach((element) => observer.observe(element));
});

// PRICING SECTION - Pricing cards transition (only fade in, no fade out)
document.addEventListener('DOMContentLoaded', () => {
  const pricingCards = document.querySelectorAll('.pricing-card');

  const observerOptions = {
    root: null,
    threshold: 0.3, // Trigger when 30% visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in'); // Fade in when visible
        // Once the animation is applied, unobserve the element
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  pricingCards.forEach((card) => observer.observe(card));
});

// FEES SECTION - Animations (only fade in, no fade out)
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
        // Once the animation is applied, unobserve the element
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  feeItems.forEach((item) => observer.observe(item));
});

// QUOTE SECTION - Animations
// Timeline scroll animation
document.addEventListener('DOMContentLoaded', function () {
  // Populate form hidden fields
  const pageUrlField = document.getElementById('page-url');
  if (pageUrlField) {
    pageUrlField.value = window.location.href;
  }

  const pageTitleField = document.getElementById('page-title');
  if (pageTitleField) {
    pageTitleField.value = document.title;
  }

  // Timeline scroll animation
  const timelineContainer = document.querySelector('.quote-process-timeline');
  const timelineItems = document.querySelectorAll('.quote-timeline-item');

  if (timelineItems.length > 0 && timelineContainer) {
    let hasAnimated = false;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1,
    };

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !hasAnimated &&
          entry.target === timelineContainer
        ) {
          hasAnimated = true;

          // Animate each item in sequence
          timelineItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('timeline-visible');
            }, index * 300); // 300ms delay between each item
          });

          // Unobserve after animation starts
          timelineObserver.unobserve(timelineContainer);
        }
      });
    }, observerOptions);

    // Observe the timeline container instead of individual items
    timelineObserver.observe(timelineContainer);
  }
});

// ==========================================================================
// 5. BACKGROUND EFFECTS
// ==========================================================================

// FIXED INTRO BACKGROUND UNTIL JOURNEY SECTION
document.addEventListener('scroll', () => {
  const mainContent = document.querySelector('.main-content');
  const journeySection = document.querySelector('.journey-section');

  if (mainContent && journeySection) {
    const journeyPosition = journeySection.getBoundingClientRect().top;

    if (journeyPosition <= 0) {
      mainContent.style.backgroundAttachment = 'scroll'; // Change to normal scroll
    } else {
      mainContent.style.backgroundAttachment = 'fixed'; // Keep it fixed
    }
  }
});

// STANDALONE LOGO
document.addEventListener('scroll', () => {
  const logo = document.querySelector('.standalone-logo');
  if (window.scrollY > 0) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// ==========================================================================
// 6. VISUAL ELEMENTS
// ==========================================================================

// PAGESPEED SCORE CIRCLES
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

// PROGRESS BAR
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

// ==========================================================================
// 7. INTERACTIVE COMPONENTS
// ==========================================================================

// POPUP SYSTEM
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

// FAQ ACCORDION
document.addEventListener('DOMContentLoaded', () => {
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
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, index * 200); // Stagger the animations for a cascading effect
  });
});

// MAIN CONTENT CARD SYSTEM
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

// ==========================================================================
// 8. UTILITY FUNCTIONS
// ==========================================================================

// BACK TO TOP BUTTON
window.onscroll = function () {
  let button = document.getElementById('backToTop');
  if (button) {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  }
};

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// DYNAMIC CONTENT LOADING
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

      // ✅ Run initialization AFTER navbar loads
      requestAnimationFrame(() => {
        initializeProgressBar();
        initializePopup();
        navbarScrollEffect();
      });
    })
    .catch((error) => console.error('Error loading navbar:', error));
});

// ANIMATED SUBHEADINGS
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

  // Set interval to change subheading every second
  setInterval(showNextSubheading, 1000);
});

// ==========================================================================
// 9. CUSTOM WEB DESIGN PAGE FUNCTIONS
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  // Only run on custom web design page
  if (!document.body.classList.contains('custom-web-design-page')) {
    return;
  }

  // Fade-in animations for custom web design page
  const cwdObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const cwdObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cwdObserver.unobserve(entry.target);
      }
    });
  }, cwdObserverOptions);

  // Observe all fade-in elements with cwd prefix
  document.querySelectorAll('.cwd-fade-in').forEach((el) => {
    cwdObserver.observe(el);
  });

  // Animated counter for stats - custom web design page
  const animateCwdCounters = () => {
    const counters = document.querySelectorAll('.cwd-stat-number[data-count]');

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      // Start animation when element is visible
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              updateCounter();
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      counterObserver.observe(counter);
    });
  };

  animateCwdCounters();

  // Parallax effect for hero section - custom web design page
  const cwdHeroSection = document.querySelector('.cwd-hero-section');
  if (cwdHeroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      cwdHeroSection.style.transform = `translateY(${
        scrolled * parallaxSpeed
      }px)`;
    });
  }

  // Neon glow effect on mouse move - custom web design page
  const cwdNeonElements = document.querySelectorAll(
    '.cwd-neon-glow, .cwd-neon-glow-alt'
  );

  if (cwdNeonElements.length > 0) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      cwdNeonElements.forEach((element) => {
        const intensity = 40 + x * 20; // Dynamic intensity based on mouse position
        const currentColor = window.getComputedStyle(element).color;

        element.style.textShadow = `
          0 0 ${intensity * 0.25}px ${currentColor},
          0 0 ${intensity * 0.5}px ${currentColor},
          0 0 ${intensity * 0.75}px ${currentColor},
          0 0 ${intensity}px ${currentColor}
        `;
      });
    });
  }

  // Card hover effects - custom web design page
  const cwdCards = document.querySelectorAll('.cwd-content-card');

  cwdCards.forEach((card) => {
    card.addEventListener('mouseenter', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Video optimization - custom web design page
  const cwdVideos = document.querySelectorAll('.cwd-video-card video');
  cwdVideos.forEach((video) => {
    // Pause video when not in viewport
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoObserver.observe(video);
  });

  // Dynamic particle background (optional - requires particles.js)
  if (
    typeof particlesJS !== 'undefined' &&
    document.getElementById('particles-js')
  ) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ['#00ffff', '#ff00ff', '#ffff00'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00ffff',
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab',
          },
          onclick: {
            enable: true,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
window.addEventListener(
  'scroll',
  debounce(() => {
    // Add any scroll-based animations here
  }, 10)
);
