import type { Meta, StoryObj } from '@storybook/react';
import AdminPagination from '@repo/ui/components/admin/AdminPagination';
import { useState } from 'react';

const meta: Meta<typeof AdminPagination> = {
  title: 'Admin/AdminPagination',
  component: AdminPagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A sophisticated pagination component for admin tables with luxury styling and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Current active page number',
    },
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages',
    },
    totalCount: {
      control: { type: 'number', min: 0, max: 10000 },
      description: 'Total number of items',
    },
    pageSize: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Number of items per page',
    },
    showPageSizeSelector: {
      control: 'boolean',
      description: 'Show page size selector',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component
function PaginationWrapper(props: any) {
  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
  const [pageSize, setPageSize] = useState(props.pageSize || 10);

  return (
    <AdminPagination
      {...props}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={(page) => {
        setCurrentPage(page);
        console.log('Page changed to:', page);
      }}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setCurrentPage(1); // Reset to first page
        console.log('Page size changed to:', size);
      }}
    />
  );
}

export const Default: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    totalCount: 95,
    pageSize: 10,
  },
};

export const MiddlePage: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    totalCount: 95,
    pageSize: 10,
  },
};

export const LastPage: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 10,
    totalPages: 10,
    totalCount: 95,
    pageSize: 10,
  },
};

export const ManyPages: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 25,
    totalPages: 50,
    totalCount: 495,
    pageSize: 10,
  },
};

export const FewItems: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 5,
    pageSize: 10,
  },
};

export const LargePageSize: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
    totalCount: 100,
    pageSize: 20,
  },
};

export const WithoutPageSizeSelector: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 3,
    totalPages: 8,
    totalCount: 75,
    pageSize: 10,
    showPageSizeSelector: false,
  },
};

export const LuxuryTheme: Story = {
  render: (args) => (
    <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 p-6 rounded-lg border border-amber-200/20">
      <PaginationWrapper {...args} />
    </div>
  ),
  args: {
    currentPage: 3,
    totalPages: 12,
    totalCount: 115,
    pageSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Luxury-themed pagination with golden gradient background.',
      },
    },
  },
};

export const Responsive: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 15,
    totalPages: 30,
    totalCount: 295,
    pageSize: 10,
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

export const CustomPageSizes: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 20,
    totalCount: 200,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100],
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with custom page size options.',
      },
    },
  },
};
