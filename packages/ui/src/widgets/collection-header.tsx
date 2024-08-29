"use Client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownIcon, SlidersHorizontal, User } from "lucide-react";
import { ReactNode } from "react";
type Props={
    name?:string;
    children?:ReactNode;
}
export function CollectionHeader({name,children}:Props) {
  return (
    <Card className="rounded-none border-none max-w-screen min-w-[80vw] w-full flex justify-between">
        <Button variant="outline" className="rounded-full text-xl border-2  inline-flex">
            <div>Show Filters</div>
            <SlidersHorizontal className="mx-2  " size={18}/>
        </Button>
        <h2 className="text-xl capitalize">{name||"Search"}</h2>
        <div className="w-1/2 h-full flex justify-between">
        <div>{children}</div>
        <Select >
            <SelectTrigger className="w-65 text-xl rounded-full border-2 focus:outline-none outline-none active:outline-none" >
                <SelectValue placeholder="Filter" className="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="apple">Best Match</SelectItem>
                <SelectItem value="banana">Price: Low to High</SelectItem>
                <SelectItem value="blueberry">Price: High to Low</SelectItem>
                <SelectItem value="grapes">Newest Arrivals</SelectItem>
                </SelectGroup>
            </SelectContent>
            </Select>
        </div>
    </Card>
  )
}
