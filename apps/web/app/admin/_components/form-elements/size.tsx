"use client";
 
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from 'app/components/form';
export default function Size({control,name,values}:{control:any,name:string,values:string[]}) {
  return (
    <div className='pt-3'>
        <FormField
        control={control}
        name={name}
        render={({field})=>(
            <FormItem >
                <FormLabel>Size</FormLabel>
                <FormDescription className="text-xs text-muted-foreground">pick Available Size</FormDescription>
                <FormControl>
                    <ToggleGroup {...field} variant="outline" type="multiple" className='w-full flex justify-around'>
                        {values.map(size=>(

                        <ToggleGroupItem value={size} key={size} aria-label="Toggle underline">
                             {size}
                        </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </FormControl>
            </FormItem>
        )}
        />
    </div>  )
}
