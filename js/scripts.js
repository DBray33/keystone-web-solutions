document.addEventListener('DOMContentLoaded', function () {
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach((item) => {
    item.addEventListener('click', function () {
      this.querySelector('.service-item-inner').classList.toggle('rotate');
    });
  });
});
