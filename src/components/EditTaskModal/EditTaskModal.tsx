import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modalSlice/slice';
import { editTask } from '../../redux/tasksSlice/slice';
import styles from './EditTaskModal.module.css';
import { IoCloseSharp } from 'react-icons/io5';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { selectEditTaskData } from '../../redux/modalSlice/selectors';
import { FormValues } from '../../types/formValuesType';

const schema = Yup.object().shape({
  title: Yup.string()
    .required('Назва обовʼязкова')
    .min(2, 'Мінімум 2 символи')
    .max(250, 'Максимум 100 символів')
    .required('Заповніть, будь ласка, поле'),
});

const TitleLength = () => {
  const { values } = useFormikContext<FormValues>();
  return <p className={styles.symbolCount}>{values.title.length}/250</p>;
};

const EditTaskModal = () => {
  const dispatch = useDispatch();
  const editTaskData = useSelector(selectEditTaskData);

  const initialValues: FormValues = {
    title: editTaskData?.title || '',
    id: editTaskData?.id || '',
  };

  const handleSubmit = (values: FormValues) => {
    if (values.id) {
      dispatch(
        editTask({
          id: values.id,
          title: values.title,
        })
      );
      dispatch(closeModal('isEditModalOpen'));
    }
  };

  return (
    <Modal modalKey='isEditModalOpen' className={styles.modalWindow}>
      <button
        onClick={() => dispatch(closeModal('isEditModalOpen'))}
        className={styles.cancelButton}
      >
        <IoCloseSharp className={styles.cancelIcon} />
      </button>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form>
          <Field className={styles.taskInput} type='text' name='title' />
          <ErrorMessage name='title' className={styles.error} component='div' />
          <TitleLength />
          <Button className={styles.createButton} type='submit'>
            Застосувати зміни
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default EditTaskModal;
