// ---------------------------------------------------
// 🚀 Load the navbar/mobile menu dynamically using JavaScript
// ---------------------------------------------------

async function loadNavbar() {
  try {
    const response = await fetch('/nav.html'); // Fetch navbar file
    let content = await response.text();

    // Determine how deep the current page is in the directory structure
    const depth = window.location.pathname.split('/').length - 2;
    const basePath = depth > 0 ? '../'.repeat(depth) : './';

    // Replace [[base]] with the correct relative path
    content = content.replace(/\[\[base\]\]/g, basePath);

    // Insert the navbar content into the page
    document.getElementById('navbar-container').innerHTML = content;

    console.log('✅ Navbar inserted successfully');

    // ✅ Ensure navbar scripts run **after** navbar loads
    setTimeout(() => {
      if (typeof navbarScrollEffect === 'function') {
        navbarScrollEffect();
        console.log('✅ Navbar scroll effect initialized');
      } else {
        console.warn('⚠ navbarScrollEffect function not found.');
      }

      if (typeof mobileMenuInit === 'function') {
        setTimeout(() => {
          mobileMenuInit();
          console.log('✅ Mobile menu initialized after navbar load.');
        }, 200); // Small delay ensures elements exist before initializing
      } else {
        console.warn('⚠ mobileMenuInit function not found.');
      }

      // ✅ Trigger scripts.js functions after navbar is present
      if (typeof loadScripts === 'function') {
        loadScripts();
      }
    }, 100);
  } catch (error) {
    console.error('❌ Failed to load navbar:', error);
  }
}

// ✅ Load navbar when the page loads
window.addEventListener('DOMContentLoaded', loadNavbar);

// ------------------------------------------------
// MOBILE MENU SCRIPT
// ------------------------------------------------
// ✅ Function to initialize the mobile menu with retry logic
function initializeMobileMenu() {
  const dropdownMenu = document.querySelector('.navbar-dropdown');
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  if (!dropdownMenu || !hamburgerMenu) {
    console.warn('⚠ Mobile menu elements not found. Retrying in 100ms...');
    setTimeout(initializeMobileMenu, 100); // Retry in 100ms
    return;
  }

  console.log('✅ Mobile menu elements found, initializing.');

  // ✅ Prevent duplicate event listeners
  if (!hamburgerMenu.dataset.listenerAdded) {
    hamburgerMenu.addEventListener('click', function () {
      dropdownMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
      if (
        !dropdownMenu.contains(event.target) &&
        !hamburgerMenu.contains(event.target)
      ) {
        dropdownMenu.classList.remove('open');
      }
    });

    // Mark as initialized to prevent duplicate listeners
    hamburgerMenu.dataset.listenerAdded = true;
  }
}

// ✅ Function to reinitialize navbar scroll behavior
function initializeNavbarScroll() {
  if (typeof navbarScrollEffect === 'function') {
    navbarScrollEffect();
  } else {
    console.warn('⚠ navbarScrollEffect function not found.');
  }
}

// ✅ Function to load additional scripts after navbar/footer loads
function loadScripts() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) {
    console.error('⚠ Navbar not found. Retrying...');
    setTimeout(loadScripts, 100); // Retry after 100ms
    return;
  }
  console.log('✅ Navbar detected, running scripts.js functions.');
}

// -----------------------------------------------
// 🚀 Load the footer dynamically using JavaScript
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  // Load Footer
  fetch('footer.html')
    .then((response) => response.text())
    .then((data) => {
      document.querySelector('#footer-container').innerHTML = data;

      // ✅ Ensure year updates **after** footer loads
      const yearElement = document.getElementById('year');
      if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }
    })
    .catch((error) => console.error('Error loading footer:', error));
});
