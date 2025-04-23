import styles from './CurrentDate.module.css';
import { useState, useEffect } from 'react';

const CurrentDate = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const now = new Date();

        const msUntilMidnight =
            new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
            now.getTime();

        const timeOut = setTimeout(() => {
            setCurrentDate(new Date());
        }, msUntilMidnight);

        return () => clearTimeout(timeOut);
    }, [currentDate]);

    const weekDaysNom = [
        'Неділя',
        'Понеділок',
        'Вівторок',
        'Середа',
        'Четвер',
        "П'ятниця",
        'Субота',
    ];

    const dayOfWeek = currentDate.getDay();

    const options = {
        year: 'numeric',
        day: 'numeric',
        month: 'numeric',
    };

    const dateFormatted = currentDate.toLocaleDateString('uk-UA', options);

    return (
        <div className={styles.currentDataContainer}>
            <p className={styles.date}>{dateFormatted}</p>
            <p className={styles.weekDay}>{weekDaysNom[dayOfWeek]}</p>
        </div>
    );
};

export default CurrentDate;
