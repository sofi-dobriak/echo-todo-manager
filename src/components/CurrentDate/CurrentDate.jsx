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

    const options = {
        weekday: 'long',
        year: 'numeric',
        day: 'numeric',
        month: 'numeric',
    };

    const dataFormatted = currentDate.toLocaleDateString('uk-UA', options);
    const [weekDay, date] = dataFormatted.split(', ');
    const formattedWeekDay = weekDay[0].toUpperCase() + weekDay.slice(1).toLowerCase();

    return (
        <div className={styles.currentDataContainer}>
            <p className={styles.date}>{date}</p>
            <p className={styles.weekDay}>{formattedWeekDay}</p>
        </div>
    );
};

export default CurrentDate;
