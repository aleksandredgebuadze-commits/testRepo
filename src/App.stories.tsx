import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import type { Todo } from "./App";

type FilterType = "all" | "active" | "completed";

// Wrapper component to demonstrate filtering functionality with pre-populated data
const AppWithPrePopulatedTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Upgrade neural interface", completed: true },
    { id: 2, text: "Hack the mainframe", completed: false },
    { id: 3, text: "Install cybernetic enhancements", completed: true },
    { id: 4, text: "Decrypt encrypted files", completed: false },
    { id: 5, text: "Run diagnostic scan", completed: false },
  ]);
  const [nextId, setNextId] = useState(6);
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

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-6">
      <Header />
      <TodoInput onAdd={addTodo} />
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};

const meta: Meta<typeof AppWithPrePopulatedTodos> = {
  title: "App",
  component: AppWithPrePopulatedTodos,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppWithPrePopulatedTodos>;

export const WithFilterDemo: Story = {};
