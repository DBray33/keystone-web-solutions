// /////////////////////////////////////////////////////
// ACCORDION FUNCTIONALITY /////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const guideTitles = document.querySelectorAll('.guide-title');

  guideTitles.forEach((title) => {
    title.addEventListener('click', function () {
      const description = this.nextElementSibling;

      if (description) {
        const isVisible = description.classList.contains('show');
        if (isVisible) {
          // Hide the description
          description.style.maxHeight = null;
          description.classList.remove('show');
        } else {
          // Remove 'show' class from all other descriptions
          document
            .querySelectorAll('.guide-description.show')
            .forEach((desc) => {
              desc.style.maxHeight = null;
              desc.classList.remove('show');
            });

          // Show the description
          description.style.maxHeight = description.scrollHeight + 'px';
          description.classList.add('show');
        }
      }
    });
  });
});
