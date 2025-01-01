import { z } from "zod";

export const createBrandSchema = z.object({
    name: z.string().min(2).max(100),
    description:z.string().optional(),
    BannerImage:z.array(z.string()),
    brandImage:z.array(z.string()),
    desktopBannerImage:z.array(z.string()),
    logoImage: z.string().optional(),
  });
export type createBrandType=z.infer<typeof createBrandSchema>;

