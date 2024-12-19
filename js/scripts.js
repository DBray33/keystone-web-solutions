document.addEventListener('DOMContentLoaded', function () {
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach((item) => {
    item.addEventListener('touchstart', function () {
      serviceItems.forEach((el) => el.classList.remove('service-item-hover'));
      this.classList.add('service-item-hover');
    });
  });

  document.addEventListener('touchstart', function (event) {
    if (!event.target.closest('.service-item')) {
      serviceItems.forEach((el) => el.classList.remove('service-item-hover'));
    }
  });
});

// /////////////////////////////////
const sidebarContent = document.querySelector('.sidebar-content');
const mainContent = document.querySelector('.main-content');

function handleScroll(event) {
  event.preventDefault(); // Prevent default scroll behavior

  // Adjust scroll speed (increase the multiplier for faster scrolling)
  const scrollSpeed = 1; // Change this value to control speed
  mainContent.scrollBy({
    top: event.deltaY * scrollSpeed,
    behavior: 'auto', // Use 'smooth' for smooth scrolling, or 'auto' for instant
  });
}

// Add event listener for wheel events on the entire document
document.addEventListener('wheel', handleScroll);

// Handle touch events for scrolling on smaller screens
let touchStartY = 0;

sidebarContent.addEventListener('touchstart', function (event) {
  touchStartY = event.touches[0].clientY;
});

sidebarContent.addEventListener('touchmove', function (event) {
  const touchEndY = event.touches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  mainContent.scrollBy({
    top: deltaY,
    behavior: 'auto', // Use 'smooth' for smooth scrolling, or 'auto' for instant
  });

  touchStartY = touchEndY;
});

// Add media query to handle scroll behavior for smaller screens
function handleResize() {
  if (window.innerWidth <= 935) {
    document.removeEventListener('wheel', handleScroll);
  } else {
    document.addEventListener('wheel', handleScroll);
  }
}

// Initial check
handleResize();

// Add event listener for window resize
window.addEventListener('resize', handleResize);
