"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import { Button } from "@repo/ui/components/ui/button";
import { Card } from "@repo/ui/components/ui/card";
import { Slider } from "@repo/ui/components/ui/slider";
import { filterProduct } from "@repo/ui/lib/constants";
import { CategoryType } from "@repo/ui/lib/types";
import { cn } from "@repo/ui/lib/utils";
import { useAppSelector } from "@repo/redux-utils/libs/redux/store";
import CheckboxByStar from "@repo/ui/widgets/subComponents/CheckboxByStar.tsx";
import CheckboxByText from "@repo/ui/widgets/subComponents/CheckboxByText.tsx";
import { getBrandsByCategory } from "app/admin/_actions/brandAction";
import { getCategoryByType } from "app/admin/_actions/categoryAction";
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from "react";

import { useMemo } from "react";

// 👇 Custom debounce utility (no lodash)
function debounce<F extends (...args: any[]) => any>(func: F, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

type Props = {
  type: CategoryType;
  className?: string;
  price?: {
    min: number;
    max: number;
  };
};

// Static accordion default (avoids recreation on every render)
const DEFAULT_ACCORDION_VALUES = [
  "item-1", "item-2", "item-3", "item-4",
  "item-5", "item-6", "item-7", "item-8", "item-9"
];

export default function FilterSidebar({ type, className, price }: Props) {
  const [brands, setBrands] = useState<
    { id: number; name: string; description: string | null }[]
  >([]);
  const [category, setCategory] = useState<
    { id: number; name: string; description: string | null }[]
  >([]);

  // Fetch data when `type` changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allBrands, allCategories] = await Promise.all([
          getBrandsByCategory(type),
          getCategoryByType(type),
        ]);
        setBrands(allBrands);
        setCategory(allCategories);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      }
    };

    fetchData();
  }, [type]);

  const isSidebarOpen = useAppSelector((state) => state.sidebar.value);
  const sidebarClasses = cn(
    "max-w-[20vw] w-full rounded-none border-none transform transition-all duration-500 ease-in-out",
    isSidebarOpen
      ? "translate-x-0 opacity-100"
      : "-translate-x-full opacity-0 w-0",
    className
  );

  const data = useMemo(() => filterProduct[type], [type]);

  const formRef = useRef<HTMLFormElement>(null);
  const [sliderPrice, setSliderPrice] = useState<number>(price?.max || 1000);

  const router = useRouter();
  const pathname = usePathname();

  // Create stable debounced function
  const debouncedUpdateUrl = useMemo(
    () => debounce(() => {
      if (!formRef.current) return;

      const formData = new FormData(formRef.current);
      formData.set("priceValue", sliderPrice.toString());

      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        if (value) params.append(key, value as string);
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400),
    [pathname, sliderPrice, router]
  );

  // Trigger debounced update on any form change
  const handleFormChange = useCallback(() => {
    debouncedUpdateUrl();
  }, [debouncedUpdateUrl]);

  const handleSliderChange = useCallback(
    (value: number[]) => {
      setSliderPrice(value[0] ?? (price?.max || 1000));
    },
    [price?.max]
  );

  // Remove the problematic useEffect cleanup - it's not needed
  // useEffect(() => {
  //   return () => {
  //     clearTimeout(debouncedUpdateUrl);
  //   };
  // }, [debouncedUpdateUrl]);

  return (
    <Card className={sidebarClasses}>
      <form ref={formRef} onChange={handleFormChange}>
        <Accordion
          type="multiple"
          defaultValue={DEFAULT_ACCORDION_VALUES}
          className="w-full p-5"
        >
          {/* Brand */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">
              Brand
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {brands.map((brand) => (
                <CheckboxByText
                  key={`brand-${brand.id}`}
                  name="brandId"
                  value={`${brand.id}`}
                  text={brand.name}
                  id={`brand-${brand.id}`}
                />
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Category */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">
              Category
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {category.map((cat) => (
                <CheckboxByText
                  key={`cat-${cat.id}`}
                  name="categoryId"
                  value={`${cat.id}`}
                  text={cat.name}
                  id={`cat-${cat.id}`}
                />
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Gender */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">
              Gender
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <CheckboxByText name="gender" value="male" text="Male" id="gender-male" />
              <CheckboxByText name="gender" value="female" text="Female" id="gender-female" />
              <CheckboxByText name="gender" value="unisex" text="Unisex" id="gender-unisex" />
            </AccordionContent>
          </AccordionItem>

          {/* Dynamic filters from `filterProduct` */}
          {data?.map((item, i) => (
            <AccordionItem key={`filter-${i}`} value={`item-${i + 4}`}>
              <AccordionTrigger className="font-semibold text-xl hover:no-underline">
                {item.name}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1">
                {item.value.map((val, j) => (
                  <CheckboxByText
                    key={`filter-${i}-opt-${j}`}
                    name={item.name}
                    value={val}
                    text={val}
                    id={`${item.name}-${val}`}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}

          {/* Price */}
          {price && (
            <AccordionItem value="item-8">
              <AccordionTrigger className="font-semibold text-xl hover:no-underline">
                Price
              </AccordionTrigger>
              <AccordionContent className="flex flex-col items-center gap-2 w-full">
                <div className="w-full flex justify-between items-center gap-5">
                  <Button variant="outline" className="rounded-none h-8">
                    {price.min}
                  </Button>
                  <span>-</span>
                  <Button variant="outline" className="rounded-none h-8">
                    {price.max}
                  </Button>
                </div>
                <div className="w-full">
                  <Slider
                    value={[sliderPrice]}
                    onValueChange={handleSliderChange}
                    min={price.min}
                    max={price.max}
                    step={100}
                    className="border border-slate-600 rounded-sm"
                  />
                  <label className="block mt-1 text-center">${sliderPrice}</label>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Ratings */}
          <AccordionItem value="item-9">
            <AccordionTrigger className="font-semibold text-xl hover:no-underline">
              Ratings
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <CheckboxByStar />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Card>
  );
}