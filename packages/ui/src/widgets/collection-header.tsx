"use Client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownIcon, SlidersHorizontal, User } from "lucide-react";

export function CollectionHeader() {
  return (
    <Card className="rounded-none border-none max-w-screen-md min-w-[80vw] flex justify-between">
        <Button variant="outline" className="rounded-full text-xl border-2  inline-flex">
            <div>Show Filters</div>
            <SlidersHorizontal className="mx-2  " size={18}/>
        </Button>
        <h2 className="text-xl">Men's Runners</h2>
        <div className="w-1/2 h-full flex justify-end">
        <Select >
            <SelectTrigger className="w-65 text-xl rounded-full border-2 focus:outline-none outline-none active:outline-none" >
                <SelectValue placeholder="Select a fruit" className="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Best Match</SelectItem>
                <SelectItem value="banana">Price: Low to High</SelectItem>
                <SelectItem value="blueberry">Price: High to Low</SelectItem>
                <SelectItem value="grapes">Newest Arrivals</SelectItem>
                </SelectGroup>
            </SelectContent>
            </Select>
        {/* <Select>
            <SelectTrigger asChild>
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className="w-56">s
                <SelectItem value="Best Match">
                    <User className="mr-2 h-4 w-4" />
                    <span>Best Match</span>
                </SelectItem>
                <SelectItem value="Price: Low to High">
                    <User className="mr-2 h-4 w-4" />
                    <span>Price: Low to High</span>
                </SelectItem>
                <SelectItem value="Price: High to Low">
                    <User className="mr-2 h-4 w-4" />
                    <span>Price: High to Low</span>
                </SelectItem>
                <SelectItem value="Newest Arrivals">
                    <User className="mr-2 h-4 w-4" />
                    <span>Newest Arrivals</span>
                </SelectItem>
            </SelectContent>
        </Select> */}
        </div>
    </Card>
  )
}
