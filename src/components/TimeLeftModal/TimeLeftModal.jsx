import styles from './TimeLeftModal.module.css';
const TimeLeftModal = () => {
  return (
    <div className={styles.modalWrapper}>
      <div className={`${styles.modalWindow} `}>
        <p>timeLeft</p>
      </div>
    </div>
  );
};

export default TimeLeftModal;
