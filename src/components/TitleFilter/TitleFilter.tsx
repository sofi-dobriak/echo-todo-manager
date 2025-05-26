import { useDispatch } from 'react-redux';
import styles from './TitleFilter.module.css';
import { updateTitleFilter } from '../../redux/filterSlice/slice';

const TitleFilter = () => {
  const dispatch = useDispatch();

  const handleTitleFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateTitleFilter(event.target.value));
  };

  return (
    <div className={styles.formButtonContainer}>
      <form className={styles.titleForm}>
        <label className={styles.dateLabel}>
          <input
            type='text'
            className={styles.textInput}
            placeholder='Введіть назву...'
            onChange={handleTitleFilter}
          />
        </label>
      </form>
    </div>
  );
};

export default TitleFilter;
