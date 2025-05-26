import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import styles from './FilterBar.module.css';
import Button from '../Button/Button';
import StatusFilter from '../StatusFilter/StatusFilter';
import DataFilter from '../DataFilter/DataFilter';
import TitleFilter from '../TitleFilter/TitleFilter';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../../redux/filterSlice/slice';

const FilterBar = ({}) => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState<string>('');

  return (
    <div className={styles.filterContainer}>
      <div className={styles.formButtonContainer}>
        <form className={styles.radioInputs}>
          <label className={styles.radio}>
            <input
              type='radio'
              name='radio'
              value='status'
              checked={activeFilter === 'status'}
              onChange={() => setActiveFilter('status')}
            />
            <span className={styles.name}>За статусом</span>
          </label>
          <label className={styles.radio}>
            <input
              type='radio'
              name='radio'
              value='data'
              checked={activeFilter === 'data'}
              onChange={() => setActiveFilter('data')}
            />
            <span className={styles.name}>За датою</span>
          </label>

          <label className={styles.radio}>
            <input
              type='radio'
              name='radio'
              value='title'
              checked={activeFilter === 'title'}
              onChange={() => setActiveFilter('title')}
            />
            <span className={styles.name}>За назвою</span>
          </label>
        </form>
        <Button
          onClick={() => {
            setActiveFilter('');
            dispatch(resetFilters());
          }}
          className={styles.cancelButton}
        >
          <IoCloseSharp className={styles.cancelIcon} />
        </Button>
      </div>

      <div className={styles.dynamicFilter}>
        {activeFilter === 'status' && <StatusFilter />}
        {activeFilter === 'data' && <DataFilter />}
        {activeFilter === 'title' && <TitleFilter />}
      </div>
    </div>
  );
};

export default FilterBar;
