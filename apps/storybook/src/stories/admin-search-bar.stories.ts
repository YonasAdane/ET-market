import type { Meta, StoryObj } from '@storybook/react';
import AdminSearchBar from '@repo/ui/components/admin/AdminSearchBar';
import { useState } from 'react';

const meta: Meta<typeof AdminSearchBar> = {
  title: 'Admin/AdminSearchBar',
  component: AdminSearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A luxury search and filter component for admin interfaces with debounced search and advanced filtering capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
    debounceMs: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: 'Debounce delay in milliseconds',
    },
    onSearch: {
      action: 'searched',
      description: 'Called when search term changes',
    },
    onFilterChange: {
      action: 'filter changed',
      description: 'Called when filters change',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component
function SearchBarWrapper(props: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  return (
    <div className="space-y-4">
      <AdminSearchBar
        {...props}
        onSearch={(term) => {
          setSearchTerm(term);
          props.onSearch?.(term);
        }}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          props.onFilterChange?.(newFilters);
        }}
      />
      
      {/* Debug info */}
      <div className="p-4 bg-muted/20 rounded-lg text-sm">
        <p><strong>Search Term:</strong> "{searchTerm}"</p>
        <p><strong>Active Filters:</strong> {JSON.stringify(filters, null, 2)}</p>
      </div>
    </div>
  );
}

const sampleFilters = [
  {
    key: 'category',
    label: 'Category',
    options: [
      { value: 'clothing', label: 'Clothing' },
      { value: 'footwear', label: 'Footwear' },
      { value: 'accessories', label: 'Accessories' },
      { value: 'bags', label: 'Bags' },
    ]
  },
  {
    key: 'brand',
    label: 'Brand',
    options: [
      { value: 'luxury-brand', label: 'Luxury Brand' },
      { value: 'premium-co', label: 'Premium Co.' },
      { value: 'elite-fashion', label: 'Elite Fashion' },
      { value: 'exclusive-studio', label: 'Exclusive Studio' },
    ]
  },
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'draft', label: 'Draft' },
      { value: 'archived', label: 'Archived' },
    ]
  },
  {
    key: 'priceRange',
    label: 'Price Range',
    options: [
      { value: '0-100', label: '$0 - $100' },
      { value: '100-500', label: '$100 - $500' },
      { value: '500-1000', label: '$500 - $1,000' },
      { value: '1000+', label: '$1,000+' },
    ]
  }
];

export const Default: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {
    placeholder: 'Search products...',
    filters: [],
  },
};

export const WithFilters: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {
    placeholder: 'Search luxury items...',
    filters: sampleFilters,
  },
};

export const ManyFilters: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {
    placeholder: 'Search with advanced filters...',
    filters: [
      ...sampleFilters,
      {
        key: 'material',
        label: 'Material',
        options: [
          { value: 'leather', label: 'Leather' },
          { value: 'silk', label: 'Silk' },
          { value: 'cashmere', label: 'Cashmere' },
          { value: 'wool', label: 'Wool' },
          { value: 'cotton', label: 'Cotton' },
        ]
      },
      {
        key: 'season',
        label: 'Season',
        options: [
          { value: 'spring', label: 'Spring' },
          { value: 'summer', label: 'Summer' },
          { value: 'autumn', label: 'Autumn' },
          { value: 'winter', label: 'Winter' },
        ]
      },
    ],
  },
};

export const FastDebounce: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {
    placeholder: 'Fast search (100ms debounce)...',
    debounceMs: 100,
    filters: sampleFilters,
  },
};

export const SlowDebounce: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {
    placeholder: 'Slow search (1000ms debounce)...',
    debounceMs: 1000,
    filters: sampleFilters,
  },
};

export const LuxuryTheme: Story = {
  render: (args) => (
    <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 p-6 rounded-lg border border-amber-200/20">
      <SearchBarWrapper {...args} />
    </div>
  ),
  args: {
    placeholder: 'Search our exclusive collection...',
    filters: sampleFilters,
  },
  parameters: {
    docs: {
      description: {
        story: 'Luxury-themed search bar with golden gradient background.',
      },
    },
  },
};

export const Responsive: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {
    placeholder: 'Responsive search...',
    filters: sampleFilters,
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

export const NoFilters: Story = {
  render: (args) => <SearchBarWrapper {...args} />,
  args: {
    placeholder: 'Simple search without filters...',
    filters: [],
  },
};

export const WithActiveFilters: Story = {
  render: (args) => {
    const [hasActiveFilters, setHasActiveFilters] = useState(false);
    
    return (
      <div className="space-y-4">
        <AdminSearchBar
          {...args}
          onSearch={(term) => {
            args.onSearch?.(term);
          }}
          onFilterChange={(filters) => {
            const hasActive = Object.values(filters).some(value => value !== '');
            setHasActiveFilters(hasActive);
            args.onFilterChange?.(filters);
          }}
        />
        <div className="p-4 bg-muted/20 rounded-lg text-sm">
          <p><strong>Has Active Filters:</strong> {hasActiveFilters ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Search with pre-selected filters...',
    filters: sampleFilters.map(filter => ({
      ...filter,
      defaultValue: filter.options[0].value
    })),
  },
};
