"use server";

import { CategoryType } from "@repo/database/index";
import { db } from "app/lib/config/prisma-config";
import { uploadToCloudinary } from "app/lib/config/uploadtoCloud";
import { accessoriesSchema, bagsSchema, clothingSchema, footwearSchema, outerwearSchema, underwearSchema, watchesSchema, CategoryType as ZcategoryType } from "app/lib/types/product";
import { revalidatePath } from "next/cache";
import { z, ZodError } from "zod";
// import {  ProductType, ProductQueryType } from '@/types/';

<<<<<<< HEAD

=======
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
const schemas: Record<CategoryType, z.ZodSchema> = {
  CLOTHING: clothingSchema,
  FOOTWEAR: footwearSchema,
  ACCESSORY: accessoriesSchema,
  BAG: bagsSchema,
  OUTERWEAR: outerwearSchema,
  WATCH: watchesSchema,
  UNDERWEAR: underwearSchema,
};

<<<<<<< HEAD
export async function createProduct(formData: FormData) {
  console.log("Received FormData entries:");
  
  // Log all FormData entries for debugging
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    // Parse FormData into a structured object
    const parsedData: any = {
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      prevprice: parseFloat(formData.get('prevprice') as string),
      description: formData.get('description') as string,
      strapMaterial: formData.get('strapMaterial') as string,
      dialShape: formData.get('dialShape') as string,
      waterResistance: formData.get('waterResistance') as string,
      brandId: formData.get('brandId') ? parseInt(formData.get('brandId') as string) : undefined,
      colour: formData.get('colour') as string,
      categoryType: formData.get('categoryType') as CategoryType,
      gender: formData.get('gender') as string,
      stock: parseInt(formData.get('stock') as string),
    };

    // Parse arrays from JSON strings
    try {
      parsedData.categoryId = JSON.parse(formData.get('categoryId') as string);
      parsedData.size = JSON.parse(formData.get('size') as string);
    } catch (error) {
      console.error("Error parsing JSON arrays:", error);
      return { 
        error: "Invalid data format for arrays",
        success: false 
      };
    }

    // Get image files
    const imageFiles = formData.getAll('images') as File[];
    parsedData.images = imageFiles;

    console.log("Parsed product data:", parsedData);

    // Validate using Zod
    const schema = schemas[parsedData.categoryType as CategoryType];
    if (!schema) {
      return { 
        error: "Invalid category type",
        success: false 
      };
    }

    const validatedData = await schema.parseAsync(parsedData);

    // Validate that we have images
    if (!imageFiles || imageFiles.length === 0) {
      return { 
        error: "At least one image is required",
        success: false 
      };
    }

    // Upload images to Cloudinary
    let uploadedFiles;
    try {
      uploadedFiles = await Promise.all(
        imageFiles.map((file) => uploadToCloudinary(file, "product-pictures"))
      );
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError);
      return { 
        error: "Failed to upload images. Please try again.",
        success: false 
      };
    }

    // Format images for Prisma
    const formattedImages = uploadedFiles.map(result => ({
      publicId: result.public_id,
      url: result.secure_url,
    }));

    // Use transaction for database operations
    let AddedProduct;
    try {
      AddedProduct = await db.$transaction(async (prisma) => {
        return prisma.product.create({
          data: {
            name: validatedData.name,
            description: validatedData.description,
            size: validatedData.size,
            gender: validatedData.gender,
            material: validatedData.strapMaterial,
            price: validatedData.price,
            colour: validatedData.colour,
            prevprice: validatedData.prevprice,
            stock: validatedData.stock,
            brandId: validatedData.brandId,
            dialShape: validatedData.dialShape,
            waterResistance: validatedData.waterResistance,
            category: {
              connect: validatedData.categoryId.map((id: number) => ({ id })),
            },
            categoryType: validatedData.categoryType as CategoryType,
            images: {
              create: formattedImages,
            },
          },
          include: {
            images: true,
            category: true,
            brand: true,
          },
        });
      });
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      
      if (dbError?.code === 'P2002') {
        return { 
          error: "A product with similar details already exists",
          success: false 
        };
      }
      
      if (dbError?.message?.includes("Can't reach database") || dbError.code === "ECONNREFUSED") {
        return { 
          error: "Unable to connect to the database. Please check your network.",
          success: false 
        };
      }
      
      throw dbError;
    }

    revalidatePath("/category/clothing");
    
    return {
      success: true,
      product: AddedProduct,
      message: "Product created successfully"
    };

  } catch (error: any) {
    console.error("Product creation error:", error);

    if (error instanceof ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return { 
        error: `Validation failed: ${errorMessages}`,
        success: false 
      };
    }

    return { 
      error: "Something went wrong. Please try again later.",
      success: false 
    };
  }
}
interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryType?: CategoryType;
  brandId?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
}

