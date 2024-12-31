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

  // Service item scroll transition
  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${index * 0.4}s`;
        entry.target.classList.add('expand-up');
      } else {
        entry.target.classList.remove('expand-up');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  serviceItems.forEach((item) => observer.observe(item));

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
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
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
