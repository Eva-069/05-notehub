import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';

interface NoteModalProps {
  onClose: () => void;
  onNoteCreated: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose, onNoteCreated }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm 
          onCancel={onClose}
          onSubmit={onNoteCreated}
        />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;