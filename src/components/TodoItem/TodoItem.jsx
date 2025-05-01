import { useState } from 'react';
import styles from './TodoItem.module.css';
import { formattedDateTime } from '../../utils/formattedDateTime';
import ActionButtons from '../ActionButtons/ActionButtons';

const TodoItem = ({ id, title, status, startDate, createdDate, stopDate, completeDate }) => {
  const [clickedId, setClickedId] = useState(null);
  return (
    <tr
      className={`${styles.taskItem} ${status === 'Видалено' ? styles.deletedTask : ''}`}
      key={id}
      onClick={() => setClickedId(clickedId === id ? null : id)}
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
