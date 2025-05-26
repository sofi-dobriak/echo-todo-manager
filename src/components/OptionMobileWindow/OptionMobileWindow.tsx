import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import styles from './OptionMobileWindow.module.css';
import { selectTasks } from '../../redux/tasksSlice/selectors';
import { selectMobileWindow } from '../../redux/modalSlice/selectors';
import { closeModal, openModal } from '../../redux/modalSlice/slice';
import { IoCloseSharp } from 'react-icons/io5';
import { useEffect } from 'react';

interface OptionMobileWindowProps {
  clickedId: string | null;
}

const OptionMobileWindow = ({ clickedId }: OptionMobileWindowProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const isMobileWindowOpen = useSelector(selectMobileWindow);

  const hasTaskInProgess = tasks.some(
    task => task.status === 'В роботі' || task.status === 'Продовжено'
  );

  const handleNewTask = (): void => {
    dispatch(openModal('isAddTaskModalOpen'));
    dispatch(closeModal('isMobileWindowOpen'));
  };

  const handleDeleteAllTasks = (): void => {
    dispatch(openModal('isConfirmDeleteModalOpen'));
    dispatch(closeModal('isMobileWindowOpen'));
  };

  const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal('isMobileWindowOpen'));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        dispatch(closeModal('isMobileWindowOpen'));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return (): void => document.removeEventListener('keydown', handleKeyDown);
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

        <Button
          onClick={handleNewTask}
          className={styles.taskButton}
          disabled={clickedId !== null || hasTaskInProgess}
        >
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
