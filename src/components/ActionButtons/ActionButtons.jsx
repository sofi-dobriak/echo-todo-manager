import Button from '../Button/Button';
import { LuTimer } from 'react-icons/lu';
import { IoMdTrash } from 'react-icons/io';
import { FaPause } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoPlay } from 'react-icons/io5';
import { FaRegChartBar } from 'react-icons/fa';
import { countApproachesNumber, selectTasks, updateTaskStatus } from '../../redux/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { hideItemAnalytic, showItemAnalytic } from '../../redux/itemAnalyticSlice';

const ActionButtons = ({ id, status }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

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
    dispatch(showItemAnalytic(task));

    const footerTag = document.querySelector('footer');
    if (footerTag) {
      footerTag.scrollIntoView({ behavior: 'smooth' });
      return;
    }
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
