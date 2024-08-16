import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
import { Card } from '@/components/ui/card'
import React from 'react'
import Link from "next/link";

type Props = {
    image:string;
    title:string;
    link:string;
}

export default function BrandCard({image,title,link}: Props) {
  return (
    <Card className='w-[250px] h-[250px] rounded-lg p-4 pb-6 flex justify-center items-center ' >
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Link href={link}>
                        <img className="w-full" src={image} alt="brand-picture" />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </Card>
  )
}