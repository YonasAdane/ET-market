import Controls from '@repo/ui/widgets/controls.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Widgets/Controls',
  component: Controls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Controls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controls1: Story = {
  args: {
    
  },
};

