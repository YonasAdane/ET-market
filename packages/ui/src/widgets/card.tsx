import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryType } from "@/lib/types";
import { Heart } from "lucide-react";
import Image from "next/image"

type Props = {
  type?:CategoryType;
  image:string;
  name:string;
  price:number;
  prevPrice:number;
  description?:string;
  brand?:{id:number,name:string};
}

export default function PorductCard(props:Props) {
  switch (props.type) {
    case "CLOTHING":
        return <ClothesCard {...props}/>
    case "FOOTWEAR":
        return <FootwerCard {...props}/>
    case "ACCESSORY":
        return <AccessoryCard {...props}/>
    case "BAG":
        return <BagCard {...props}/>
    case "WATCH":
        return <WatchCard {...props}/>
    case "UNDERWEAR":
        return <UnderwearCard {...props}/>
    case "OUTERWEAR":
        return <OuterwearCard {...props}/>        
    default:
        return <ClothesCard {...props}/>
  }
}


function ClothesCard({image,name,price,prevPrice,description,type}: Props) {
  return (
    <Card className="group  border rounded-xl overflow-hidden flex flex-col justify-between">
      <div className="relative w-full overflow-hidden ">
        <div className="absolute top-4 right-4 z-20 rounded-full p-2 duration-200 hover:bg-slate-600/10">
          <Heart fill="#111" size={20}/>
        </div>
        <img
          className="relative h-full w-full rounded-lg object-contain transition duration-300 ease-in-out group-hover:scale-105" 
          width={276} height={500} src={image} alt="product-picture"
        />
        <div className="w-full flex absolute bottom-0 items-end p-4 opacity-0  group-hover:opacity-100 duration-1000">
          <Button variant={"default"} className="w-full  text-sm">Add to Cart</Button>
        </div >
      </div>
      <CardContent>
        <div className="w-full flex justify-between">
          <CardTitle className="text-xl font-medium">{name}</CardTitle>
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

function FootwerCard({image,name,price,prevPrice,description}: Props) {
  return (
    <Card className="group  border rounded-xl overflow-hidden flex flex-col justify-between">
      <div className="relative w-full overflow-hidden ">
        <div className="absolute top-4 right-4 z-20 rounded-full p-2 duration-200 hover:bg-slate-600/10">
          <Heart fill="#111" size={20}/>
        </div>
        <img
          className="relative h-full w-full rounded-lg object-contain transition duration-300 ease-in-out group-hover:scale-105" 
          width={276} height={500} src={image} alt="product-picture"
        />
        <div className="w-full flex absolute bottom-0 items-end p-4 opacity-0  group-hover:opacity-100 duration-1000">
          <Button variant={"default"} className="w-full  text-sm">Add to Cart</Button>
        </div >
      </div>
      <CardContent>
        <div className="w-full flex justify-between">
          <CardTitle className="text-xl font-medium">{name}</CardTitle>
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

function AccessoryCard({image,name,price,prevPrice,description}: Props) {
  return (
    <Card className="group  border rounded-xl overflow-hidden flex flex-col justify-between">
      <div className="relative w-full overflow-hidden ">
        <div className="absolute top-4 right-4 z-20 rounded-full p-2 duration-200 hover:bg-slate-600/10">
          <Heart fill="#111" size={20}/>
        </div>
        <img
          className="relative h-full w-full rounded-lg object-contain transition duration-300 ease-in-out group-hover:scale-105" 
          width={276} height={500} src={image} alt="product-picture"
        />
        <div className="w-full flex absolute bottom-0 items-end p-4 opacity-0  group-hover:opacity-100 duration-1000">
          <Button variant={"default"} className="w-full  text-sm">Add to Cart</Button>
        </div >
      </div>
      <CardContent>
        <div className="w-full flex justify-between">
          <CardTitle className="text-xl font-medium">{name}</CardTitle>
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

function BagCard({image,name,price,prevPrice}: Props) {
  return (
    <Card className="group  border rounded-xl overflow-hidden flex flex-col justify-between max-w-72">
      <div className="relative w-full overflow-hidden ">
        <div className="absolute top-4 right-4 z-20 rounded-full p-2 duration-200 hover:bg-slate-600/10">
          <Heart fill="#111" size={20}/>
        </div>
        <img
          className="relative h-full w-full rounded-lg object-contain transition duration-300 ease-in-out group-hover:scale-105" 
          width={300} height={300} src={image} alt="product-picture"
        />
      </div>
      <CardContent>
        <CardTitle className="text-lg font-medium text-center">{name}</CardTitle>
        <div className="w-full flex justify-center items-center gap-3">
          <CardDescription className="font-bold text-lg">${price}</CardDescription>
          <CardDescription className="line-through text-red-500">${prevPrice}</CardDescription>
        </div>
        <Button variant={"outline"} className="w-fit rounded-full h-10 block  px-3 mx-auto border-2 text-sm">Add to Cart</Button>
      </CardContent>
    </Card>
  );
}

function WatchCard({image,name,price,prevPrice,brand}: Props) {
  return (
    <Card className=" rounded-none flex flex-col justify-between">
      <div className="relative w-full  group">
        <div className="absolute top-4 right-4 z-20 rounded-full p-2 duration-200 hover:bg-slate-600/10">
          <Heart fill="#111" size={20}/>
        </div>
        <img
          className="relative h-full w-full  object-contain transition duration-300 ease-in-out " 
          width={300} height={300} src={image} alt="product-picture"
        />
        <div className="w-full flex absolute bottom-0 items-end p-4 opacity-0  group-hover:opacity-100 duration-1000">
          <Button variant={"secondary"} className="w-full hover:bg-secondary-foreground hover:text-secondary  text-sm">Add to Cart</Button>
        </div >
      </div>
      <CardContent className="pt-5">
          <p className="text-xs">{brand?.name}</p>
          <CardTitle className="text-base font-medium">{name}</CardTitle>
        <div className="w-full flex justify-between">
          <CardDescription className="font-bold text-xl">${price}</CardDescription>
          <CardDescription className="line-through">${prevPrice}</CardDescription>
        </div>
        <div className="w-full flex justify-between">
        </div>
      </CardContent>
    </Card>
  );
}

function UnderwearCard({image,name,price,prevPrice,description}: Props) {
  return (
    <Card className="group  border overflow-hidden flex flex-col justify-between">
      <div className="relative w-full overflow-hidden ">
        <div className="absolute top-4 right-4 z-20 rounded-full p-2 duration-200 hover:bg-slate-600/10">
          <Heart fill="#111" size={20}/>
        </div>
        <img
          className="relative h-full w-full rounded-lg object-contain transition duration-300 ease-in-out group-hover:scale-105" 
          width={276} height={500} src={image} alt="product-picture"
        />
        <div className="w-full flex absolute bottom-0 items-end p-4 opacity-0  group-hover:opacity-100 duration-1000">
          <Button variant={"default"} className="w-full  text-sm">Add to Cart</Button>
        </div >
      </div>
      <CardContent>
        <div className="w-full flex justify-between">
          <CardTitle className="text-xl font-medium">{name}</CardTitle>
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

function OuterwearCard({image,name,price,prevPrice,description}: Props) {
  return (
    <Card className="group  border rounded-xl overflow-hidden flex flex-col justify-between">
      <div className="relative w-full overflow-hidden ">
        <div className="absolute top-4 right-4 z-20 rounded-full p-2 duration-200 hover:bg-slate-600/10">
          <Heart fill="#111" size={20}/>
        </div>
        <img
          className="relative h-full w-full rounded-lg object-contain transition duration-300 ease-in-out group-hover:scale-105" 
          width={276} height={500} src={image} alt="product-picture"
        />
        <div className="w-full flex absolute bottom-0 items-end p-4 opacity-0  group-hover:opacity-100 duration-1000">
          <Button variant={"default"} className="w-full  text-sm">Add to Cart</Button>
        </div >
      </div>
      <CardContent>
        <div className="w-full flex justify-between">
          <CardTitle className="text-xl font-medium">{name}</CardTitle>
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
