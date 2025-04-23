import styles from './TodoTasksTable.module.css';

const TodoTasksTable = () => {
    return (
        <main className={styles.tableContainer}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Дата створення</th>
                        <th className={styles.th}>Дата початку / продовження</th>
                        <th className={styles.th}>Дата зупинки</th>
                        <th className={styles.th}>Дата завершення</th>
                        <th className={styles.th}>Назва задачі</th>
                        <th className={styles.th}>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.taskItem}>
                        <td className={styles.taskText}>28.03.25 10:08</td>
                        <td className={styles.taskText}>28.03.25 10:50</td>
                        <td className={styles.taskText}>28.03.25 11:30</td>
                        <td className={styles.taskText}></td>
                        <td className={styles.taskText}>Розробка звіту</td>
                        <td className={styles.taskText}>Зупинена</td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
};

export default TodoTasksTable;
