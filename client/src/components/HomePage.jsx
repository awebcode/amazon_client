import { useGetAllProductQuery, useGetProductQuery } from "../redux/productApi";
import { Carousel, HomePageCard, CarouselCategory, CarouselProduct } from "./";
import CarouselCategory2 from "./CarouselCategory2";
const products = [
  {
    id: 12525252,
    title: "Product 1",
    description: "Description of Product 1",
    ratings: 4.5,
    image: "/images/product_10_small.jpg",
    price: 100,
    lessPrice: 90,
    sold: 50,
    quantity: 1,
  },
  {
    id: 22525,
    title: "Product 2",
    description: "Description of Product 2",
    ratings: 4.2,
    image: "/images/product_12.jpg",
    price: 120,
    lessPrice: 110,
    sold: 50,
    quantity: 1,
  },
  {
    id: 32525,
    title: "Product 3",
    description: "Description of Product 3",
    ratings: 4.8,
    image: "/images/product_13_small.jpg",
    price: 150,
    lessPrice: 140,
    sold: 50,
    quantity: 1,
  },
  {
    id: 42552,
    title: "Product 6",
    description: "Description of Product 6",
    ratings: 1.5,
    image: "/carousel/6.jpg",
    price: 300,
    lessPrice: 90,
    sold: 50,
    quantity: 1,
  },
  {
    id: 525522,
    title: "Product 4",
    description: "Description of Product 4",
    ratings: 4.4,
    image: "/carousel/4.jpg",
    price: 120,
    lessPrice: 110,
    sold: 50,
    quantity: 1,
  },
  {
    id: 625252,
    title: "Product 6",
    description: "Description of Product 6",
    ratings: 4.8,
    image: "/images/product_8_small.jpg",
    price: 150,
    lessPrice: 140,
    sold: 50,
    quantity: 1,
  },
  {
    id: 7225,
    title: "Product 7",
    description: "Description of Product 7",
    ratings: 4.8,
    image: "/carousel/7.jpg",
    price: 150,
    lessPrice: 140,
    sold: 50,
    quantity: 1,
  },
  // Add more products
];



