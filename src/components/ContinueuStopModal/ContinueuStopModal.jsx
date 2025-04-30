import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './ContinueuStopModal.module.css';

const ContinueuStopModal = ({ handleStop, handleContinue, taskId, isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose} className={styles.modalWindow}>
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
