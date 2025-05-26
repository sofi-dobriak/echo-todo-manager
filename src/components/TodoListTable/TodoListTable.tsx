import styles from './TodoListTable.module.css';
import { useSelector } from 'react-redux';
import { selectFilteredTasks } from '../../redux/tasksSlice/selectors';
import TodoItem from '../TodoItem/TodoItem';

interface TodoListTable {
  clickedId: string | null;
  setClickedId: (id: string | null) => void;
}

const TodoListTable = ({ clickedId, setClickedId }: TodoListTable) => {
  const tasks = useSelector(selectFilteredTasks);

  return (
    <div className={styles.tableContainer}>
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
            <TodoItem
              key={id}
              id={id}
              title={title}
              status={status}
              startDate={startDate}
              createdDate={createdDate}
              stopDate={stopDate}
              completeDate={completeDate}
              clickedId={clickedId}
              setClickedId={setClickedId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoListTable;
