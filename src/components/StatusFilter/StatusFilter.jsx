import styles from './StatusFilter.module.css';

const StatusFilter = () => {
    return (
        <div className={styles.formButtonContainer}>
            <form className={styles.radioInputs}>
                <label className={styles.radio}>
                    <input type='radio' name='radio' />
                    <span className={styles.name}>Створена</span>
                </label>
                <label className={styles.radio}>
                    <input type='radio' name='radio' />
                    <span className={styles.name}>В роботі</span>
                </label>

                <label className={styles.radio}>
                    <input type='radio' name='radio' />
                    <span className={styles.name}>Зупинена</span>
                </label>

                <label className={styles.radio}>
                    <input type='radio' name='radio' />
                    <span className={styles.name}>Продовжена</span>
                </label>

                <label className={styles.radio}>
                    <input type='radio' name='radio' />
                    <span className={styles.name}>Завершена</span>
                </label>

                <label className={styles.radio}>
                    <input type='radio' name='radio' />
                    <span className={styles.name}>Видалена</span>
                </label>
            </form>
        </div>
    );
};

export default StatusFilter;
