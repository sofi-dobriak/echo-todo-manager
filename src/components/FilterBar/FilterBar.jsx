import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import styles from './FilterBar.module.css';
import Button from '../Button/Button';
import StatusFilter from '../StatusFilter/StatusFilter';
import DataFilter from '../DataFilter/DataFilter';
import TitleFilter from '../TitleFilter/TitleFilter';

const FilterBar = () => {
    const [selectedFilter, setSelectedFilter] = useState('');
    const [isStatus, setIsStatus] = useState(false);
    const [isData, setIsData] = useState(false);
    const [isTitle, setIsTitle] = useState(false);

    const handleFilterChange = e => {
        const value = e.target.value;
        setSelectedFilter(value);

        if (value === 'status') {
            setIsStatus(true);
            setIsData(false);
            setIsTitle(false);
            return;
        }

        if (value === 'data') {
            setIsStatus(false);
            setIsData(true);
            setIsTitle(false);
            return;
        }

        if (value === 'title') {
            setIsStatus(false);
            setIsData(false);
            setIsTitle(true);
            return;
        }
    };

    const handleCancelChoise = () => {
        setSelectedFilter('');
        setIsStatus(false);
        setIsData(false);
        setIsTitle(false);
    };

    return (
        <div className={styles.filterContainer}>
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
                <Button onClick={handleCancelChoise} className={styles.cancelButton}>
                    <IoCloseSharp className={styles.cancelIcon} />
                </Button>
            </div>

            <div className={styles.filtersOptionsContainer}>
                {isStatus && <StatusFilter />}
                {isData && <DataFilter />}
                {isTitle && <TitleFilter />}
            </div>
        </div>
    );
};

export default FilterBar;
