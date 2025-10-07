import React, { Suspense } from "react";
import { getBrands } from "../_actions/brandAction";
import BrandsContent, { BrandsLoadingSkeleton } from "./BrandsContent";

export default async function BrandsPage() {
  return (
    <Suspense fallback={<BrandsLoadingSkeleton />}>
      <BrandsServer />
    </Suspense>
  );
}

async function BrandsServer() {
  const result = await getBrands();

  return <BrandsContent result={result} />;
}
