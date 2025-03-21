function mobileMenuInit() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (!dropdownMenu || !hamburgerMenu) {
    console.error('\u26A0 Mobile menu elements not found.');
    return;
  }

  // Clear previous event listeners and clone elements
  const newHamburgerMenu = hamburgerMenu.cloneNode(true);
  const newDropdownMenu = dropdownMenu.cloneNode(true);
  hamburgerMenu.replaceWith(newHamburgerMenu);
  dropdownMenu.replaceWith(newDropdownMenu);

  // Re-select elements after cloning
  const menuContainer = document.querySelector('.dropdown-menu');
  const hamburgerButton = document.querySelector('.hamburger-menu');

  // Toggle dropdown menu when clicking hamburger icon
  hamburgerButton.addEventListener('click', () => {
    menuContainer.classList.toggle('active');
    hamburgerButton.classList.toggle('active');
  });

  // ✅ Close menu & submenus when clicking a menu link
  document.querySelectorAll('.dropdown-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      menuContainer.classList.remove('active');
      hamburgerButton.classList.remove('active');
      document
        .querySelectorAll('.dropdown-submenu.active')
        .forEach((submenu) => {
          submenu.classList.remove('active');
        });
    });
  });

  // ✅ Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !event.target.closest('.dropdown-menu') &&
      !event.target.closest('.hamburger-menu')
    ) {
      menuContainer.classList.remove('active');
      hamburgerButton.classList.remove('active');
      document
        .querySelectorAll('.dropdown-submenu.active')
        .forEach((submenu) => {
          submenu.classList.remove('active');
        });
    }
  });

  // ✅ Initialize Dropdown Submenus
  initializeDropdownSubmenus();
}

function initializeDropdownSubmenus() {
  const dropdownParents = document.querySelectorAll('.dropdown-parent');

  dropdownParents.forEach((parent) => {
    const submenu = parent.querySelector('.dropdown-submenu');
    const closeButton = submenu
      ? submenu.querySelector('.submenu-close')
      : null;
    const parentLink = parent.querySelector('a');

    if (!submenu || !closeButton || !parentLink) return;

    // Toggle submenu on parent click
    parentLink.addEventListener('click', (event) => {
      if (
        parentLink.getAttribute('href') === '' ||
        parentLink.getAttribute('href') === '#'
      ) {
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

  // ✅ Close submenus when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !event.target.closest('.dropdown-submenu') &&
      !event.target.closest('.dropdown-parent')
    ) {
      document
        .querySelectorAll('.dropdown-submenu.active')
        .forEach((submenu) => {
          submenu.classList.remove('active');
        });
    }
  });
}

// ✅ Run script when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (typeof mobileMenuInit === 'function') {
      mobileMenuInit();
      console.log('✅ Mobile menu script initialized.');
    } else {
      console.error('❌ mobileMenuInit function not found.');
    }
  }, 300);
});

// ----------------------------------------------
