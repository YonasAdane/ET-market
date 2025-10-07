"use server"

import { CategoryType } from '@repo/database/index';
import { db } from 'app/lib/config/prisma-config';
import { uploadToCloudinary } from 'app/lib/config/uploadtoCloud';
import { getErrorMessage } from 'app/lib/get-error-message';
import { revalidatePath } from 'next/cache';
import z from 'zod';

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
        throw new Error("Image upload failed");
    }
}
const MAX = 5_000_000;
const ACCEPT = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z
  .instanceof(File)
  .refine((f) => f.size <= MAX, "Max 5 MB")
  .refine((f) => ACCEPT.includes(f.type), "Only JPG PNG WEBP");

const createBrandFdSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  bannerImages: z.array(fileSchema),
  brandImages: z.array(fileSchema),
  logoImage: fileSchema.optional(),
});

/* -------------------------------------------------
   Helper – upload 1 file and return DB record
-------------------------------------------------- */
async function saveFile(f: File, folder: string) {
  const { secure_url, public_id } = await uploadToCloudinary(f, folder);
  return db.image.create({ data: { url: secure_url, publicId: public_id } });
}
export async function createBrand(prev: unknown, fd: FormData) {
  try {
    /* parse FormData ------------------------------------------------ */
    const parsed = createBrandFdSchema.safeParse({
      name: fd.get("name"),
      description: fd.get("description") || undefined,
      bannerImages: fd.getAll("bannerImages"),
      brandImages: fd.getAll("brandImages"),
      logoImage: fd.get("logoImage") || undefined,
    });

    if (!parsed.success)
      return { error: parsed.error.errors.map((e) => e.message).join(", ") };

    const { name, description, bannerImages, brandImages, logoImage } =
      parsed.data;

    /* upload all images in parallel --------------------------------- */
    const [logoRec, bannerRecs, brandRecs] = await Promise.all([
      logoImage ? saveFile(logoImage, "brand_logos") : null,
      Promise.all(bannerImages.map((f) => saveFile(f, "banner-images"))),
      Promise.all(brandImages.map((f) => saveFile(f, "brand-images"))),
    ]);

    /* create brand --------------------------------------------------- */
    const brand = await db.brand.create({
      data: {
        name,
        description,
        logoImage: logoRec ? { connect: { id: logoRec.id } } : undefined,
        BannerImage: { connect: bannerRecs.map((r) => ({ id: r.id })) },
        brandImage: { connect: brandRecs.map((r) => ({ id: r.id })) },
      },
    });

    revalidatePath("/brands");
    revalidatePath("/admin/brands");
    return { success: true, brandId: brand.id };
  } catch (e: any) {
    return { error: e.message || "Unknown server error" };
  }
}
interface BrandQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export async function getBrands(params: BrandQueryParams = {}) {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = '',
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

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Execute queries in parallel
    const [brands, totalCount] = await Promise.all([
      db.brand.findMany({
        where,
        include: { 
          logoImage: true, 
          BannerImage: true, 
          brandImage: true,
          _count: {
            select: { products: true },
          }
        },
        orderBy,
        skip,
        take: pageSize,
      }),
      db.brand.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      success: true,
      // data: brands,
      data: brands.map(brand => ({
        ...brand,
        createdAt: brand.createdAt.toISOString(), // if it's a Date
        updatedAt:brand.updatedAt.toISOString()
      })),
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
    console.error("Error fetching brands:", error);
    
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
      error: getErrorMessage(error)
      // "Something went wrong while fetching brands. Please try again later." 
    };
  }
}

export async function getBrandById(id: number) {
  try {
    if (!id) {
      return { success: false, error: "Brand ID is required" };
    }

    const brand = await db.brand.findUnique({ 
      where: { id }, 
      include: { 
        logoImage: true, 
        BannerImage: true,
        brandImage: true,
        _count: {
          select: { products: true }
        }
      } 
    });

    if (!brand) {
      return { success: false, error: "Brand not found" };
    }

    return { success: true, data: brand };
  } catch (error: any) {
    console.error("Error fetching brand:", error);
    return { success: false, error: "Failed to fetch brand" };
  }
}

