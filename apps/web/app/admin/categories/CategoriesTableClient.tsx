'use client';

import { Badge } from '@repo/ui/components/ui/badge';
import { useToast } from '@repo/ui/hooks/use-toast';
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
  type: string;
};

export type CategorySerializable = {
  id: number;
  name: string;
  description: string | null;
  parentId: number | null;
  images: SerializableImage[];
  variants: Array<{
    id: number;
    name: string;
    values: Array<{
      id: number;
      value: string;
    }>;
  }>;
  parentCategory?: {
    id: number;
    name: string;
  } | null;
  childCategory: Array<{
    id: number;
    name: string;
  }>;
  _count: { 
    products: number;
    variants: number;
  };
  createdAt: string;
  updatedAt: string;
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
  };
}

export default function CategoriesTableClient({ 
  categories, 
  pagination,
  searchParams 
}: CategoriesTableClientProps) {
  const router = useRouter();
  const { toast } = useToast();

  // ✅ Memoize callbacks
  const handleEdit = useCallback((id: number) => {
    router.push(`/admin/categories/edit/${id}`);
  }, [router]);

  const handleView = useCallback((id: number) => {
    router.push(`/categories/${id}`);
  }, [router]);

  const handleDelete = useCallback(
    async (id: number, name: string) => {
      if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;
      
      try {
        const res = await deleteCategory(id);
        if (!res.success) {
          toast({
            title: "Error",
            description: res.error || "Failed to delete category",
            variant: "destructive"
          });
          return;
        }
        
        toast({
          title: "Success",
          description: res.message || "Category deleted successfully"
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

  // Helper function to get banner image
  const getBannerImage = useCallback((category: CategorySerializable) => {
    return category.images.find(img => img.type === 'CATEGORY_BANNER');
  }, []);

  // Helper function to get sample images
  const getSampleImages = useCallback((category: CategorySerializable) => {
    return category.images.filter(img => img.type === 'CATEGORY_SAMPLE');
  }, []);

  // ✅ Memoize columns with proper typing
  const columns: AdminColumnDef<CategorySerializable>[] = useMemo(
    () => [
      {
        key: 'banner',
        header: 'Banner',
        cell: (value: any, category: CategorySerializable) => {
          const bannerImage = getBannerImage(category);
          return (
            <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              {bannerImage ? (
                <Image
                  src={bannerImage.url}
                  alt={`${category.name} banner`}
                  fill
                  className="object-cover transition-transform duration-200 hover:scale-105"
                  sizes="80px"
                />
              ) : (
                <span className="text-xs text-muted-foreground">No banner</span>
              )}
            </div>
          );
        },
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
              {category.parentCategory && (
                <Badge variant="outline" className="text-xs">
                  Child of: {category.parentCategory.name}
                </Badge>
              )}
              {category.childCategory.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {category.childCategory.length} sub-categories
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {category._count?.products ?? 0} products
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {category._count?.variants ?? 0} variants
              </Badge>
            </div>
          </div>
        ),
        className: 'min-w-64',
      },
      {
        key: 'variants',
        header: 'Variants',
        cell: (value: any, category: CategorySerializable) => (
          <div className="space-y-1">
            {category.variants.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {category.variants.slice(0, 3).map((variant) => (
                  <div key={variant.id} className="space-y-1">
                    <Badge variant="outline" className="text-xs font-medium">
                      {variant.name}
                    </Badge>
                    <div className="flex flex-wrap gap-1">
                      {variant.values.slice(0, 2).map((value) => (
                        <span key={value.id} className="text-xs text-muted-foreground">
                          {value.value}
                          {/* {variant.values.length > 2 && value.id === variant.values[1].id && '...'} */}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {category.variants.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{category.variants.length - 3} more
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">No variants</span>
            )}
          </div>
        ),
        className: 'w-48',
      },
      {
        key: 'sampleImages',
        header: 'Samples',
        cell: (value: any, category: CategorySerializable) => {
          const sampleImages = getSampleImages(category);
          return (
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {sampleImages.length} samples
              </Badge>
              {sampleImages.length > 0 && (
                <div className="flex -space-x-2">
                  {sampleImages.slice(0, 3).map((image, index) => (
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
                  {sampleImages.length > 3 && (
                    <div className="relative w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                      <span className="text-xs">+{sampleImages.length - 3}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        },
        className: 'w-32',
      },
      {
        key: 'createdAt',
        header: 'Created',
        sortable: true,
        cell: (value: any, category: CategorySerializable) => (
          <div className="text-sm text-muted-foreground">
            {new Date(category.createdAt).toLocaleDateString()}
          </div>
        ),
        className: 'w-24',
      },
      {
        key: 'actions',
        header: 'Actions',
        cell: (value: any, category: CategorySerializable) => (
          <AdminActionButton
            onEdit={() => handleEdit(category.id)}
            onDelete={() => handleDelete(category.id, category.name)}
            onView={() => handleView(category.id)}
            // deleteDisabled={category._count?.products > 0 || category.childCategory.length > 0}
            // deleteTooltip={
            // category._count?.products > 0
            // ? `Cannot delete: ${category._count.products} products exist`
            // : category.childCategory.length > 0
            // ? `Cannot delete: ${category.childCategory.length} sub-categories exist`
            // : undefined
            // }
          />
        ),
        className: 'w-20',
      },
    ],
    [handleEdit, handleView, handleDelete, getBannerImage, getSampleImages]
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

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(window.location.search);
      params.set('page', page.toString());
      router.push(`/admin/categories?${params.toString()}`);
    },
    [router]
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      const params = new URLSearchParams(window.location.search);
      params.set('pageSize', pageSize.toString());
      params.set('page', '1'); // Reset to first page when changing page size
      router.push(`/admin/categories?${params.toString()}`);
    },
    [router]
  );

  const currentSearch = searchParams?.search || '';

  return (
    <div className="space-y-6">
      <AdminSearchBar
        onSearch={handleSearch}
        placeholder="Search categories by name or description..."
        // defaultValue={currentSearch}
      />

      <div className="pt-6">
        <AdminTable
          data={categories}
          columns={columns}
          cardTitle="Categories"
          cardDescription="Your product categorization system"
          emptyMessage={currentSearch ? (
            "No categories found matching your search terms. Try adjusting your search."
          ) : (
            "No categories found. Create your first category to get started."
          )}
          // emptyMessage={
          //   <div className="text-center py-8 space-y-2">
          //     <p className="text-muted-foreground">No categories found</p>
          //     {currentSearch ? (
          //       <p className="text-sm text-muted-foreground">
          //         Try adjusting your search terms
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
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Summary Stats */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Total Categories:</span>
            <span className="font-medium">{pagination?.totalCount || categories.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Showing:</span>
            <span className="font-medium">{categories.length}</span>
          </div>
          {pagination && (
            <>
              <div className="flex items-center gap-1">
                <span>Page:</span>
                <span className="font-medium">
                  {pagination.currentPage} of {pagination.totalPages}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>Page Size:</span>
                <span className="font-medium">{pagination.pageSize}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}