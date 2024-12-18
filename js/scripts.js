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
