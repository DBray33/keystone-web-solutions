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

  // Close dropdown menu when a link is clicked
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      dropdownMenu.classList.remove('active');
      hamburgerMenu.classList.remove('active');
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

  // Handle hamburger menu toggle
  hamburgerMenu.addEventListener('click', () => {
    dropdownMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  });
});
