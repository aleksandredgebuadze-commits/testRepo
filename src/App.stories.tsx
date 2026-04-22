import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { FilterType, Todo } from "./App";
import { getFilteredTodos } from "./App";

interface AppWithTodosProps {
  initialTodos?: Todo[];
}

/**
 * Wrapper component for Storybook that renders the App with configurable initial todos.
 * This allows us to demonstrate different states (empty, with todos) without duplicating App logic.
 */
const AppWithTodos = ({ initialTodos = [] }: AppWithTodosProps) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [nextId, setNextId] = useState(
    initialTodos.length > 0
      ? Math.max(...initialTodos.map((todo) => todo.id)) + 1
      : 1,
  );
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

const meta: Meta<typeof AppWithTodos> = {
  title: "Pages/App",
  component: AppWithTodos,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppWithTodos>;

// Empty state - no todos
export const Empty: Story = {
  args: {
    initialTodos: [],
  },
};

// With pre-populated todos to demonstrate filter functionality
export const WithTodos: Story = {
  args: {
    initialTodos: [
      { id: 1, text: "Hack the mainframe", completed: true },
      { id: 2, text: "Install neural implant", completed: false },
      { id: 3, text: "Upgrade cyberdeck firmware", completed: true },
      { id: 4, text: "Meet with fixer at Afterlife", completed: false },
      { id: 5, text: "Decrypt encrypted data shard", completed: false },
    ],
  },
};
