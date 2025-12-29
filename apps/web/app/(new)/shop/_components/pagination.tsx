// app/shop/components/pagination.tsx
"use client";

import { useQueryState } from "nuqs";
import { Button } from "@repo/ui/components/ui/button";

export default function Pagination({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) {
  const [, setPage] = useQueryState("page");

  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage((page - 1).toString())}
      >
        Prev
      </Button>

      <Button
        variant="outline"
        disabled={page === pageCount}
        onClick={() => setPage((page + 1).toString())}
      >
        Next
      </Button>
    </div>
  );
}
