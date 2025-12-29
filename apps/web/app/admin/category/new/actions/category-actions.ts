"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../../../lib/config/prisma-config";
import { uploadToCloudinary } from "../../../../lib/config/uploadtoCloud";
import { 
  ServerActionResponse, 
  CreateCategoryResponse, 
  CreateVariantResponse, 
  CreateValueResponse 
} from "../types";

// Helper function to upload image to Cloudinary
async function uploadImageToCloudinary(image: File, folder: string) {
  try {
    const uploadResult = await uploadToCloudinary(image, folder);
    return await db.image.create({
      data: {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
        type: "CATEGORY_BANNER",
      }
    });
  } catch (error) {
    console.error("Image upload failed: ", error);
    throw new Error("Image upload failed");
  }
}

export async function createCategory(formData: FormData): Promise<ServerActionResponse<CreateCategoryResponse>> {
  try {
    // Extract data from FormData
    const name = formData.get('name') as string;
    const description = formData.get('description') as string || undefined;
    const bannerImage = formData.get('bannerImage') as File | null;

    // Validate required fields
    if (!name) {
      return { success: false, error: "Category name is required" };
    }

    // Check if category already exists
    const existing = await db.category.findUnique({ where: { name } });
    if (existing) {
      return { success: false, error: "Category already exists" };
    }

    // Upload banner image if provided
    let bannerImageId: number | undefined;
    if (bannerImage && bannerImage.size > 0) {
      const uploadedImage = await uploadImageToCloudinary(bannerImage, 'category_banners');
      bannerImageId = uploadedImage.id;
    }

    // Create category
    const category = await db.category.create({
      data: {
        name,
        description,
        images: bannerImageId ? {
          connect: { id: bannerImageId }
        } : undefined,
      },
    });

    revalidatePath('/admin/categories');
    return { success: true, data: { categoryId: category.id } };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function createVariant(data: { name: string; categoryId: number }): Promise<ServerActionResponse<CreateVariantResponse>> {
  try {
    // Validate required fields
    if (!data.name) {
      return { success: false, error: "Variant name is required" };
    }

    if (!data.categoryId) {
      return { success: false, error: "Category ID is required" };
    }

    // Check if variant already exists for this category
    const existing = await db.variant.findFirst({ 
      where: { 
        name: data.name,
        categoryId: data.categoryId
      } 
    });
    if (existing) {
      return { success: false, error: "Variant already exists for this category" };
    }

    // Create variant
    const variant = await db.variant.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
      },
    });

    revalidatePath('/admin/categories');
    return { success: true, data: { variantId: variant.id } };
  } catch (error) {
    console.error("Error creating variant:", error);
    return { success: false, error: "Failed to create variant" };
  }
}

export async function createValue(data: { value: string; variantId: number }): Promise<ServerActionResponse<CreateValueResponse>> {
  try {
    // Validate required fields
    if (!data.value) {
      return { success: false, error: "Value is required" };
    }

    if (!data.variantId) {
      return { success: false, error: "Variant ID is required" };
    }

    // Check if value already exists for this variant
    const existing = await db.values.findFirst({ 
      where: { 
        value: data.value,
        variantId: data.variantId
      } 
    });
    if (existing) {
      return { success: false, error: "Value already exists for this variant" };
    }

    // Create value
    const value = await db.values.create({
      data: {
        value: data.value,
        variantId: data.variantId,
      },
    });

    revalidatePath('/admin/categories');
    return { success: true, data: { valueId: value.id } };
  } catch (error) {
    console.error("Error creating value:", error);
    return { success: false, error: "Failed to create value" };
  }
}

export async function deleteVariant(variantId: number): Promise<ServerActionResponse> {
  try {
    if (!variantId) {
      return { success: false, error: "Variant ID is required" };
    }

    // Delete all values associated with this variant first (cascade)
    await db.values.deleteMany({
      where: { variantId: variantId }
    });

    // Delete the variant
    await db.variant.delete({
      where: { id: variantId }
    });

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error("Error deleting variant:", error);
    return { success: false, error: "Failed to delete variant" };
  }
}

export async function deleteValue(valueId: number): Promise<ServerActionResponse> {
  try {
    if (!valueId) {
      return { success: false, error: "Value ID is required" };
    }

    // Delete the value
    await db.values.delete({
      where: { id: valueId }
    });

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error("Error deleting value:", error);
    return { success: false, error: "Failed to delete value" };
  }
}