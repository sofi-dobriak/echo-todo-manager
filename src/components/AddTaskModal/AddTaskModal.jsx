import { useState } from 'react';
import styles from './AddTaskModal.module.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { IoCloseSharp } from 'react-icons/io5';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { addTasks } from '../../redux/tasksSlice';
import { closeModal } from '../../redux/modalSlice';
import { nanoid } from '@reduxjs/toolkit';
import { hideItemAnalytic } from '../../redux/itemAnalyticSlice';

const schema = Yup.object().shape({
  title: Yup.string()
    .required('Назва обовʼязкова')
    .min(2, 'Мінімум 2 символи')
    .max(250, 'Максимум 100 символів')
    .required('Заповніть, будь ласка, поле'),
});

const initialValue = {
  title: '',
};

const TitleLength = () => {
  const { values } = useFormikContext();
  return <p className={styles.symbolCount}>{values.title.length}/250</p>;
};

const AddTaskModal = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, action) => {
    const now = new Date().toISOString();

    const newTask = {
      id: nanoid(),
      title: values.title.trim(),
      status: 'Створено',
      createdDate: now,
      workPeriods: [],
      startWorkTime: null,
      attempts: null,
      totalTime: null,
      averageTime: null,
    };

    dispatch(addTasks(newTask));

    action.resetForm();
    dispatch(closeModal('isAddTaskModalOpen'));
    dispatch(hideItemAnalytic());
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
          <Button className={styles.createButton} type='submit'>
            Створити
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddTaskModal;
