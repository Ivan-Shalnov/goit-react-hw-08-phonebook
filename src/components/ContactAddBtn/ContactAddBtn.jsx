import AddIcon from '@mui/icons-material/Add';
import ContactForm from 'components/ContactForm/ContactForm';
import { useState } from 'react';
import { StyledFab } from './ContactAddBtn.styled';
import { Modal } from 'components/Modal/Modal';
export const ContactAddBtn = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  return (
    <>
      <StyledFab color="secondary" aria-label="add" onClick={openModal}>
        <AddIcon />
      </StyledFab>
      {modalIsOpen && (
        <Modal>
          <ContactForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};
