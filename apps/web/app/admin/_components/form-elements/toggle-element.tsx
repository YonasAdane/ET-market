"use client";
 
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@repo/ui/components/ui/toggle-group";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "app/components/form";

export default function ToggleElement({
  description,
  control,
  name,
  label,
  values,
  select,
}: {
  description?: string;
  control: any;
  label: string;
  name: string;
  select?: "single" | "multiple";
  values: string[];
}) {
  return (
    <div className="mt-2">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormDescription className="text-xs">{description}</FormDescription>
            <FormControl>
              <ToggleGroup
                type={select ?? "multiple"}
                variant="outline"
                className="w-full flex justify-around flex-wrap"
                value={field.value}
                onValueChange={field.onChange} // ✅ Correct event
              >
                {values.map((val) => (
                  <ToggleGroupItem key={val} value={val} aria-label={val}>
                    {val}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
