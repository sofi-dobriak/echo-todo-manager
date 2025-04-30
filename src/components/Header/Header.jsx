import FilterBar from '../FilterBar/FilterBar';
import styles from './Header.module.css';
import CurrentDate from '../CurrentDate/CurrentDate';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../../redux/tasksSlice';
import { openModal } from '../../redux/modalSlice';

const Header = ({}) => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);
  const hasTaskInProgess = tasks.some(task => task.status === 'В роботі');

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <CurrentDate />
        <FilterBar />

        <div className={styles.optionContainer}>
          <Button
            onClick={() => dispatch(openModal('isAddTaskModalOpen'))}
            className={styles.taskButton}
            disabled={hasTaskInProgess}
          >
            Нова задача
          </Button>
          <Button
            onClick={() => dispatch(openModal('isConfirmDeleteModalOpen'))}
            className={styles.deleteButton}
          >
            Видалити все
          </Button>
          <a href='#footer' className={styles.analitycsLink}>
            Аналітика
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
