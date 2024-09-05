"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CategoryType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {useAppSelector } from "@repo/redux-utils/libs/redux/store";
import { useCallback, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CheckboxByText from "./subComponents/CheckboxByText";
import CheckboxByStar from "./subComponents/CheckboxByStar";
import { filterProduct } from "@/lib/constants";
type Props = {
  type: CategoryType;
  className?: string;
  price?: {
    min: number;
    max: number;
  };
  brandsNcategory: {
    brand: {
      id: number;
      name: string;
      logoUrl?: string;
    };
    category: {
      id: number;
      name: string;
      description?: string;
    };
  }[];
};

export default function FilterSidebar(props: Props) {
  let isSidebarOpen=useAppSelector(state=>state.sidebar.value);
  let Cnames=`transform transition-all duration-500 ease-in-out ${
    isSidebarOpen ? "translate-x-0 " : "-translate-x-full opacity-0 w-0"
  }`
  let data=filterProduct[props.type];
  let categories=props.brandsNcategory.map(item=>(item.category));
  let brands=props.brandsNcategory.map(item=>(item.brand));

  let categorySet=[...new Set(categories.map(item=>JSON.stringify(item)))].map(product=>JSON.parse(product));
  let brandSet=[...new Set(brands.map(item=>JSON.stringify(item)))].map(product=>JSON.parse(product));

  const formRef = useRef(null); 
  const [price,setPrice]=useState<number>(props.price?.max || 255);
  const handleSliderChange = (value:Array<number>) => {
    setPrice(value[0]!); 
  };
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const createQueryString = useCallback(
    () => {
      const formData = new FormData(formRef.current!); 
      const asString = new URLSearchParams(formData).toString();
      console.log("asString : ",asString);
      setTimeout(() => {
        router.push(`${pathname}?${asString}`);
      }, 700);
    },
    [searchParams]
  )
  return (
    <Card className={cn("max-w-[20vw] w-full rounded-none border-none",props.className,Cnames)}>
      <form ref={formRef} onChange={()=>{
        createQueryString()
      }}>
        <Accordion type="multiple"  defaultValue={["item-1", "item-2", "item-3","item-4","item-5","item-6","item-7","item-8"]} className="w-full p-5">
          <AccordionItem  value="item-1">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Brand</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {brandSet.map((item)=>(
                <CheckboxByText name="brandId" value={String(item.id)} key={item.id+"a"} text={item.name} id={item.name}/>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-2">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Category</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {categorySet.map(item=>(
                <CheckboxByText name={item.name} value={String(item.id)} key={item.id+"b"} text={item.name} id={item.name}/>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem  value="item-3">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Gender</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <CheckboxByText name="gender" value='male' text="Male" id="male"/>
              <CheckboxByText name="gender" value='female' text="Female" id="female"/>
              <CheckboxByText name="gender" value='unisex' text="Unisex" id="unisex"/>
            </AccordionContent>
          </AccordionItem>
          {data.map((item,i)=>(
          <AccordionItem  key={i+"d"} value={`item-${i+4}`}>
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">{item.name}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {item.value.map((value,j)=>(
                <CheckboxByText key={j*i} name={item.name} value={value} text={value} id={value}/>  
              ))}
            </AccordionContent>
          </AccordionItem>
          ))}
          {props.price &&(
          <AccordionItem  value="item-8">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Price</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <div className=" flex flex-col items-center gap-2 w-full ">
                <div className="w-full flex justify-between items-center gap-5" >
                  <Button variant="outline" className="rounded-none block h-8">94</Button>
                  <div>-</div>
                  <Button variant="outline" className="rounded-none block h-8">2466</Button>
                </div>
                <div className="w-full">
                  <Slider value={[price]} onValueChange={handleSliderChange} name="priceValue" className="border border-slate-600 rounded-sm" defaultValue={[500]} min={props.price.min} max={props.price.max} step={100}/>
                  <label className="block " htmlFor="banana">${price}</label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          )}
          <AccordionItem   value="item-9">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">Ratings</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 ">
              <CheckboxByStar/>
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>
      </form>
    </Card>
  )
}
