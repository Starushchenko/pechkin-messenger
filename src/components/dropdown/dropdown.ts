'use strict';

(function() {
  document.querySelectorAll('.js-dropdown-trigger').forEach((item) => {
    const onToggleDropdown = () => {
      if (item.nextElementSibling) {
        item.nextElementSibling.classList.add('dropdown--visible');
        item.removeEventListener('click', onToggleDropdown);
        setTimeout(() => {
          document.addEventListener('click', onDocumentClick);
        });
      }
    };
    const onDocumentClick = () => {
      if (item.nextElementSibling) {
        item.nextElementSibling.classList.remove('dropdown--visible');
        document.removeEventListener('click', onDocumentClick);
        item.addEventListener('click', onToggleDropdown);
      }
    };
    item.addEventListener('click', onToggleDropdown);
  });
})();

