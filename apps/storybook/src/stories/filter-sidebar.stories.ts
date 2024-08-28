import type { Meta, StoryObj } from '@storybook/react';
import FilterSideBar from '@repo/ui/widgets/filter-sidebar.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Widgets/FilterSideBar',
  component: FilterSideBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
} satisfies Meta<typeof FilterSideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const accessories: Story = {
  args: {
   type:"ACCESSORY"
  },
};
export const clothing: Story = {
    args: {
     type:"CLOTHING"
    },
  };
  export const footwear: Story = {
    args: {
     type:"FOOTWEAR"
    },
  };
  export const bag: Story = {
    args: {
     type:"BAG"
    },
  };
  export const outerwear: Story = {
    args: {
     type:"OUTERWEAR"
    },
  };
  export const underwear: Story = {
    args: {
     type:"UNDERWEAR"
    },
  };
  export const watch: Story = {
    args: {
     type:"WATCH"
    },
  };
            