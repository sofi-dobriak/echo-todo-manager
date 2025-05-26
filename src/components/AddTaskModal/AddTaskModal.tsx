import styles from './AddTaskModal.module.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { IoCloseSharp } from 'react-icons/io5';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { addTasks } from '../../redux/tasksSlice/slice';
import { closeModal } from '../../redux/modalSlice/slice';
import { hideItemAnalytic } from '../../redux/itemAnalyticSlice/slice';
import { nanoid } from '@reduxjs/toolkit';
import { FormValues } from '../../types/formValuesType';

const schema = Yup.object().shape({
  title: Yup.string()
    .required('Назва обовʼязкова')
    .min(2, 'Мінімум 2 символи')
    .max(250, 'Максимум 250 символів')
    .required('Заповніть, будь ласка, поле'),
});

const initialValue: FormValues = {
  title: '',
};

const TitleLength = () => {
  const { values } = useFormikContext<FormValues>();
  return <p className={styles.symbolCount}>{values.title.length}/250</p>;
};

const AddTaskModal = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: FormValues, action: FormikHelpers<FormValues>) => {
    const now = new Date().toISOString();

    const newTask = {
      id: nanoid(),
      title: values.title.trim(),
      status: 'Створено',
      createdDate: now,
      startDate: undefined,
      stopDate: undefined,
      completeDate: undefined,
      workPeriods: [],
      startWorkTime: '',
      attempts: null,
      totalTime: null,
      averageTime: null,
      formattedAverageTime: '',
      formattedTotalTime: '',
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
