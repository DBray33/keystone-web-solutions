document.addEventListener('DOMContentLoaded', function () {
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach((item) => {
    item.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent the event from bubbling up to the document
      const inner = this.querySelector('.service-item-inner');
      const isRotated = inner.classList.contains('rotate');

      // Rotate back if clicking on the backside
      if (isRotated && event.target.closest('.service-item-back')) {
        inner.classList.remove('rotate');
      } else {
        // Rotate the clicked card and rotate back all other cards
        serviceItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem
              .querySelector('.service-item-inner')
              .classList.remove('rotate');
          }
        });
        inner.classList.toggle('rotate');
      }
    });
  });

  document.addEventListener('click', function () {
    serviceItems.forEach((item) => {
      item.querySelector('.service-item-inner').classList.remove('rotate');
    });
  });
});
