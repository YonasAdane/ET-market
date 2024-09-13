import FilterSidebar from '@/widgets/filter-sidebar';
import PorductCard from '@repo/ui/widgets/card.tsx';
import { CollectionHeader } from '@repo/ui/widgets/collection-header.tsx'
import {CategoryType} from "../../lib/types"
import { findProducts, findProductsBrand } from 'app/lib/fetchers/product';
export default async function  Collections({ params,searchParams }: { params: { collectionName: string },searchParams:string }) {
  const { collectionName } = params;
  const data=await findProducts(collectionName,searchParams);
  const brandsNcategory=await findProductsBrand(collectionName);
  console.log("BrandsNcategory",brandsNcategory);
  
  return (
    <div > 
      <div className='w-11/12 mx-auto my-5'>
        <CollectionHeader name={collectionName}/>
        <div className='flex justify-between gap-5 my-5 '>
            <FilterSidebar type={collectionName.toUpperCase() as CategoryType ||"CLOTHING"} brandsNcategory={brandsNcategory} />
            <div className='w-full  grid grid-cols-3 gap-6  h-fit'>
              {data && data?.map((product:{id:number,name:string,description:string,price:number,imageUrl:string,brand:{id:number,name:string}}) => (
                  <PorductCard  
                    key={product.id} 
                    image={product.imageUrl}
                    name={product.name} 
                    brand={product.brand}
                    description={product.description}
                    price={product.price}
                    prevPrice={2130}
                    type={collectionName.toUpperCase() as CategoryType ||"CLOTHING"} />
                ))}
            </div>
         </div>
      </div> 
    </div>
  )
}