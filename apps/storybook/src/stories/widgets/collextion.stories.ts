import type { Meta, StoryObj } from '@storybook/react';
import {Collection} from "@repo/ui/widgets/collection.tsx"
const meta = {
  title: 'widgets/Collection',
  component: Collection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Collection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Collection',
  },
};


