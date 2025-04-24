import styles from './TodoTasksTable.module.css';

const TodoTasksTable = ({ tasks }) => {
    const formattedDateTime = isoDate => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return `${date.toLocaleDateString('uk-UA')} ${date.getHours()}:${date.getMinutes()}`;
    };

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
                    {tasks.map(({ id, title, status, startDate, createdAt }) => (
                        <tr className={styles.taskItem} key={id}>
                            <td className={styles.taskText}>{formattedDateTime(createdAt)}</td>
                            <td className={styles.taskText}>
                                {status === 'В роботі' ? formattedDateTime(startDate) : ''}
                            </td>
                            <td className={styles.taskText}></td>
                            <td className={styles.taskText}></td>
                            <td className={styles.taskText}>{title}</td>
                            <td className={styles.taskText}>{status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default TodoTasksTable;
