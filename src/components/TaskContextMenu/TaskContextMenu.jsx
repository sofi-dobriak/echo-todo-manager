import ActionButtons from '../ActionButtons/ActionButtons';
import styles from './TaskContextMenu.module.css';

const TaskContextMenu = () => {
  return (
    <div className={styles.actionButtonsContainer}>
      <ActionButtons
        status={status}
        onStart={() => openTimerModal(id, status)}
        onStop={() => onStop(id)}
        onContinue={() => openTimerModal(id, status)}
        onComplete={() => onComplete(id)}
        onDelete={() => onDelete(id)}
        onShowAnalytic={() => onShowAnalytic(id)}
      />
    </div>
  );
};

export default TaskContextMenu;
