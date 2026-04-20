import { useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterTabs from "./components/FilterTabs";
import StatsPanel from "./components/StatsPanel";

type Todo = { id: number; text: string; completed: boolean };
type FilterType = "all" | "active" | "completed";

// Filter todos by completion status
const applyFilter = (todos: Todo[], filter: FilterType): Todo[] => {
  if (filter === "active") return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) => t.completed);
  return todos;
};

// Calculate stats from todo list
const calculateStats = (todos: Todo[]) => {
  const completed = todos.filter((t) => t.completed).length;
  const active = todos.length - completed;
  const completionRate =
    todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;

  return {
    total: todos.length,
    active,
    completed,
    completionRate,
  };
};

function App() {
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

  const filteredTodos = applyFilter(todos, filter);
  const stats = calculateStats(todos);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-6">
      <Header />
      <StatsPanel stats={stats} />
      <TodoInput onAdd={addTodo} />
      <FilterTabs
        activeFilter={filter}
        onFilterChange={setFilter}
        counts={{
          all: stats.total,
          active: stats.active,
          completed: stats.completed,
        }}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
