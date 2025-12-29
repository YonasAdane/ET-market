"use server";

import { db } from "@/lib/config/prisma-config";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { uploadToCloudinary } from "@/lib/config/uploadtoCloud";
import type { UploadApiResponse } from "cloudinary";

// ✅ Schema for validation
const VariantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  values: z.array(z.string().min(1, "Variant value cannot be empty")).default([]),
});

const CreateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  variants: z.array(VariantSchema).optional(),
  images: z.any().optional(),
});

type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string | Record<string, any> };

// ✅ Helper to normalize FormData into structured data
function parseFormData(formData: FormData): z.input<typeof CreateCategorySchema> {
  let variants: any[] | undefined;
  const variantMap = new Map<number, { name?: string; values: string[] }>();

  // ✅ Loop through all FormData keys
  for (const [key, value] of formData.entries()) {
    // Match: variants[0].name
    const nameMatch = key.match(/^variants\[(\d+)\]\.name$/);
    // Match: variants[0].value[0]  OR  variants[0].value[0].value
    const valueMatch = key.match(/^variants\[(\d+)\]\.value\[(\d+)\](?:\.value)?$/);

    if (nameMatch) {
      const index = Number(nameMatch[1]);
      const variant = variantMap.get(index) || { values: [] };
      variant.name = value.toString();
      variantMap.set(index, variant);
    } else if (valueMatch) {
      const index = Number(valueMatch[1]);
      const variant = variantMap.get(index) || { values: [] };
      variant.values.push(value.toString());
      variantMap.set(index, variant);
    }
  }

  if (variantMap.size > 0) {
    variants = Array.from(variantMap.values());
  }

  const images = formData.getAll("images") as File[];

  // Log the raw extraction step
  console.log("🟦 Raw VariantMap:", Object.fromEntries(variantMap));

  return {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || undefined,
    variants,
    images,
  };
}


// ✅ Main Server Action
export async function createCategoryAction(
  input: FormData | z.input<typeof CreateCategorySchema>
): Promise<ActionResponse<any>> {
  try {
    const data = input instanceof FormData ? parseFormData(input) : input;

    const parsed = CreateCategorySchema.safeParse(data);
    if (!parsed.success) {
      console.error("❌ Validation failed:", parsed.error.format());
      return { success: false, error: parsed.error.format() };
    }

    const { name, description, variants, images } = parsed.data;

    // --- Log parsed variant data for debugging ---
    console.log("🟦 Parsed Variants Data:", JSON.stringify(variants, null, 2));

    // --- Upload images if provided ---
    let imageRecords: { id: number }[] = [];
    if (images && Array.isArray(images) && images.length > 0) {
      const uploadResults = await Promise.all(
        images.map((file: File) => uploadToCloudinary(file, "categories"))
      );

      imageRecords = await db.$transaction(
        uploadResults.map((res: UploadApiResponse) =>
          db.image.create({
            data: {
              url: res.secure_url,
              publicId: res.public_id,
              width: res.width,
              height: res.height,
              size: res.bytes,
              type: "CATEGORY_SAMPLE",
            },
            select: { id: true },
          })
        )
      );
    }

    // --- Log data that will be sent to Prisma ---
    console.log("🟩 Creating Category with Data:", {
      name,
      description,
      variantCount: variants?.length || 0,
      imageCount: imageRecords.length,
    });

    // --- Create category, variants, and values ---
    const category = await db.category.create({
      data: {
        name,
        description,
        images:
          imageRecords.length > 0
            ? { connect: imageRecords.map((img) => ({ id: img.id })) }
            : undefined,
        variants:
          variants && variants.length > 0
            ? {
                create: variants.map((variant) => ({
                  name: variant.name,
                  values: {
                    create: variant.values.map((value) => ({ value })),
                  },
                })),
              }
            : undefined,
      },
      include: {
        images: true,
        variants: { include: { values: true } },
      },
    });

    revalidatePath("/dashboard/categories");

    console.log("✅ Category Created Successfully:", category);
    return { success: true, data: category };
  } catch (error) {
    console.error("❌ Error creating category:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return { success: false, error: message };
  }
}
