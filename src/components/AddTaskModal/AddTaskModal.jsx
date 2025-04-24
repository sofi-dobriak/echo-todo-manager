import { useState } from 'react';
import styles from './AddTaskModal.module.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { FaCheck } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';

const schema = Yup.object().shape({
    title: Yup.string()
        .required('Назва обовʼязкова')
        .min(2, 'Максимум 2 символи')
        .max(30, 'Максимум 30 символів')
        .required('Заповність, будь ласка, поле'),
    timer: Yup.string().required('Заповність, будь ласка, поле'),
});

const initialValue = {
    title: '',
    timer: '',
};

const TitleLength = () => {
    const { values } = useFormikContext();
    return <p className={styles.symbolCount}>{values.title.length}/30</p>;
};

const AddTaskModal = ({ isVisible, onClose, addTask }) => {
    const [isTimerActive, setIsTimerActive] = useState(false);

    const handleSubmit = (values, action) => {
        const now = new Date().toISOString();

        addTask({
            id: crypto.randomUUID(),
            title: values.title.trim(),
            timer: isTimerActive ? Number(values.timer) : null,
            status: isTimerActive ? 'В роботі' : 'Створена',
            startDate: isTimerActive ? now : null,
            createdAt: now,
        });

        action.resetForm();
        setIsTimerActive(false);
        onClose();
    };

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <button onClick={onClose} className={styles.cancelButton}>
                <IoCloseSharp className={styles.cancelIcon} />
            </button>

            <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
                <Form>
                    <Field
                        className={styles.taskInput}
                        type='title'
                        name='title'
                        placeholder='Назва задачі'
                    />
                    <ErrorMessage name='title' className={styles.error} component='div' />
                    <TitleLength />

                    <div className={styles.checkBoxTimeContainer}>
                        <div className={styles.checkBoxInputContainer}>
                            <label className={styles.checkLabel}>
                                <input
                                    type='checkbox'
                                    id='timer'
                                    className={styles.checkInput}
                                    checked={isTimerActive}
                                    onChange={() => setIsTimerActive(!isTimerActive)}
                                />
                                <span className={styles.fakeCheckbox}>
                                    <FaCheck className={styles.checkIcon} />
                                </span>
                                Увімкнути таймер
                            </label>
                        </div>

                        <div className={styles.timeInputContainer}>
                            {isTimerActive && (
                                <Field
                                    className={styles.timeInput}
                                    type='text'
                                    name='timer'
                                    placeholder='60'
                                />
                            )}
                            {isTimerActive && (
                                <ErrorMessage
                                    name='timer'
                                    className={styles.timerError}
                                    component='div'
                                />
                            )}
                        </div>
                    </div>

                    <Button className={styles.createButton} type='submit'>
                        Створити
                    </Button>
                </Form>
            </Formik>
        </Modal>
    );
};

export default AddTaskModal;
