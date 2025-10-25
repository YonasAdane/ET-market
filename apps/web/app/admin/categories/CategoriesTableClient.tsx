'use client';

import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import AdminActionButton from '@repo/ui/components/admin/AdminActionButton';
import AdminPagination from '@repo/ui/components/admin/AdminPagination';
import AdminSearchBar from '@repo/ui/components/admin/AdminSearchBar';
import AdminTable from '@repo/ui/components/admin/AdminTable';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { deleteCategory } from '../_actions/categoryAction';
import { AdminColumnDef } from '@repo/ui/components/admin/AdminTable';

type SerializableImage = { 
  id: number; 
  url: string; 
  publicId: string;
};

type SerializableBanner = { 
  id: number;
  url: string; 
  publicId: string;
} | null;

export type CategorySerializable = {
  id: number;
  name: string;
  description: string | null;
  categoryType: string;
  bannerImage?: SerializableBanner | null;
  sampleImages: SerializableImage[];
  _count: { 
    products: number;
  };
};

interface CategoriesTableClientProps {
  categories: CategorySerializable[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  searchParams?: {
    search?: string;
    page?: string;
    categoryType?: string;
  };
}

export default function CategoriesTableClient({ 
  categories, 
  pagination,
  searchParams 
}: CategoriesTableClientProps) {
  const router = useRouter();
  const { toast } = useToast();
<<<<<<< HEAD
  console.log({categories})
=======

>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
  // ✅ Memoize callbacks
  const handleEdit = useCallback((id: number) => {
    router.push(`/admin/categories/edit/${id}`);
  }, [router]);

  const handleView = useCallback((id: number) => {
    router.push(`/categories/${id}`);
  }, [router]);

  const handleDelete = useCallback(
    async (id: number, name: string) => {
      if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
      try {
        const res = await deleteCategory(id);
        if (res.error) {
          toast({
            title: "Error",
            description: res.error,
            variant: "destructive"
          });
          return;
        }
        toast({
          title: "Success",
          description: "Category deleted successfully"
        });
        router.refresh();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete category",
          variant: "destructive"
        });
      }
    },
    [router, toast]
  );

  // ✅ Memoize columns with proper typing
  const columns: AdminColumnDef<CategorySerializable>[] = useMemo(
    () => [
      {
        key: 'banner',
        header: 'Banner',
        cell: (value: any, category: CategorySerializable) => (
          <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            {category?.bannerImage ? (
              <Image
                src={category.bannerImage.url}
                alt={`${category.name} banner`}
                fill
                className="object-cover transition-transform duration-200 hover:scale-105"
                sizes="80px"
              />
            ) : (
              <span className="text-xs text-muted-foreground">No banner</span>
            )}
          </div>
        ),
        className: 'w-24',
      },
      {
        key: 'name',
        header: 'Category',
        sortable: true,
        cell: (value: any, category: CategorySerializable) => (
          <div className="space-y-1">
            <p className="font-medium">{category.name}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description || 'No description'}
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs uppercase">
                {category.categoryType}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {category._count?.products ?? 0} products
              </Badge>
            </div>
          </div>
        ),
        className: 'min-w-64',
      },
      {
        key: 'sampleImages',
        header: 'Sample Images',
        cell: (value: any, category: CategorySerializable) => (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {category.sampleImages.length} samples
            </Badge>
            {category.sampleImages.length > 0 && (
              <div className="flex -space-x-2">
                {category.sampleImages.slice(0, 3).map((image, index) => (
                  <div key={image.id} className="relative w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                    <Image
                      src={image.url}
                      alt={`Sample ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  </div>
                ))}
                {category.sampleImages.length > 3 && (
                  <div className="relative w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                    <span className="text-xs">+{category.sampleImages.length - 3}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ),
        className: 'w-40',
      },
      {
        key: 'actions',
        header: 'Actions',
        cell: (value: any, category: CategorySerializable) => (
          <AdminActionButton
            onEdit={() => handleEdit(category.id)}
            onDelete={() => handleDelete(category.id, category.name)}
            onView={() => handleView(category.id)}
          />
        ),
        className: 'w-20',
      },
    ],
    [handleEdit, handleView, handleDelete]
  );

  // ✅ Memoize filter options (static)
  const filterOptions = useMemo(
    () => [
      {
        key: 'categoryType',
        label: 'Category Type',
        options: [
          { value: 'CLOTHING', label: 'Clothing' },
          { value: 'FOOTWEAR', label: 'Footwear' },
          { value: 'ACCESSORY', label: 'Accessory' },
          { value: 'BAG', label: 'Bag' },
          { value: 'OUTERWEAR', label: 'Outerwear' },
          { value: 'WATCH', label: 'Watch' },
          { value: 'UNDERWEAR', label: 'Underwear' },
        ],
      },
    ],
    []
  );

  // ✅ Memoize search & filter handlers
  const handleSearch = useCallback(
    (searchTerm: string) => {
      const params = new URLSearchParams(window.location.search);
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); // Reset to first page on new search
      router.push(`/admin/categories?${params.toString()}`);
    },
    [router]
  );

  const handleFilterChange = useCallback(
    (filters: Record<string, string>) => {
      const params = new URLSearchParams(window.location.search);
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      params.set('page', '1'); // Reset to first page on filter change
      router.push(`/admin/categories?${params.toString()}`);
    },
    [router]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(window.location.search);
      params.set('page', page.toString());
      router.push(`/admin/categories?${params.toString()}`);
    },
    [router]
  );

  // Get current filters from search params
  const currentFilters = useMemo(() => {
    const filters: Record<string, string> = {};
    if (searchParams?.categoryType) {
      filters.categoryType = searchParams.categoryType;
    }
    return filters;
  }, [searchParams]);

  const currentSearch = searchParams?.search || '';

  return (
    <div className="space-y-6">
      <AdminSearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        placeholder="Search categories by name..."
        filters={filterOptions}
        // initialSearch={currentSearch}
        // initialFilters={currentFilters}
      />

      <div className="pt-6">
        <AdminTable
          data={categories}
          columns={columns}
          cardTitle="Categories"
          cardDescription="Your product categorization system"
          // emptyMessage={
          //   <div className="text-center py-8 space-y-2">
          //     <p className="text-muted-foreground">No categories found</p>
          //     {currentSearch || Object.keys(currentFilters).length > 0 ? (
          //       <p className="text-sm text-muted-foreground">
          //         Try adjusting your search or filters
          //       </p>
          //     ) : (
          //       <p className="text-sm text-muted-foreground">
          //         Create your first category to get started
          //       </p>
          //     )}
          //   </div>
          // }
        />
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <AdminPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalCount={pagination.totalCount}
            pageSize={pagination.pageSize}
            onPageSizeChange={(size: number) => {

            }}
            // hasNextPage={pagination.hasNextPage}
            // hasPrevPage={pagination.hasPrevPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Summary Stats */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Total:</span>
            <span className="font-medium">{pagination?.totalCount || categories.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Showing:</span>
            <span className="font-medium">{categories.length}</span>
          </div>
          {pagination && (
            <div className="flex items-center gap-1">
              <span>Page:</span>
              <span className="font-medium">
                {pagination.currentPage} of {pagination.totalPages}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}