export async function getProducts(params: ProductQueryParams = {}) {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = '',
      categoryType,
      brandId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      minPrice,
      maxPrice
    } = params;

    const skip = (page - 1) * pageSize;
    const where: any = {};

    // Search functionality
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { name: { contains: search, mode: 'insensitive' } } }
      ];
    }

    // Category filter
    if (categoryType) {
      where.categoryType = categoryType;
    }

    // Brand filter
    if (brandId) {
      where.brandId = brandId;
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Execute queries in parallel
    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        include: { 
          brand: true, 
          images: true,
          category: true 
        },
        orderBy,
        skip,
        take: pageSize,
      }),
      db.product.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);
    const data=products.map(product => ({
        ...product,
        createdAt: product.createdAt.toISOString(), // if it's a Date
        updatedAt:product.updatedAt.toISOString()
      }))

      console.log(JSON.stringify(data, null, 2))
    return {
      success: true,
      // data: [...products,createdAt:],
      data,
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
    console.error("Error fetching products:", error);
    
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
      error: "Something went wrong while fetching products. Please try again later." 
    };
  }
}
=======
export async function createProduct(ParsedData: any) {
  console.log("Received product data:", ParsedData);
  try {
    
    // Validate using Zod
    const schema = schemas[ParsedData.categoryType as CategoryType];
    if (!schema) throw new Error("Invalid categoryType");
  
    const parsedResult = await schema.parse(ParsedData);
  
    // Parallelize image uploads
    const uploadedFiles = await Promise.all(
      ParsedData.images.map((file: any) => uploadToCloudinary(file, "product-pictures"))
    );
  
    // Format images for Prisma
    const formattedImages = uploadedFiles.map(result => ({
      publicId: result.public_id,
      url: result.secure_url,
    }));
  
    // Use a transaction for better reliability
    const AddedProduct = await db.$transaction(async (prisma) => {
      return prisma.product.create({
        data: {
          name: ParsedData.name,
          description: ParsedData.description,
          size: ParsedData.size,
          gender: ParsedData.gender,
          material: ParsedData.material || ParsedData.strapMaterial,
          price: ParsedData.price,
          colour: ParsedData.colour,
          prevprice: ParsedData.prevprice,
          stock: ParsedData.stock,
          pattern: ParsedData.pattern,
          fit: ParsedData.fit,
          occasion: ParsedData.occasion,
          season: ParsedData.season,
          brandId: ParsedData.brandId,
          dialShape:ParsedData.dialShape,
          waterResistance:ParsedData.waterResistance,
          category: {
            connect: Array.isArray(ParsedData.categoryId)
              ? ParsedData.categoryId.map((id: number) => ({ id }))
              : [{ id: ParsedData.categoryId }],
          },
          categoryType: ParsedData.categoryType as CategoryType,
          images: {
            create: formattedImages,
          },
        },
      });
    });
    revalidatePath("/category/clothing");
    return {success:true,product:AddedProduct};

  } catch (error:any) {
    if(error instanceof ZodError){
      return {
        error:"Invalid product data"
      }
    }
     if (error?.message?.includes("Can't reach database") || error.code === "ECONNREFUSED") {
      return { type: "network", error: "⚠️ Unable to connect to the database. Please check your network." };
    }

    return { type: "other", error: "❌ Something went wrong. Please try again later." };
  }

}

interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryType?: CategoryType;
  brandId?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
}

export async function getProducts(params: ProductQueryParams = {}) {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = '',
      categoryType,
      brandId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      minPrice,
      maxPrice
    } = params;

    const skip = (page - 1) * pageSize;
    const where: any = {};

    // Search functionality
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { name: { contains: search, mode: 'insensitive' } } }
      ];
    }

    // Category filter
    if (categoryType) {
      where.categoryType = categoryType;
    }

    // Brand filter
    if (brandId) {
      where.brandId = brandId;
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Execute queries in parallel
    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        include: { 
          brand: true, 
          images: true,
          category: true 
        },
        orderBy,
        skip,
        take: pageSize,
      }),
      db.product.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      success: true,
      data: products,
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
    console.error("Error fetching products:", error);
    
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
      error: "Something went wrong while fetching products. Please try again later." 
    };
  }
}
>>>>>>> 352d9d8e773d213e19842bf445d5e00ccc67a7e7
export async function getProductById(id: number) {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: { 
        brand: true, 
        images: true,
        category: true 
      }
    });
    
    if (!product) {
      return { success: false, error: "Product not found" };
    }
    
    return { success: true, data: product };
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

