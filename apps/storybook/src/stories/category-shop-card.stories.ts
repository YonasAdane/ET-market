import type { Meta, StoryObj } from '@storybook/react';
import CategoryShopCard from '@repo/ui/widgets/category-shop-card.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Widgets/CategoryShopCard',
  component: CategoryShopCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof CategoryShopCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Cart: Story = {
    args: {
        image:"https://i5.walmartimages.com/dfw/4ff9c6c9-8685/k2-_814c74ab-6049-40cb-a598-5652ba07d847.v1.jpg?odnHeight=290&amp;odnWidth=290&amp;odnBg=FFFFFF",
        link:"/mens",
        title:"Men's"
       },
};
