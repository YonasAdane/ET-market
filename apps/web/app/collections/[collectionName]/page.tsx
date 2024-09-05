import FilterSidebar from '@/widgets/filter-sidebar';
import PorductCard from '@repo/ui/widgets/card.tsx';
import { CollectionHeader } from '@repo/ui/widgets/collection-header.tsx'
import {CategoryType} from "../../lib/types"
import { findProducts, findProductsBrand } from 'app/lib/fetchers/product';
const clothing = [
  {
    id: 1,
    name: "MacBook Pro 13",
    prevPrice:1200,
    description:"Mobile phone",
    price: 999.99,
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
  },
  {
    id: 2,
    name: "iPhone 13 Pro",
    prevPrice:1200,
    description:"Mobile phone",
    price: 699.99,
    image:
      "https://media.istockphoto.com/id/1309717274/vector/realistic-black-modern-thin-frame-display-computer-monitor-vector-illustration-jpg.jpg?s=612x612&w=0&k=20&c=hWFdkv0V09HqWjqRy2w93ikw2RBAcoxrhXq_9AQsOhQ=",
  },
  {
    id: 3,
    name: "Sony Headphones",
    prevPrice:1200,
    description:"Mobile phone",
    price: 349.99,
    image:
      "https://cdn.mos.cms.futurecdn.net/MfGHFkGhpcwwNQ7VikCkej-1200-80.jpg",
  },
  {
    id: 4,
    name: "Apple Watch Series 7",
    prevPrice:1200,
    description:"Mobile phone",
    price: 399.99,
    image:
      "https://www.apple.com/newsroom/images/product/watch/standard/Apple_watch-series7-availability_hero_10052021_big.jpg.large.jpg",
  },
  {
    id: 5,
    name: "iPad Air 4",
    prevPrice:1200,
    description:"Mobile phone",
    price: 599.99,
    image:
      "https://www.cultofmac.com/wp-content/uploads/2020/09/CD387101-6D45-4664-A623-7D250668F782.jpeg",
  },
  {
    id: 6,
    name: "AirPods Pro",
    prevPrice:1200,
    description:"Mobile phone",
    price: 249.99,
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
  },
  {
    id: 7,
    name: "Seagate Hard Drive",
    prevPrice:1200,
    description:"Mobile phone",
    price: 79.99,
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
  },
  {
    id: 8,
    name: "PlayStation 5 Console",
    prevPrice:1200,
    description:"Mobile phone",
    price: 499.99,
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2022/08/macbook-2048px-9765.jpg",
  },
];
const watches=[
  {
    id: 1,
    name: "MacBook Pro 13",
    prevPrice:1200,
    description:"TIMEX",
    price: 999.99,
    image:
      "https://cdn.shopify.com/s/files/1/0046/3454/2129/files/TW2V44700U9_1.jpg?v=1708690089&width=1000",
  },
  
  {
    id: 2,
    name: "Timex Men Black Round Dial Analog Watch",
    prevPrice:1200,
    description:"TIMEX",
    price:12995 ,
    image:
      "https://www.justwatches.com/cdn/shop/files/TWEG20208.jpg?v=1718772043&width=1000",
  },
  {
    id: 3,
    name: "Gc Tiara Women Round Dial Quartz Analog Watch",
    prevPrice:1200,
    description:"GC",
    price:38995 ,
    image:
      "https://www.justwatches.com/cdn/shop/files/Z41002L1MF_7.jpg?v=1709643466&width=1000",
  },
  {
    id: 4,
    name: "Gc Prodigy Men Round Dial Quartz Analog Watch",
    prevPrice:1200,
    description:"GC",
    price:38995 ,
    image:
      "//www.justwatches.com/cdn/shop/files/Z39005G3MF_7.jpg?v=1709643209&width=1000",
  },
  {
    id: 5,
    name: "Guess Lotus Women Round Dial Quartz Analog Watch",
    prevPrice:1200,
    description:"GUESS",
    price:11897 ,
    image:
      "https://www.justwatches.com/cdn/shop/files/GW0667L1_1.jpg?v=1709641243&width=1000",
  },
  {
    id: 6,
    name: "Nautica Clearwater Beach Black Dial Round Case Quartz Analog ",
    prevPrice:1200,
    description:"Nautica",
    price:13995 ,
    image:
      "https://www.justwatches.com/cdn/shop/files/NAPCWS303.jpg?v=1693570172&width=1000",
  },
  {
    id: 7,
    name: "Nautica KOH May Bay Black Dial Round Case Quartz Analog ",
    prevPrice:1200,
    description:"NAUTICA",
    price:15995 ,
    image:
      "https://www.justwatches.com/cdn/shop/files/NAPKMS301_11.jpg?v=1724757856&width=1000",
  },
  {
    id: 8,
    name: "United Colors of Benetton Social Black Dial Round Case Quartz Analog ",
    prevPrice:4797,
    description:"UNITED COLORS OF BENETTON",
    price:4797 ,
    image:
      "https://www.justwatches.com/cdn/shop/products/UWUCG0101_1.jpg?v=1639658902&width=1000",
  },
  {
    id: 9,
    name: "Ladies Baby-G Blue Watch BG-169PB-2ER",
    prevPrice:1200,
    description:"CASIO",
    price:38995 ,
    image:
      "https://www.houseofwatches.co.uk/media/catalog/product/cache/34b4a13777517e40e5b794fdc3ecddeb/2/1/21-52-233_01_dropshadow.jpg",
  },
  {
    id: 10,
    name: "Baby-G Transparent Blue Digital Watch BGD-565SJ-2ER",
    prevPrice:1200,
    description:"CASIO",
    price:66.95 ,
    image:
      "https://www.houseofwatches.co.uk/media/catalog/product/2/1/21-52-25121847_casio_05.jpg",
  },
  
]
export default async function  Collections({ params,searchParams }: { params: { collectionName: string },searchParams:string }) {
  const { collectionName } = params;
  // const babo=new URLSearchParams(searchParams).toString();
  // console.log("query params from the page",babo);
  const data=await findProducts(collectionName,searchParams);
  // console.log(`the URL--- http://localhost:4000/api/v1/products/${collectionName}?${babo}`);
  
  const brandsNcategory=await findProductsBrand(collectionName);
  
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