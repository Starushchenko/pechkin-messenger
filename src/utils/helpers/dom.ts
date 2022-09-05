export function openModal(id: string) {
  const modal = document.getElementById(id);
  const modalClose = modal?.querySelector('.modal__close');
  const modalOverlay = modal?.querySelector('.modal__overlay');
  const closeModal = function () {
    modal?.classList.remove('open');
    modalClose?.removeEventListener('click', closeModal);
    modalOverlay?.removeEventListener('click', closeModal);
  };

  modal?.classList.add('open');
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);
}

export function closeModal(id: string) {
  const modal = document.getElementById(id);
  const modalClose = modal?.querySelector('.modal__close');
  const modalOverlay = modal?.querySelector('.modal__overlay');
  const closeModal = function () {
    modal?.classList.remove('open');
    modalClose?.removeEventListener('click', closeModal);
    modalOverlay?.removeEventListener('click', closeModal);
  };

  modal?.classList.remove('open');
  modalClose?.removeEventListener('click', closeModal);
  modalOverlay?.removeEventListener('click', closeModal);
}

export function onDropdownTrigger(trigger: HTMLElement | Element | undefined | null): void {
  if (!trigger || !trigger.nextElementSibling) {
    return;
  } else {
    if (trigger.nextElementSibling) {
      const onDocumentClick = () => {
        trigger.nextElementSibling?.classList.toggle('dropdown--visible');
        setTimeout(() => {
          document.removeEventListener('click', onDocumentClick);
        })
      };
      trigger.nextElementSibling.classList.toggle('dropdown--visible');
      setTimeout(() => {
        document.addEventListener('click', onDocumentClick);
      })
    }
  }
}
