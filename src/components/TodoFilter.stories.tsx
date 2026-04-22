import type { Meta, StoryObj } from '@storybook/react-vite';
import TodoFilter from './TodoFilter';

const meta: Meta<typeof TodoFilter> = {
  title: 'Components/TodoFilter',
  component: TodoFilter,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentFilter: {
      control: 'select',
      options: ['all', 'active', 'completed'],
    },
    onFilterChange: { action: 'filter changed' },
  },
};

export default meta;
type Story = StoryObj<typeof TodoFilter>;

export const Default: Story = {
  args: {
    currentFilter: 'all',
    onFilterChange: (filter) => console.log('Filter changed to:', filter),
  },
};

export const ActiveSelected: Story = {
  args: {
    currentFilter: 'active',
    onFilterChange: (filter) => console.log('Filter changed to:', filter),
  },
};

export const CompletedSelected: Story = {
  args: {
    currentFilter: 'completed',
    onFilterChange: (filter) => console.log('Filter changed to:', filter),
  },
};
