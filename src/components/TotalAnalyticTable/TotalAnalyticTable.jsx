import { useSelector } from 'react-redux';
import styles from './TotalAnalyticTable.module.css';
import { selectTaskStatusCountsWithDateRange } from '../../redux/tasksSlice';

const TotalAnalyticTable = () => {
  const taskStatusCounts = useSelector(selectTaskStatusCountsWithDateRange);

  return (
    <footer className={styles.tableContainer} id='footer'>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Обраний період</th>
            <th className={styles.th}>Створено</th>
            <th className={styles.th}>В роботі</th>
            <th className={styles.th}>Зупинено</th>
            <th className={styles.th}>Продовжено</th>
            <th className={styles.th}>Завершено</th>
            <th className={styles.th}>Видалено</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.taskItem}>
            <td className={styles.taskText}>
              <label>
                <span>Від</span>
                <input type='date' />
              </label>
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.created}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.inProgress}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.stopped}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.continued}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.completed}
            </td>
            <td className={styles.taskText} rowSpan={2}>
              {taskStatusCounts.deleted}
            </td>
          </tr>
          <tr className={styles.taskItem}>
            <td className={`${styles.taskText} ${styles.second}`}>
              <label>
                <span>До</span>
                <input type='date' />
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </footer>
  );
};

export default TotalAnalyticTable;
