import { useEffect, useState } from 'react';
import styles from './TimeLeftModal.module.css';

const TimeLeftModal = ({ isVisible, timeLeft }) => {
  const [currentTime, setCurrentTime] = useState(timeLeft);
  const [display, setDisplay] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setCurrentTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (isVisible) {
      setAnimationClass('');
      setDisplay(true);

      requestAnimationFrame(() => {
        setTimeout(() => {
          setAnimationClass(styles.modalVisible);
        }, 20);
      });
    } else {
      setDisplay(false);
    }
  }, [isVisible]);

  if (!display) return null;

  return (
    <div className={`${styles.modalWindow} ${animationClass}`}>
      <p>{currentTime}</p>
    </div>
  );
};

export default TimeLeftModal;
