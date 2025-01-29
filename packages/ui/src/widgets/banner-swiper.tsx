"use client"
import { Button } from "@/components/ui/button";
//@ts-ignore
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//@ts-ignore
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
//@ts-ignore
import Link from "next/link";
//@ts-ignore
import { Autoplay, Controller, Navigation, Pagination, Scrollbar } from "swiper/modules";

export type BannerProps={
    name:string,
    id:number,
    bannerImage?:{
        url:string,
    }
}[];

export default function BannerSwiper(props:BannerProps) {
  return (
    <section className="relative">
        <Swiper
// install Swiper modules
// modules={[Autoplay,Controller,Pagination, Scrollbar,Controller, A11y]}
                slidesPerView={1}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                scrollbar={{ draggable: true }}

                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation,Scrollbar,Controller]}
                className="mySwiper w-full "
                    >
                        {
                            props.length>0 && props.map(category=>(

                        <SwiperSlide key={category.id}>
                            <div className="relative h-fit w-full overflow-hidden">
                                <Image
                                    src={category.bannerImage?.url || ""}
                                    alt="Timex x The Waterbury Classics"
                                    className="w-full h-fit" objectFit="1920x667"
                                    width={1920}
                                    height={667}
                                //   fill
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent h-full">
                                    <div className="container flex h-full flex-col justify-end p-10 text-white">
                                    <h1 className="text-4xl font-bold md:text-6xl">{category.name}</h1>
                                    <p className="mt-4 text-lg">Meet the next generation products</p>
                                    <Link href={`/${category.id}`} className="mt-8 flex space-x-4">
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Men
                                        </Button>
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Women
                                        </Button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                            ))
                        }
        </Swiper>
    </section>
  )
}
