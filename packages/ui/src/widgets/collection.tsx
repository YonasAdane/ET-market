import { Button } from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import Link from "next/link"
export const Collection = () => {
    let CollectionList=[ 
        {name:"Bags",link:"/me"},
        {name:"Drinkware",link:"/me"},
        {name:"Electronics",link:"/me"},
        {name:"Footware",link:"/me"},
        {name:"Headwear",link:"/me"},
        {name:"Hoodies",link:"/me"},
        {name:"Jackets",link:"/me"},
        {name:"Kids",link:"/me"},
        {name:"Pets",link:"/me"},
        {name:"Shirts",link:"/me"},
        {name:"Stickers",link:"/me"}]
  return (
    <Card className="order-first w-full flex text-start flex-col md:max-w-[125px]">
        <Button variant="link" asChild>      
            <Link className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400" href="/login">All</Link>
        </Button>
        {CollectionList.map(item=>
        <Button className="w-full block" variant="link" asChild>
            <Link href={item.link}>{item.name}</Link>
        </Button>
        )}
       
       
        
    </Card>
)
}