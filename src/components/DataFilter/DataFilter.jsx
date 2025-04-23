import Button from '../Button/Button';
import styles from './DataFilter.module.css';
import { FaCheck } from 'react-icons/fa6';

const DataFilter = () => {
    return (
        <div className={styles.formButtonContainer}>
            <form className={styles.dateForm}>
                <label className={styles.dateLabel}>
                    <input type='date' className={styles.dateInput} />
                </label>
                <label className={styles.dateLabel}>
                    <input type='date' className={styles.dateInput} />
                </label>
            </form>
            <Button className={styles.acceptButton}>
                <FaCheck className={styles.acceptIcon} />
            </Button>
        </div>
    );
};

export default DataFilter;
