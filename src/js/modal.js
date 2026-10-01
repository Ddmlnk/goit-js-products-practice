import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', handleEscapePress);
  refs.modal.addEventListener('click', handleModalClick);
  refs.modalCloseButton.addEventListener('click', closeModal);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleEscapePress);
  refs.modal.removeEventListener('click', handleModalClick);
  refs.modalCloseButton.removeEventListener('click', closeModal);
}

function handleEscapePress(e) {
  if (e.code === 'Escape') closeModal();
}
function handleModalClick(event) {
  if (event.target === event.currentTarget) closeModal();
}
