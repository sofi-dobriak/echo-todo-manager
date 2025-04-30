import styles from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ isVisible, onClose, children, className = '' }) => {
  const handleWrapperClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={handleWrapperClick}
      className={`${styles.modalWrapper} ${isVisible ? styles.modalVisible : ''}`}
    >
      <div className={`${styles.modalWindow} ${className}`}>{children}</div>
    </div>
  );
};

export default Modal;
