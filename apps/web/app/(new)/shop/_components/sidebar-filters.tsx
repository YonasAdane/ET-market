"use client";

import * as React from "react";
import { useQueryStates } from "nuqs";
import { productParsers } from "../search-params";
import { 
  ChevronUp, 
  ChevronDown, 
  RotateCcw 
} from "lucide-react";

import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Label } from "@repo/ui/components/ui/label";
import { Slider } from "@repo/ui/components/ui/slider";
import { Button } from "@repo/ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/ui/collapsible";
import { Separator } from "@repo/ui/components/ui/separator";

// These would ideally come from your database via a server component/action
const CATEGORIES = [
  { id: "t-shirts", label: "T-Shirts", count: 120 },
  { id: "jeans", label: "Jeans & Trousers", count: 85 },
  { id: "jackets", label: "Jackets & Coats", count: 42 },
  { id: "shoes", label: "Shoes", count: 36 },
  { id: "accessories", label: "Accessories", count: 12 },
];

const BRANDS = ["Nike", "Adidas", "Puma", "Reebok"];

export function SidebarFilters() {
  // 1. Sync state with URL using nuqs
  const [filters, setFilters] = useQueryStates(productParsers, {
    shallow: false, // Set to false to trigger server-side re-render (Server Actions)
    history: "push",
  });

  // Handle Category Toggle
  const handleCategoryChange = (categoryId: string) => {
    const current = filters.categories || [];
    const next = current.includes(categoryId)
      ? current.filter((id) => id !== categoryId)
      : [...current, categoryId];
    
    setFilters({ categories: next, page: 1 });
  };

  // Handle Brand Toggle
  const handleBrandChange = (brand: string) => {
    const current = filters.brands || [];
    const next = current.includes(brand)
      ? current.filter((b) => b !== brand)
      : [...current, brand];
    
    setFilters({ brands: next, page: 1 });
  };

  // Handle Price Change
  const handlePriceChange = (values: number[]) => {
    setFilters({ 
      minPrice: values[0], 
      maxPrice: values[1], 
      page: 1 
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      minPrice: 0,
      maxPrice: 2000,
      page: 1,
    });
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 h-fit space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Filters</h3>
        {(filters.categories.length > 0 || filters.brands.length > 0) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-8 px-2 text-primary hover:text-primary hover:bg-primary/10"
          >
            <RotateCcw className="mr-2 h-3 w-3" />
            Reset
          </Button>
        )}
      </div>

      {/* Categories Section */}
      <Collapsible defaultOpen className="space-y-3">
        <CollapsibleTrigger className="flex w-full items-center justify-between group">
          <span className="font-bold text-foreground">Categories</span>
          <ChevronUp className="h-4 w-4 text-muted-foreground group-data-[state=closed]:hidden" />
          <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[state=open]:hidden" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3 group">
              <Checkbox
                id={cat.id}
                checked={filters.categories.includes(cat.label)}
                onCheckedChange={() => handleCategoryChange(cat.label)}
              />
              <Label
                htmlFor={cat.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-muted-foreground group-hover:text-primary transition-colors"
              >
                {cat.label}
              </Label>
              <span className="ml-auto text-xs text-muted-foreground/50">
                {cat.count}
              </span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price Range Section */}
      <div className="space-y-4">
        <div className="flex w-full items-center justify-between">
          <span className="font-bold text-foreground">Price Range</span>
        </div>
        <div className="pt-2 px-1">
          <Slider
            defaultValue={[filters.minPrice, filters.maxPrice]}
            max={2000}
            step={50}
            onValueCommit={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 px-3 py-1.5 rounded border bg-background text-sm font-medium text-center">
              ${filters.minPrice}
            </div>
            <span className="text-muted-foreground">-</span>
            <div className="flex-1 px-3 py-1.5 rounded border bg-background text-sm font-medium text-center">
              ${filters.maxPrice}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Brand Section */}
      <Collapsible defaultOpen className="space-y-3">
        <CollapsibleTrigger className="flex w-full items-center justify-between group">
          <span className="font-bold text-foreground">Brand</span>
          <ChevronUp className="h-4 w-4 text-muted-foreground group-data-[state=closed]:hidden" />
          <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[state=open]:hidden" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-1 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {BRANDS.map((brand) => (
            <div key={brand} className="flex items-center gap-3 group">
              <Checkbox
                id={brand}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => handleBrandChange(brand)}
              />
              <Label
                htmlFor={brand}
                className="text-sm font-medium leading-none cursor-pointer text-muted-foreground group-hover:text-primary transition-colors"
              >
                {brand}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}