import { useState } from 'react';
import styles from './AddTaskModal.module.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { FaCheck } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { addTasks } from '../../redux/tasksSlice';
import { closeModal, openModal } from '../../redux/modalSlice';
import { nanoid } from '@reduxjs/toolkit';
import { startTimer } from '../../redux/timerSlice';

const schema = Yup.object().shape({
  title: Yup.string()
    .required('Назва обовʼязкова')
    .min(2, 'Мінімум 2 символи')
    .max(250, 'Максимум 100 символів')
    .required('Заповніть, будь ласка, поле'),
});

const initialValue = {
  title: '',
  timer: '',
};

const TitleLength = () => {
  const { values } = useFormikContext();
  return <p className={styles.symbolCount}>{values.title.length}/250</p>;
};

const AddTaskModal = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values, action) => {
    const now = new Date().toISOString();
    const timerValue = isTimerActive ? Number(values.timer) : null;

    const newTask = {
      id: nanoid(),
      title: values.title.trim(),
      timer: isTimerActive ? Number(values.timer) : null,
      status: isTimerActive ? 'В роботі' : 'Створено',
      createdDate: now,
      startDate: isTimerActive ? now : null,
    };

    dispatch(addTasks(newTask));

    if (isTimerActive) {
      dispatch(startTimer({ id: newTask.id, status: newTask.status, timeLeft: timerValue }));
      dispatch(openModal('isTimeLeftModalOpen'));
    }

    action.resetForm();
    dispatch(closeModal('isAddTaskModalOpen'));
  };

  return (
    <Modal modalKey='isAddTaskModalOpen' className={styles.modalWindow}>
      <button
        onClick={() => dispatch(closeModal('isAddTaskModalOpen'))}
        className={styles.cancelButton}
      >
        <IoCloseSharp className={styles.cancelIcon} />
      </button>

      <Formik initialValues={initialValue} validationSchema={schema} onSubmit={handleSubmit}>
        <Form>
          <Field className={styles.taskInput} type='text' name='title' placeholder='Назва задачі' />
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

            {isTimerActive && (
              <Field
                className={styles.timeInput}
                type='text'
                name='timer'
                placeholder='60'
                required
              />
            )}
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
