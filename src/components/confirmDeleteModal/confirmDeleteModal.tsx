import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './confirmDeleteModal.module.css';
import { IoCloseSharp } from 'react-icons/io5';
import { deleteAllTasks } from '../../redux/tasksSlice/slice';
import { hideItemAnalytic } from '../../redux/itemAnalyticSlice/slice';
import { closeModal } from '../../redux/modalSlice/slice';

const ConfirmDeleteModal = () => {
  const dispatch = useDispatch();

  const handleDeleteAllTasks = (): void => {
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
