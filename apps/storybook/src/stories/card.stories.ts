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
    image:"https://rtwcreation.com/cdn/shop/products/peach-mini-top-handle-bag-quarte.jpg?v=1664205942",
    name:"Peach mini top-handle bag",
    description:"Jacket",
    price:2399.00,
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
    image:"https://www.skiny.com/media/catalog/product/cache/24eb8ccf329ba5087f039e1050cafd72/s/k/skiny_242_m_cottonmultipack_trunks3pack_086840_08s696_010.jpg",
    name:"trunks 3 pack ",
    description:"Jacket",
    price:39.99,
    prevPrice:124,
    type:"UNDERWEAR"
  },
};
export const Outerwear: Story = {
  args: {
    image:"https://mooseknuckles.co/media/catalog/product/m/3/m34mv474g_292_front_category_bjlcyi7uqvlwndue.jpg?optimize=high&fit=bounds&height=&width=1080&quality=85&auto=webp&format=pjpg",
    name:"Autumn Jacket",
    description:"Jacket",
    price:85,
    prevPrice:124,
    type:"OUTERWEAR"
  },
};