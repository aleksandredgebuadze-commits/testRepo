import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'

// Wrapper component to handle state with pre-populated todos
const AppWithPrePopulatedTodos = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Hack the mainframe', completed: true },
    { id: 2, text: 'Install neural implants', completed: false },
    { id: 3, text: 'Upgrade cyberdeck', completed: true },
    { id: 4, text: 'Meet contact at the neon bar', completed: false },
    { id: 5, text: 'Decrypt corp data files', completed: false },
  ])
  const [nextId, setNextId] = useState(6)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-6">
      <Header />
      <TodoInput onAdd={addTodo} />
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

const meta: Meta = {
  title: 'App',
  component: AppWithPrePopulatedTodos,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {}

export const WithFilterDemo: Story = {
  name: 'With Pre-populated Todos',
}
