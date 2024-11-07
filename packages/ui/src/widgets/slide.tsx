
"use client"
import PorductCard from './card';
// @ts-ignore
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// @ts-ignore
import { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper/modules';

import 'swiper/css';
import "swiper/css/autoplay";
import "swiper/css/controller";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
export default function NewArivals() {
  const [swiperControll, setSwiperControll] = useState<any>(null);
  const [swiperControllSecond, setSwiperControllSecond] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // const swiper = useSwiper();
  // className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
  return (
    <section className="py-12 w-5/6 mx-auto">
          <div className="container px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <div className="flex space-x-2">
                <Button id='prev-button' variant="outline" size="icon" onClick={() => swiperControll.slidePrev()} >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button id='next-button' variant="outline" size="icon" onClick={() => swiperControll.slideNext()} >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                {/* <SlideNextButton/> */}
              </div>
            </div>
              <div className='w-full border-green-400'>
                <Swiper
                // Pagination, Scrollbar,Controller, A11y
                      // install Swiper modules
                      onSwiper={(swiper) => setSwiperControll(swiper)}
                      onSlideChange={() => setActiveIndex(swiperControll.activeIndex)}
                      modules={[Controller,Controller]}
                      controller={{ control: swiperControllSecond }}
                      spaceBetween={50}
                      slidesPerView={4}
                      // navigation={true}
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      autoplay={{delay:700}}
                      // onSwiper={(swiper) => console.log(swiper)}
                      // onSlideChange={() => console.log('slide change')}
                      className='w-full '
                    >
                    {
                    watches.map((product, index) => (
                        <SwiperSlide>
                          <PorductCard  
                              id={product.id}
                              key={product.name} 
                              image={product.imageUrl}
                              name={product.name} 
                              brand={{id:product.brandId,name:"CASIO"}}
                              description={product.description}
                              price={product.price}
                              prevPrice={2130}
                              type={"WATCH"} />
                        </SwiperSlide>
                    ))
                    }
            </Swiper>
      
              </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* {watches.slice(0,4).map((product, index) => (
                    <PorductCard  
                    id={product.id}
                    key={product.name} 
                    image={product.imageUrl}
                    name={product.name} 
                    brand={{id:product.brandId,name:"CASIO"}}
                    description={product.description}
                    price={product.price}
                    prevPrice={2130}
                    type={"WATCH"} />
                ))} */}

            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-10">
              
            </div>
          </div>
        </section>
    
  )
}
// export function SlideNextButton() {
//   const swiper = useSwiper();

