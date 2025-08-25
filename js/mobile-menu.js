function mobileMenuInit() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileFullscreenMenu = document.querySelector(
    '.mobile-fullscreen-menu'
  );

  if (!mobileFullscreenMenu || !hamburgerMenu) {
    console.error('⚠ Mobile menu elements not found.');
    return;
  }

  // Toggle main mobile menu when clicking hamburger icon
  hamburgerMenu.addEventListener('click', () => {
    mobileFullscreenMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  });

  // Handle expandable menu items (Services and About)
  const expandableLinks = document.querySelectorAll(
    '.mobile-nav-link.expandable'
  );
  expandableLinks.forEach((link) => {
    link.addEventListener('click', function () {
      const submenuId = this.getAttribute('data-submenu');
      const submenu = document.getElementById(submenuId + '-submenu');

      if (submenu) {
        submenu.classList.add('active');
        this.classList.add('active');
      }
    });
  });

  // Handle back buttons in submenus
  const submenuBacks = document.querySelectorAll('.submenu-back');
  submenuBacks.forEach((backBtn) => {
    backBtn.addEventListener('click', function () {
      const submenu = this.closest('.mobile-submenu');
      if (submenu) {
        submenu.classList.remove('active');
      }

      // Remove active class from expandable links
      expandableLinks.forEach((link) => {
        link.classList.remove('active');
      });
    });
  });

  // Close menu when clicking on a regular link (non-expandable)
  const regularLinks = document.querySelectorAll(
    '.mobile-nav-link:not(.expandable)'
  );
  regularLinks.forEach((link) => {
    link.addEventListener('click', function () {
      mobileFullscreenMenu.classList.remove('active');
      hamburgerMenu.classList.remove('active');
    });
  });

  // Close submenus and main menu when clicking on submenu links
  const submenuLinks = document.querySelectorAll('.submenu-links a');
  submenuLinks.forEach((link) => {
    link.addEventListener('click', function () {
      // Close all submenus
      document.querySelectorAll('.mobile-submenu').forEach((submenu) => {
        submenu.classList.remove('active');
      });

      // Close main menu
      mobileFullscreenMenu.classList.remove('active');
      hamburgerMenu.classList.remove('active');

      // Remove active class from expandable links
      expandableLinks.forEach((link) => {
        link.classList.remove('active');
      });
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !event.target.closest('.mobile-fullscreen-menu') &&
      !event.target.closest('.hamburger-menu') &&
      !event.target.closest('.mobile-submenu') &&
      !event.target.closest('.mobile-header')
    ) {
      mobileFullscreenMenu.classList.remove('active');
      hamburgerMenu.classList.remove('active');
      document.querySelectorAll('.mobile-submenu.active').forEach((submenu) => {
        submenu.classList.remove('active');
      });
      expandableLinks.forEach((link) => {
        link.classList.remove('active');
      });
    }
  });

  // Optional: Close menu when pressing Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // Close all submenus first
      document.querySelectorAll('.mobile-submenu.active').forEach((submenu) => {
        submenu.classList.remove('active');
      });

      // Close main menu
      mobileFullscreenMenu.classList.remove('active');
      hamburgerMenu.classList.remove('active');

      // Remove active class from expandable links
      expandableLinks.forEach((link) => {
        link.classList.remove('active');
      });
    }
  });

  console.log('✅ Mobile menu script initialized.');
}

// Run script when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  mobileMenuInit();
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mobileMenuInit);
} else {
  mobileMenuInit();
}
