import { useEffect, useState } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import TodoTasksTable from './components/TodoTasksTable/TodoTasksTable';
import AnalyticsTasksTable from './components/AnalyticsTasksTable/AnalyticsTasksTable';
import AnalyticItemTable from './components/AnalyticItemTable/AnalyticItemTable';

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) ?? []);

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

    return (
        <>
            <Container>
                <Header toggleModal={toggleModal} deleteAllTasks={deleteAllTasks} />
                <TodoTasksTable tasks={tasks} />
                <AnalyticsTasksTable />
                <AddTaskModal isVisible={isModalVisible} onClose={onClose} addTask={addTask} />
            </Container>
        </>
    );
}

export default App;
