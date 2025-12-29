"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { createVariant, deleteVariant } from "../actions/category-actions";
import { ValueTags } from "./value-tags";
import { X } from "lucide-react";
import { VariantBuilderProps, Variant } from "../types";

export function VariantBuilder({ categoryId, initialVariants }: VariantBuilderProps) {
  const [variants, setVariants] = useState<Variant[]>(initialVariants);
  const [newVariantName, setNewVariantName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAddVariant = () => {
    if (!newVariantName.trim()) return;

    // Optimistically add the variant
    const newVariant: Variant = {
      id: Date.now(), // Temporary ID
      name: newVariantName.trim(),
      categoryId: categoryId,
      values: []
    };
    
    setVariants(prev => [...prev, newVariant]);
    setNewVariantName("");

    // Call server action
    startTransition(async () => {
      try {
        const result = await createVariant({ 
          name: newVariantName.trim(), 
          categoryId 
        });
        
        if (result.success && result.data?.variantId) {
          // Update with real ID
          setVariants(prev => 
            prev.map(v => 
              v.id === newVariant.id ? { ...v, id: result.data!.variantId! } : v
            )
          );
          toast.success("Variant added successfully");
        } else {
          // Remove the optimistic variant
          setVariants(prev => prev.filter(v => v.id !== newVariant.id));
          toast.error(result.error || "Failed to add variant");
        }
      } catch (error) {
        // Remove the optimistic variant
        setVariants(prev => prev.filter(v => v.id !== newVariant.id));
        toast.error("Failed to add variant");
      }
    });
  };

  const handleDeleteVariant = (id: number) => {
    // Find the variant to delete
    const variantToDelete = variants.find(v => v.id === id);
    if (!variantToDelete) return;

    // Optimistically remove the variant
    setVariants(prev => prev.filter(v => v.id !== id));

    // If this was an optimistic variant (negative ID), no need to call server
    if (id < 0) return;

    // Call server action
    startTransition(async () => {
      try {
        const result = await deleteVariant(id);
        
        if (!result.success) {
          // Revert the optimistic update
          setVariants(prev => [...prev, variantToDelete]);
          toast.error(result.error || "Failed to delete variant");
        } else {
          toast.success("Variant deleted successfully");
        }
      } catch (error) {
        // Revert the optimistic update
        setVariants(prev => [...prev, variantToDelete]);
        toast.error("Failed to delete variant");
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddVariant();
    } else if (e.key === "Escape") {
      setNewVariantName("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={newVariantName}
          onChange={(e) => setNewVariantName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a variant (e.g., Color, Size)..."
          className="flex-1"
          disabled={isPending}
        />
        <Button 
          onClick={handleAddVariant}
          disabled={isPending || !newVariantName.trim()}
        >
          Add Variant
        </Button>
      </div>

      <div className="space-y-4">
        {variants.map((variant) => (
          <Card key={variant.id} className="bg-card text-card-foreground shadow-sm rounded-lg border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
              <CardTitle className="text-lg font-medium">{variant.name}</CardTitle>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteVariant(variant.id)}
                disabled={isPending}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ValueTags 
                variantId={variant.id} 
                initialValues={variant.values} 
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}