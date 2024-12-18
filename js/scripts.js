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
document.querySelector('.sidebar').addEventListener('wheel', function (event) {
  event.preventDefault(); // Prevent default scroll behavior

  // Adjust scroll speed (increase the multiplier for faster scrolling)
  const scrollSpeed = 1; // Change this value to control speed
  document.querySelector('.main-content').scrollBy({
    top: event.deltaY * scrollSpeed,
    behavior: 'auto', // Use 'smooth' for smooth scrolling, or 'auto' for instant
  });
});
