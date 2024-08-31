"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { CategoryType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {useAppSelector } from "@repo/redux-utils/libs/redux/store";
import { Star, StarHalf } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
type Props = {
    type:CategoryType,
    className?:string
}

export default function FilterSidebar(props: Props) {
  let isSidebarOpen=useAppSelector(state=>state.sidebarReducer.value);
  let Cnames=`transform transition-all duration-500 ease-in-out ${
    isSidebarOpen ? "translate-x-0 " : "-translate-x-full opacity-0 w-0"
  }`
  switch (props.type) {
    case "CLOTHING":
        return <ClothingFilter {...props} className={Cnames}/>
    case "FOOTWEAR":
        return <FootwerFilter {...props} className={Cnames}/>
    case "ACCESSORY":
        return <AccessoryFilter {...props} className={Cnames}/>
    case "BAG":
        return <BagFilter {...props} className={Cnames}/>
    case "WATCH":
        return <WatchFilter {...props} className={Cnames}/>
    case "UNDERWEAR":
        return <UnderwearFilter {...props} className={Cnames}/>
    case "OUTERWEAR":
        return <OuterwearFilter {...props} className={Cnames}/>        
    default:
        return <ClothingFilter {...props} className={Cnames}/>
  }
}

function FootwerFilter(props:Props) {
  return (
    <Card className={cn("absolute left-0 top-0 h-full max-w-[20vw] w-full  rounded-none border-none ", props.className)}>
      <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="w-full ">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold text-xl hover:no-underline">Brand</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Checkbox id="apple" />
              <label
                htmlFor="apple"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Apple
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="boss" />
              <label
                htmlFor="boss"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Boss
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match the other components' aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}


function ClothingFilter(props:Props) {
  const formRef = useRef(null); // Step 1: Create a ref for the form
  const [price,setPrice]=useState<number>(2466);
  const handleSliderChange = (value:Array<number>) => {
    setPrice(value[0]!); 
  };
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const createQueryString = useCallback(
    () => {
      // const params = new URLSearchParams(searchParams.toString())
      
      const formData = new FormData(formRef.current!); 
      // const data = Object.fromEntries(formData.entries()); 
      
      const asString = new URLSearchParams(formData).toString();
      console.log("asString : ",asString);
      
      // params.set("/search", asString)
      const timeout = setTimeout(() => {
        router.push(`${pathname}?${asString}`);
      }, 1000);
    },
    [searchParams]
  )
  return (
    <Card className={cn("max-w-[20vw] w-full rounded-none border-none",props.className)}>
      <form ref={formRef} onChange={()=>{
        createQueryString()
      }}>
        <Accordion type="multiple"  defaultValue={["item-1", "item-2", "item-3","item-4","item-5","item-6"]} className="w-full p-5">
          <AccordionItem  value="item-1">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Brand</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  PUMA
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  NIKE
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  ADIDAS
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-2">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Gender</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Male
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Female
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Unisex
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-6">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">SIZE</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {[
                "2XS",
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "2XL",
                "3XL",
              ].map((item,i)=>(
              <div className=" flex items-center gap-2">
                <Checkbox id={`${i}`} value={item} name="size" className="" />
                <label
                  htmlFor={`${i}`}
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-5">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Fabric</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
                {['Cotton Blend',
                'Pure Cotton',
                'Polycotton',
                'Lycra Blend',
                'Cotton Lycra',
                'Polyester',
                'Viscose Rayon',
                'Cotton Linen',
                'Cotton Silk',
                'Satin',
                'Denim',
                'Poly Viscose',
                'Corduroy',
                'Linen Blend',
                'Silk Blend',
                'Pure Linen',
                'Poly Silk',
                'Crepe',
                'Chiffon',
                'Lyocell',
                'Wool Blend',
                'Nylon',
                'Modal'].map(item=>(
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>

  ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-3">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Price</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className=" flex flex-col items-center gap-2 w-full ">
                <div className="w-full flex justify-between items-center gap-5" >
                  <Button variant="outline" className="rounded-none block h-8">94</Button>
                  <div>-</div>
                  <Button variant="outline" className="rounded-none block h-8">2466</Button>
                </div>
                <div className="w-full">
                  <Slider value={[price]} onValueChange={handleSliderChange} name="banana" className="border border-slate-600 rounded-sm" defaultValue={[500]} min={90} max={2466} step={100}/>
                  <label className="block " htmlFor="banana">${price}</label>
                </div>
              </div>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem   value="item-4">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Ratings</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 ">
              <div className=" flex flex-col  items-start gap-2 w-full ">
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  {/* <StarHalf fill="##d9d9d9" stroke="##d9d9d9" size={18}/> */}
                </div>
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                </div>
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                </div>
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                </div>
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                </div>

              </div>
              
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>
      </form>
    </Card>
  )
}
  function AccessoryFilter(props:Props) {
    return (
      <div>AccessoryFilter</div>
    )
  }
  function BagFilter(props:Props) {
    return (
      <div>BagFilter</div>
    )
  }
  function WatchFilter(props:Props) {
    const [price,setPrice]=useState<number>(2466);
    const handleSliderChange = (value:Array<number>) => {
      setPrice(value[0]!); 
    };
    return (
      <Card className={cn("max-w-[20vw] w-full rounded-none border-none",props.className)}>
        <Accordion type="multiple"  defaultValue={["item-1", "item-2", "item-3","item-4","item-5","item-6"]} className="w-full p-5">
          <AccordionItem  value="item-1">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Brand</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Apple
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Boss
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-2">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Gender</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Male
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Female
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Unisex
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-6">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Type</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Analog
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Digital
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-5">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Strap Material</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Genuine Leather
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Metal

                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Plastic

                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Silicone
                  
                </label>
              </div>
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" className="" />
                <label
                  htmlFor="terms"
                  className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Stainless Steel
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-3">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Price</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className=" flex flex-col items-center gap-2 w-full ">
                <div className="w-full flex justify-between items-center gap-5" >
                  <Button variant="outline" className="rounded-none block h-8">94</Button>
                  <div>-</div>
                  <Button variant="outline" className="rounded-none block h-8">2466</Button>
                </div>
                <div className="w-full">
                  <Slider value={[price]} onValueChange={handleSliderChange} name="banana" className="border border-slate-600 rounded-sm" defaultValue={[500]} min={90} max={2466} step={100}/>
                  <label className="block " htmlFor="banana">${price}</label>
                </div>
              </div>
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem   value="item-4">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Ratings</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 ">
              <div className=" flex flex-col  items-start gap-2 w-full ">
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  {/* <StarHalf fill="##d9d9d9" stroke="##d9d9d9" size={18}/> */}
                </div>
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                </div>
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                </div>
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                </div>
                <div className="flex gap-2">
                  <Checkbox/>
                  <Star fill="#ffc400" stroke="#ffc400" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                  <Star fill="#d9d9d9" stroke="#d9d9d9" size={18}/>
                </div>

              </div>
              
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>
      </Card>
    )
  }

  function UnderwearFilter(props:Props) {
    return (
      <div>UnderwearFilter</div>
    )
  }
  function OuterwearFilter(props:Props) {
    return (
      <div>OuterwearFilter</div>
    )
  }
