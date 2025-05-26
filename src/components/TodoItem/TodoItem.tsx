import styles from './TodoItem.module.css';
import { formattedDateTime } from '../../utils/formattedDateTime';
import ActionButtons from '../ActionButtons/ActionButtons';

interface TodoItemProps {
  id: string;
  title: string;
  status: string;
  startDate: string | undefined;
  createdDate: string | undefined;
  stopDate: string | undefined;
  completeDate: string | undefined;
  clickedId: string;
  setClickedId: (id: string | null) => void;
}

const TodoItem = ({
  id,
  title,
  status,
  startDate,
  createdDate,
  stopDate,
  completeDate,
  clickedId,
  setClickedId,
}: TodoItemProps) => {
  return (
    <tr
      key={id}
      onClick={() => setClickedId(clickedId === id ? null : id)}
      className={`${styles.taskItem} ${status === 'Видалено' ? styles.deletedTask : ''} ${
        status === 'В роботі' || status === 'Продовжено' ? styles.inProgress : ''
      }`}
    >
      <td className={styles.taskText}>{formattedDateTime(createdDate)}</td>
      <td className={styles.taskText}>{startDate ? formattedDateTime(startDate) : ''}</td>
      <td className={styles.taskText}>{stopDate ? formattedDateTime(stopDate) : ''}</td>
      <td className={styles.taskText}>{completeDate ? formattedDateTime(completeDate) : ''}</td>
      <td className={styles.taskText}>
        {title}
        {clickedId === id && status !== 'Видалено' && (
          <div className={styles.contextMenu}>
            <ActionButtons id={id} status={status} />
          </div>
        )}
      </td>
      <td className={styles.taskText}>{status}</td>
    </tr>
  );
};

export default TodoItem;
