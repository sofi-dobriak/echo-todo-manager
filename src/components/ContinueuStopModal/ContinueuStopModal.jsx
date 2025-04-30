import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './ContinueuStopModal.module.css';
import { updateTaskStatus } from '../../redux/tasksSlice';
import { closeModal, openModal } from '../../redux/modalSlice';

const ContinueuStopModal = () => {
  const dispatch = useDispatch();

  const handleContinue = taskId => {
    dispatch(updateTaskStatus({ id: taskId, status: 'Продовжено', dateKey: 'startDate' }));
    dispatch(openModal('isTimerModalOpen'));
  };

  const handleStop = taskId => {
    dispatch(updateTaskStatus({ id: taskId, status: 'Зупинено', dateKey: 'stopDate' }));
    dispatch(closeModal('isContinueuStopModalOpen'));
  };

  return (
    <Modal className={styles.modalWindow} modalKey='isContinueuStopModalOpen'>
      <h2 className={styles.title}>Час сплив</h2>
      <div className={styles.buttonsContainer}>
        <Button onClick={() => handleContinue(taskId)} className={styles.button}>
          Продовжити
        </Button>
        <Button onClick={() => handleStop(taskId)} className={styles.button}>
          Зупинити
        </Button>
      </div>
    </Modal>
  );
};

export default ContinueuStopModal;
