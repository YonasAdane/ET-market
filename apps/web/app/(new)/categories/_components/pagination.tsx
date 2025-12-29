// apps/web/app/(new)/categories/_components/pagination.tsx
"use client";

import { useQueryState } from "nuqs";
import { Button } from "@repo/ui/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({ totalItems, itemsPerPage }: PaginationProps) {
  const [page, setPage] = useQueryState("page", {
    parse: (value) => parseInt(value),
    defaultValue: 1,
    shallow: false,
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 pb-12">
      <Button
        variant="outline"
        size="icon"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Basic page numbers - could be optimized for many pages */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNum = i + 1;
        // Simple logic: show first, last, and current page surroundings
        if (pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - page) <= 1) {
          return (
            <Button
              key={pageNum}
              variant={page === pageNum ? "default" : "outline"}
              className="w-10 h-10"
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </Button>
          );
        }
        if (pageNum === page - 2 || pageNum === page + 2) {
          return <MoreHorizontal key={pageNum} className="text-muted-foreground" />;
        }
        return null;
      })}

      <Button
        variant="outline"
        size="icon"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}