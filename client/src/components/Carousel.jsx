import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { CardHeader } from "@mui/material";
import CarouselCategory from "./CarouselCategory";

const Carousel = () => {
  return (
    <>
      <div className="h-[600px] bg-white">
        <Swiper
          loop={true}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 4500,
          }}
          className="h-[50%]"
        >
          <SwiperSlide>
            <img src={"/carousel/1.jpg"} alt="Carousel POR" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={"/carousel/3.jpg"} alt="Carousel POR" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={"/carousel/2.jpg"} alt="Carousel POR" />
          </SwiperSlide>
          <SwiperSlide className="bg-black">
            <img src={"/carousel/7.jpg"} type="video/mp4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={"/carousel/4.jpg"} alt="Carousel POR" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={"/carousel/5.jpg"} alt="Carousel POR" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={"/carousel/6.jpg"} alt="Carousel POR" />
          </SwiperSlide>
        </Swiper>
        <div className="h-[50%] bg-gradient-to-b from-stone-900" />
      </div>
    <CarouselCategory/>
    </>
  );
};

export default Carousel;
