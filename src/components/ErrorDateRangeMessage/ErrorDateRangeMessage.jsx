import { useSelector } from 'react-redux';
import { selectErrorMessageModalWindow } from '../../redux/modalSlice/selectors';
import styles from './ErrorDateRangeMessage.module.css';

const ErrorDateRangeMessage = () => {
  const isErrorOpen = useSelector(selectErrorMessageModalWindow);

  return (
    <div className={`${styles.errorMessageWindow} ${isErrorOpen ? styles.visible : ''}`}>
      <p className={styles.errorDescription}>Дата "ДО" не може бути меньшою за дату "ВІД"</p>
    </div>
  );
};

export default ErrorDateRangeMessage;
