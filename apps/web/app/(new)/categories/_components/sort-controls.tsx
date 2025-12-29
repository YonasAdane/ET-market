// apps/web/app/(new)/categories/_components/sort-controls.tsx
"use client";

import { useQueryState } from "nuqs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@repo/ui/components/ui/select";
import { Button } from "@repo/ui/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

export function SortControls({ total }: { total: number }) {
  // Sync sort state with URL
  const [sort, setSort] = useQueryState("sort", { 
    defaultValue: "featured",
    shallow: false 
  });
  
  // Local state for view toggle (optional to sync with URL)
  const [view, setView] = useQueryState("view", {
    defaultValue: "grid",
    shallow: true // UI only change, doesn't need server fetch
  });

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-bold text-foreground">1-{total > 12 ? 12 : total}</span> of{" "}
        <span className="font-bold text-foreground">{total}</span> results
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
          <Select value={sort} onValueChange={(val) => setSort(val)}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex bg-muted p-1 rounded-lg ml-auto sm:ml-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-7 w-7 rounded-sm p-0",
              view === "grid" && "bg-background shadow-sm"
            )}
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-7 w-7 rounded-sm p-0",
              view === "list" && "bg-background shadow-sm"
            )}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}