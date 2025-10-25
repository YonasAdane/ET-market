# Collections Page Implementation

This directory contains the implementation for the collection pages in the ET-market web application.

## Structure

- `[collectionName]/page.tsx` - The main collection page (Server Component)
- `_actions/productActions.ts` - Server actions for fetching products and adding to cart
- `_components/ProductGrid.tsx` - Client component for displaying products in a grid
- `test-page.tsx` - Test page for verifying the implementation
- `test-products.ts` - Sample product data for testing

## Features Implemented

1. **Server Actions**:
   - `getProducts` - Fetches products with optional filters (categoryType, brandId, size, price range)
   - `addToCart` - Adds products to the shopping cart with optimistic updates

2. **Collection Page** (Server Component):
   - Uses Server Actions to fetch products
   - Supports SSR with revalidation every 60 seconds
   - Handles loading and error states with Suspense and Error Boundaries

3. **Product Grid** (Client Component):
   - Responsive grid layout using shadcn/ui components
   - Skeleton loaders for loading states
   - Fallback UI for empty states
   - Add to Cart functionality with useTransition for smooth UX

4. **Error and Loading Handling**:
   - Global error handling with error.tsx
   - Loading states with loading.tsx
   - Optimistic UI updates for cart operations

## Usage

The collection page is accessible via routes like:
- `/collections/watch`
- `/collections/clothing`
- `/collections/footwear`

The page automatically maps the collection name to the corresponding category type and fetches relevant products.