"use client"
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import {A11y,Autoplay,Controller,EffectCoverflow,EffectCube,EffectFade,EffectFlip,EffectCreative,EffectCards,HashNavigation,History,Keyboard,Lazy,Mousewheel,Navigation,Pagination,Parallax,Scrollbar,Thumbs,Virtual,Zoom,FreeMode,Grid,Manipulation} from 'swiper/modules';

type Props = {}

const Slider = (props: Props) => {
  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide><div className='w-40 h-40 border'>Slide 1</div></SwiperSlide>
        <SwiperSlide><div className='w-40 h-40 border'>Slide 2</div></SwiperSlide>
        <SwiperSlide><div className='w-40 h-40 border'>Slide 3</div></SwiperSlide>
        <SwiperSlide><div className='w-40 h-40 border'>Slide 4</div></SwiperSlide>
        <SwiperSlide><div className='w-40 h-40 border'>Slide 5</div></SwiperSlide>
        <SwiperSlide><div className='w-40 h-40 border'>Slide 6</div></SwiperSlide>
        <SwiperSlide><div className='w-40 h-40 border'>Slide 7</div></SwiperSlide>
        <SwiperSlide><div className='w-40 h-40 border'>Slide 8</div></SwiperSlide>
        <SwiperSlide><div className='w-40 h-40 border'>Slide 9</div></SwiperSlide>
      </Swiper>
  )
}

export default Slider