"use client"

import { Button } from "@/components/ui/button"
import UploadImage from "./upload-image"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ImageNcategory() {
  return (
    <div className="col-span-1 flex flex-col gap-5 justify-between">
            <UploadImage/>
            <div className="w-full bg-muted/50 rounded-lg p-5">
                <h2 className="mb-3">Category</h2>
                <label htmlFor="productName" className="text-sm">Product Category</label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Product Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Product Category</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="w-fit  mt-3">
                    <Button className="p-3 rounded-full mr-0" variant="default"> Add Category</Button>
                </div>
            </div>
        </div>
  )
}