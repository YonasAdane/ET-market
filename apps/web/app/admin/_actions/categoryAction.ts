"use server"
import { CategoryType } from '@repo/database/index';
import { db } from 'app/lib/config/prisma-config';
import { uploadToCloudinary } from 'app/lib/config/uploadtoCloud';
import { getErrorMessage } from 'app/lib/get-error-message';
import { revalidatePath } from 'next/cache';
import { categorySchema } from '../_components/form-elements/add-category';

async function uploadImageToCloudinary(image: File, folder: string) {
    try {
        const uploadResult = await uploadToCloudinary(image, folder);
        return await db.image.create({
            data: {
                publicId: uploadResult.public_id,
                url: uploadResult.secure_url,
            }
        });
    } catch (error) {
        console.log("Image upload failed: ",error);
        
        // throw new Error("Image upload failed");
    }
}


export async function createCategory(formData: FormData) {
  try {
    // read text fields
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const categoryType = formData.get('categoryType') as CategoryType

    // read files
    const bannerImage = formData.get('bannerImage') as File
    const sampleImages = formData.getAll('sampleImages') as File[]

    if (!bannerImage || bannerImage.size === 0) throw new Error('Banner image required')
    if (!name) throw new Error('Category name required')
    const existing = await db.category.findUnique({ where: { name } })
    if (existing) throw new Error('Category already exists')

    const uploadedBanner = await uploadImageToCloudinary(bannerImage, 'category_banners')
    const uploadedSamples = await Promise.all(
      sampleImages.map(f => uploadImageToCloudinary(f, 'category_samples'))
    )

    const category = await db.category.create({
      data: {
        categoryType,
        name,
        description,
        bannerImageId: uploadedBanner?.id,
        sampleImages: { connect: uploadedSamples.map(img => ({ id: img!.id })) },
      },
    })

    revalidatePath('/categories')
    return { success: true, category }
  } catch (err) {
    return { success: false, error: getErrorMessage(err) }
  }
}

interface CategoryQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryType?: CategoryType;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export async function getCategories(params: CategoryQueryParams = {}) {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = '',
      categoryType,
      sortBy = 'createdAt',
      sortOrder = 'desc'
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

    // Category type filter
    if (categoryType) {
      where.categoryType = categoryType;
    }

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Execute queries in parallel
    const [categories, totalCount] = await Promise.all([
      db.category.findMany({
        where,
        include: { 
          bannerImage: true, 
          sampleImages: true,
          _count: {
            select: { products: true },
          },
        },
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

export async function getCategoryByType(categoryType:CategoryType) {
    const category= await db.category.findMany({where:{products:{some:{categoryType}}} });
    return category;

}


export async function getCategoryById(id: number) {
  try {
    if (!id) {
      return { success: false, error: "Category ID is required" };
    }

    const category = await db.category.findUnique({ 
      where: { id }, 
      include: { 
        bannerImage: true, 
        sampleImages: true,
        _count: {
          select: { products: true }
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

    const category = await db.category.findUnique({ where: { id } });
    if (!category) {
      return { success: false, error: "Category not found" };
    }

    // Handle banner image update if provided
    let uploadedBannerImage = category.bannerImageId;
    if (updateData.bannerImage) {
      const bannerImage = await uploadImageToCloudinary(updateData.bannerImage, "category_banners");
      uploadedBannerImage = bannerImage?.id ?? null;
    }

    // Handle sample images if provided
    let uploadedCategorySampleImages: any[] = [];
    if (updateData.categorySampleImage && updateData.categorySampleImage.length > 0) {
      uploadedCategorySampleImages = await Promise.all(
        updateData.categorySampleImage.map((img: File) => uploadImageToCloudinary(img, "category_samples"))
      );
    }

    // Prepare update payload
    const updatePayload: any = {
      name: updateData.name,
      description: updateData.description,
      categoryType: updateData.categoryType,
    };

    if (uploadedBannerImage !== category.bannerImageId) {
      updatePayload.bannerImageId = uploadedBannerImage;
    }

    if (uploadedCategorySampleImages.length > 0) {
      updatePayload.sampleImages = {
        connect: uploadedCategorySampleImages.map((img: any) => ({ id: img.id }))
      };
    }

    const updatedCategory = await db.category.update({
      where: { id },
      data: updatePayload,
      include: { 
        bannerImage: true, 
        sampleImages: true,
        _count: {
          select: { products: true }
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

    // First, get the category with all related images
    const category = await db.category.findUnique({
      where: { id },
      include: { bannerImage: true, sampleImages: true }
    });

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    // Check if category has products
    const productCount = await db.product.count({ 
      where: { 
        category: {
          some: { id: id }
        }
      } 
    });
    
    if (productCount > 0) {
      return { 
        success: false, 
        error: `Cannot delete category. It has ${productCount} associated product(s). Please remove or reassign products first.` 
      };
    }

    // Delete associated images from database (Cloudinary cleanup would be handled separately)
    const imageIds = [
      category.bannerImageId,
      ...category.sampleImages.map(img => img.id)
    ].filter(Boolean);

    if (imageIds.length > 0) {
      await db.image.deleteMany({
        where: { id: { in: imageIds as number[] } }
      });
    }

    // Delete the category
    const deletedCategory = await db.category.delete({ where: { id } });
    
    revalidatePath('/admin/categories');
    return { success: true, data: deletedCategory };

  } catch (error: any) {
    console.error("Error deleting category:", error);
    return { 
      success: false, 
      error: "Failed to delete category. Please try again." 
    };
  }
}
