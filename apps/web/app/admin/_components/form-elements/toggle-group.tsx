"use client";
import { ToggleGroupItem ,ToggleGroup} from '@repo/ui/components/ui/toggle-group'
import React from 'react'

type Props = {
    title:string;
    values:string[];
    select:"single"|"multiple"
}

export default function ToggleGroupComponent({title,values,select}: Props) {
  return (
    <div className=''>
        <label htmlFor="">{title}</label>
        <p className="text-xs text-muted-foreground">pick Available {title}</p>
        <ToggleGroup size={"sm"} variant="outline" type={select} className='w-full flex gap-5 justify-start'>
            {values.map(value=>(
                <ToggleGroupItem value={value} key={value} aria-label="Toggle underline">
                    <span className='capitalize'>{value}</span>
                </ToggleGroupItem>

            ))}
            
        </ToggleGroup>
    </div> 
)
}