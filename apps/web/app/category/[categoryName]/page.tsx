import Footer from '@repo/ui/widgets/footer';
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import PorductCard from '@repo/ui/widgets/card.tsx';
import { CollectionHeader } from '@repo/ui/widgets/collection-header.tsx';
import { findProducts } from 'app/admin/_actions/productAction';
import FilterSidebar from 'app/components/filter-sidebar';
import { NavigationBar } from 'app/components/navigationBar';
import { CategoryArray } from 'app/lib/consts';
import { CategoryType as ZcategoryType } from 'app/lib/types/product';
import { Suspense } from 'react';
import { CategoryType } from "../../lib/types";
// export function generateStaticParams(){
//   return CategoryArray.map(item=>item.toLowerCase())
// }
export default async function  Collections({ params,searchParams }: { params: { categoryName: Promise<CategoryType> },searchParams:any }) {
  const categoryName =(await params.categoryName).toUpperCase() as CategoryType;
  console.log("param pararam:  ",categoryName);
  if(CategoryArray.filter(item=>item.toLowerCase()))
    if(ZcategoryType.safeParse(categoryName).error){
        console.log("error validating page data");
        return;
      }
// if (!(CategoryArray).includes(categoryName.toUpperCase())) {
//   }
 

  return (
    <>
      <NavigationBar categoryArray={CategoryArray}/>
      <div > 
        <div className='w-11/12 mx-auto my-5'>
          <CollectionHeader name={categoryName}/>
          <div className='flex justify-between gap-5 my-5 '>
              <FilterSidebar type={categoryName as CategoryType ||"CLOTHING"}  />
              <div className='w-full  grid grid-cols-3 gap-6  h-fit'>
                <Suspense fallback={<ProductLoader/>}>
                  <ProductList categoryName={categoryName as CategoryType} searchParams={searchParams}/>
                </Suspense>
              </div>
          </div>
        </div> 
      </div>
        
      <Footer className="mt-4 rounded-none"/>
    </>
  )
}

async function ProductList({categoryName,searchParams}:{categoryName: CategoryType, searchParams: any}){
  console.log("categoryName  :",categoryName);
  
  const data=await findProducts(categoryName as CategoryType, searchParams);
  console.log("Watch data: ",data);
  
  return(<>
      {data ? data?.map((product) => (
          <PorductCard
            id={product.id}
            key={product.id}
            image={product.images[0]?.url||""}
            name={product.name}
            brand={{id:product.brand?.id||0,name:product.brand?.name || ""}}
            description={product.description||"The boy"}
            price={product.price}
            prevPrice={2130}
            type={categoryName.toUpperCase() as CategoryType } 
            />
        )):(
          <h2>No Data</h2>
        )
      }
  </>)
}

function ProductLoader(){
  return([1,2,3].map((_)=><Skeleton className=" h-96 rounded-xl" />))
}