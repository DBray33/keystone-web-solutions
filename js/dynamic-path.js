// ---------------------------------------------------
// 🚀 Load the navbar dynamically using JavaScript
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

    // 🚀 Re-run scripts after navbar is loaded
    setTimeout(() => {
      initializeMobileMenu();
      initializeNavbarScroll();
    }, 50); // Small delay ensures elements are present
  } catch (error) {
    console.error('Failed to load navbar:', error);
  }
}

// Load the navbar when the page loads
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
