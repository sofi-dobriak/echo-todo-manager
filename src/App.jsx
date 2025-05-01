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
import { selectIsVisibleItemAnalytic } from './redux/itemAnalyticSlice/selectors';

function App() {
  const tasks = useSelector(selectTasks);
  const filterTasks = useSelector(selectFilteredTasks);
  const isAnalyticVisible = useSelector(selectIsVisibleItemAnalytic);

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
        {!isAnalyticVisible && <TotalAnalyticTable />}

        <AddTaskModal />
        <ConfirmDeleteModal />
      </Container>
    </>
  );
}

export default App;