export async function updateProduct(id: number, updateData: any) {
  try {
    // Validate using Zod if needed
    const schema = schemas[updateData.categoryType as CategoryType];
    if (schema) {
      await schema.parse(updateData);
    }

    // Handle image updates if provided
    let formattedImages = undefined;
    if (updateData.images && updateData.images.length > 0) {
      const uploadedFiles = await Promise.all(
        updateData.images.map((file: any) => uploadToCloudinary(file, "product-pictures"))
      );
      
      formattedImages = uploadedFiles.map(result => ({
        publicId: result.public_id,
        url: result.secure_url,
      }));
    }

    // Prepare update data
    const updatePayload: any = {
      name: updateData.name,
      description: updateData.description,
      size: updateData.size,
      gender: updateData.gender,
      material: updateData.material || updateData.strapMaterial,
      price: updateData.price,
      colour: updateData.colour,
      prevprice: updateData.prevprice,
      stock: updateData.stock,
      pattern: updateData.pattern,
      fit: updateData.fit,
      occasion: updateData.occasion,
      season: updateData.season,
      brandId: updateData.brandId,
      dialShape: updateData.dialShape,
      waterResistance: updateData.waterResistance,
      categoryType: updateData.categoryType as CategoryType,
    };

    // Add category connection if provided
    if (updateData.categoryId) {
      updatePayload.category = {
        set: Array.isArray(updateData.categoryId)
          ? updateData.categoryId.map((id: number) => ({ id }))
          : [{ id: updateData.categoryId }],
      };
    }

    // Add images if provided
    if (formattedImages) {
      updatePayload.images = {
        create: formattedImages,
      };
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: updatePayload,
      include: { 
        brand: true, 
        images: true,
        category: true 
      }
    });

    revalidatePath("/admin/products");
    return { success: true, data: updatedProduct };

  } catch (error: any) {
    console.error("Error updating product:", error);
    
    if (error instanceof ZodError) {
      return { success: false, error: "Invalid product data" };
    }

    return { success: false, error: "Failed to update product. Please try again." };
  }
}
export async function deleteProduct(id: number) {
  try {
    // First, get the product with images to clean up cloudinary
    const product = await db.product.findUnique({
      where: { id },
      include: { images: true }
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Delete associated images from cloudinary and database
    if (product.images.length > 0) {
      // Note: You might want to add a cloudinary delete function here
      await db.image.deleteMany({
        where: { id: { in: product.images.map(img => img.id) } }
      });
    }

    // Delete the product
    const deletedProduct = await db.product.delete({ where: { id } });
    
    revalidatePath("/admin/products");
    return { success: true, product: deletedProduct };

  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { 
      success: false, 
      error: "Failed to delete product. Please try again." 
    };
  }
}











// export async function addProduct(input: AddProductInput) {
//   try {
//     const newProduct = await db.product.create({
//       data: {
//         name: input.name,
//         description: input.description,
//         price: input.price,
//         categoryId: input.categoryId,
//         brandId: input.brandId, // Optional
//       },
//     });

//     return newProduct; // Can be returned to confirm or show data
//   } catch (error) {
//     console.error("Error inserting product:", error);
//     throw new Error("Failed to add product");
//   }
// }



export async function findProducts(categoryType: CategoryType, queryParams: any) {
  const category = categoryType.toUpperCase();
  if(ZcategoryType.safeParse(category).error){
    console.log("error validating data");
    return;
  }
  const filters: any = {};

  if (category) {
    filters.categoryType = category as CategoryType;
  }

  if (queryParams.brandId) {
    filters.brandId = Array.isArray(queryParams.brandId)?
      {hasSome: queryParams.brandId.map((id:any) => parseInt(id as string))}
        : {hasSome:[parseInt(queryParams.brandId as string)]};
  }

  if (queryParams.size) {
    filters.size = Array.isArray(queryParams.size) ? { hasSome: queryParams.size } : { hasSome: [queryParams.size] };
  }

  if (queryParams.material) {
    filters.material = Array.isArray(queryParams.material) ? { in: queryParams.material } : { in: [queryParams.material] };
  }

  if (queryParams.price) {
    filters.price = { lte: parseFloat(queryParams.price as string) };
  }

  const products = await db.product.findMany({ where: filters, include: { brand: true,images: true } });
  console.log('findProducts query:', queryParams);

  return products;
}

 