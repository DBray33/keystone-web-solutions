// ---------------------------------------------------
// 🚀 Load the navbar dynamically using JavaScript
// ---------------------------------------------------

async function loadNavbar() {
  try {
    const response = await fetch('/nav.html'); // Fetch navbar file
    let content = await response.text();

    // Insert the navbar content into the page
    document.getElementById('navbar-container').innerHTML = content;
    console.log('✅ Navbar inserted successfully');

    // ✅ Ensure navbar scripts run **after** navbar loads
    setTimeout(() => {
      if (typeof navbarScrollEffect === 'function') {
        navbarScrollEffect();
        console.log('✅ Navbar scroll effect initialized');
      }

      if (typeof mobileMenuInit === 'function') {
        setTimeout(() => {
          mobileMenuInit();
          console.log('✅ Mobile menu initialized after navbar load.');
        }, 200);
      }

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

// ✅ Function to load additional scripts after navbar loads
function loadScripts() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) {
    console.error('⚠ Navbar not found. Retrying...');
    setTimeout(loadScripts, 100); // Retry after 100ms
    return;
  }
  console.log('✅ Navbar detected, running scripts.js functions.');
}

// ------------------------------------------------
// FOOTER IS NOW STATIC - NO DYNAMIC LOADING NEEDED
// Footer HTML is directly included in each page
// ------------------------------------------------
