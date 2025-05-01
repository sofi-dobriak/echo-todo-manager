import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import styles from './AnalyticItemTable.module.css';
import { hideItemAnalytic, selectCurrentTask } from '../../redux/itemAnalyticSlice';
import { formattedDateTime } from '../../utils/formattedDateTime';

const AnalyticItemTable = () => {
  const dispatch = useDispatch();
  const currentTask = useSelector(selectCurrentTask);

  if (!currentTask) return null;

  return (
    <div>
      <Button onClick={() => dispatch(hideItemAnalytic())} className={styles.goBack}>
        Повернутися
      </Button>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Назва задачі</th>
              <th className={styles.th}>Поточний статус</th>
              <th className={styles.th}>Дата початку</th>
              <th className={styles.th}>Дата завершення</th>
              <th className={styles.th}>Кількість підходів</th>
              <th className={styles.th}>Загальний час виконання</th>
              <th className={styles.th}>Середній час на кожен підхід</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.taskItem}>
              <td className={styles.taskText}>{currentTask.title}</td>
              <td className={styles.taskText}>{currentTask.status}</td>
              <td className={styles.taskText}>{formattedDateTime(currentTask.startDate)}</td>
              <td className={styles.taskText}>{formattedDateTime(currentTask.completeDate)}</td>
              <td className={styles.taskText}>{currentTask.attempts || '0'}</td>
              <td className={styles.taskText}>{currentTask.formattedTotalTime || '00:00:00'}</td>
              <td className={styles.taskText}>{currentTask.formattedAverageTime || '00:00:00'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticItemTable;
