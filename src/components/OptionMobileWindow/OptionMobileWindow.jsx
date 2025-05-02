import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import styles from './OptionMobileWindow.module.css';
import { selectTasks } from '../../redux/tasksSlice/selectors';
import { selectMobileWindow } from '../../redux/modalSlice/selectors';
import { closeModal, openModal } from '../../redux/modalSlice/slice';
import { IoCloseSharp } from 'react-icons/io5';
import { useEffect } from 'react';

const OptionMobileWindow = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const hasTaskInProgess = tasks.some(task => task.status === 'В роботі');
  const isMobileWindowOpen = useSelector(selectMobileWindow);

  const handleNewTask = () => {
    dispatch(openModal('isAddTaskModalOpen'));
    dispatch(closeModal('isMobileWindowOpen'));
  };

  const handleDeleteAllTasks = () => {
    dispatch(openModal('isConfirmDeleteModalOpen'));
    dispatch(closeModal('isMobileWindowOpen'));
  };

  const handleWrapperClick = e => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal('isMobileWindowOpen'));
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        dispatch(closeModal('isMobileWindowOpen'));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <div
      onClick={handleWrapperClick}
      className={`${styles.mobileWrapper} ${isMobileWindowOpen ? styles.visible : ''}`}
    >
      <div className={styles.mobileWindow}>
        <Button
          onClick={() => dispatch(closeModal('isMobileWindowOpen'))}
          className={styles.cancelButton}
        >
          <IoCloseSharp className={styles.cancelIcon} />
        </Button>

        <Button onClick={handleNewTask} className={styles.taskButton} disabled={hasTaskInProgess}>
          Нова задача
        </Button>
        <Button onClick={handleDeleteAllTasks} className={styles.deleteButton}>
          Видалити все
        </Button>
        <a
          href='#footer'
          className={styles.analitycsLink}
          onClick={() => dispatch(closeModal('isMobileWindowOpen'))}
        >
          Аналітика
        </a>
      </div>
    </div>
  );
};

export default OptionMobileWindow;
