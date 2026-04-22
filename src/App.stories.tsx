import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'

// Custom App wrapper with pre-populated todos to demonstrate filtering
function AppWithTodos() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([
    { id: 1, text: 'Hack the mainframe', completed: true },
    { id: 2, text: 'Upload consciousness to the cloud', completed: false },
    { id: 3, text: 'Install cybernetic enhancements', completed: true },
    { id: 4, text: 'Decrypt encrypted data packets', completed: false },
    { id: 5, text: 'Bypass security protocols', completed: false },
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
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-6">
      <Header />
      <TodoInput onAdd={addTodo} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

const meta: Meta<typeof AppWithTodos> = {
  title: 'App',
  component: AppWithTodos,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AppWithTodos>

export const Default: Story = {}
