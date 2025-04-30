import { useState } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './SetTimerModal.module.css';

const SetTimerModal = ({ isVisible, onClose, onStart, onContinue, taskId, status }) => {
  const [timerValue, setTimerValue] = useState('');

  const handleAction = () => {
    if (status === 'Зупинено') {
      const minutes = timerValue && !isNaN(timerValue) ? Number(timerValue) : null;
      onContinue(minutes, taskId);
      setTimerValue('');
      onClose();
    } else {
      if (timerValue && !isNaN(timerValue)) {
        onStart(Number(timerValue), taskId);
        setTimerValue('');
        onClose();
      }
    }
  };

  return (
    <Modal onClose={onClose} isVisible={isVisible} className={styles.setTimerModalWindow}>
      <input
        value={timerValue}
        onChange={e => setTimerValue(e.target.value)}
        type='text'
        name='timer'
        placeholder='60'
        className={styles.timerInput}
        required
      />
      <Button onClick={handleAction} className={styles.timerButton}>
        {status === 'Зупинено' ? 'Продовжити' : 'Почати'}
      </Button>
    </Modal>
  );
};

export default SetTimerModal;
