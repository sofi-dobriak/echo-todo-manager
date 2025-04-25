import ActionButtons from '../ActionButtons/ActionButtons';
import styles from './TaskContextMenu.module.css';

const TaskContextMenu = ({
    id,
    status,
    onStart,
    onStop,
    onContinue,
    onComplete,
    onDelete,
    onShowAnalytic,
}) => {
    return (
        <div className={styles.actionButtonsContainer}>
            <ActionButtons
                status={status}
                onStart={() => onStart(id)}
                onStop={() => onStop(id)}
                onContinue={() => onContinue(id)}
                onComplete={() => onComplete(id)}
                onDelete={() => onDelete(id)}
                onShowAnalytic={() => onShowAnalytic(id)}
            />
        </div>
    );
};

export default TaskContextMenu;
