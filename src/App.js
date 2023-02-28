import TodoList from "./components/TodoList";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="todolist">
        <TodoList />
      </div>
    </div>
  );
};

export default App;