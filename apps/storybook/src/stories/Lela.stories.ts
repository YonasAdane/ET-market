import type { Meta, StoryObj } from '@storybook/react';
import Lela from "@repo/ui/Lela"
import { Button } from './Button';

const meta = {
  title: 'Widget/Lela',
  component: Lela,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LelaComponent: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

