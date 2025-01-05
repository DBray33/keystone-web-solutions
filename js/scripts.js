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
      // Check if the href starts with "#" (internal link)
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

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const targetId = link.getAttribute('href').slice(1);
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
    root: null, // Use the viewport as the container
    threshold: 0.4, // Trigger when 40% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing after animation triggers
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
  const card1Elements = document.querySelectorAll('.card-1'); // Select only card-1 elements

  const observerOptions = {
    root: null, // Use the viewport as the container
    threshold: 0.2, // Trigger when 20% of the card is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once the animation has triggered
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  card1Elements.forEach((card) => observer.observe(card)); // Observe only card-1 elements
});

document.addEventListener('DOMContentLoaded', () => {
  const card2Elements = document.querySelectorAll('.card-2'); // Select only card-2 elements

  const observerOptions = {
    root: null, // Use the viewport as the container
    threshold: 0.2, // Trigger when 20% of the card is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once the animation has triggered
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  card2Elements.forEach((card) => observer.observe(card)); // Observe only card-2 elements
});

document.addEventListener('DOMContentLoaded', () => {
  const card1Elements = document.querySelectorAll('.card-1'); // Select only card-1 elements
  const card2Elements = document.querySelectorAll('.card-2'); // Select only card-2 elements

  const observerOptions = {
    root: null, // Use the viewport as the container
    threshold: 0.2, // Trigger when 20% of the card is visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Add the visible class when entering the viewport
      } else {
        entry.target.classList.remove('visible'); // Remove the visible class when exiting the viewport
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  card1Elements.forEach((card) => observer.observe(card)); // Observe card-1 elements
  card2Elements.forEach((card) => observer.observe(card)); // Observe card-2 elements
});

// //////////////////////////////////////////////
// PRICING SECTION //////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const pricingCards = document.querySelectorAll('.pricing-card');

  const observerOptions = {
    root: null, // Use the viewport as the container
    threshold: [0, 0.2], // Trigger at 0% and 20% visibility
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.2) {
        // Add a custom CSS variable for staggered delay
        if (entry.target.classList.contains('pricing-card-1')) {
          entry.target.style.setProperty('--delay', '0s');
        } else if (entry.target.classList.contains('pricing-card-2')) {
          entry.target.style.setProperty('--delay', '0.2s');
        } else if (entry.target.classList.contains('pricing-card-3')) {
          entry.target.style.setProperty('--delay', '0.4s');
        }
        entry.target.classList.add('visible'); // Add the 'visible' class
      } else if (entry.intersectionRatio === 0) {
        entry.target.classList.remove('visible'); // Remove the 'visible' class
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  pricingCards.forEach((card) => observer.observe(card));
});

// //////////////////////////////////////////////
// MOBILE MENU DROPDOWN SUBMENU //////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const dropdownParents = document.querySelectorAll('.dropdown-parent');

  dropdownParents.forEach((parent) => {
    const submenu = parent.querySelector('.dropdown-submenu');
    const closeButton = submenu.querySelector('.submenu-close');

    parent.addEventListener('click', (event) => {
      event.preventDefault();

      // Toggle the clicked submenu
      submenu.classList.toggle('active');
    });

    // Close submenu when close button is clicked
    closeButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click from bubbling up to parent
      submenu.classList.remove('active');
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

// //////////////////////////////////////////////
// PRICING LINK SCROLL DISTANCE //////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const pricingLink = document.querySelector('.pricing-link');

  pricingLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default jump behavior

    const targetId = pricingLink.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;

      // Dynamically calculate offset based on viewport width
      const offset = window.innerWidth <= 843 ? 80 : 70;

      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  });
});
