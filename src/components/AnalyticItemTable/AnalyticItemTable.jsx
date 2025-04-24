import styles from './AnalyticItemTable.module.css';

const AnalyticItemTable = () => {
    return (
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
                        <td className={styles.taskText}>0</td>
                        <td className={styles.taskText}>0</td>
                        <td className={styles.taskText}>0</td>
                        <td className={styles.taskText}>0</td>
                        <td className={styles.taskText}>0</td>
                        <td className={styles.taskText}>0</td>
                        <td className={styles.taskText}>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AnalyticItemTable;
