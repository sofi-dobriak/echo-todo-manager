import styles from './TitleFilter.module.css';

const TitleFilter = ({ updateTitleFilter }) => {
    const handleTilteChange = e => {
        updateTitleFilter(e.target.value);
    };

    return (
        <div className={styles.formButtonContainer}>
            <form className={styles.titleForm}>
                <label className={styles.dateLabel}>
                    <input
                        type='text'
                        className={styles.textInput}
                        placeholder='Введіть назву...'
                        onChange={handleTilteChange}
                    />
                </label>
            </form>
        </div>
    );
};

export default TitleFilter;
