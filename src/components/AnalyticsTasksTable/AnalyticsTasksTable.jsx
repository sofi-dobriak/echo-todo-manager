import AnalyticCalendar from '../AnalyticCalendar/AnalyticCalendar';
import styles from './AnalyticsTasksTable.module.css';

const AnalyticsTasksTable = () => {
    return (
        <footer className={styles.tableContainer}>
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
                            <AnalyticCalendar className={styles.analyticCalendarRow} label='Від' />
                        </td>
                        <td className={styles.taskText} rowSpan={2}>
                            0
                        </td>
                        <td className={styles.taskText} rowSpan={2}>
                            0
                        </td>
                        <td className={styles.taskText} rowSpan={2}>
                            0
                        </td>
                        <td className={styles.taskText} rowSpan={2}>
                            0
                        </td>
                        <td className={styles.taskText} rowSpan={2}>
                            0
                        </td>
                        <td className={styles.taskText} rowSpan={2}>
                            0
                        </td>
                    </tr>
                    <tr className={styles.taskItem}>
                        <td className={`${styles.taskText} ${styles.second}`}>
                            <AnalyticCalendar className={styles.analyticCalendarRow} label='До' />
                        </td>
                    </tr>
                </tbody>
            </table>
        </footer>
    );
};

export default AnalyticsTasksTable;
