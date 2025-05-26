import Button from '../Button/Button';
import { LuTimer } from 'react-icons/lu';
import { IoMdTrash } from 'react-icons/io';
import { FaPause } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoPlay } from 'react-icons/io5';
import { FaRegChartBar } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { selectTasks } from '../../redux/tasksSlice/selectors';
import { countApproachesNumber, updateTaskStatus } from '../../redux/tasksSlice/slice';
import { hideItemAnalytic, showItemAnalytic } from '../../redux/itemAnalyticSlice/slice';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/modalSlice/slice';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  id: string;
  status: string;
}

interface EditTaskFunc {
  id: string;
  title: string;
}

const ActionButtons = ({ id, status }: ActionButtonsProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const task = tasks.find(task => task.id === id);
  const title = task ? task.title : '';

  const hasTaskInProgess = tasks.some(
    task => task.status === 'В роботі' || task.status === 'Продовжено'
  );

  const handleStart = (id: string): void => {
    dispatch(updateTaskStatus({ id, status: 'В роботі', dateKey: 'startDate' }));
  };

  const handleDelete = (id: string): void => {
    dispatch(updateTaskStatus({ id, status: 'Видалено' }));
    dispatch(hideItemAnalytic());
  };
  const handleStop = (id: string): void => {
    dispatch(updateTaskStatus({ id, status: 'Зупинено', dateKey: 'stopDate' }));
    dispatch(hideItemAnalytic());
  };
  const handleComplete = (id: string): void => {
    dispatch(updateTaskStatus({ id, status: 'Завершено', dateKey: 'completeDate' }));
  };
  const handleContinue = (id: string): void => {
    dispatch(countApproachesNumber(id));
    dispatch(updateTaskStatus({ id, status: 'Продовжено', dateKey: 'startDate' }));
    dispatch(hideItemAnalytic());
  };

  const handleAnalytic = (id: string): void => {
    const task = tasks.find(task => task.id === id);
    if (!task) return;

    dispatch(hideItemAnalytic());

    setTimeout(() => {
      dispatch(showItemAnalytic({ ...task }));
    }, 0);
  };

  const handeEdit = ({ id, title }: EditTaskFunc): void => {
    dispatch(
      openModal({
        modalKey: 'isEditModalOpen',
        taskData: { id, title },
      })
    );
  };

  switch (status) {
    case 'Створено':
      return (
        <>
          <Button
            onClick={() => handleStart(id)}
            disabled={hasTaskInProgess}
            className={styles.disabledButton}
          >
            <LuTimer />
          </Button>
          <Button
            onClick={() => handleDelete(id)}
            disabled={hasTaskInProgess}
            className={styles.disabledButton}
          >
            <IoMdTrash />
          </Button>
          <Button
            onClick={() => handeEdit({ id, title })}
            disabled={hasTaskInProgess}
            className={styles.disabledButton}
          >
            <MdEdit />
          </Button>
        </>
      );

    case 'В роботі':
      return (
        <>
          <Button onClick={() => handleStop(id)}>
            <FaPause />
          </Button>
          <Button onClick={() => handleComplete(id)}>
            <FaRegCheckCircle />
          </Button>
        </>
      );

    case 'Зупинено':
      return (
        <>
          <Button
            onClick={() => handleContinue(id)}
            disabled={hasTaskInProgess}
            className={styles.disabledButton}
          >
            <IoPlay />
          </Button>
          <Button
            onClick={() => handleDelete(id)}
            disabled={hasTaskInProgess}
            className={styles.disabledButton}
          >
            <IoMdTrash />
          </Button>
          <Button
            onClick={() => handleAnalytic(id)}
            disabled={hasTaskInProgess}
            className={styles.disabledButton}
          >
            <FaRegChartBar />
          </Button>
          <Button
            onClick={() => handeEdit({ id, title })}
            disabled={hasTaskInProgess}
            className={styles.disabledButton}
          >
            <MdEdit />
          </Button>
        </>
      );

    case 'Продовжено':
      return (
        <>
          <Button onClick={() => handleStop(id)}>
            <FaPause />
          </Button>
          <Button onClick={() => handleComplete(id)}>
            <FaRegCheckCircle />
          </Button>
        </>
      );

    case 'Завершено':
      return (
        <>
          <Button
            onClick={() => handleAnalytic(id)}
            disabled={hasTaskInProgess}
            className={styles.disabledButton}
          >
            <FaRegChartBar />
          </Button>
          <Button
            onClick={() => handeEdit({ id, title })}
            disabled={hasTaskInProgess}
            className={styles.disabledButton}
          >
            <MdEdit />
          </Button>
        </>
      );
    case 'Видалено':
      return null;

    default:
      return null;
  }
};

export default ActionButtons;
