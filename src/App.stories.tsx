import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'

type FilterType = 'all' | 'active' | 'completed'

interface StoryTodo {
  id: number
  text: string
  completed: boolean
}

interface AppStoryState {
  todos: StoryTodo[]
  initialFilter: FilterType
  nextId: number
}

const getFilteredTodos = (todos: StoryTodo[], filter: FilterType): StoryTodo[] => {
  if (filter === 'active') return todos.filter(todo => !todo.completed)
  if (filter === 'completed') return todos.filter(todo => todo.completed)
  return todos
}

const AppStoryTemplate = ({ todos: initialTodos, initialFilter, nextId: initialNextId }: AppStoryState) => {
  const [todos, setTodos] = useState<StoryTodo[]>(initialTodos)
  const [nextId, setNextId] = useState(initialNextId)
  const [filter, setFilter] = useState<FilterType>(initialFilter)

  const addTodo = (text: string) => {
    setTodos([...todos, { id: nextId, text, completed: false }])
    setNextId(nextId + 1)
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = getFilteredTodos(todos, filter)

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-6">
      <Header />
      <TodoInput onAdd={addTodo} />
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

const meta: Meta<typeof AppStoryTemplate> = {
  title: 'App',
  component: AppStoryTemplate,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AppStoryTemplate>

export const Default: Story = {
  args: {
    todos: [
      { id: 1, text: 'Hack the mainframe', completed: true },
      { id: 2, text: 'Upgrade neural implants', completed: false },
      { id: 3, text: 'Debug quantum processor', completed: false },
      { id: 4, text: 'Decrypt secure data', completed: true },
      { id: 5, text: 'Install bionic eye mod', completed: false },
    ],
    initialFilter: 'all',
    nextId: 6,
  },
}

export const WithActiveTodos: Story = {
  args: {
    todos: [
      { id: 1, text: 'Hack the mainframe', completed: false },
      { id: 2, text: 'Upgrade neural implants', completed: false },
      { id: 3, text: 'Debug quantum processor', completed: false },
    ],
    initialFilter: 'active',
    nextId: 4,
  },
}

export const WithCompletedTodos: Story = {
  args: {
    todos: [
      { id: 1, text: 'Hack the mainframe', completed: true },
      { id: 2, text: 'Decrypt secure data', completed: true },
      { id: 3, text: 'Initialize cyberdeck', completed: true },
    ],
    initialFilter: 'completed',
    nextId: 4,
  },
}
