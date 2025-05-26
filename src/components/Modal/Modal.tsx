import { useDispatch, useSelector } from 'react-redux';
import styles from './Modal.module.css';
import { useEffect } from 'react';
import { closeModal } from '../../redux/modalSlice/slice';
import { RootState } from '../../redux/store';
import { ModalKey } from '../../redux/modalSlice/slice';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  className: string;
  modalKey: ModalKey;
}

const Modal = ({ children, className = '', modalKey }: ModalProps) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modals[modalKey]);

  const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal(modalKey));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        dispatch(closeModal(modalKey));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return (): void => document.removeEventListener('keydown', handleKeyDown);
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
