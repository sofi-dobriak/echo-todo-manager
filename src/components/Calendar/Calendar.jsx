import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useState, useRef, useEffect } from 'react';
import styles from './Calendar.module.css';

const Calendar = ({ className, label, value, onChange }) => {
    const [selected, setSelected] = useState(value ? new Date(value) : null);
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

    const modifiersStyles = {
        today: {
            color: '#2D3F50',
            fontWeight: 'bold',
        },
    };

    // Оновлення батьківського компонента при зміні дати
    useEffect(() => {
        if (selected && onChange) {
            onChange(selected.toISOString());
        }
    }, [selected, onChange]);

    return (
        <div className='datePickerContainer' ref={wrapperRef}>
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
                        modifiersStyles={modifiersStyles}
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

export default Calendar;