//   return (
//     <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
//   );
// }
export const watches = [
    {
      id:100,
      name: "Timex MacBook Pro 13", // Sample name
      price: 999.99,
      description: "Timex MacBook Pro 13-inch watch, combining timeless design with modern technology.",
      imageUrl: "https://cdn.shopify.com/s/files/1/0046/3454/2129/files/TW2V44700U9_1.jpg?v=1708690089&width=1000",
      strapMaterial: "Leather", // Assuming strap material
      dialShape: "Round", // Assuming the dial shape
      waterResistance: "50m", // Assuming water resistance
      brandId: 27, // TIMEX brand ID from your data
      categoryId: 1, // Assuming category ID for watches
      categoryType: "ACCESSORY", // Assuming watches are under accessories
      stock: 50, // Sample stock value
    },
    {
      id:102,
      name: "Timex Men Black Round Dial Analog Watch",
      price: 12995,
      description: "A classic Timex men's watch with a black round dial and analog display.",
      imageUrl: "https://www.justwatches.com/cdn/shop/files/TWEG20208.jpg?v=1718772043&width=1000",
      strapMaterial: "Metal",
      dialShape: "Round",
      waterResistance: "100m",
      brandId: 27, // TIMEX brand ID
      categoryId: 1,
      categoryType: "ACCESSORY",
      stock: 100,
    },
    {
      id:103,
      name: "Gc Tiara Women Round Dial Quartz Analog Watch",
      price: 38995,
      description: "Elegant Gc Tiara watch for women with a round dial and quartz movement.",
      imageUrl: "https://www.justwatches.com/cdn/shop/files/Z41002L1MF_7.jpg?v=1709643466&width=1000",
      strapMaterial: "Leather",
      dialShape: "Round",
      waterResistance: "30m",
      brandId: 28, // GC brand ID
      categoryId: 1,
      categoryType: "ACCESSORY",
      stock: 70,
    },
    {
      id:104,
      name: "Gc Prodigy Men Round Dial Quartz Analog Watch",
      price: 38995,
      description: "Stylish Gc Prodigy watch for men with a round dial and quartz analog display.",
      imageUrl: "https://www.justwatches.com/cdn/shop/files/Z39005G3MF_7.jpg?v=1709643209&width=1000",
      strapMaterial: "Metal",
      dialShape: "Round",
      waterResistance: "50m",
      brandId: 28, // GC brand ID
      categoryId: 1,
      categoryType: "ACCESSORY",
      stock: 30,
    },
    {
      id:105,
      name: "Guess Lotus Women Round Dial Quartz Analog Watch",
      price: 11897,
      description: "Guess Lotus watch for women with a stylish round dial and quartz movement.",
      imageUrl: "https://www.justwatches.com/cdn/shop/files/GW0667L1_1.jpg?v=1709641243&width=1000",
      strapMaterial: "Metal",
      dialShape: "Round",
      waterResistance: "30m",
      brandId: 29, // GUESS brand ID
      categoryId: 1,
      categoryType: "ACCESSORY",
      stock: 40,
    },
    {
      id:106,
      name: "Nautica Clearwater Beach Black Dial Round Case Quartz Analog",
      price: 13995,
      description: "Nautica Clearwater Beach watch with a black dial and quartz analog display.",
      imageUrl: "https://www.justwatches.com/cdn/shop/files/NAPCWS303.jpg?v=1693570172&width=1000",
      strapMaterial: "Rubber",
      dialShape: "Round",
      waterResistance: "100m",
      brandId: 30, // Nautica brand ID
      categoryId: 1,
      categoryType: "ACCESSORY",
      stock: 60,
    },
    {
      id:107,
      name: "Nautica KOH May Bay Black Dial Round Case Quartz Analog",
      price: 15995,
      description: "Nautica KOH May Bay watch with a black dial and quartz analog movement.",
      imageUrl: "https://www.justwatches.com/cdn/shop/files/NAPKMS301_11.jpg?v=1724757856&width=1000",
      strapMaterial: "Rubber",
      dialShape: "Round",
      waterResistance: "200m",
      brandId: 30, // Nautica brand ID
      categoryId: 1,
      categoryType: "ACCESSORY",
      stock: 75,
    },
    {
      id:108,
      name: "United Colors of Benetton Social Black Dial Round Case Quartz Analog",
      price: 4797,
      description: "United Colors of Benetton Social watch with a black dial and quartz analog display.",
      imageUrl: "https://www.justwatches.com/cdn/shop/products/UWUCG0101_1.jpg?v=1639658902&width=1000",
      strapMaterial: "Leather",
      dialShape: "Round",
      waterResistance: "30m",
      brandId: 31, // UNITED COLORS OF BENETTON brand ID
      categoryId: 1,
      categoryType: "ACCESSORY",
      stock: 90,
    },
    {
      id:109,
      name: "Ladies Baby-G Blue Watch BG-169PB-2ER",
      price: 38995,
      description: "Ladies Baby-G watch in blue with digital display.",
      imageUrl: "https://www.houseofwatches.co.uk/media/catalog/product/cache/34b4a13777517e40e5b794fdc3ecddeb/2/1/21-52-233_01_dropshadow.jpg",
      strapMaterial: "Plastic",
      dialShape: "Round",
      waterResistance: "100m",
      brandId: 32, // CASIO brand ID
      categoryId: 1,
      categoryType: "ACCESSORY",
      stock: 35,
    },
    {
      id:110,
      name: "Baby-G Transparent Blue Digital Watch BGD-565SJ-2ER",
      price: 66.95,
      description: "Baby-G transparent blue digital watch with multiple functionalities.",
      imageUrl: "https://www.houseofwatches.co.uk/media/catalog/product/2/1/21-52-25121847_casio_05.jpg",
      strapMaterial: "Plastic",
      dialShape: "Square",
      waterResistance: "200m",
      brandId: 32, // CASIO brand ID
      categoryId: 1,
      categoryType: "ACCESSORY",
      stock: 25,
    },
  ];
  