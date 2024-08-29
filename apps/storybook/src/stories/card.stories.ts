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

export const Clothing: Story = {
  args: {
    image:"https://st2.depositphotos.com/2071605/8913/i/380/depositphotos_89139132-stock-photo-brown-jacket-for-man.jpg",
    name:"Autumn Jacket",
    description:"Jacket",
    price:85,
    prevPrice:124,
    type:"CLOTHING"
  },
};
export const Footwear: Story = {
  args: {
    image:"https://st2.depositphotos.com/2071605/8913/i/380/depositphotos_89139132-stock-photo-brown-jacket-for-man.jpg",
    name:"Autumn Jacket",
    description:"Jacket",
    price:85,
    prevPrice:124,
    type:"FOOTWEAR"
  },
};
export const Accessory: Story = {
  args: {
    image:"https://st2.depositphotos.com/2071605/8913/i/380/depositphotos_89139132-stock-photo-brown-jacket-for-man.jpg",
    name:"Autumn Jacket",
    description:"Jacket",
    price:85,
    prevPrice:124,
    type:"ACCESSORY"
  },
};
export const Bag: Story = {
  args: {
    image:"https://st2.depositphotos.com/2071605/8913/i/380/depositphotos_89139132-stock-photo-brown-jacket-for-man.jpg",
    name:"Autumn Jacket",
    description:"Jacket",
    price:85,
    prevPrice:124,
    type:"BAG"
  },
};
export const Watch: Story = {
  args: {
    image:"https://www.justwatches.com/cdn/shop/files/TWEG18600_1.jpg?v=1709548780&width=300",
    name:"Timex E Class Men Round Dial",
    description:"TIMEX",
    price:85,
    prevPrice:124,
    type:"WATCH"
  },
};
export const Underwear: Story = {
  args: {
    image:"https://st2.depositphotos.com/2071605/8913/i/380/depositphotos_89139132-stock-photo-brown-jacket-for-man.jpg",
    name:"Timex E Class Men Round Dial Quartz ",
    description:"Jacket",
    price:85,
    prevPrice:124,
    type:"UNDERWEAR"
  },
};
export const Outerwear: Story = {
  args: {
    image:"https://st2.depositphotos.com/2071605/8913/i/380/depositphotos_89139132-stock-photo-brown-jacket-for-man.jpg",
    name:"Autumn Jacket",
    description:"Jacket",
    price:85,
    prevPrice:124,
    type:"OUTERWEAR"
  },
};