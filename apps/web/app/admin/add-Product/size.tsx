"use client";
import { Bold, Italic, Underline } from "lucide-react"
 
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
export default function Size() {
  return (
    <div className='pt-3'>
        <label htmlFor="">Size</label>
        <p className="text-xs text-muted-foreground">pick Available Size</p>
        <ToggleGroup variant="default" type="multiple" className='w-full flex justify-around'>
            <ToggleGroupItem value="2XS" aria-label="Toggle underline">
                2XS
            </ToggleGroupItem>
            <ToggleGroupItem value="XS" aria-label="Toggle bold">
                XS
            </ToggleGroupItem>
            <ToggleGroupItem value="S" aria-label="Toggle italic">
                S
            </ToggleGroupItem>
            <ToggleGroupItem value="M" aria-label="Toggle underline">
                M
            </ToggleGroupItem>
            <ToggleGroupItem value="L" aria-label="Toggle underline">
                L
            </ToggleGroupItem>
            <ToggleGroupItem value="XL" aria-label="Toggle underline">
                XL
            </ToggleGroupItem>
            <ToggleGroupItem value="2XL" aria-label="Toggle underline">
                2XL
            </ToggleGroupItem>

        </ToggleGroup>
    </div>  )
}
