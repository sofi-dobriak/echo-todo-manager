import FilterBar from '../FilterBar/FilterBar';
import styles from './Header.module.css';
import CurrentDate from '../CurrentDate/CurrentDate';
import Button from '../Button/Button';

const Header = ({
    toggleModal,
    deleteAllTasks,
    filter,
    updateStatusFilter,
    updateDataFilter,
    updateTitleFilter,
    resetFilter,
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
                    <Button onClick={toggleModal} className={styles.taskButton}>
                        Нова задача
                    </Button>
                    <Button onClick={deleteAllTasks} className={styles.deleteButton}>
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
