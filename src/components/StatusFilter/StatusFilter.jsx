import { useDispatch, useSelector } from 'react-redux';
import styles from './StatusFilter.module.css';
import { selectFilteredTasks } from '../../redux/tasksSlice/selectors';
import { updateStatusFilter } from '../../redux/filterSlice/slice';

const StatusFilter = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectFilteredTasks);

  const handleStatusChange = e => {
    dispatch(updateStatusFilter(e.target.value));
  };

  return (
    <div className={styles.formButtonContainer}>
      <form className={styles.radioInputs}>
        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Створено'
            checked={status === 'Створено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Створено</span>
        </label>
        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='В роботі'
            checked={status === 'В роботі'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>В роботі</span>
        </label>

        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Зупинено'
            checked={status === 'Зупинено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Зупинено</span>
        </label>

        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Продовжено'
            checked={status === 'Продовжено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Продовжено</span>
        </label>

        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Завершено'
            checked={status === 'Завершено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Завершено</span>
        </label>

        <label className={styles.radio}>
          <input
            type='radio'
            name='radio'
            value='Видалено'
            checked={status === 'Видалено'}
            onChange={handleStatusChange}
          />
          <span className={styles.name}>Видалено</span>
        </label>
      </form>
    </div>
  );
};

export default StatusFilter;
