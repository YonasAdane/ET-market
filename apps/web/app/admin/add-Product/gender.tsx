"use client";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import React from 'react'

export default function Gender() {
  return (
    <div className='pt-3'>
        <label htmlFor="">Gender</label>
        <p className="text-xs text-muted-foreground">pick Available Gender</p>
        <ToggleGroup variant="default" type="single" className='w-full flex justify-around'>
            <ToggleGroupItem value="Men" aria-label="Toggle underline">
                Men
            </ToggleGroupItem>
            <ToggleGroupItem value="Women" aria-label="Toggle bold">
                Women
            </ToggleGroupItem>
            <ToggleGroupItem value="Unisex" aria-label="Toggle italic">
                Unisex
            </ToggleGroupItem>
        </ToggleGroup>
    </div> 
      )
}
