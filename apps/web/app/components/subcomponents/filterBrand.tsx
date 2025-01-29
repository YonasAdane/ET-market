import { AccordionContent } from '@/components/ui/accordion';
import CheckboxByText from '@/widgets/subComponents/CheckboxByText';
import { getBrandsByCategory } from 'app/admin/_actions/brandAction';
import { CategoryType } from 'app/lib/types';

export async function FilterBrand({type}:{type:CategoryType}) {
     const brands = await getBrandsByCategory(type);
     console.log(brands);
     
  return (
    <AccordionContent className="flex flex-col gap-1">
        {brands.map((item)=>(
        <CheckboxByText name="brandId" value={`${item.id}`} key={`${item.id}q`} text={item.name} id={item.name}/>
        ))}
    </AccordionContent>
  )
}

export default FilterBrand