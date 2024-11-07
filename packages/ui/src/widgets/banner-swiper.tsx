"use client"
import { Button } from "@/components/ui/button";
//@ts-ignore
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//@ts-ignore
import { Autoplay, Controller, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Image from "next/image";

export default function BannerSwiper() {
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
                        <SwiperSlide>
                            <div className="relative h-fit w-full overflow-hidden">
                                <Image
                                    src="https://www.justwatches.com/cdn/shop/files/1920x667-ps.jpg?v=1712144660"
                                    alt="Timex x The Waterbury Classics"
                                    className="w-full h-fit" objectFit="1920x667"
                                    width={1920}
                                    height={667}
                                //   fill
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent h-full">
                                    <div className="container flex h-full flex-col justify-end p-10 text-white">
                                    <h1 className="text-4xl font-bold md:text-6xl">Timex x The Waterbury Classics</h1>
                                    <p className="mt-4 text-lg">Meet the next generation of classic</p>
                                    <div className="mt-8 flex space-x-4">
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Men
                                        </Button>
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Women
                                        </Button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-fit w-full overflow-hidden">
                                <Image
                                    src="https://www.justwatches.com/cdn/shop/files/1920x667-GC_20242f94-a4d3-45e2-9807-ff12f508f90f.jpg?v=1719468430"
                                    alt="Timex x The Waterbury Classics"
                                    className="w-full h-fit" objectFit="1920x667"
                                    width={1920}
                                    height={667}
                                //   fill
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent h-full">
                                    <div className="container flex h-full flex-col justify-end p-10 text-white">
                                    <h1 className="text-4xl font-bold md:text-6xl">Timex x The Waterbury Classics</h1>
                                    <p className="mt-4 text-lg">Meet the next generation of classic</p>
                                    <div className="mt-8 flex space-x-4">
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Men
                                        </Button>
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Women
                                        </Button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-fit w-full overflow-hidden">
                                <Image
                                    src="https://www.justwatches.com/cdn/shop/files/Timex_main_homepage_banner.jpg?v=1713764330"
                                    alt="Timex x The Waterbury Classics"
                                    className="w-full h-fit" objectFit="1920x667"
                                    width={1920}
                                    height={667}
                                //   fill
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent h-full">
                                    <div className="container flex h-full flex-col justify-end p-10 text-white">
                                    <h1 className="text-4xl font-bold md:text-6xl">Timex x The Waterbury Classics</h1>
                                    <p className="mt-4 text-lg">Meet the next generation of classic</p>
                                    <div className="mt-8 flex space-x-4">
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Men
                                        </Button>
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Women
                                        </Button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-fit w-full overflow-hidden">
                                <Image
                                    src="https://www.justwatches.com/cdn/shop/files/1920x667-GUESS_76a14755-8d82-4f82-a579-a760b1ab00bc.jpg?v=1719468383"
                                    alt="Timex x The Waterbury Classics"
                                    className="w-full h-fit" objectFit="1920x667"
                                    width={1920}
                                    height={667}
                                //   fill
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent h-full">
                                    <div className="container flex h-full flex-col justify-end p-10 text-white">
                                    <h1 className="text-4xl font-bold md:text-6xl">Timex x The Waterbury Classics</h1>
                                    <p className="mt-4 text-lg">Meet the next generation of classic</p>
                                    <div className="mt-8 flex space-x-4">
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Men
                                        </Button>
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Women
                                        </Button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-fit w-full overflow-hidden">
                                <Image
                                    src="https://www.justwatches.com/cdn/shop/files/1920x667-GC_20242f94-a4d3-45e2-9807-ff12f508f90f.jpg?v=1719468430"
                                    alt="Timex x The Waterbury Classics"
                                    className="w-full h-fit" objectFit="1920x667"
                                    width={1920}
                                    height={667}
                                //   fill
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent h-full">
                                    <div className="container flex h-full flex-col justify-end p-10 text-white">
                                    <h1 className="text-4xl font-bold md:text-6xl">Timex x The Waterbury Classics</h1>
                                    <p className="mt-4 text-lg">Meet the next generation of classic</p>
                                    <div className="mt-8 flex space-x-4">
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Men
                                        </Button>
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Women
                                        </Button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-fit w-full overflow-hidden">
                                <Image
                                    src="https://www.justwatches.com/cdn/shop/files/Versace_Post_1920x667_3c844f41-bbdc-4816-9724-2cd4cd1ef5f5.jpg?v=1729510276"
                                    alt="Timex x The Waterbury Classics"
                                    className="w-full h-fit" objectFit="1920x667"
                                    width={1920}
                                    height={667}
                                //   fill
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent h-full">
                                    <div className="container flex h-full flex-col justify-end p-10 text-white">
                                    <h1 className="text-4xl font-bold md:text-6xl">Timex x The Waterbury Classics</h1>
                                    <p className="mt-4 text-lg">Meet the next generation of classic</p>
                                    <div className="mt-8 flex space-x-4">
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Men
                                        </Button>
                                        <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black">
                                        Shop Women
                                        </Button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
        </Swiper>
    </section>
  )
}
