import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

type FilterOption = 'all' | 'active' | 'completed'

interface Todo {
  id: number
  text: string
  completed: boolean
}

// App component with pre-populated mock data for story demonstration
function AppWithMockData({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [nextId, setNextId] = useState(initialTodos.length + 1)
  const [filter, setFilter] = useState<FilterOption>('all')

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

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  const filteredTodos = getFilteredTodos()

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-6">
      <Header />
      <TodoInput onAdd={addTodo} />

      {/* Filter Element */}
      <div id="filterElem" className="mb-6">
        <div className="relative p-4 border border-cyan bg-cyber-dark rounded-lg shadow-neon overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

          <div className="relative flex items-center gap-3">
            <span className="text-magenta text-sm font-bold">FILTER:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 border rounded text-sm font-mono transition-all duration-300 ${
                  filter === 'all'
                    ? 'border-yellow bg-yellow/20 text-yellow shadow-neon'
                    : 'border-cyan text-cyan hover:border-yellow hover:text-yellow'
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 border rounded text-sm font-mono transition-all duration-300 ${
                  filter === 'active'
                    ? 'border-yellow bg-yellow/20 text-yellow shadow-neon'
                    : 'border-cyan text-cyan hover:border-yellow hover:text-yellow'
                }`}
              >
                ACTIVE
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 border rounded text-sm font-mono transition-all duration-300 ${
                  filter === 'completed'
                    ? 'border-yellow bg-yellow/20 text-yellow shadow-neon'
                    : 'border-cyan text-cyan hover:border-yellow hover:text-yellow'
                }`}
              >
                COMPLETED
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan/10 rounded-full blur-xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-magenta/10 rounded-full blur-xl" />
        </div>

        {/* Decorative line */}
        <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
      </div>

      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

const mockTodos: Todo[] = [
  { id: 1, text: 'Hack the mainframe', completed: true },
  { id: 2, text: 'Install neural interface', completed: false },
  { id: 3, text: 'Decrypt corporate data', completed: true },
  { id: 4, text: 'Upgrade cybernetic arm', completed: false },
  { id: 5, text: 'Meet contact at neon district', completed: false },
]

const meta: Meta<typeof AppWithMockData> = {
  title: 'App',
  component: AppWithMockData,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AppWithMockData>

export const Default: Story = {
  args: {
    initialTodos: mockTodos,
  },
}
