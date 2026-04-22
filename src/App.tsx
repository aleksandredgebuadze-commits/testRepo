import { useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export type FilterType = "all" | "active" | "completed";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

/**
 * Filters todos based on the selected filter type.
 * - 'active': shows only incomplete todos
 * - 'completed': shows only completed todos
 * - 'all': shows all todos
 */
const getFilteredTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return todos;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [nextId, setNextId] = useState(1);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (text: string) => {
    setTodos([...todos, { id: nextId, text, completed: false }]);
    setNextId(nextId + 1);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-6">
      <Header />
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        filter={filter}
        onFilterChange={setFilter}
      />
    </div>
  );
};

export default App;
