import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, useMemo } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'

type FilterType = 'all' | 'active' | 'completed'

// Wrapper component that mirrors App but with pre-populated todos
const AppWithInitialTodos = () => {
  const initialTodos = [
    { id: 1, text: 'Hack the mainframe', completed: true },
    { id: 2, text: 'Install neural implant', completed: false },
    { id: 3, text: 'Meet contact at Afterlife', completed: true },
    { id: 4, text: 'Upgrade cyberdeck firmware', completed: false },
    { id: 5, text: 'Collect bounty from fixer', completed: false },
  ]
  
  const [todos, setTodos] = useState(initialTodos)
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

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

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
  title: 'Pages/App',
  component: AppWithInitialTodos,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <AppWithInitialTodos />,
}
