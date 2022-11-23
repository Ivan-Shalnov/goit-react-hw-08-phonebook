import { createPortal } from 'react-dom';

export const Modal = ({ children, closeModal }) => {
  return createPortal(children, document.querySelector('#modal-root'));
};
