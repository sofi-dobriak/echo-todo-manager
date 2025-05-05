import { useSelector } from 'react-redux';
import { selectErrorMessageModalWindow } from '../../redux/modalSlice/selectors';
import styles from './ErrorDateRangeMessage.module.css';

const ErrorDateRangeMessage = () => {
  const isErrorOpen = useSelector(selectErrorMessageModalWindow);

  return (
    <div className={`${styles.errorMessageWindow} ${isErrorOpen ? styles.visible : ''}`}>
      <h2 className={styles.errorTitle}>Некоретний діапазон дат!</h2>
      <p className={styles.errorDescription}>Будь ласка, оберіть інший.</p>
    </div>
  );
};

export default ErrorDateRangeMessage;
