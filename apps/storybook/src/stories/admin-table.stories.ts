import type { Meta, StoryObj } from '@storybook/react';
import AdminTable from '@repo/ui/components/admin/AdminTable';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';

const meta: Meta<typeof AdminTable> = {
  title: 'Admin/AdminTable',
  component: AdminTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A luxury e-commerce admin table component with loading states, error handling, and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows skeleton loading state',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no data is available',
    },
    cardTitle: {
      control: 'text',
      description: 'Title for the card wrapper',
    },
    cardDescription: {
      control: 'text',
      description: 'Description for the card wrapper',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleProducts = [
  {
    id: 1,
    name: 'Premium Leather Jacket',
    price: 299.99,
    stock: 15,
    category: 'Outerwear',
    brand: 'LuxuryBrand',
    status: 'active'
  },
  {
    id: 2,
    name: 'Silk Evening Dress',
    price: 599.99,
    stock: 8,
    category: 'Clothing',
    brand: 'Elegance',
    status: 'active'
  },
  {
    id: 3,
    name: 'Designer Handbag',
    price: 899.99,
    stock: 3,
    category: 'Accessories',
    brand: 'Chic',
    status: 'low-stock'
  }
];

const columns = [
  {
    key: 'name',
    header: 'Product Name',
    cell: (value: string, item: any) => (
      <div className="space-y-1">
        <p className="font-medium">{value}</p>
        <p className="text-sm text-muted-foreground">{item.brand}</p>
      </div>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    cell: (value: string) => (
      <Badge variant="outline">{value}</Badge>
    ),
  },
  {
    key: 'price',
    header: 'Price',
    cell: (value: number) => (
      <span className="font-semibold">${value.toFixed(2)}</span>
    ),
  },
  {
    key: 'stock',
    header: 'Stock',
    cell: (value: number, item: any) => (
      <Badge 
        variant={value > 10 ? 'default' : value > 0 ? 'secondary' : 'destructive'}
      >
        {value}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    cell: () => (
      <Button variant="ghost" size="sm">
        Edit
      </Button>
    ),
  },
];

export const Default: Story = {
  args: {
    data: sampleProducts,
    columns,
    cardTitle: 'Products',
    cardDescription: 'Manage your product catalog',
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
    cardTitle: 'Products',
    cardDescription: 'Loading products...',
  },
};

export const Error: Story = {
  args: {
    data: [],
    columns,
    error: 'Failed to load products. Please check your connection and try again.',
    cardTitle: 'Products',
    cardDescription: 'Error loading products',
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyMessage: 'No products found. Create your first product to get started.',
    cardTitle: 'Products',
    cardDescription: 'Your product catalog is empty',
  },
};

export const WithRetry: Story = {
  args: {
    data: [],
    columns,
    error: 'Network connection failed',
    onRetry: () => {
      console.log('Retrying...');
      // In real app, this would trigger a refetch
    },
    cardTitle: 'Products',
    cardDescription: 'Connection error',
  },
};

export const LuxuryTheme: Story = {
  args: {
    data: sampleProducts.map(product => ({
      ...product,
      name: product.name.replace('Premium', 'Exclusive').replace('Designer', 'Haute Couture')
    })),
    columns,
    cardTitle: 'Luxury Collection',
    cardDescription: 'Curated selection of premium products',
    className: 'border-2 border-amber-200/20 bg-gradient-to-br from-amber-50/50 to-orange-50/50',
  },
  parameters: {
    docs: {
      description: {
        story: 'Luxury-themed table with golden accents and premium styling.',
      },
    },
  },
};

export const Responsive: Story = {
  args: {
    data: sampleProducts,
    columns,
    cardTitle: 'Responsive Table',
    cardDescription: 'Optimized for all screen sizes',
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
    },
  },
};
