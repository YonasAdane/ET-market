"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Badge } from "@repo/ui/components/ui/badge";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { createValue, deleteValue } from "../actions/category-actions";
import { ValueTagsProps, Value } from "../types";

export function ValueTags({ variantId, initialValues }: ValueTagsProps) {
  const [values, setValues] = useState<Value[]>(initialValues);
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddValue = () => {
    if (!inputValue.trim()) return;

    // Optimistically add the value
    const newValue: Value = {
      id: Date.now(), // Temporary ID
      value: inputValue.trim(),
      variantId: variantId
    };
    
    setValues(prev => [...prev, newValue]);
    setInputValue("");

    // Call server action
    startTransition(async () => {
      try {
        const result = await createValue({ 
          value: inputValue.trim(), 
          variantId 
        });
        
        if (result.success && result.data?.valueId) {
          // Update with real ID
          setValues(prev => 
            prev.map(v => 
              v.id === newValue.id ? { ...v, id: result.data!.valueId! } : v
            )
          );
          toast.success("Value added successfully");
        } else {
          // Remove the optimistic value
          setValues(prev => prev.filter(v => v.id !== newValue.id));
          toast.error(result.error || "Failed to add value");
        }
      } catch (error) {
        // Remove the optimistic value
        setValues(prev => prev.filter(v => v.id !== newValue.id));
        toast.error("Failed to add value");
      }
    });
  };

  const handleDeleteValue = (id: number) => {
    // Find the value to delete
    const valueToDelete = values.find(v => v.id === id);
    if (!valueToDelete) return;

    // Optimistically remove the value
    setValues(prev => prev.filter(v => v.id !== id));

    // If this was an optimistic value (negative ID), no need to call server
    if (id < 0) return;

    // Call server action
    startTransition(async () => {
      try {
        const result = await deleteValue(id);
        
        if (!result.success) {
          // Revert the optimistic update
          setValues(prev => [...prev, valueToDelete]);
          toast.error(result.error || "Failed to delete value");
        } else {
          toast.success("Value deleted successfully");
        }
      } catch (error) {
        // Revert the optimistic update
        setValues(prev => [...prev, valueToDelete]);
        toast.error("Failed to delete value");
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddValue();
    } else if (e.key === "Escape") {
      setInputValue("");
      inputRef.current?.blur();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <Badge 
            key={value.id} 
            variant="secondary" 
            className="flex items-center gap-1 pr-1"
          >
            {value.value}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleDeleteValue(value.id)}
              disabled={isPending}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a value..."
          className="flex-1"
          disabled={isPending}
        />
        <Button 
          type="button"
          onClick={handleAddValue}
          disabled={isPending || !inputValue.trim()}
        >
          Add
        </Button>
      </div>
    </div>
  );
}