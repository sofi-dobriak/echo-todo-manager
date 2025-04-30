import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './confirmDeleteModal.module.css';
import { IoCloseSharp } from 'react-icons/io5';

const ConfirmDeleteModal = ({
  isVisible,
  onClose,
  deleteAllTasks,
  paddingTop = '60px',
  width = '400px',
  height = '200px',
}) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose} className={styles.modalWindow}>
      <button onClick={onClose} className={styles.cancelButton}>
        <IoCloseSharp className={styles.cancelIcon} />
      </button>

      <h2 className={styles.confirmTitle}>Видалити всі завдання?</h2>
      <Button onClick={deleteAllTasks} className={styles.confirmButton}>
        Видалити все
      </Button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
