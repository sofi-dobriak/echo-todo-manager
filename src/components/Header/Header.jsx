import FilterBar from '../FilterBar/FilterBar';
import styles from './Header.module.css';
import CurrentDate from '../CurrentDate/CurrentDate';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../../redux/tasksSlice/selectors';
import { openModal } from '../../redux/modalSlice/slice';
import { useMediaQuery } from 'react-responsive';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MobileFilterBar from '../MobileFilterBar/MobileFilterBar';

const Header = ({ clickedId }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1200 });

  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);
  const hasTaskInProgess = tasks.some(
    task => task.status === 'В роботі' || task.status === 'Продовжено'
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <CurrentDate />

        {isMobile && <MobileFilterBar />}
        {!isMobile && <FilterBar />}

        {isTablet && <BurgerMenu />}

        {!isTablet && (
          <div className={styles.optionContainer}>
            <Button
              onClick={() => dispatch(openModal('isAddTaskModalOpen'))}
              className={styles.taskButton}
              disabled={clickedId !== null || hasTaskInProgess}
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
        )}
      </div>
    </header>
  );
};

export default Header;
