import type { Meta, StoryObj } from '@storybook/react';
import BrandCard from '@repo/ui/widgets/brand-card.tsx';

// Default export with metadata
const meta: Meta<typeof BrandCard> = {
  title: 'Widgets/BrandCard',
  component: BrandCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define argTypes if needed
  },
};

export default meta;

// Define the type for stories
type Story = StoryObj<typeof BrandCard>;

// Story definition
export const Square: Story = {
  args: {
    image: "https://www.freepnglogos.com/uploads/logo-adidas-vector-png-32.png",
    title: 'Adidas',
    link: "/brands/adidas"
  },
};
