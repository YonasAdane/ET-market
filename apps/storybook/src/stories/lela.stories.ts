import type { Meta, StoryObj } from '@storybook/react';
import Lela from '@repo/ui/Lela';

const meta = {
  title: 'Example/Lela',
  component: Lela,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Lela>;

export default meta;
type Story = StoryObj<typeof meta>;

export const This: Story = {
  args: {
    
  },
};

