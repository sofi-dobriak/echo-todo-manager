import styles from './StatusFilter.module.css';

const StatusFilter = ({ filter, updateStatusFilter }) => {
    const handleStatusChange = e => {
        updateStatusFilter(e.target.value);
    };

    return (
        <div className={styles.formButtonContainer}>
            <form className={styles.radioInputs}>
                <label className={styles.radio}>
                    <input
                        type='radio'
                        name='radio'
                        value='Створено'
                        checked={filter.status === 'Створено'}
                        onChange={handleStatusChange}
                    />
                    <span className={styles.name}>Створено</span>
                </label>
                <label className={styles.radio}>
                    <input
                        type='radio'
                        name='radio'
                        value='В роботі'
                        checked={filter.status === 'В роботі'}
                        onChange={handleStatusChange}
                    />
                    <span className={styles.name}>В роботі</span>
                </label>

                <label className={styles.radio}>
                    <input
                        type='radio'
                        name='radio'
                        value='Зупинено'
                        checked={filter.status === 'Зупинено'}
                        onChange={handleStatusChange}
                    />
                    <span className={styles.name}>Зупинено</span>
                </label>

                <label className={styles.radio}>
                    <input
                        type='radio'
                        name='radio'
                        value='Продовжено'
                        checked={filter.status === 'Продовжено'}
                        onChange={handleStatusChange}
                    />
                    <span className={styles.name}>Продовжено</span>
                </label>

                <label className={styles.radio}>
                    <input
                        type='radio'
                        name='radio'
                        value='Завершено'
                        checked={filter.status === 'Завершено'}
                        onChange={handleStatusChange}
                    />
                    <span className={styles.name}>Завершено</span>
                </label>

                <label className={styles.radio}>
                    <input
                        type='radio'
                        name='radio'
                        value='Видалено'
                        checked={filter.status === 'Видалено'}
                        onChange={handleStatusChange}
                    />
                    <span className={styles.name}>Видалено</span>
                </label>
            </form>
        </div>
    );
};

export default StatusFilter;
