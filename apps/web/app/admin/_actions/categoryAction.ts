"use server"
import { db } from 'app/lib/config/prisma-config';
import { uploadToCloudinary } from 'app/lib/config/uploadtoCloud';
import { getErrorMessage } from 'app/lib/get-error-message';
import { revalidatePath } from 'next/cache';

// Types based on your Prisma schema
interface VariantData {
  name: string;
  values: string[];
}

interface CategoryFormData {
  name: string;
  description?: string;
  parentId?: number;
  variants: VariantData[];
}

async function uploadImageToCloudinary(image: File, folder: string) {
    try {
        const uploadResult = await uploadToCloudinary(image, folder);
        return await db.image.create({
            data: {
                publicId: uploadResult.public_id,
                url: uploadResult.secure_url,
                type: folder === 'category_banners' ? 'CATEGORY_BANNER' : 'CATEGORY_SAMPLE',
                // Set altText, width, height, size if available from uploadResult
                altText: `Category ${folder} image`,
            }
        });
    } catch (error) {
        console.log("Image upload failed: ", error);
        throw new Error("Image upload failed");
    }
}

export async function createCategoryWithVariants(formData: FormData) {
  try {
    // Read basic category fields
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const parentId = formData.get('parentId') ? parseInt(formData.get('parentId') as string) : undefined;

    // Read variant data - you'll need to parse this from your form structure
    const variantsData = JSON.parse(formData.get('variants') as string) as VariantData[];

    // Read files
    const bannerImage = formData.get('bannerImage') as File;
    const sampleImages = formData.getAll('sampleImages') as File[];

    if (!name) throw new Error('Category name is required');
    
    // Check if category already exists
    const existing = await db.category.findUnique({ where: { name } });
    if (existing) throw new Error('Category already exists');

    // Validate parent category if provided
    if (parentId) {
      const parentCategory = await db.category.findUnique({ where: { id: parentId } });
      if (!parentCategory) throw new Error('Parent category not found');
    }

    const result = await db.$transaction(async (tx) => {
      // Upload banner image if provided
      let uploadedBanner = null;
      if (bannerImage && bannerImage.size > 0) {
        uploadedBanner = await uploadImageToCloudinary(bannerImage, 'category_banners');
      }

      // Upload sample images if provided
      const uploadedSamples = await Promise.all(
        sampleImages
          .filter(img => img.size > 0)
          .map(img => uploadImageToCloudinary(img, 'category_samples'))
      );

      // Create the category
      const category = await tx.category.create({
        data: {
          name,
          description,
          parentId: parentId || null,
          images: {
            connect: [
              ...(uploadedBanner ? [{ id: uploadedBanner.id }] : []),
              ...uploadedSamples.map(img => ({ id: img.id }))
            ].filter(Boolean)
          },
        },
      });

      // Create variants and their values
      for (const variantData of variantsData) {
        const variant = await tx.variant.create({
          data: {
            name: variantData.name,
            categoryId: category.id,
          },
        });

        // Create values for each variant
        for (const valueName of variantData.values) {
          await tx.values.create({
            data: {
              value: valueName.trim(),
              variantId: variant.id,
            },
          });
        }
      }

      return category;
    });

    revalidatePath('/admin/categories');
    return { success: true, data: result };
  } catch (err) {
    console.error('Error creating category:', err);
    return { success: false, error: getErrorMessage(err) };
  }
}

interface CategoryQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  includeVariants?: boolean;
}

export async function getCategories(params: CategoryQueryParams = {}) {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      includeVariants = false
    } = params;

    const skip = (page - 1) * pageSize;
    const where: any = {};

    // Search functionality
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Include relations based on parameters
    const include: any = {
      images: true,
      parentCategory: {
        select: {
          id: true,
          name: true
        }
      },
      childCategory: {
        select: {
          id: true,
          name: true
        }
      },
      _count: {
        select: { 
          products: true,
          variants: true 
        },
      },
    };

    if (includeVariants) {
      include.variants = {
        include: {
          values: true
        }
      };
    }

    // Execute queries in parallel
    const [categories, totalCount] = await Promise.all([
      db.category.findMany({
        where,
        include,
        orderBy,
        skip,
        take: pageSize,
      }),
      db.category.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      success: true,
      data: categories,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        pageSize,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };

  } catch (error: any) {
    console.error("Error fetching categories:", error);
    
    if (error?.message?.includes("Can't reach database") || error.code === "ECONNREFUSED") {
      return { 
        success: false,
        type: "network", 
        error: "Unable to connect to the database. Please check your network connection." 
      };
    }

    return { 
      success: false,
      type: "other", 
      error: "Something went wrong while fetching categories. Please try again later." 
    };
  }
}

export async function getCategoryById(id: number) {
  try {
    if (!id) {
      return { success: false, error: "Category ID is required" };
    }

    const category = await db.category.findUnique({ 
      where: { id }, 
      include: { 
        images: true,
        parentCategory: {
          select: {
            id: true,
            name: true
          }
        },
        childCategory: {
          select: {
            id: true,
            name: true
          }
        },
        variants: {
          include: {
            values: true
          }
        },
        _count: {
          select: { 
            products: true,
            variants: true 
          }
        }
      } 
    });

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    return { success: true, data: category };
  } catch (error: any) {
    console.error("Error fetching category:", error);
    return { success: false, error: "Failed to fetch category" };
  }
}

