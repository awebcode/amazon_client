import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useNavigate, createSearchParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

const CarouselCategory = () => {
  const navigate = useNavigate();
  const searchCategory = (category) => {
    navigate({
      pathname: "search",
      search: `${createSearchParams({
        category: `${category}`,
        searchTerm: ``,
      })}`,
    });
  };

  return (
    <div className="h-[100%] bg-white -mt-80 p-4 max-w-[100%] relative">
      <div className="lg:text-4xl font-semibold p-3 sm:text-2xl">Shop by Category</div>
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="lg:max-w-screen-lg flex items-center justify-center sm:max-w-screen-sm"
      >
        <SwiperSlide onClick={() => searchCategory("Deals")} className="cursor-pointer">
          <img src={"/category/2.jpg"} alt="Deal category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("Amazon")} className="cursor-pointer">
          <img src={"/category/4.jpg"} alt="Amazon category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("Fashion")} className="cursor-pointer">
          <img src={"/category/3.jpg"} alt="Fashion category" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Computers")}
          className="cursor-pointer"
        >
          <img src={"/category/7.jpg"} alt="Computers category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("Home")} className="cursor-pointer">
          <img src={"/category/6.jpg"} alt="Home category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("Mobiles")} className="cursor-pointer">
          <img src={"/category/1.jpg"} alt="Mobiles category" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Computers")}
          className="cursor-pointer"
        >
          <img src={"/images/product_8.jpg"} alt="Computers category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("Home")} className="cursor-pointer">
          <img src={"/images/product_13.jpg"} alt="Home category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("Mobiles")} className="cursor-pointer">
          <img src={"/images/product_12.jpg"} alt="Mobiles category" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CarouselCategory;
