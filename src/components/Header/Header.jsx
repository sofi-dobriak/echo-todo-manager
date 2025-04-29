import FilterBar from '../FilterBar/FilterBar';
import styles from './Header.module.css';
import CurrentDate from '../CurrentDate/CurrentDate';
import Button from '../Button/Button';

const Header = ({
  toggleModal,
  filter,
  updateStatusFilter,
  updateDataFilter,
  updateTitleFilter,
  resetFilter,
  hasTaskInProgess,
  confirmModalIsOpen,
  setConfirmModalIsOpen,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <CurrentDate />
        <FilterBar
          filter={filter}
          updateStatusFilter={updateStatusFilter}
          updateDataFilter={updateDataFilter}
          updateTitleFilter={updateTitleFilter}
          resetFilter={resetFilter}
        />

        <div className={styles.optionContainer}>
          <Button onClick={toggleModal} className={styles.taskButton} disabled={hasTaskInProgess}>
            Нова задача
          </Button>
          <Button
            onClick={() => setConfirmModalIsOpen(!confirmModalIsOpen)}
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
