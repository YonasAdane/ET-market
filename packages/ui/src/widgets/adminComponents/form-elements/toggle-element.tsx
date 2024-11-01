"use client";
 
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
export default function ToogleElement({description,control,name,label,values,select}:{description?:string,control:any,label:string,name:string,select?:"single"|"multiple",values:string[]}) {
  return (
    <div className='mt-2'>
        <FormField
        control={control}
        name={name}
        render={({field})=>(
            <FormItem >
                <FormLabel>{label}</FormLabel>
                <FormDescription className="text-xs">{description}</FormDescription>
                <FormControl>
                    <ToggleGroup {...field} variant="outline" type={select?select:"multiple"} className='w-full flex justify-around flex-wrap'>
                        {values.map(size=>(

                        <ToggleGroupItem key={size} value={size} aria-label="Toggle underline">
                             {size}
                        </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        />
    </div>  )
}
