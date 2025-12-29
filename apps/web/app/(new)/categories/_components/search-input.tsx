// src/components/shop/search-input.tsx
"use client";
import { useQueryState } from 'nuqs';
import { Input } from "@repo/ui/components/ui/input";
import { useEffect, useState } from "react";
import { Search } from 'lucide-react';

export function SearchInput({ defaultValue }: { defaultValue: string }) {
  const [query, setQuery] = useQueryState('q', { shallow: false, defaultValue: '' });
  const [localValue, setLocalValue] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(localValue || null);
    }, 500);
    return () => clearTimeout(timer);
  }, [localValue, setQuery]);

  return (
    <div className="relative w-full max-w-md">
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search products..."
        className="pl-10 bg-muted/50"
      />
      <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted-foreground"><Search/></span>
    </div>
  );
}