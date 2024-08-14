import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '@repo/ui/widgets/Navigation.tsx';

const meta = {
  title: 'Widgets/navigation',
  component: Navigation,
  parameters: {
    layout:"fullscreen"
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const This: Story = {
  args: {
    // image:"https://st2.depositphotos.com/2071605/8913/i/380/depositphotos_89139132-stock-photo-brown-jacket-for-man.jpg",
  },
};

