"use client";
import { Button } from "@/components/ui/button";

function TryAgainButton() {
    return (
        <Button onClick={() => window.location.reload()}>Try Again</Button>
    )
}

export default TryAgainButton;
