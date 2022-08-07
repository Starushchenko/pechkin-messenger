export function onDropdownTrigger(trigger: HTMLElement | Element | undefined | null): void {
  if (!trigger || !trigger.nextElementSibling) {
    return;
  } else {
    const onToggleDropdown = () => {
      if (trigger.nextElementSibling) {
        trigger.nextElementSibling.classList.add('dropdown--visible');
        trigger.removeEventListener('click', onToggleDropdown);
        setTimeout(() => {
          document.addEventListener('click', onDocumentClick);
        });
      }
    };
    const onDocumentClick = () => {
      if (trigger.nextElementSibling) {
        trigger.nextElementSibling.classList.remove('dropdown--visible');
        document.removeEventListener('click', onDocumentClick);
        trigger.addEventListener('click', onToggleDropdown);
      }
    };
    trigger.addEventListener('click', onToggleDropdown);
  }
}
