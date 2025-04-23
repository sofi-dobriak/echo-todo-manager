import Button from '../Button/Button';
import styles from './DataFilter.module.css';
import { FaCheck } from 'react-icons/fa6';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useState, useRef, useEffect } from 'react';

const MyDatePicker = ({ className, label }) => {
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className={styles.datePickerContainer} ref={wrapperRef}>
            <div className={`${styles.dateInput} ${className}`} onClick={() => setIsOpen(!isOpen)}>
                {selected ? selected.toLocaleDateString() : label || 'Оберіть дату'}
            </div>

            {isOpen && (
                <div className={styles.dayPickerWrapper}>
                    <DayPicker
                        mode='single'
                        selected={selected}
                        onSelect={date => {
                            setSelected(date);
                            setIsOpen(false);
                        }}
                        className={styles.customDayPicker}
                        footer={
                            selected ? `Обрано: ${selected.toLocaleDateString()}` : 'Оберіть дату.'
                        }
                    />
                </div>
            )}
        </div>
    );
};

const DataFilter = () => {
    return (
        <div className={styles.formButtonContainer}>
            <form className={styles.dateForm}>
                <MyDatePicker className={styles.dateInputField} label='Від' />
                <MyDatePicker className={styles.dateInputField} label='До' />
            </form>
            <Button className={styles.acceptButton}>
                <FaCheck className={styles.acceptIcon} />
            </Button>
        </div>
    );
};

export default DataFilter;
