import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './SetTimerModal.module.css';

const SetTimerModal = () => {
  return (
    <Modal className={styles.setTimerModalWindow} modalKey='isTimerModalOpen'>
      <input type='text' name='timer' placeholder='60' className={styles.timerInput} required />
      <Button className={styles.timerButton}>
        {status === 'Зупинено' ? 'Продовжити' : 'Почати'}
      </Button>
    </Modal>
  );
};

export default SetTimerModal;
