import Container from './components/Container/Container';
import Header from './components/Header/Header';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import TodoListTable from './components/TodoListTable/TodoListTable';
import AnalyticItemTable from './components/AnalyticItemTable/AnalyticItemTable';
import ConfirmDeleteModal from './components/confirmDeleteModal/confirmDeleteModal';
import Text from './components/Text/Text';
import TotalAnalyticTable from './components/TotalAnalyticTable/TotalAnalyticTable';
import { useSelector } from 'react-redux';
import { selectFilteredTasks, selectTasks } from './redux/tasksSlice/selectors';
import {
  selectCurrentTask,
  selectIsVisibleItemAnalytic,
} from './redux/itemAnalyticSlice/selectors';
import EditTaskModal from './components/EditTaskModal/EditTaskModal';
import BackToTop from './components/BackToTop/BackToTop';
import { useEffect, useState } from 'react';
import OptionMobileWindow from './components/OptionMobileWindow/OptionMobileWindow';
import FilterMobileWindow from './components/FilterMobileWindow/FilterMobileWindow';
import ErrorDateRangeMessage from './components/ErrorDateRangeMessage/ErrorDateRangeMessage';

function App() {
  const [clickedId, setClickedId] = useState<string | null>(null);
  const tasks = useSelector(selectTasks);
  const filterTasks = useSelector(selectFilteredTasks);
  const isAnalyticVisible = useSelector(selectIsVisibleItemAnalytic);
  const selectedTask = useSelector(selectCurrentTask);

  useEffect(() => {
    if (!selectedTask?.id) return;

    setTimeout(() => {
      const footerTag = document.querySelector('footer');
      const isScroll = document.documentElement.scrollHeight > window.innerHeight;

      if (footerTag && isScroll) {
        footerTag.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [selectedTask?.id]);

  return (
    <>
      <Container>
        <Header clickedId={clickedId} />

        <main>
          <TodoListTable clickedId={clickedId} setClickedId={setClickedId} />
          {tasks.length === 0 && <Text>Попрацюємо?</Text>}
          {filterTasks.length === 0 && tasks.length > 0 && <Text>Шо по фільтрам?</Text>}
        </main>

        <footer>
          {isAnalyticVisible && <AnalyticItemTable key={selectedTask?.id} />}
          {!isAnalyticVisible && <TotalAnalyticTable />}
        </footer>

        <AddTaskModal />
        <ConfirmDeleteModal />
        <EditTaskModal />
        <ErrorDateRangeMessage />

        <BackToTop />

        <OptionMobileWindow clickedId={clickedId} />
        <FilterMobileWindow />
      </Container>
    </>
  );
}

export default App;
