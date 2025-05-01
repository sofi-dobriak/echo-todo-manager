import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './confirmDeleteModal.module.css';
import { IoCloseSharp } from 'react-icons/io5';
import { closeModal } from '../../redux/modalSlice';
import { deleteAllTasks } from '../../redux/tasksSlice';
import { hideItemAnalytic } from '../../redux/itemAnalyticSlice';

const ConfirmDeleteModal = () => {
  const dispatch = useDispatch();

  const handleDeleteAllTasks = () => {
    dispatch(deleteAllTasks());
    dispatch(hideItemAnalytic());
    dispatch(closeModal('isConfirmDeleteModalOpen'));
  };

  return (
    <Modal modalKey='isConfirmDeleteModalOpen' className={styles.modalWindow}>
      <button
        onClick={() => dispatch(closeModal('isConfirmDeleteModalOpen'))}
        className={styles.cancelButton}
      >
        <IoCloseSharp className={styles.cancelIcon} />
      </button>

      <h2 className={styles.confirmTitle}>Видалити всі завдання?</h2>
      <Button onClick={handleDeleteAllTasks} className={styles.confirmButton}>
        Видалити все
      </Button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
