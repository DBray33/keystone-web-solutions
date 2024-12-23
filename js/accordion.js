// /////////////////////////////////////////////////////
// ACCORDION FUNCTIONALITY /////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const guideTitles = document.querySelectorAll('.guide-title');
  const guideDescriptions = document.querySelectorAll('.guide-description');

  // Toggle accordion when a title is clicked
  guideTitles.forEach((title) => {
    const arrow = document.createElement('span'); // Add an arrow element
    arrow.classList.add('accordion-arrow');
    arrow.textContent = '▼'; // Initial arrow state
    title.appendChild(arrow);

    title.addEventListener('click', function (event) {
      const description = this.nextElementSibling;

      if (description) {
        const isVisible = description.classList.contains('show');
        if (isVisible) {
          // Hide the description
          description.style.maxHeight = null;
          description.classList.remove('show');
          arrow.textContent = '▼'; // Collapse arrow
        } else {
          // Remove 'show' class from all other descriptions
          guideDescriptions.forEach((desc) => {
            desc.style.maxHeight = null;
            desc.classList.remove('show');
          });
          guideTitles.forEach((title) => {
            const otherArrow = title.querySelector('.accordion-arrow');
            if (otherArrow) otherArrow.textContent = '▼'; // Reset other arrows
          });

          // Show the description
          description.style.maxHeight = description.scrollHeight + 'px';
          description.classList.add('show');
          arrow.textContent = '▲'; // Expand arrow
        }
      }

      // Stop propagation to prevent document-level click
      event.stopPropagation();
    });
  });

  // Close all accordions when clicking outside
  document.addEventListener('click', function () {
    guideDescriptions.forEach((desc) => {
      desc.style.maxHeight = null;
      desc.classList.remove('show');
    });
    guideTitles.forEach((title) => {
      const arrow = title.querySelector('.accordion-arrow');
      if (arrow) arrow.textContent = '▼'; // Reset all arrows
    });
  });
});
// /////////////////////////////////////////////////////
// Scroll animation ////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const guideItems = document.querySelectorAll('.guide-list li');

  const observerOptions = {
    root: null, // Viewport as container
    threshold: 0.2, // Trigger when 20% of element is visible
  };

  const observerCallback = (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${index * 0.4}s`;
        entry.target.classList.add('expand-up');
      } else {
        entry.target.classList.remove('expand-up');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  guideItems.forEach((item) => observer.observe(item));
});
