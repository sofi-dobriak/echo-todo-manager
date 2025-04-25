import { useState } from 'react';
import Button from '../Button/Button';
import styles from './DataFilter.module.css';
import { FaCheck } from 'react-icons/fa6';

const DataFilter = ({ filter, updateDataFilter }) => {
    const [dateRange, setDateRange] = useState({
        start: filter.dateRange.start || '',
        end: filter.dateRange.end || '',
    });

    const handleStartDateChange = e => {
        setDateRange(prev => ({ ...prev, start: e.target.value }));
    };

    const handleEndDateChange = e => {
        setDateRange(prev => ({ ...prev, end: e.target.value }));
    };

    const handleApplyFilter = () => {
        updateDataFilter(dateRange.start, dateRange.end);
    };

    return (
        <div className={styles.formButtonContainer}>
            <form className={styles.dateForm} onSubmit={e => e.preventDefault()}>
                <div className={styles.dateInputField}>
                    <label htmlFor='start-date' className={styles.label}>
                        Від
                    </label>
                    <input
                        type='date'
                        id='start-date'
                        value={dateRange.start}
                        onChange={handleStartDateChange}
                        className={styles.dateInput}
                    />
                </div>

                <div className={styles.dateInputField}>
                    <label htmlFor='end-date' className={styles.label}>
                        До
                    </label>
                    <input
                        type='date'
                        id='end-date'
                        value={dateRange.end}
                        onChange={handleEndDateChange}
                        className={styles.dateInput}
                    />
                </div>
            </form>
            <Button className={styles.acceptButton} onClick={handleApplyFilter} type='button'>
                <FaCheck className={styles.acceptIcon} />
            </Button>
        </div>
    );
};

export default DataFilter;