const HomePage = () => {
  const { data, isFetching, isLoading, isError, isSuccess } = useGetProductQuery();
  const { data:data2,isLoading:isLoading2 } = useGetAllProductQuery();
  // console.log("dataserver",data?.products)
  return (
    <div className="bg-amazonclone-background">
      {/* <CarouselCategory /> */}
      <div className="min-w-full max-w-lg m-auto p-2 md:p-20 md:pt-0">
        <CarouselCategory2 />
        <div className="relative">
          <h1 className="custom_border text-2xl md:text-5xl p-2 md:py-6 m-2 md:my-10 ml-0 font-bold">
            Best Sales Products
          </h1>
          {!data?.products &&
            (isLoading ? (
              <h2 className="text-center font-bold">Loading.........</h2>
            ) : (
              <h2 className="text-center font-bold">No Products Available</h2>
            ))}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 md:gap-5">
          {data &&
            data.products.map((data, i) => {
              return (
                <HomePageCard
                  data={data}
                  key={i}
                  sold={data.sold}
                  title={data.title}
                  description={data.description}
                  img={data.images}
                  price={data.price}
                  ratings={data.ratings}
                  lessPrice={data.lessPrice}
                  inStock={data.inStock}
                />
              );
            })}
          <div className="m-3 pt-8">
            <img
              className="xl:hidden"
              src={"../images/banner_image_2.jpg"}
              alt="Banner 2"
            />
          </div>
        </div>
        {/* sec2 */}
        <div className="relative">
          <h1 className="custom_border text-2xl md:text-5xl p-2 md:py-6 m-2 md:my-10 ml-0 font-bold">
            Popular Products
          </h1>
          {!data2?.products &&
            (isLoading2 ? (
              <h2 className="text-center font-bold">Loading.........</h2>
            ) : (
              <h2 className="text-center font-bold">No Products Available</h2>
            ))}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 md:gap-5">
          {data2 &&
            data2.products.slice(8, 16).map((data, i) => {
              return (
                <HomePageCard
                  data={data}
                  key={i}
                  sold={data.sold}
                  title={data.title}
                  description={data.description}
                  img={data.images}
                  price={data.price}
                  ratings={data.ratings}
                  lessPrice={data.lessPrice}
                  inStock={data.inStock}
                />
              );
            })}
        </div>
        {/* close  Popular products */}
        {/* start Featured products */}
        <div className="relative">
          <h1 className="custom_border text-2xl md:text-5xl p-2 md:py-6 m-2 md:my-10 ml-0 font-bold">
            Featured Products
          </h1>
          {!data2?.products &&
            (isLoading2 ? (
              <h2 className="text-center font-bold">Loading.........</h2>
            ) : (
              <h2 className="text-center font-bold">No Products Available</h2>
            ))}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 md:gap-5">
          {data2 &&
            data2.products.slice(17, 25).map((data, i) => {
              return (
                <HomePageCard
                  data={data}
                  key={i}
                  sold={data.sold}
                  title={data.title}
                  description={data.description}
                  img={data.images}
                  price={data.price}
                  ratings={data.ratings}
                  lessPrice={data.lessPrice}
                  inStock={data.inStock}
                />
              );
            })}
        </div>
        {/* end Featured products */}
        {/* New company products start */}

        <div className="relative">
          <h1 className="custom_border text-2xl md:text-5xl p-2 md:py-6 m-2 md:my-10 ml-0 font-bold">
            New Company Products
          </h1>
          {!data2?.products &&
            (isLoading2 ? (
              <h2 className="text-center font-bold">Loading.........</h2>
            ) : (
              <h2 className="text-center font-bold">No Products Available</h2>
            ))}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 md:gap-5">
          {data2 &&
            data2.products.slice(26, 34).map((data, i) => {
              return (
                <HomePageCard
                  data={data}
                  key={i}
                  sold={data.sold}
                  title={data.title}
                  description={data.description}
                  img={data.images}
                  price={data.price}
                  ratings={data.ratings}
                  lessPrice={data.lessPrice}
                  inStock={data.inStock}
                />
              );
            })}
        </div>
        {/* new company products end */}
        {/* Old Company Products start */}

        <div className="relative">
          <h1 className="custom_border text-2xl md:text-5xl p-2 md:py-6 m-2 md:my-10 ml-0 font-bold">
            Old Company Products
          </h1>
          {!data2?.products &&
            (isLoading2 ? (
              <h2 className="text-center font-bold">Loading.........</h2>
            ) : (
              <h2 className="text-center font-bold">No Products Available</h2>
            ))}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 md:gap-5">
          {data2 &&
            data2.products.slice(35, 43).map((data, i) => {
              return (
                <HomePageCard
                  data={data}
                  key={i}
                  sold={data.sold}
                  title={data.title}
                  description={data.description}
                  img={data.images}
                  price={data.price}
                  ratings={data.ratings}
                  lessPrice={data.lessPrice}
                  inStock={data.inStock}
                />
              );
            })}
        </div>
        {/* Old Company Products end */}
        {/* New Public Business Products start */}

        <div className="relative">
          <h1 className="custom_border text-2xl md:text-5xl p-2 md:py-6 m-2 md:my-10 ml-0 font-bold">
            New Public Business Products
          </h1>
          {!data2?.products &&
            (isLoading2 ? (
              <h2 className="text-center font-bold">Loading.........</h2>
            ) : (
              <h2 className="text-center font-bold">No Products Available</h2>
            ))}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 md:gap-5">
          {data2 &&
            data2.products.slice(2, 10).map((data, i) => {
              return (
                <HomePageCard
                  data={data}
                  key={i}
                  sold={data.sold}
                  title={data.title}
                  description={data.description}
                  img={data.images}
                  price={data.price}
                  ratings={data.ratings}
                  lessPrice={data.lessPrice}
                  inStock={data.inStock}
                />
              );
            })}
        </div>
        {/* New Public Business Products end */}
        {/* Old Public Business Products start */}

        <div className="relative">
          <h1 className="custom_border text-2xl md:text-5xl p-2 md:py-6 m-2 md:my-10 ml-0 font-bold">
            Old Public Business Products
          </h1>
          {!data2?.products &&
            (isLoading2 ? (
              <h2 className="text-center font-bold">Loading.........</h2>
            ) : (
              <h2 className="text-center font-bold">No Products Available</h2>
            ))}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 md:gap-5">
          {data2 &&
            data2.products.slice(20,28).map((data, i) => {
              return (
                <HomePageCard
                  data={data}
                  key={i}
                  sold={data.sold}
                  title={data.title}
                  description={data.description}
                  img={data.images}
                  price={data.price}
                  ratings={data.ratings}
                  lessPrice={data.lessPrice}
                  inStock={data.inStock}
                />
              );
            })}
        </div>
        {/* Old Public Business Products end */}
        {/* Old Public Products start */}

        <div className="relative">
          <h1 className="custom_border text-2xl md:text-5xl p-2 md:py-6 m-2 md:my-10 ml-0 font-bold">
            Old Public Products
          </h1>
          {!data2?.products &&
            (isLoading2 ? (
              <h2 className="text-center font-bold">Loading.........</h2>
            ) : (
              <h2 className="text-center font-bold">No Products Available</h2>
            ))}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 md:gap-5">
          {data2 &&
            data2.products.slice(6, 14).map((data, i) => {
              return (
                <HomePageCard
                  data={data}
                  key={i}
                  sold={data.sold}
                  title={data.title}
                  description={data.description}
                  img={data.images}
                  price={data.price}
                  ratings={data.ratings}
                  lessPrice={data.lessPrice}
                  inStock={data.inStock}
                />
              );
            })}
        </div>
        {/* Old Public Products end */}
        <CarouselProduct />
        <CarouselCategory2 />
        <div className="h-[200px]">
          <img
            className="h-[100%] m-auto w-[100%] object-cover"
            src={"../images/banner_image.jpg"}
            alt="Banner 1"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
