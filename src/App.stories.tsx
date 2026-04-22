import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFilter, { FilterType } from './components/TodoFilter'

// Create a wrapper that pre-populates the App with mock todos
const AppWithMockTodos = () => {
  // Pre-populated todos with different completion states for demonstrating filtering
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([
    { id: 1, text: 'Initialize the neural interface', completed: true },
    { id: 2, text: 'Hack the mainframe', completed: false },
    { id: 3, text: 'Upgrade cybernetic implants', completed: true },
    { id: 4, text: 'Decrypt the encrypted files', completed: false },
    { id: 5, text: 'Meet contact at Neon District', completed: false },
  ])
  const [nextId, setNextId] = useState(6)
  const [filter, setFilter] = useState<FilterType>('all')

  const addTodo = (text: string) => {
    setTodos([...todos, { id: nextId, text, completed: false }])
    setNextId(nextId + 1)
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-6">
      <Header />
      <TodoInput onAdd={addTodo} />
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} filter={filter} />
    </div>
  )
}

const meta: Meta<typeof AppWithMockTodos> = {
  title: 'App',
  component: AppWithMockTodos,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AppWithMockTodos>

export const Default: Story = {}