export async function updateCategory(id: number, updateData: any) {
  try {
    if (!id) {
      return { success: false, error: "Category ID is required" };
    }

    const category = await db.category.findUnique({ 
      where: { id },
      include: { images: true }
    });
    
    if (!category) {
      return { success: false, error: "Category not found" };
    }

    // Handle images update
    let uploadedImages: any[] = [];
    
    if (updateData.bannerImage && updateData.bannerImage.size > 0) {
      const bannerImage = await uploadImageToCloudinary(updateData.bannerImage, "category_banners");
      uploadedImages.push(bannerImage);
    }

    if (updateData.sampleImages && updateData.sampleImages.length > 0) {
      const sampleImages = await Promise.all(
        updateData.sampleImages
          .filter((img: File) => img.size > 0)
          .map((img: File) => uploadImageToCloudinary(img, "category_samples"))
      );
      uploadedImages.push(...sampleImages);
    }

    // Prepare update payload
    const updatePayload: any = {
      name: updateData.name,
      description: updateData.description,
      parentId: updateData.parentId || null,
    };

    // Connect new images if any were uploaded
    if (uploadedImages.length > 0) {
      updatePayload.images = {
        connect: uploadedImages.map(img => ({ id: img.id }))
      };
    }

    const updatedCategory = await db.category.update({
      where: { id },
      data: updatePayload,
      include: { 
        images: true,
        parentCategory: {
          select: {
            id: true,
            name: true
          }
        },
        variants: {
          include: {
            values: true
          }
        },
        _count: {
          select: { 
            products: true,
            variants: true 
          }
        }
      }
    });

    revalidatePath('/admin/categories');
    return { success: true, data: updatedCategory };

  } catch (error: any) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category. Please try again." };
  }
}

export async function deleteCategory(id: number) {
  try {
    if (!id) {
      return { success: false, error: "Category ID is required" };
    }

    // First, get the category with all related data
    const category = await db.category.findUnique({
      where: { id },
      include: { 
        images: true,
        variants: {
          include: {
            values: {
              include: {
                variationValues: true
              }
            }
          }
        },
        childCategory: true
      }
    });

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    // Check if category has child categories
    if (category.childCategory.length > 0) {
      return { 
        success: false, 
        error: `Cannot delete category. It has ${category.childCategory.length} sub-categories. Please delete or reassign them first.` 
      };
    }

    // Check if category has products
    const productCount = await db.product.count({ 
      where: { 
        categoryId: id
      } 
    });
    
    if (productCount > 0) {
      return { 
        success: false, 
        error: `Cannot delete category. It has ${productCount} associated product(s). Please remove or reassign products first.` 
      };
    }

    // Check if variants are used in product items
    let variantUsageError = false;
    for (const variant of category.variants) {
      for (const value of variant.values) {
        if (value.variationValues.length > 0) {
          variantUsageError = true;
          break;
        }
      }
      if (variantUsageError) break;
    }

    if (variantUsageError) {
      return { 
        success: false, 
        error: "Cannot delete category. Some variants are being used in product items." 
      };
    }

    // Use transaction for atomic deletion
    await db.$transaction(async (tx) => {
      // Delete variant values
      for (const variant of category.variants) {
        await tx.values.deleteMany({
          where: { variantId: variant.id }
        });
      }

      // Delete variants
      await tx.variant.deleteMany({
        where: { categoryId: id }
      });

      // Delete associated images
      if (category.images.length > 0) {
        await tx.image.deleteMany({
          where: { id: { in: category.images.map(img => img.id) } }
        });
      }

      // Delete the category
      await tx.category.delete({ where: { id } });
    });

    revalidatePath('/admin/categories');
    return { success: true, message: 'Category deleted successfully' };

  } catch (error: any) {
    console.error("Error deleting category:", error);
    
    if (error.code === 'P2003') {
      return { 
        success: false, 
        error: "Cannot delete category due to existing references. Please remove all associated data first." 
      };
    }
    
    return { 
      success: false, 
      error: "Failed to delete category. Please try again." 
    };
  }
}

// Additional utility functions
export async function getParentCategories() {
  try {
    const categories = await db.category.findMany({
      where: {
        parentId: null
      },
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return { success: true, data: categories };
  } catch (error: any) {
    console.error("Error fetching parent categories:", error);
    return { success: false, error: "Failed to fetch parent categories" };
  }
}

export async function updateCategoryVariants(categoryId: number, variants: VariantData[]) {
  try {
    if (!categoryId) {
      return { success: false, error: "Category ID is required" };
    }

    const result = await db.$transaction(async (tx) => {
      // Get existing variants
      const existingVariants = await tx.variant.findMany({
        where: { categoryId },
        include: { values: true }
      });

      // Delete existing variants and values
      for (const variant of existingVariants) {
        await tx.values.deleteMany({
          where: { variantId: variant.id }
        });
        await tx.variant.delete({
          where: { id: variant.id }
        });
      }

      // Create new variants and values
      for (const variantData of variants) {
        const variant = await tx.variant.create({
          data: {
            name: variantData.name,
            categoryId: categoryId,
          },
        });

        for (const valueName of variantData.values) {
          await tx.values.create({
            data: {
              value: valueName.trim(),
              variantId: variant.id,
            },
          });
        }
      }

      return true;
    });

    revalidatePath('/admin/categories');
    return { success: true, message: 'Variants updated successfully' };

  } catch (error: any) {
    console.error("Error updating variants:", error);
    return { success: false, error: "Failed to update variants" };
  }
}