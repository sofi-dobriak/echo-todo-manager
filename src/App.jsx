import { useEffect, useState } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import TodoListTable from './components/TodoListTable/TodoListTable';
import AnalyticsTasksTable from './components/AnalyticsTasksTable/AnalyticsTasksTable';
import AnalyticItemTable from './components/AnalyticItemTable/AnalyticItemTable';
import Button from './components/Button/Button';

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) ?? []);
    const [isTasksAnalyticVisible, setIsTasksAnalyticVisible] = useState(true);
    const [isItemAnalyticVisible, setIsItemAnalyticVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const toggleModal = () => setIsModalVisible(prev => !prev);

    const onClose = () => {
        setIsModalVisible(false);
    };

    const addTask = newTask => {
        setTasks(prev => [...prev, newTask]);
    };

    const deleteAllTasks = () => {
        setTasks([]);
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
                <Header toggleModal={toggleModal} deleteAllTasks={deleteAllTasks} tasks={tasks} />
                <TodoListTable
                    tasks={tasks}
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
                        style={{ marginBottom: '8px', padding: '14px' }}
                    >
                        Повернутися до загальної аналітики
                    </Button>
                )}
                {isItemAnalyticVisible && <AnalyticItemTable taskId={selectedItemId} />}
                <AddTaskModal isVisible={isModalVisible} onClose={onClose} addTask={addTask} />
            </Container>
        </>
    );
}

export default App;
