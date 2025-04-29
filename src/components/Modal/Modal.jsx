import styles from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({
  isVisible,
  onClose,
  children,
  paddingTop = '80px',
  width = '520px',
  height = '342px',
}) => {
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
      <div className={styles.modalWindow} style={{ paddingTop, width, height }}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
