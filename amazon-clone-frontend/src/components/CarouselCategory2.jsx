import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useNavigate, createSearchParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

const CarouselCategory2 = () => {
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
    <div className="h-[100%] bg-white  p-4">
      <div className="md:text-5xl font-bold p-3 text-2xl m-6 md:p-6">
        Shop by Category
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
      >
        <SwiperSlide
          onClick={() => searchCategory("Electronics")}
          className="cursor-pointer h-[150px] w-[150px]"
        >
          <img className="w-[100%] h-[100%] object-contain" src={"/category/electronics.png"} alt="Electronic category" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Furniture")}
          className="cursor-pointer h-[150px] w-[150px]"
        >
          <img className="w-[100%] h-[100%] object-contain" src={"/category/Furniture.jpg"} alt="Furniture category" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Jewellery")}
          className="cursor-pointer h-[150px] w-[150px]"
        >
          <img className="w-[100%] h-[100%] object-contain" src={"/category/Jewellery.jpg"} alt="Jewellery category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("food")} className="cursor-pointer h-[150px] w-[150px]">
          <img className="w-[100%] h-[100%] object-contain" src={"/category/food.jpg"} alt="food category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("sports")} className="cursor-pointer h-[150px] w-[150px]">
          <img className="w-[100%] h-[100%] object-contain" src={"/category/sports.jpg"} alt="sports category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("dress")} className="cursor-pointer h-[150px] w-[150px]">
          <img className="w-[100%] h-[100%] object-contain" src={"/category/dress.jpg"} alt="dress category" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("cosmetic")}
          className="cursor-pointer h-[150px] w-[150px]"
        >
          <img className="w-[100%] h-[100%] object-contain" src={"/category/cosmetic.jpg"} alt="cosmetic category" />
        </SwiperSlide>

        <SwiperSlide
          onClick={() => searchCategory("Medicince")}
          className="cursor-pointer h-[150px] w-[150px]"
        >
          <img className="w-[100%] h-[100%] object-contain" src={"/category/medicine.jpg"} alt="Medicince category" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Business products")}
          className="cursor-pointer h-[150px] w-[150px]"
        >
          <img className="w-[100%] h-[100%] object-contain" src={"/category/Business products.jpg"} alt="Business products category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("music")} className="cursor-pointer h-[150px] w-[150px]">
          <img className="w-[100%] h-[100%] object-contain" src={"/category/music.jpg"} alt="music category" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("vihicles")}
          className="cursor-pointer h-[150px] w-[150px]"
        >
          <img className="w-[100%] h-[100%] object-contain" src={"/category/vihicles.jpg"} alt="vihicles category" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("the fine arts")}
          className="cursor-pointer h-[150px] w-[150px]"
        >
          <img className="w-[100%] h-[100%] object-contain" src={"/category/the fine arts.jpg"} alt="the fine arts category" />
        </SwiperSlide>
        <SwiperSlide onClick={() => searchCategory("others")} className="cursor-pointer h-[150px] w-[150px]">
          <img className="w-[100%] h-[100%] object-contain" src={"/category/others.png"} alt="others category" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CarouselCategory2;
