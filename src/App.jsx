import { useEffect, useState } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import TodoListTable from './components/TodoListTable/TodoListTable';
import AnalyticsTasksTable from './components/AnalyticsTasksTable/AnalyticsTasksTable';
import AnalyticItemTable from './components/AnalyticItemTable/AnalyticItemTable';
import Button from './components/Button/Button';
import { IoArrowBack } from 'react-icons/io5';
import ConfirmDeleteModal from './components/confirmDeleteModal/confirmDeleteModal';
import TimeLeftModal from './components/TimeLeftModal/TimeLeftModal';

function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) ?? []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTasksAnalyticVisible, setIsTasksAnalyticVisible] = useState(true);
  const [isItemAnalyticVisible, setIsItemAnalyticVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [filter, setFilter] = useState({
    status: '',
    dateRange: { start: '', end: '' },
    title: '',
  });
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerModalVisible, setIsTimerModalVisible] = useState(false);

  const startTimer = minutes => {
    setTimeLeft(minutes * 60);
    setIsTimerActive(true);
    setIsTimerModalVisible(true);
  };

  useEffect(() => {
    let interval;

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsTimerActive(false);
      setIsTimerModalVisible(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getFilteredTasks = (tasks, filter) => {
    return tasks.filter(task => {
      if (filter.status && task.status.toLowerCase() !== filter.status.toLowerCase()) {
        return false;
      }

      if (filter.dateRange.start && filter.dateRange.end) {
        const taskDate = new Date(task.createdDate);
        const startDate = new Date(filter.dateRange.start);
        const endDate = new Date(filter.dateRange.end);

        if (taskDate < startDate || taskDate > endDate) {
          return false;
        }
      }

      if (filter.title && !task.title.toLowerCase().includes(filter.title.toLowerCase())) {
        return false;
      }

      return true;
    });
  };

  const updateStatusFilter = status => {
    setFilter(prev => ({ ...prev, status }));
  };

  const updateDataFilter = (start, end) => {
    setFilter(prev => ({ ...prev, dateRange: { start, end } }));
  };

  const updateTitleFilter = title => {
    setFilter(prev => ({ ...prev, title }));
  };

  const visibleTasks = getFilteredTasks(tasks, filter);

  const resetFilter = () => {
    setFilter({
      status: '',
      dateRange: { start: '', end: '' },
      title: '',
    });
  };

  const toggleModal = () => setIsModalVisible(prev => !prev);

  const onClose = () => {
    setIsModalVisible(false);
  };

  const addTask = newTask => {
    setTasks(prev => [...prev, newTask]);
  };

  const deleteAllTasks = () => {
    setTasks([]);
    setSelectedItemId(null);
    setIsTasksAnalyticVisible(true);
    setIsItemAnalyticVisible(false);
    setConfirmModalIsOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleStart = id => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status: 'В роботі', startDate: new Date().toISOString() } : task
      )
    );
  };

  const handleStop = id => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              status: 'Зупинено',
              stopDate: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleContinue = id => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, status: 'Продовжено', startDate: new Date().toISOString() }
          : task
      )
    );
  };

  const handleComplete = id => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, status: 'Завершено', completeDate: new Date().toISOString() }
          : task
      )
    );
  };

  const handleDelete = id => {
    setTasks(prev => prev.map(task => (task.id === id ? { ...task, status: 'Видалено' } : task)));
  };

  const handleShowAnalytic = id => {
    setSelectedItemId(id);
    setIsTasksAnalyticVisible(false);
    setIsItemAnalyticVisible(true);
  };

  const handleBackToTasksAnalytic = () => {
    setSelectedItemId(null);
    setIsTasksAnalyticVisible(true);
    setIsItemAnalyticVisible(false);
  };

  const hasTaskInProgess = tasks.some(task => task.status === 'В роботі');

  return (
    <>
      <Container>
        <Header
          toggleModal={toggleModal}
          deleteAllTasks={deleteAllTasks}
          tasks={tasks}
          filter={filter}
          updateStatusFilter={updateStatusFilter}
          updateDataFilter={updateDataFilter}
          updateTitleFilter={updateTitleFilter}
          resetFilter={resetFilter}
          hasTaskInProgess={hasTaskInProgess}
          confirmModalIsOpen={confirmModalIsOpen}
          setConfirmModalIsOpen={setConfirmModalIsOpen}
        />
        <TodoListTable
          tasks={visibleTasks}
          handleStart={handleStart}
          handleStop={handleStop}
          handleContinue={handleContinue}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
          handleShowAnalytic={handleShowAnalytic}
        />
        {visibleTasks.length === 0 && <p className='empty'>Попрацюємо?</p>}
        {isTasksAnalyticVisible && <AnalyticsTasksTable />}
        {isItemAnalyticVisible && (
          <Button
            onClick={handleBackToTasksAnalytic}
            style={{ marginBottom: '8px', padding: '2px' }}
          >
            <IoArrowBack style={{ fontSize: '20px' }} />
          </Button>
        )}
        {isItemAnalyticVisible && <AnalyticItemTable taskId={selectedItemId} />}
        <AddTaskModal
          isVisible={isModalVisible}
          onClose={onClose}
          addTask={addTask}
          startTimer={startTimer}
          setTimeLeft={setTimeLeft}
          setIsTimerModalVisible={setIsTimerModalVisible}
        />
        <ConfirmDeleteModal
          isVisible={confirmModalIsOpen}
          onClose={() => setConfirmModalIsOpen(false)}
          deleteAllTasks={deleteAllTasks}
        />
        {isTimerActive && visibleTasks.length > 0 && (
          <TimeLeftModal timeLeft={formatTime(timeLeft)} isVisible={isTimerModalVisible} />
        )}
      </Container>
    </>
  );
}

export default App;
