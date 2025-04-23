import Button from '../Button/Button';
import styles from './TitleFilter.module.css';
import { FaCheck } from 'react-icons/fa6';

const TitleFilter = () => {
    return (
        <div className={styles.formButtonContainer}>
            <form className={styles.titleForm}>
                <label className={styles.dateLabel}>
                    <input
                        type='text'
                        className={styles.textInput}
                        placeholder='Введіть назву...'
                    />
                </label>
            </form>
            <Button className={styles.acceptButton}>
                <FaCheck className={styles.acceptIcon} />
            </Button>
        </div>
    );
};

export default TitleFilter;
