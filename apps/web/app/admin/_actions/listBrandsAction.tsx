"use server"
import { SelectGroup, SelectItem, SelectLabel } from '@repo/ui/components/ui/select';
import { db } from "app/lib/config/prisma-config";
export async function ListBrands(){
    const brands=await db.brand.findMany();
    return(
        <SelectGroup>
            <SelectLabel>Brands of Products</SelectLabel>
            {
                brands.map(brand=>(
                <SelectItem key={brand.id} value={`${brand.id}`}>{brand.name}</SelectItem>
                ))
            }
        </SelectGroup>
    )
}


