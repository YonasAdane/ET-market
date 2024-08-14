import type { Meta, StoryObj } from '@storybook/react';
import PorductCard from '@repo/ui/widgets/card.tsx';

const meta = {
  title: 'Widgets/card',
  component: PorductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof PorductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const This: Story = {
  args: {
    image:"https://st2.depositphotos.com/2071605/8913/i/380/depositphotos_89139132-stock-photo-brown-jacket-for-man.jpg",
    name:"Autumn Jacket",
    description:"Jacket",
    price:85,
    prevPrice:124,
  },
};

