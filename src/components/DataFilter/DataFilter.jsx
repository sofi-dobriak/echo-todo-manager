import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './DataFilter.module.css';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { resetDataFilter, updateDataFilter } from '../../redux/filterSlice/slice';
import { selectFiltersDate } from '../../redux/filterSlice/selectors';

const DataFilter = () => {
  const dispatch = useDispatch();
  const dateRage = useSelector(selectFiltersDate);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = e => {
    const newStartDate = e.target.value;

    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      return alert('Некоректний діапазон');
    }

    setStartDate(newStartDate);

    dispatch(
      updateDataFilter({
        start: newStartDate,
        end: endDate,
      })
    );
  };

  const handleEndDateChange = e => {
    const newEndDate = e.target.value;

    if (startDate && new Date(newEndDate) < new Date(startDate)) {
      return alert('Некоректний діапазон');
    }

    setEndDate(newEndDate);

    dispatch(
      updateDataFilter({
        start: startDate,
        end: newEndDate,
      })
    );
  };

  const handleResetDateFilter = () => {
    dispatch(resetDataFilter());
  };

  useEffect(() => {
    setStartDate(dateRage?.start || '');
    setEndDate(dateRage?.end || '');
  }, [dateRage?.start, dateRage?.end]);

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
            onChange={handleStartDateChange}
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
            onChange={handleEndDateChange}
          />
        </div>
      </form>
      <Button onClick={handleResetDateFilter} className={styles.resetButton} type='button'>
        <IoCloseSharp className={styles.resettIcon} />
      </Button>
    </div>
  );
};

export default DataFilter;
