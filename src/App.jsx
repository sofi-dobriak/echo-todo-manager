import { useState } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import AnalyticsFooter from './components/AnalyticsFooter/AnalyticsFooter';

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => setIsModalVisible(prev => !prev);
    const onClose = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Container>
                <Header toggleModal={toggleModal} />
                <AddTaskModal isVisible={isModalVisible} onClose={onClose} />
            </Container>
        </>
    );
}

export default App;
