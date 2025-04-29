import { useState } from 'react';
import styles from './TodoListTable.module.css';
import TaskContextMenu from '../TaskContextMenu/TaskContextMenu';

const TodoListTable = ({
  tasks,
  handleStart,
  handleStop,
  handleDelete,
  handleContinue,
  handleComplete,
  handleShowAnalytic,
}) => {
  const [clickedId, setClickedId] = useState(null);

  const formattedDateTime = isoDate => {
    if (!isoDate) return '';

    const date = new Date(isoDate);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${date.toLocaleDateString('uk-UA')} ${hours}:${minutes}`;
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
          {tasks.map(({ id, title, status, startDate, createdDate, stopDate, completeDate }) => (
            <tr
              className={`${styles.taskItem} ${status === 'Видалено' ? styles.deletedTask : ''}`}
              key={id}
              onClick={() => setClickedId(clickedId === id ? null : id)}
            >
              <td className={styles.taskText}>{formattedDateTime(createdDate)}</td>
              <td className={styles.taskText}>{startDate ? formattedDateTime(startDate) : ''}</td>
              <td className={styles.taskText}>{stopDate ? formattedDateTime(stopDate) : ''}</td>
              <td className={styles.taskText}>
                {completeDate ? formattedDateTime(completeDate) : ''}
              </td>
              <td className={styles.taskText}>
                {title}
                {clickedId === id && status !== 'Видалено' && (
                  <div className={styles.contextMenu}>
                    <TaskContextMenu
                      id={id}
                      status={status}
                      onStart={handleStart}
                      onStop={handleStop}
                      onContinue={handleContinue}
                      onComplete={handleComplete}
                      onDelete={handleDelete}
                      onShowAnalytic={handleShowAnalytic}
                    />
                  </div>
                )}
              </td>
              <td className={styles.taskText}>{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default TodoListTable;
