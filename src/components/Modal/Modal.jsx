import { useDispatch, useSelector } from 'react-redux';
import styles from './Modal.module.css';
import { useEffect } from 'react';
import { closeModal } from '../../redux/modalSlice';

const Modal = ({ children, className = '', modalKey }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.modals[modalKey]);

  const handleWrapperClick = e => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal(modalKey));
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        dispatch(closeModal(modalKey));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, modalKey]);

  return (
    <div
      onClick={handleWrapperClick}
      className={`${styles.modalWrapper} ${isOpen ? styles.modalVisible : ''}`}
    >
      <div className={`${styles.modalWindow} ${className}`}>{children}</div>
    </div>
  );
};

export default Modal;
