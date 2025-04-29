import { useEffect, useState } from 'react';
import styles from './TimeLeftModal.module.css';

const TimeLeftModal = ({ isVisible, timeLeft }) => {
  const [currentTime, setCurrentTime] = useState(timeLeft);

  useEffect(() => {
    setCurrentTime(timeLeft);
  }, [timeLeft]);

  return (
    <div className={`${styles.modalWindow} ${isVisible ? styles.modalVisible : ''}`}>
      <h2>{currentTime}</h2>
    </div>
  );
};

export default TimeLeftModal;
