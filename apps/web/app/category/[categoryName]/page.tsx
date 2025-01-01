import FilterSidebar from '@/widgets/filter-sidebar';
import Footer from '@/widgets/footer';
import { Navigation } from '@/widgets/Navigation';
import PorductCard from '@repo/ui/widgets/card.tsx';
import { CollectionHeader } from '@repo/ui/widgets/collection-header.tsx';
import { CategoryArray } from 'app/lib/consts';
import { findProducts, findProductsBrand } from 'app/lib/fetchers/product';
import { CategoryType } from "../../lib/types";

// export function generateStaticParams(){
//   return CategoryArray.map(item=>item.toLowerCase())
// }
export default async function  Collections({ params,searchParams }: { params: { categoryName: string },searchParams:string }) {
  const { categoryName } = params;
  const data=await findProducts(categoryName,searchParams);
  const brandsNcategory=await findProductsBrand(categoryName);
  console.log("BrandsNcategory",brandsNcategory);
  
  return (
    <>
      <Navigation categoryArray={CategoryArray}/>
      <div > 
        <div className='w-11/12 mx-auto my-5'>
          <CollectionHeader name={categoryName}/>
          <div className='flex justify-between gap-5 my-5 '>
              <FilterSidebar type={categoryName.toUpperCase() as CategoryType ||"CLOTHING"} brandsNcategory={brandsNcategory} />
              <div className='w-full  grid grid-cols-3 gap-6  h-fit'>
                {!data && (<h2>No Data</h2>)}
                {data && data?.map((product:{id:number,name:string,description:string,price:number,imageUrl:string,brand:{id:number,name:string}}) => (
                    <PorductCard 
                      id={product.id} 
                      key={product.id} 
                      image={product.imageUrl}
                      name={product.name} 
                      brand={product.brand}
                      description={product.description}
                      price={product.price}
                      prevPrice={2130}
                      type={categoryName.toUpperCase() as CategoryType ||"CLOTHING"} />
                  ))}
              </div>
          </div>
        </div> 
      </div>
        
      <Footer className="mt-4 rounded-none"/>
    </>
  )
}