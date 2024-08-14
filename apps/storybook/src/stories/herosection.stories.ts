import type { Meta, StoryObj } from '@storybook/react';
import HeroSection from '@repo/ui/widgets/herosection.tsx';

const meta = {
  title: 'Widgets/Hero',
  component: HeroSection,
  parameters: {
    layout:"fullscreen"
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeroSection1: Story = {
  args: {
    bgImg:"https://images.pexels.com/photos/9255747/pexels-photo-9255747.jpeg",
    heading:"Level up your Style with our summer collection",
    btnLink:"#",
    btnText:"Click here"
  },
};