export async function updateBrand(id: number, updateData: any) {
  try {
    if (!id) {
      return { success: false, error: "Brand ID is required" };
    }

    const brand = await db.brand.findUnique({ where: { id } });
    if (!brand) {
      return { success: false, error: "Brand not found" };
    }

    // Handle logo update if provided
    let uploadedLogo = brand.brandLogoId;
    if (updateData.logo) {
      const logoImage = await uploadImageToCloudinary(updateData.logo, "brand_logos");
      uploadedLogo = logoImage.id;
    }

    // Handle banner images if provided
    let uploadedBannerImages = undefined;
    if (updateData.BannerImage && updateData.BannerImage.length > 0) {
      uploadedBannerImages = await Promise.all(
        updateData.BannerImage.map((img: File) => uploadImageToCloudinary(img, "banner-images"))
      );
    }

    // Handle brand images if provided
    let uploadedBrandImages = undefined;
    if (updateData.brandImage && updateData.brandImage.length > 0) {
      uploadedBrandImages = await Promise.all(
        updateData.brandImage.map((img: File) => uploadImageToCloudinary(img, "banner-images"))
      );
    }

    // Prepare update payload
    const updatePayload: any = {
      name: updateData.name,
      description: updateData.description,
    };

    if (uploadedLogo) {
      updatePayload.brandLogoId = uploadedLogo;
    }

    if (uploadedBannerImages) {
      updatePayload.BannerImage = {
        connect: uploadedBannerImages.map((img: any) => ({ id: img.id }))
      };
    }

    if (uploadedBrandImages) {
      updatePayload.brandImage = {
        connect: uploadedBrandImages.map((img: any) => ({ id: img.id }))
      };
    }

    const updatedBrand = await db.brand.update({
      where: { id },
      data: updatePayload,
      include: { 
        logoImage: true, 
        BannerImage: true,
        brandImage: true,
        _count: {
          select: { products: true }
        }
      }
    });

    revalidatePath('/admin/brands');
    return { success: true, data: updatedBrand };

  } catch (error: any) {
    console.error("Error updating brand:", error);
    return { success: false, error: "Failed to update brand. Please try again." };
  }
}

export async function deleteBrand(id: number) {
  try {
    if (!id) {
      return { success: false, error: "Brand ID is required" };
    }

    // First, get the brand with all related images
    const brand = await db.brand.findUnique({
      where: { id },
      include: { logoImage: true, BannerImage: true, brandImage: true }
    });

    if (!brand) {
      return { success: false, error: "Brand not found" };
    }

    // Check if brand has products
    const productCount = await db.product.count({ where: { brandId: id } });
    if (productCount > 0) {
      return { 
        success: false, 
        error: `Cannot delete brand. It has ${productCount} associated product(s). Please remove or reassign products first.` 
      };
    }

    // Delete associated images from database (Cloudinary cleanup would be handled separately)
    const imageIds = [
      brand.brandLogoId,
      ...brand.BannerImage.map(img => img.id),
      ...brand.brandImage.map(img => img.id)
    ].filter(Boolean);

    if (imageIds.length > 0) {
      await db.image.deleteMany({
        where: { id: { in: imageIds as number[] } }
      });
    }

    // Delete the brand
    const deletedBrand = await db.brand.delete({ where: { id } });
    
    revalidatePath('/admin/brands');
    return { success: true, data: deletedBrand };

  } catch (error: any) {
    console.error("Error deleting brand:", error);
    return { 
      success: false, 
      error: "Failed to delete brand. Please try again." 
    };
  }
}

export async function getBrandsByCategory(categoryType: CategoryType) {
    const brands = await db.brand.findMany({
        where: {
            products: {
                some: {
                    categoryType: categoryType,
                },
            },
        },
    });

    return brands;
}
