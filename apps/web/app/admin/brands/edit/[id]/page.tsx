import { notFound } from "next/navigation";
import { getBrandById } from "../../../_actions/brandAction";
import EditBrandForm from "./EditBrandForm";

// app/admin/brands/edit/[id]/page.tsx

interface EditBrandPageProps {
  params: {
    id: string;
  };
}

export default async function EditBrandPage({ params }: EditBrandPageProps) {
  const brandId = parseInt(params.id);
  
  if (isNaN(brandId)) {
    notFound();
  }

  const result = await getBrandById(brandId);

  if (!result.success || !result.data) {
    notFound();
  }

  return <EditBrandForm brandId={brandId} initialData={result.data} />;
}

// Generate metadata for the page
export async function generateMetadata({ params }: EditBrandPageProps) {
  const brandId = parseInt(params.id);
  const result = await getBrandById(brandId);

  if (!result.success || !result.data) {
    return {
      title: "Brand Not Found",
    };
  }

  return {
    title: `Edit ${result.data.name} - Admin`,
    description: `Edit ${result.data.name} brand details and images`,
  };
}