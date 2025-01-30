function mobileMenuInit() {
  const dropdownParents = document.querySelectorAll('.dropdown-parent');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const menuLinks = document.querySelectorAll('.dropdown-links a');
  const offset = 30;

  if (!dropdownMenu || !hamburgerMenu) {
    console.error('⚠ Mobile menu elements not found.');
    return;
  }

  // Clear previous event listeners (prevents duplication)
  hamburgerMenu.replaceWith(hamburgerMenu.cloneNode(true));
  dropdownMenu.replaceWith(dropdownMenu.cloneNode(true));

  // Re-select elements after cloning
  const newHamburgerMenu = document.querySelector('.hamburger-menu');
  const newDropdownMenu = document.querySelector('.dropdown-menu');

  // Hamburger menu toggle
  newHamburgerMenu.addEventListener('click', () => {
    newDropdownMenu.classList.toggle('active');
    newHamburgerMenu.classList.toggle('active');
  });

  // Close dropdown menu when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !event.target.closest('.dropdown-menu') &&
      !event.target.closest('.hamburger-menu')
    ) {
      newDropdownMenu.classList.remove('active');
      newHamburgerMenu.classList.remove('active');
    }
  });

  // Handle link clicks within the dropdown menu
  menuLinks.forEach((link) => {
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
      }

      // Close the menu and any open submenus after a link is clicked
      newDropdownMenu.classList.remove('active');
      newHamburgerMenu.classList.remove('active');
      document
        .querySelectorAll('.dropdown-submenu.active')
        .forEach((openSubmenu) => {
          openSubmenu.classList.remove('active');
        });
    });
  });

  // ✅ Initialize Dropdown Submenus (Fix)
  initializeDropdownSubmenus();
}

// ✅ New function to initialize dropdown submenus
function initializeDropdownSubmenus() {
  const dropdownParents = document.querySelectorAll('.dropdown-parent');

  dropdownParents.forEach((parent) => {
    const submenu = parent.querySelector('.dropdown-submenu');
    const closeButton = submenu
      ? submenu.querySelector('.submenu-close')
      : null;
    const parentLink = parent.querySelector('a');

    if (!submenu || !closeButton || !parentLink) return;

    // Toggle submenu on click
    parentLink.addEventListener('click', (event) => {
      const href = parentLink.getAttribute('href');
      if (href === '' || href === '#') {
        event.preventDefault();
        submenu.classList.toggle('active');
      }
    });

    // Close submenu when close button is clicked
    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      submenu.classList.remove('active');
    });
  });

  // Close submenus when clicking outside
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
}

// 🚀 Run on script load
mobileMenuInit();
