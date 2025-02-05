"use client";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from 'app/components/form';

export default function Gender({control,name}:{control:any,name:string}) {
  return (
    <div className='pt-3'>
        <FormField
            name={name}
            control={control}
            render={({field})=>(
                <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormDescription className="text-xs text-muted-foreground">pick Available Gender</FormDescription>
                    <FormControl>
                        <ToggleGroup {...field}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value }
                            variant="outline" type="single" className='w-full flex justify-around'>
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
                    </FormControl>
                </FormItem>
            )}
        />
    </div> 
      )
}
