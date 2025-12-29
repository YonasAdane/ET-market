// Category Creation Wizard Types

// Server Action Return Types
export interface ServerActionResponse<T = undefined> {
  success: boolean;
  error?: string;
  data?: T;
}

export interface CreateCategoryResponse {
  categoryId?: number;
}

export interface CreateVariantResponse {
  variantId?: number;
}

export interface CreateValueResponse {
  valueId?: number;
}

// Database Model Types (based on Prisma schema)
export interface Category {
  id: number;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Variant {
  id: number;
  name: string;
  categoryId: number;
  values: Value[];
}

export interface Value {
  id: number;
  value: string;
  variantId: number;
}

// Component Props Types
export interface CategoryBasicFormProps {
  onSubmit: (categoryId: number) => void;
}

export interface VariantBuilderProps {
  categoryId: number;
  initialVariants: Variant[];
}

export interface ValueTagsProps {
  variantId: number;
  initialValues: Value[];
}

export interface SubmitBarProps {
  isPending: boolean;
  onSubmit: () => void;
}

export interface ImageDropzoneProps {
  onImageSelected: (file: File | null) => void;
  initialImage?: string | null;
}