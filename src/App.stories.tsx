import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterTabs from "./components/FilterTabs";
import StatsPanel from "./components/StatsPanel";

type Todo = { id: number; text: string; completed: boolean; status?: 'unknown' };
type FilterType = "all" | "active" | "completed" | "unknown";

// Filter todos by completion status
const applyFilter = (todos: Todo[], filter: FilterType): Todo[] => {
  if (filter === "active") return todos.filter((t) => !t.completed && !t.status);
  if (filter === "completed") return todos.filter((t) => t.completed && !t.status);
  if (filter === "unknown") return todos.filter((t) => t.status === "unknown");
  return todos;
};

// Calculate stats from todo list
const calculateStats = (todos: Todo[]) => {
  const unknown = todos.filter((t) => t.status === "unknown").length;
  const completed = todos.filter((t) => t.completed && !t.status).length;
  const active = todos.filter((t) => !t.completed && !t.status).length;
  const totalKnown = active + completed;
  const completionRate =
    totalKnown > 0 ? Math.round((completed / totalKnown) * 100) : 0;

  return {
    total: todos.length,
    active,
    completed,
    unknown,
    completionRate,
  };
};

// Mock data with unknown, active, and completed todos
const mockTodos: Todo[] = [
  { id: 1, text: "Initialize neural network protocols", completed: false },
  { id: 2, text: "Debug quantum encryption module", completed: false },
  { id: 3, text: "Deploy cyberspace firewall", completed: false },
  { id: 4, text: "Complete matrix synchronization", completed: true },
  { id: 5, text: "Archive legacy data clusters", completed: true },
  { id: 6, text: "Verify biometric access codes", completed: true },
  { id: 7, text: "Investigate anomaly in sector 7G", completed: false, status: "unknown" },
  { id: 8, text: "Trace origin of rogue signal", completed: false, status: "unknown" },
  { id: 9, text: "Decrypt corrupted transmission", completed: false, status: "unknown" },
];

// Wrapper component to show App with pre-populated data
const AppWithMockData = () => {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [nextId, setNextId] = useState(mockTodos.length + 1);
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
          unknown: stats.unknown,
        }}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};

const meta: Meta = {
  title: "App",
  component: AppWithMockData,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
