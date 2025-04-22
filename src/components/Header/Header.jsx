import FilterBar from '../FilterBar/FilterBar';
import styles from './Header.module.css';
import CurrentDate from '../CurrentDate/CurrentDate';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <CurrentDate />
                <FilterBar />
            </div>
        </header>
    );
};

export default Header;
