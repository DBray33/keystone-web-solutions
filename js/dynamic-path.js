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
      if (typeof initializeNavbarScroll === 'function') {
        initializeNavbarScroll();
        console.log('✅ Navbar scroll effect initialized');
      } else {
        console.error('⚠ navbarScrollEffect function not found.');
      }

      if (typeof initializeMobileMenu === 'function') {
        initializeMobileMenu();
        console.log('✅ Mobile menu initialized');
      } else {
        console.error('⚠ mobileMenuInit function not found.');
      }
    }, 100);
  } catch (error) {
    console.error('❌ Failed to load navbar:', error);
  }
}

// ✅ Load navbar when the page loads
window.addEventListener('DOMContentLoaded', loadNavbar);

// ✅ Function to reinitialize the mobile menu script
function initializeMobileMenu() {
  if (typeof mobileMenuInit === 'function') {
    mobileMenuInit();
  } else {
    console.error('⚠ mobileMenuInit function not found.');
  }
}

// ✅ Function to reinitialize navbar scroll behavior
function initializeNavbarScroll() {
  if (typeof navbarScrollEffect === 'function') {
    navbarScrollEffect();
  } else {
    console.error('⚠ navbarScrollEffect function not found.');
  }
}
