import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react";
import Image from "next/image"

type Props = {
  image:string;
  name:string;
  price:number;
  prevPrice:number;
  description:string;
}

export default function PorductCard({image,name,price,prevPrice,description}: Props) {
  return (
    <Card className="group  border rounded-xl overflow-hidden">
      <div className="relative w-full overflow-hidden ">
        <div className="absolute top-4 right-4 z-20 rounded-full p-2 duration-200 hover:bg-slate-600/10">
          <Heart fill="#111" size={20}/>
        </div>
        <img
          className="relative h-full w-full rounded-lg object-contain transition duration-300 ease-in-out group-hover:scale-105" 
          width={276} height={500} src={image} alt="product-picture"
        />
        <div className="w-full flex absolute bottom-4 items-end p-4 opacity-0  group-hover:opacity-100 duration-700">
          <Button variant={"default"} className="w-full  text-sm">Add to Cart</Button>
        </div >
      </div>
      <CardContent>
        <div className="w-full flex justify-between">
          <CardTitle className="font-medium">{name}</CardTitle>
          <CardDescription className="font-bold text-xl">${price}</CardDescription>
        </div>
        <div className="w-full flex justify-between">
          <CardDescription>{description}</CardDescription>
          <CardDescription className="line-through">${prevPrice}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}

