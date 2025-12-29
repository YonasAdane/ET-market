"use client";

import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitBarProps } from "../types";

export function SubmitBar({ isPending, onSubmit }: SubmitBarProps) {
  const router = useRouter();
  const [isTransitioning, startTransition] = useTransition();

  const handleCancel = () => {
    startTransition(() => {
      router.push("/admin/categories");
    });
  };

  return (
    <div className="sticky bottom-0 bg-background/80 backdrop-blur border-t border-border p-4">
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isPending || isTransitioning}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isPending || isTransitioning}
        >
          {isPending ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
}