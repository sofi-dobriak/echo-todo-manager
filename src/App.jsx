import { useEffect, useState } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import TodoListTable from './components/TodoListTable/TodoListTable';
import AnalyticsTasksTable from './components/AnalyticsTasksTable/AnalyticsTasksTable';
import AnalyticItemTable from './components/AnalyticItemTable/AnalyticItemTable';
import Button from './components/Button/Button';
import { IoArrowBack } from 'react-icons/io5';

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

    const getFilteredTasks = (tasks, filter) => {
        return tasks.filter(task => {
            // Фільтрація за статусом
            if (filter.status && task.status.toLowerCase() !== filter.status.toLowerCase()) {
                return false;
            }
            // Фільтрація за датою
            if (filter.dateRange.start && filter.dateRange.end) {
                const taskDate = new Date(task.createdDate);
                const startDate = new Date(filter.dateRange.start);
                const endDate = new Date(filter.dateRange.end);
                if (taskDate < startDate || taskDate > endDate) {
                    return false;
                }
            }

            // Фільтрація за назвою
            if (filter.title && !task.title.toLowerCase().includes(filter.title.toLowerCase())) {
                return false;
            }

            return true; // Якщо жоден з фільтрів не заблокував задачу, повертаємо її
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

    const tasksToDisplay = getFilteredTasks(tasks, filter);

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
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleStart = id => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, status: 'В роботі', startDate: new Date().toISOString() }
                    : task
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
        setTasks(prev =>
            prev.map(task => (task.id === id ? { ...task, status: 'Видалено' } : task))
        );
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
                />
                <TodoListTable
                    tasks={tasksToDisplay}
                    handleStart={handleStart}
                    handleStop={handleStop}
                    handleContinue={handleContinue}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete}
                    handleShowAnalytic={handleShowAnalytic}
                />
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
                <AddTaskModal isVisible={isModalVisible} onClose={onClose} addTask={addTask} />
            </Container>
        </>
    );
}

export default App;
