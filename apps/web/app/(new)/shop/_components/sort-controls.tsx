"use client";

import Link from "next/link";
import { useQueryStates } from "nuqs";
import { productParsers } from "../search-params";
import { 
  X, 
  ChevronDown 
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

interface SortControlsProps {
  totalResults: number;
}

export function SortControls({ totalResults }: SortControlsProps) {
  const [filters, setFilters] = useQueryStates(productParsers, {
    shallow: false,
  });

  // Calculate items showing (simplified for this component)
  const itemsPerPage = 12;
  const start = totalResults > 0 ? (filters.page - 1) * itemsPerPage + 1 : 0;
  const end = Math.min(filters.page * itemsPerPage, totalResults);

  // Helper to remove a specific filter
  const removeFilter = (key: keyof typeof filters, value?: string) => {
    if (key === "categories" || key === "brands") {
      const current = filters[key] as string[];
      setFilters({ [key]: current.filter((v) => v !== value), page: 1 });
    } else if (key === "minPrice" || key === "maxPrice") {
      setFilters({ minPrice: 0, maxPrice: 2000, page: 1 });
    }
  };

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.brands.length > 0 || 
    filters.minPrice !== 0 || 
    filters.maxPrice !== 2000;

  return (
    <div className="mb-6">
      {/* 1. Breadcrumbs */}
      <nav className="flex flex-wrap gap-2 mb-4 text-sm font-medium text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary transition-colors">Clothing</Link>
        <span>/</span>
        <span className="text-foreground">Men's Collection</span>
      </nav>

      {/* 2. Header & Sort */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Men's Collection</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Showing {start}-{end} of {totalResults} results
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-muted-foreground hidden sm:block">Sort by:</label>
          <Select 
            value={filters.sort} 
            onValueChange={(val) => setFilters({ sort: val, page: 1 })}
          >
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="low-high">Price: Low to High</SelectItem>
              <SelectItem value="high-low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 3. Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-3 py-4 items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
            Active Filters:
          </span>

          {/* Category Badges */}
          {filters.categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1">
              {cat}
              <X 
                className="size-3 cursor-pointer hover:text-destructive" 
                onClick={() => removeFilter("categories", cat)} 
              />
            </Badge>
          ))}

          {/* Brand Badges */}
          {filters.brands.map((brand) => (
            <Badge key={brand} variant="secondary" className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1">
              {brand}
              <X 
                className="size-3 cursor-pointer hover:text-destructive" 
                onClick={() => removeFilter("brands", brand)} 
              />
            </Badge>
          ))}

          {/* Price Badge */}
          {(filters.minPrice !== 0 || filters.maxPrice !== 2000) && (
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1">
              ${filters.minPrice} - ${filters.maxPrice}
              <X 
                className="size-3 cursor-pointer hover:text-destructive" 
                onClick={() => removeFilter("minPrice")} 
              />
            </Badge>
          )}

          <Button
            variant="link"
            size="sm"
            className="text-xs font-medium text-muted-foreground hover:text-primary h-auto p-0 underline-offset-4"
            onClick={() => setFilters({ categories: [], brands: [], minPrice: 0, maxPrice: 2000, page: 1 })}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}