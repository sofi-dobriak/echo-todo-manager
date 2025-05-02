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
import { selectCurrentTask } from '../../redux/itemAnalyticSlice/selectors';

const ActionButtons = ({ id, status }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const selectedTask = useSelector(selectCurrentTask);

  const task = tasks.find(task => task.id === id);
  const title = task ? task.title : '';

  const handleStart = () => {
    dispatch(updateTaskStatus({ id, status: 'В роботі', dateKey: 'startDate' }));
  };

  const handleDelete = id => {
    dispatch(updateTaskStatus({ id, status: 'Видалено' }));
    dispatch(hideItemAnalytic());
  };
  const handleStop = id => {
    dispatch(updateTaskStatus({ id, status: 'Зупинено', dateKey: 'stopDate' }));
    dispatch(hideItemAnalytic());
  };
  const handleComplete = id => {
    dispatch(updateTaskStatus({ id, status: 'Завершено', dateKey: 'completeDate' }));
  };
  const handleContinue = id => {
    dispatch(countApproachesNumber(id));
    dispatch(updateTaskStatus({ id, status: 'Продовжено', dateKey: 'startDate' }));
    dispatch(hideItemAnalytic());
  };

  const handleAnalytic = id => {
    const task = tasks.find(task => task.id === id);
    dispatch(hideItemAnalytic());
    setTimeout(() => {
      dispatch(showItemAnalytic({ ...task }));
    }, 0);
  };

  const handeEdit = ({ id, title }) => {
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
          <Button onClick={() => handleStart(id)}>
            <LuTimer />
          </Button>
          <Button onClick={() => handleDelete(id)}>
            <IoMdTrash />
          </Button>
          <Button onClick={() => handeEdit({ id, title })}>
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
          <Button onClick={() => handleContinue(id)}>
            <IoPlay />
          </Button>
          <Button onClick={() => handleDelete(id)}>
            <IoMdTrash />
          </Button>
          <Button onClick={() => handleAnalytic(id)}>
            <FaRegChartBar />
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
        <Button onClick={() => handleAnalytic(id)}>
          <FaRegChartBar />
        </Button>
      );

    case 'Видалено':
      return null;

    default:
      return null;
  }
};

export default ActionButtons;
