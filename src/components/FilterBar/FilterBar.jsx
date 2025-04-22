import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import styles from './FilterBar.module.css';

const FilterBar = () => {
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleFilterChange = e => {
        setSelectedFilter(e.target.value);
    };

    const handleCancelChoise = () => {
        setSelectedFilter('');
    };

    return (
        <div>
            <h2 className={styles.filterTitle}>Фільтр</h2>
            <div className={styles.formButtonContainer}>
                <form className={styles.radioInputs}>
                    <label className={styles.radio}>
                        <input
                            type='radio'
                            name='radio'
                            value='status'
                            checked={selectedFilter === 'status'}
                            onChange={handleFilterChange}
                        />
                        <span className={styles.name}>за статусом</span>
                    </label>
                    <label className={styles.radio}>
                        <input
                            type='radio'
                            name='radio'
                            value='data'
                            checked={selectedFilter === 'data'}
                            onChange={handleFilterChange}
                        />
                        <span className={styles.name}>за датою</span>
                    </label>

                    <label className={styles.radio}>
                        <input
                            type='radio'
                            name='radio'
                            value='title'
                            checked={selectedFilter === 'title'}
                            onChange={handleFilterChange}
                        />
                        <span className={styles.name}>за назвою</span>
                    </label>
                </form>
                <button onClick={handleCancelChoise} className={styles.cancelButton}>
                    <IoCloseSharp className={styles.cancelIcon} />
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
