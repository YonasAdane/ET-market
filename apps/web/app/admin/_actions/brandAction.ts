"use server"

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

export async function createBrand(name: string, description?: string, logo?: File) {
    if (!name) {
        throw new Error("Brand name is required");
    }

    const existingBrand = await db.brand.findUnique({ where: { name } });
    if (existingBrand) {
        throw new Error("Brand with this name already exists");
    }

    let uploadedLogo = null;
    let brand;
    if (logo) {
        uploadedLogo = await uploadImageToCloudinary(logo, "brand_logos");
    }
    if(uploadedLogo){
        brand = await db.brand.create({
            data: {
                name,
                description,
                logoImage: {connect:{id:uploadedLogo.id},}
            }
        }); 
    }else{
        brand = await db.brand.create({
            data: {
                name,
                description,
            }
        });
    }

    revalidatePath('/brands');
    return brand;
}

export async function getBrands() {
    return await db.brand.findMany({ include: { logoImage: true } });
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
