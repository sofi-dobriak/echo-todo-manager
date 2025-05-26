import { useDispatch, useSelector } from 'react-redux';
import styles from './FilterMobileWindow.module.css';
import { selectFilterMobileWindow } from '../../redux/modalSlice/selectors';
import MobileStatusFilter from '../MobileStatusFilter/MobileStatusFilter';
import MobileDataFilter from '../MobileDataFilter/MobileDataFilter';
import MobileTitleFilter from '../MobileTitleFilter/MobileTitleFilter';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { closeModal } from '../../redux/modalSlice/slice';
import { useEffect } from 'react';
import { resetFilters } from '../../redux/filterSlice/slice';

const FilterMobileWindow = () => {
  const dispatch = useDispatch();
  const isMobileWindowOpen = useSelector(selectFilterMobileWindow);

  const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal('isFilterMobileOpen'));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        dispatch(closeModal('isMobileWindowOpen'));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return (): void => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  const handleResetFilters = (): void => {
    dispatch(closeModal('isFilterMobileOpen'));
    dispatch(resetFilters());
  };

  return (
    <div
      onClick={handleWrapperClick}
      className={`${styles.filterWrapper} ${isMobileWindowOpen ? styles.visible : ''}`}
    >
      <div className={styles.filterWindow}>
        <div className={styles.dateContainer}>
          <Text className={styles.title}>За назвою</Text>
          <MobileTitleFilter />
        </div>

        <div className={styles.dateContainer}>
          <Text className={styles.title}>За статусом</Text>
          <MobileStatusFilter />
        </div>

        <div className={styles.dateContainer}>
          <Text className={styles.title}>За датою</Text>
          <MobileDataFilter />
        </div>

        <div className={styles.filterButtonsContainer}>
          <Button
            onClick={() => dispatch(closeModal('isFilterMobileOpen'))}
            className={styles.filterMobileButton}
          >
            Застосувати
          </Button>
          <Button onClick={handleResetFilters} className={styles.filterMobileButton}>
            Скинути всі
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterMobileWindow;
