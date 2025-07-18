import { useDispatch, useSelector } from 'react-redux';
import styles from './MobileDataFilter.module.css';
import { useEffect, useState } from 'react';
import { resetDataFilter, updateDataFilter } from '../../redux/filterSlice/slice';
import Button from '../Button/Button';
import { selectFiltersDate } from '../../redux/filterSlice/selectors';
import { closeModal, openModal } from '../../redux/modalSlice/slice';

const MobileDataFilter = () => {
  const dispatch = useDispatch();
  const dateRage = useSelector(selectFiltersDate);

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  let timeoutId: number;

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newStart: string = event.target.value;

    if (endDate && new Date(newStart) > new Date(endDate)) {
      dispatch(openModal({ modalKey: 'isErrorMessageModalOpen' }));

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout((): void => {
        dispatch(closeModal('isErrorMessageModalOpen'));
      }, 2500);
      return;
    }

    setStartDate(newStart);

    dispatch(
      updateDataFilter({
        start: newStart,
        end: endDate,
      })
    );
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newEnd: string = event.target.value;

    if (startDate && new Date(newEnd) < new Date(startDate)) {
      dispatch(openModal({ modalKey: 'isErrorMessageModalOpen' }));

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout((): void => {
        dispatch(closeModal('isErrorMessageModalOpen'));
      }, 2500);
      return;
    }

    setEndDate(newEnd);

    dispatch(
      updateDataFilter({
        start: startDate,
        end: newEnd,
      })
    );
  };

  useEffect(() => {
    setStartDate(dateRage?.start || '');
    setEndDate(dateRage?.end || '');
  }, [dateRage?.start, dateRage?.end]);

  const handleResetDateFilter = (): void => {
    dispatch(resetDataFilter());
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
      <Button onClick={handleResetDateFilter} className={styles.resetDataFilterButton}>
        Скинути
      </Button>
    </div>
  );
};

export default MobileDataFilter;
