"use server"
import { CategoryType } from '@repo/database/index';
import { db } from 'app/lib/config/prisma-config';
import { uploadToCloudinary } from 'app/lib/config/uploadtoCloud';
import { CategoryTypeEnum } from 'app/lib/types/product';
import { revalidatePath } from 'next/cache';

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

export async function createCategory(categoryType:CategoryType,name: string, description: string, bannerImage: File, categorySampleImage: File[]) {
    if (!name) {
        console.log("Category name is required");
    }
    console.log("see enums:",categoryType);
    
    const existingCategory = await db.category.findUnique({ where: { name } });
    if (existingCategory) {
        throw new Error("Category with this name already exists");
    }

    let uploadedBannerImage = await uploadImageToCloudinary(bannerImage, "category_banners");
    let uploadedCategorySampleImages = await Promise.all(
            categorySampleImage.map(img => uploadImageToCloudinary(img, "category_samples"))
        );
    if (!uploadedBannerImage) {
        throw new Error("image not uploaded")
    }
    const category = await db.category.create({
        data: {
            categoryType:categoryType as CategoryTypeEnum,
            name,
            description,
            bannerImageId: uploadedBannerImage.id || null,
            sampleImages: {
                connect:uploadedCategorySampleImages.map((img) => ({ id: img?.id }))||[]
            }
        }
    });

    revalidatePath('/categories');
    console.log(category);
    
    return category;
}

export async function getCategories() {
    return await db.category.findMany({ include: { bannerImage: true, sampleImages: true } });
}

export async function getCategoryById(id: number) {
    if (!id) throw new Error("Category ID is required");
    return await db.category.findUnique({ where: { id }, include: { bannerImage: true, sampleImages: true } });
}

export async function updateCategory(id: number, name?: string, description?: string, bannerImage?: File, categorySampleImage?: File[]) {
    if (!id) throw new Error("Category ID is required");

    const category = await db.category.findUnique({ where: { id } });
    if (!category) throw new Error("Category not found");

    let uploadedBannerImage = category.bannerImageId;
    // let uploadedCategorySampleImage = category.bannerSampleId;

    if (bannerImage) {
        uploadedBannerImage = (await uploadImageToCloudinary(bannerImage, "category_banners"))?.id ?? null;
    }
   
    let uploadedCategorySampleImages:any = []
        if (categorySampleImage) {
            uploadedCategorySampleImages = await Promise.all(
                categorySampleImage.map(img => uploadImageToCloudinary(img, "category_samples"))
            );
        }
   
    const updatedCategory = await db.category.update({
        where: { id },
        data: {
            name,
            description,
            bannerImageId: uploadedBannerImage,
            sampleImages: {
                connect: uploadedCategorySampleImages.map((img:{id:number}) => ({ id: img.id }))
            }
        }
    });

    revalidatePath('/categories');
    return updatedCategory;
}

export async function deleteCategory(id: number) {
    if (!id) throw new Error("Category ID is required");

    const category = await db.category.findUnique({ where: { id } });
    if (!category) throw new Error("Category not found");

    if (category.bannerImageId) {
        await db.image.delete({ where: { id: category.bannerImageId } });
    }
    // if (category.sampleImagesId) {
    //     await db.image.delete({ where: { id: category.sampleImagesId } });
    // }

    await db.category.delete({ where: { id } });
    revalidatePath('/categories');
}
