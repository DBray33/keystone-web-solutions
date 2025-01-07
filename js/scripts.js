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

  // Mobile menu functionality
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const links = document.querySelectorAll('.dropdown-links a');
  const offset = 30;

  hamburgerMenu.addEventListener('click', () => {
    dropdownMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (
      !event.target.closest('.dropdown-menu') &&
      !event.target.closest('.hamburger-menu')
    ) {
      dropdownMenu.classList.remove('active');
      hamburgerMenu.classList.remove('active');
    }
  });

  // Handle link clicks within the dropdown
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#') || href === '') {
        event.preventDefault();
        const targetId = href.slice(1); // Remove the "#" character
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const elementPosition =
            targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      } else {
        return;
      }

      dropdownMenu.classList.remove('active');
      hamburgerMenu.classList.remove('active');
    });
  });
});

// //////////////////////////////////////////////
// JOURNEY SECTION
// Journey intro text phasing in
document.addEventListener('DOMContentLoaded', () => {
  const journeyIntro = document.querySelector('.journey-section-intro');

  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
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
  const card1Elements = document.querySelectorAll('.card-1');

  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  card1Elements.forEach((card) => observer.observe(card));
});

document.addEventListener('DOMContentLoaded', () => {
  const card2Elements = document.querySelectorAll('.card-2');

  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  card2Elements.forEach((card) => observer.observe(card));
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

document.addEventListener('DOMContentLoaded', () => {
  const dropdownParents = document.querySelectorAll('.dropdown-parent');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const menuLinks = document.querySelectorAll('.dropdown-links a');

  dropdownParents.forEach((parent) => {
    const submenu = parent.querySelector('.dropdown-submenu');
    const closeButton = submenu.querySelector('.submenu-close');
    const parentLink = parent.querySelector('a');

    // Toggle submenu on click
    parentLink.addEventListener('click', (event) => {
      // Check if the link is "#" or empty
      const href = parentLink.getAttribute('href');
      if (href === '' || href === '#') {
        event.preventDefault(); // Prevent navigation if the href is not a valid link
        submenu.classList.toggle('active');
      }
    });

    // Close submenu when close button is clicked
    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      submenu.classList.remove('active');
    });
  });

  // Close dropdown menu when a link is clicked
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      dropdownMenu.classList.remove('active'); // Close the dropdown menu
      hamburgerMenu.classList.remove('active'); // Reset hamburger menu state
    });
  });

  // Optional: Close submenu if user clicks outside
  document.addEventListener('click', (event) => {
    if (
      !event.target.closest('.dropdown-submenu') &&
      !event.target.closest('.dropdown-parent')
    ) {
      document
        .querySelectorAll('.dropdown-submenu.active')
        .forEach((openSubmenu) => {
          openSubmenu.classList.remove('active');
        });
    }
  });
});
