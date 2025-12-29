// src/components/shop/sidebar-filters.tsx
"use client";

import React, { useEffect } from "react";
import { useQueryStates } from "nuqs";
import { productSearchParams,filterSchema, type FilterValues } from "../validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Slider } from "@repo/ui/components/ui/slider";
import { Label } from "@repo/ui/components/ui/label";
import { Button } from "@repo/ui/components/ui/button";

const BRANDS = [
  { id: "sony", label: "Sony", count: 12 },
  { id: "bose", label: "Bose", count: 8 },
  { id: "apple", label: "Apple", count: 14 },
];

export default function SidebarFilters() {
  // 1. Sync with URL via nuqs
  const [params, setParams] = useQueryStates(productSearchParams, {
    shallow: false, // Triggers server-side re-render
  });

  // 2. Initialize Form
  const { register, handleSubmit, setValue, watch, reset } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      brands: params.brands,
    },
  });

  const watchedBrands = watch("brands");
  const watchedPrice = watch(["minPrice", "maxPrice"]);

  // 3. Update URL when form values change (Debounced for Slider)
  useEffect(() => {
    const timer = setTimeout(() => {
      setParams({
        minPrice: watchedPrice[0],
        maxPrice: watchedPrice[1],
        brands: watchedBrands,
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [watchedPrice, watchedBrands, setParams]);

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const current = new Set(watchedBrands);
    if (checked) current.add(brandId);
    else current.delete(brandId);
    setValue("brands", Array.from(current));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Categories Section */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Categories
        </h3>
        <Accordion type="single" collapsible className="w-full border-none">
          <AccordionItem value="electronics" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline hover:bg-accent rounded-lg px-2">
              <span className="text-sm font-semibold">Electronics</span>
            </AccordionTrigger>
            <AccordionContent className="pl-4 flex flex-col gap-1 mt-1">
              <Button variant="ghost" size="sm" className="justify-start text-primary bg-primary/10">
                Headphones
              </Button>
              <Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
                Cameras
              </Button>
              <Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
                Laptops & PC
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <hr className="border-border" />

      {/* Price Range Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Price Range
        </h3>
        <div className="flex items-center justify-between gap-3">
          <div className="rounded border px-3 py-1 text-sm w-full text-center">
            ${watchedPrice[0]}
          </div>
          <span className="text-muted-foreground">-</span>
          <div className="rounded border px-3 py-1 text-sm w-full text-center">
            ${watchedPrice[1]}
          </div>
        </div>
        <Slider
          defaultValue={[params.minPrice, params.maxPrice]}
          max={2000}
          step={50}
          onValueChange={(vals) => {
            if(vals.length && vals[0] && vals[1]){

              setValue("minPrice", vals[0]);
              setValue("maxPrice", vals[1]);
            }
          }}
          className="py-4"
        />
      </div>

      <hr className="border-border" />

      {/* Brands Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Brands
        </h3>
        {BRANDS.map((brand) => (
          <div key={brand.id} className="flex items-center space-x-2">
            <Checkbox
              id={brand.id}
              checked={watchedBrands.includes(brand.id)}
              onCheckedChange={(checked) => handleBrandChange(brand.id, !!checked)}
            />
            <Label
              htmlFor={brand.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
            >
              {brand.label}
            </Label>
            <span className="text-xs text-muted-foreground">{brand.count}</span>
          </div>
        ))}
      </div>

      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4"
        onClick={() => {
          reset({ minPrice: 0, maxPrice: 2000, brands: [] });
          setParams({ minPrice: null, maxPrice: null, brands: null });
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
}