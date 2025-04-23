import FilterBar from '../FilterBar/FilterBar';
import styles from './Header.module.css';
import CurrentDate from '../CurrentDate/CurrentDate';
import Button from '../Button/Button';

const Header = ({ toggleModal }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <CurrentDate />
                <FilterBar />

                <div className={styles.optionContainer}>
                    <Button onClick={toggleModal} className={styles.taskButton}>
                        Нова задача
                    </Button>
                    <Button className={styles.deleteButton}>Видалити все</Button>
                    <a href='#footer' className={styles.analitycsLink}>
                        Аналітика
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
