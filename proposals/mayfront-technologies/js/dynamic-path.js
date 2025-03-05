// --------------------------------------------
// DYNAMICALLY LOAD NAVBAR
document.addEventListener('DOMContentLoaded', function () {
  fetch('/nav.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('navbar').innerHTML = data;
      initializeNavbar(); // Call function to activate dropdowns & mobile menu
    })
    .catch((error) => console.error('Error loading navbar:', error));

  function initializeNavbar() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Dropdown functionality for desktop
    dropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector('.nav-link');
      const menu = dropdown.querySelector('.dropdown-menu');

      link.addEventListener('click', function (e) {
        e.preventDefault();
        const isActive = dropdown.classList.contains('active');

        // Close all dropdowns before opening the clicked one
        document
          .querySelectorAll('.dropdown')
          .forEach((d) => d.classList.remove('active'));

        if (!isActive) {
          dropdown.classList.add('active');
        }
      });

      // Close dropdowns when clicking outside
      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && !link.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      mobileMenuToggle.classList.toggle('active');
    });

    // Mobile dropdown functionality
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > a');

    mobileDropdowns.forEach((dropdown) => {
      dropdown.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = this.parentElement;
        const submenu = parent.querySelector('.mobile-submenu');

        // Close other mobile dropdowns
        document.querySelectorAll('.mobile-submenu').forEach((menu) => {
          if (menu !== submenu) {
            menu.style.display = 'none';
          }
        });

        submenu.style.display =
          submenu.style.display === 'block' ? 'none' : 'block';
      });
    });
  }
});

// --------------------------------------------
// back to top
// --------------------------------------------
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
