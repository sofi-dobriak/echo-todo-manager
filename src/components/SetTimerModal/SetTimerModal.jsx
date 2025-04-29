import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './SetTimerModal.module.css';

const SetTimerModal = ({
  handleStop,
  handleContinue,
  taskId,
  isVisible,
  paddingTop = '40px',
  paddingLeft = '20px',
  paddingRight = '20px',
  width = '480px',
  height = '212px',
  paddingBottom = '40px',
  onClose = { onClose },
}) => {
  return (
    <Modal
      isVisible={isVisible}
      width={width}
      height={height}
      paddingTop={paddingTop}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      onClose={onClose}
    >
      <h2 className={styles.title}>Час сплив</h2>
      <div className={styles.buttonsContainer}>
        <Button className={styles.button} onClick={() => handleContinue(taskId)}>
          Продовжити
        </Button>
        <Button className={styles.button} onClick={() => handleStop(taskId)}>
          Зупинити
        </Button>
      </div>
    </Modal>
  );
};

export default SetTimerModal;
