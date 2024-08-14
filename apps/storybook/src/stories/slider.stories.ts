import type { Meta, StoryObj } from '@storybook/react';
import Slider from '@repo/ui/widgets/slider.tsx';

const meta = {
  title: 'Widgets/Slider',
  component: Slider,
  parameters: {
    layout:"fullscreen"
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Slider1: Story = {
  args: {
    bgImg:"https://images.pexels.com/photos/9255747/pexels-photo-9255747.jpeg",
    heading:"Level up your Style with our summer collection",
    btnLink:"#",
    btnText:"Click here"
  },
};

