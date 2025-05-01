import { useState } from 'react';
import Button from '../Button/Button';
import styles from './DataFilter.module.css';
import { FaCheck } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { updateDataFilter } from '../../redux/filterSlice/slice';

const DataFilter = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateFilter = () => {
    dispatch(updateDataFilter({ start: startDate, end: endDate }));
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
            className={styles.dateInput}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>

        <div className={styles.dateInputField}>
          <label htmlFor='end-date' className={styles.label}>
            До
          </label>
          <input
            type='date'
            id='end-date'
            className={styles.dateInput}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
      </form>
      <Button onClick={handleDateFilter} className={styles.acceptButton} type='button'>
        <FaCheck className={styles.acceptIcon} />
      </Button>
    </div>
  );
};

export default DataFilter;
