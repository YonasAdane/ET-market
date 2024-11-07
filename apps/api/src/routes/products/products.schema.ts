import { z } from "zod";

 export const createProductSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  price:z.number().positive(),
  prevprice:z.number().positive(),
  stock:z.number().int().positive(),
  imageUrl:z.string().optional()
});

export type createProductType=z.infer<typeof createProductSchema>;

// Define the CategoryType enum
const CategoryType = z.enum([
    'CLOTHING',
    'FOOTWEAR',
    'ACCESSORY',
    'BAG',
    'OUTERWEAR',
    'JEWELLERY',
    'WATCH',
    'UNDERWEAR'
]);
export type CategoryTypeEnum=z.infer<typeof CategoryType>;

// Define the Zod schema for the Product model
export const productSchema = z.object({
    id: z.number().int().optional(),  
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(), 
    gender:z.string().optional(),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
    size: z.string().optional(), 
    imageUrl:z.string(),
    material: z.string().optional(), 
    colour: z.string().optional(), 
    pattern: z.string().optional(), 
    fit: z.string().optional(), 
    soleType: z.string().optional(), 
    closureType: z.string().optional(), 
    occasion: z.string().optional(), 
    season: z.string().optional(), 
    categoryId: z.number(),
    categoryType: CategoryType,
    brandId: z.number().int().positive().optional(), 
    createdAt: z.date().optional(), 
    updatedAt: z.date().optional(), 
  });
  export type ProductType=z.infer<typeof productSchema>;
  
  export const clothingSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(), 
    imageUrl:z.string(),
    gender:z.string().optional(),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    size: z.string().optional(),         // e.g., S, M, L, XL
    material: z.string().optional(),     // e.g., Cotton, Polyester
    colour: z.string().optional(),       // e.g., Red, Blue
    pattern: z.string().optional(),      // e.g., Solid, Striped
    fit: z.string().optional(),          // e.g., Slim, Regular
    occasion: z.string().optional(),     // e.g., Casual, Formal
    season: z.string().optional(),       // e.g., Summer, Winter
    brandId: z.number ().optional(),      // Foreign key reference to Brand
    categoryId: z.number(),              // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.number().int().nonnegative()
  
  });
  
  export const productQuerySchema = z.object({
    name: z.string().min(1).optional(),
    price: z.string().optional(),
    prevprice: z.string().optional(),
    size: z.string().optional(),         // e.g., S, M, L, XL
    material: z.string().optional(),     // e.g., Cotton, Polyester
    colour: z.string().optional(),       // e.g., Red, Blue
    pattern: z.string().optional(),      // e.g., Solid, Striped
    fit: z.string().optional(),          // e.g., Slim, Regular
    occasion: z.string().optional(),     // e.g., Casual, Formal
    season: z.string().optional(),       // e.g., Summer, Winter
    brandId: z.string().optional(),      // Foreign key reference to Brand
    categoryId: z.string().optional(),              // Foreign key reference to Category
    categoryType:z.string().optional(),
    stock: z.number().int().nonnegative().optional(),
    soleType: z.string().optional(),      // e.g., Rubber, Leather
    closureType: z.string().optional(),   // e.g., Laces, Velcro
    gemstone: z.string().optional(),      // e.g., Diamond, Ruby
    purpose: z.string().optional(),       // e.g., Travel, Daily Use
    insulationType: z.string().optional(),// e.g., Down, Synthetic
    type: z.string().optional(),          // e.g., Foundation, Lipstick
    shade: z.string().optional(),         // e.g., Fair, Medium, Dark
    skinType: z.string().optional(),      // e.g., Dry, Oily, Combination
    strapMaterial: z.string().optional(), // e.g., Leather, Metal
    dialShape: z.string().optional(),     // e.g., Round, Square
    waterResistance: z.string().optional(), // e.g., 50m, 100m
    style: z.string().optional(),         // e.g., Briefs, Boxers
    star: z.string().optional(),         // e.g., Fair, Medium, Dark
  
  });
  export type ProductQueryType=z.infer<typeof productQuerySchema>;
  
  
  export const footwearSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(), 
    imageUrl:z.string(),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    size: z.string().optional(),          // e.g., 8, 9, 10
    material: z.string().optional(),      // e.g., Leather, Suede
    colour: z.string().optional(),        // e.g., Black, White
    closureType: z.string().optional(),   // e.g., Laces, Velcro
    occasion: z.string().optional(),      // e.g., Casual, Formal
    season: z.string().optional(),        // e.g., Summer, Winter
    brandId: z.number().optional(),       // Foreign key reference to Brand
    categoryId: z.number(),               // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.number().int().nonnegative()
  
  });
  
  export const accessoriesSchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    description: z.string().optional(), 
    colour: z.string().optional(), 
    imageUrl:z.string(),
    material: z.string().optional(),      // e.g., Leather, Fabric
    size: z.string().optional(),          // e.g., Small, Medium, Large
    brandId: z.number().optional(),       // Foreign key reference to Brand
    categoryId: z.number(),               // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.number().int().nonnegative()
  
  });
  
  export const bagsSchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    description: z.string().optional(), 
    colour: z.string().optional(), 
    imageUrl:z.string(),
    material: z.string().optional(),      // e.g., Leather, Fabric
    size: z.string().optional(),          // e.g., Small, Medium, Large
    purpose: z.string().optional(),       // e.g., Travel, Daily Use
    brandId: z.number().optional(),       // Foreign key reference to Brand
    categoryId: z.number(),               // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.number().int().nonnegative()
  
  });
  
  export const outerwearSchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    description: z.string().optional(), 
    imageUrl:z.string(),
    material: z.string().optional(),      // e.g., Wool, Polyester
    insulationType: z.string().optional(),// e.g., Down, Synthetic
    season: z.string().optional(),        // e.g., Winter, Fall
    brandId: z.number().optional(),       // Foreign key reference to Brand
    categoryId: z.number(),               // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.number().int().nonnegative()
  });
  
  export const watchesSchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    description: z.string().optional(), 
    imageUrl:z.string(),
    strapMaterial: z.string().optional(), // e.g., Leather, Metal
    dialShape: z.string().optional(),     // e.g., Round, Square
    colour:z.string().optional(), 
    waterResistance: z.string().optional(), // e.g., 50m, 100m
    brandId: z.number().optional(),       // Foreign key reference to Brand
    categoryId: z.number(),               // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.number().int().nonnegative()
  
  });
  
  export const underwearSchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    description: z.string().optional(), 
    size: z.string().optional(),          // e.g., S, M, L, XL
    gender:z.string().optional(), 
    material: z.string().optional(),      // e.g., Cotton, Polyester
    style: z.string().optional(),         // e.g., Briefs, Boxers
    brandId: z.number().optional(),       // Foreign key reference to Brand
    categoryId: z.number(),               // Foreign key reference to Category
    categoryType:z.string(),
    imageUrl:z.string(),
    stock: z.number().int().nonnegative()
  
  });
  
  export const jewellerySchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    description: z.string().optional(), 
    imageUrl:z.string(),
    material: z.string().optional(),      // e.g., Gold, Silver
    gemstone: z.string().optional(),      // e.g., Diamond, Ruby
    occasion: z.string().optional(),      // e.g., Wedding, Party
    brandId: z.number().optional(),       // Foreign key reference to Brand
    categoryId: z.number(),               // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.number().int().nonnegative()
  });
  export const cosmeticsSchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    prevprice: z.number().positive(),
    description: z.string().optional(), 
    imageUrl:z.string(),
    type: z.string().optional(),          // e.g., Foundation, Lipstick
    shade: z.string().optional(),         // e.g., Fair, Medium, Dark
    skinType: z.string().optional(),      // e.g., Dry, Oily, Combination
    brandId: z.number().optional(),       // Foreign key reference to Brand
    categoryId: z.number(),               // Foreign key reference to Category
    categoryType:z.string(),
    stock: z.number().int().nonnegative()
  
  });
  
  
  