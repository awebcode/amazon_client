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
      <div className="custom_border md:text-5xl font-bold p-3 text-2xl m-6 md:p-6">
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
          className="cursor-pointer m-2  h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/elec2.jpg"}
            alt="Electronic category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("vehicles")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/vehi.png"}
            alt="vihicles category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Furniture")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/Furniture.jpg"}
            alt="Furniture category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Jewellery")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/jwel2.png"}
            alt="Jewellery category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("food")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/food2.png"}
            alt="food category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("sports")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/sports2.png"}
            alt="sports category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("dress")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/dress2.png"}
            alt="dress category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("cosmetic")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/cos2.png"}
            alt="cosmetic category"
          />
        </SwiperSlide>

        <SwiperSlide
          onClick={() => searchCategory("Medicine")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/medi2.png"}
            alt="Medicince category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Business products")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/busi.png"}
            alt="Business products category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("music")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/music.png"}
            alt="music category"
          />
        </SwiperSlide>

        <SwiperSlide
          onClick={() => searchCategory("the fine arts")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/arts.png"}
            alt="the fine arts category"
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("others")}
          className="cursor-pointer m-2 h-auto w-auto md:h-[200px] md:w-[200px]"
        >
          <img
            className="w-[100%] h-[100%] object-contain"
            src={"/category/other.png"}
            alt="others category"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CarouselCategory2;
