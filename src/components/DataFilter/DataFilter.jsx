import Button from '../Button/Button';
import styles from './DataFilter.module.css';
import { FaCheck } from 'react-icons/fa6';
import Calendar from '../Calendar/Calendar';

const DataFilter = () => {
    return (
        <div className={styles.formButtonContainer}>
            <form className={styles.dateForm}>
                <Calendar className={styles.dateInputField} label='Від' />
                <Calendar className={styles.dateInputField} label='До' />
            </form>
            <Button className={styles.acceptButton}>
                <FaCheck className={styles.acceptIcon} />
            </Button>
        </div>
    );
};

export default DataFilter;
