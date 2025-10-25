'use client';

import { Button } from "@repo/ui/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">
        {error.message || "Failed to load the collection"}
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}