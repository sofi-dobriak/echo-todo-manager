import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import styles from './FilterBar.module.css';
import Button from '../Button/Button';
import StatusFilter from '../StatusFilter/StatusFilter';
import DataFilter from '../DataFilter/DataFilter';
import TitleFilter from '../TitleFilter/TitleFilter';

const FilterBar = ({
    filter,
    updateStatusFilter,
    updateDataFilter,
    updateTitleFilter,
    resetFilter,
}) => {
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
        resetFilter();
    };

    return (
        <div className={styles.filterContainer}>
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
                        <span className={styles.name}>За статусом</span>
                    </label>
                    <label className={styles.radio}>
                        <input
                            type='radio'
                            name='radio'
                            value='data'
                            checked={selectedFilter === 'data'}
                            onChange={handleFilterChange}
                        />
                        <span className={styles.name}>За датою</span>
                    </label>

                    <label className={styles.radio}>
                        <input
                            type='radio'
                            name='radio'
                            value='title'
                            checked={selectedFilter === 'title'}
                            onChange={handleFilterChange}
                        />
                        <span className={styles.name}>За назвою</span>
                    </label>
                </form>
                <Button onClick={handleCancelChoise} className={styles.cancelButton}>
                    <IoCloseSharp onClick={resetFilter} className={styles.cancelIcon} />
                </Button>
            </div>

            <div className={styles.dynamicFilter}>
                {isStatus && (
                    <StatusFilter filter={filter} updateStatusFilter={updateStatusFilter} />
                )}
                {isData && <DataFilter filter={filter} updateDataFilter={updateDataFilter} />}
                {isTitle && <TitleFilter filter={filter} updateTitleFilter={updateTitleFilter} />}
            </div>
        </div>
    );
};

export default FilterBar;
