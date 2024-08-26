import {CollectionHeader} from '@repo/ui/widgets/collection-header.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Widgets/CollectionHeader',
  component: CollectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof CollectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CollectionHeader1: Story = {
  args: {
    
  },
};

