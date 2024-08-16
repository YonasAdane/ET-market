import Display from '@repo/ui/widgets/display.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Widgets/Display',
  component: Display,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Display>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display1: Story = {
  args: {
    
  },
};

