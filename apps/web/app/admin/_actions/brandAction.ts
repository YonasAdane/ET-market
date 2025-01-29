"use server"

import { CategoryType } from '@repo/database/index';
import { db } from 'app/lib/config/prisma-config';
import { uploadToCloudinary } from 'app/lib/config/uploadtoCloud';
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
        throw new Error("Image upload failed");
    }
}

export async function createBrand(name: string, BannerImage: File[], brandImage: File[], description?: string, logo?: File) {
    if (!name) {
        throw new Error("Brand name is required");
    }

    const existingBrand = await db.brand.findFirst({ where: { name } });
    if (existingBrand) {
        throw new Error("Brand with this name already exists");
    }

    let uploadedLogo, uploadedBannerImage, uploadedbrandImage = null;
    let brand;
    if (logo) {
        uploadedLogo = await uploadImageToCloudinary(logo, "brand_logos");
    }
    try {
        uploadedBannerImage = await Promise.all(
            BannerImage.map(img => uploadImageToCloudinary(img, "banner-images"))
        );
        uploadedbrandImage = await Promise.all(
            brandImage.map(img => uploadImageToCloudinary(img, "banner-images"))
        );
    } catch (error) {
        throw new Error("uploadedBannerImage and uploadedbrandImage are required")
    }

    if (uploadedLogo) {
        brand = await db.brand.create({
            data: {
                name,
                description,
                BannerImage: {
                    connect: uploadedBannerImage.map((img: { id: number }) => ({ id: img.id }))
                },
                brandImage: {
                    connect: uploadedbrandImage.map((img: { id: number }) => ({ id: img.id }))
                },
                logoImage: { connect: { id: uploadedLogo.id }, }
            }
        });
    } else {
        brand = await db.brand.create({
            data: {
                name,
                description,
                BannerImage: {
                    connect: uploadedBannerImage.map((img: { id: number }) => ({ id: img.id }))
                },
                brandImage: {
                    connect: uploadedbrandImage.map((img: { id: number }) => ({ id: img.id }))
                },
            }
        });
    }

    revalidatePath('/brands');
    return brand;
}

export async function getBrands() {
    return await db.brand.findMany({ include: { logoImage: true, BannerImage: true, _count: true } });
}

export async function getBrandById(id: number) {
    if (!id) throw new Error("Brand ID is required");
    return await db.brand.findUnique({ where: { id }, include: { logoImage: true } });
}

export async function updateBrand(id: number, name?: string, description?: string, logo?: File) {
    if (!id) throw new Error("Brand ID is required");

    const brand = await db.brand.findUnique({ where: { id } });
    if (!brand) throw new Error("Brand not found");

    let uploadedLogo = brand.brandLogoId;
    if (logo) {
        uploadedLogo = (await uploadImageToCloudinary(logo, "brand_logos")).id;
    }

    const updatedBrand = await db.brand.update({
        where: { id },
        data: {
            name,
            description,
            brandLogoId: uploadedLogo,
        }
    });

    revalidatePath('/brands');
    return updatedBrand;
}

export async function deleteBrand(id: number) {
    if (!id) throw new Error("Brand ID is required");

    const brand = await db.brand.findUnique({ where: { id } });
    if (!brand) throw new Error("Brand not found");

    if (brand.brandLogoId) {
        await db.image.delete({ where: { id: brand.brandLogoId } });
    }

    await db.brand.delete({ where: { id } });
    revalidatePath('/brands');
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
