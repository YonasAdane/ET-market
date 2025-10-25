import { ProductGrid } from "./_components/ProductGrid";
import { testProducts } from "./test-products";

export default function TestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Test Product Grid</h1>
      <ProductGrid products={testProducts} userId="test-user-id" />
    </div>
  );
}