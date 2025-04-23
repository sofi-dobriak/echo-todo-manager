import { useState } from 'react';
import styles from './AddTaskModal.module.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { FaCheck } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';

const AddTaskModal = ({ isVisible, onClose }) => {
    const [isTimerActive, setIsTimerActive] = useState(false);

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <button onClick={onClose} className={styles.cancelButton}>
                <IoCloseSharp className={styles.cancelIcon} />
            </button>

            <input className={styles.taskInput} type='text' placeholder='Назва задачі' />
            <p className={styles.symbolCount}>0/50</p>

            <div className={styles.checkBoxTimeContainer}>
                <div className={styles.checkBoxInputContainer}>
                    <label className={styles.checkLabel}>
                        <input
                            type='checkbox'
                            id='timer'
                            className={styles.checkInput}
                            checked={isTimerActive}
                            onChange={e => setIsTimerActive(!isTimerActive)}
                        />
                        <span className={styles.fakeCheckbox}>
                            <FaCheck className={styles.checkIcon} />
                        </span>
                        Увімкнути таймер
                    </label>
                </div>

                {isTimerActive && (
                    <input className={styles.timeInput} type='text' placeholder='60' />
                )}
            </div>

            <Button className={styles.createButton}>Створити</Button>
        </Modal>
    );
};

export default AddTaskModal;
