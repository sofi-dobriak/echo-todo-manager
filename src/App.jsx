import { useEffect, useState } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import TodoListTable from './components/TodoListTable/TodoListTable';
import AnalyticsTasksTable from './components/AnalyticsTasksTable/AnalyticsTasksTable';
import AnalyticItemTable from './components/AnalyticItemTable/AnalyticItemTable';
import Button from './components/Button/Button';
import ConfirmDeleteModal from './components/confirmDeleteModal/confirmDeleteModal';
import TimeLeftModal from './components/TimeLeftModal/TimeLeftModal';
import ContinueuStopModal from './components/ContinueuStopModal/ContinueuStopModal';
import SetTimerModal from './components/SetTimerModal/SetTimerModal';
import { useSelector } from 'react-redux';
import { selectAddModalOpen } from './redux/modalSlice';
import { selectFilteredTasks, selectTasks } from './redux/tasksSlice';
import Text from './components/Text/Text';

function App() {
  const tasks = useSelector(selectTasks);
  const filterTasks = useSelector(selectFilteredTasks);
  const isAnalyticVisible = useSelector(state => state.itemAnalytic.isVisibleItemAnalityc);

  return (
    <>
      <Container>
        <Header />

        <main>
          <TodoListTable />

          {tasks.length === 0 && <Text>Попрацюємо?</Text>}
          {filterTasks.length === 0 && tasks.length > 0 && <Text>Шо по фільтрам?</Text>}
        </main>
        {isAnalyticVisible && <AnalyticItemTable />}
        {!isAnalyticVisible && <AnalyticsTasksTable />}

        <AddTaskModal />
        <ConfirmDeleteModal />
        <SetTimerModal />
        <TimeLeftModal />
      </Container>
    </>
  );
}

export default App;
