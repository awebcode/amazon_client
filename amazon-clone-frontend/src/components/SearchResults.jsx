// import { useSearchParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { ProductDetails } from "./";
// import { callAPI } from "../utils/CallApi";
// import { GB_CURRENCY } from "../utils/constants";
// import { useGetAllProductQuery } from "../redux/productApi";

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const [products, setProducts] = useState(null);
//   const { data, isLoading } = useGetAllProductQuery();
//   const myproducts = data?.products;
//   const getSearchResults = () => {
//     const searchTerm = searchParams.get("searchTerm");
//     const category = searchParams.get("category");

//     callAPI(`data/search.json`).then((searchResults) => {
//       const categoryResults = searchResults[category];
//       if (searchTerm) {
//         const results = categoryResults.filter((product) =>
//           product.title.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setProducts(results);
//       } else {
//         setProducts(categoryResults);
//       }
//     });
//   };

//   useEffect(() => {
//     getSearchResults();
//   }, [searchParams]);

//   return (
//     <div className="min-w-[1200px] max-w-[1300px] m-auto pt-4">
//       {products &&
//         products.map((product, key) => {
//           return (
//             <Link key={key} to={`/product/${product.id}`}>
//               <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-1 ">
//                 <div className="col-span-2 p-4 bg-gray-200">
//                   <img
//                     className="m-auto"
//                     src={product.image_small}
//                     alt="Search result product"
//                   />
//                 </div>
//                 <div className="col-span-10 bg-gray-50 border border-gray-100 hover:bg-gray-100 ">
//                   <div className="font-medium text-black p-2">
//                     <ProductDetails product={product} ratings={true} />
//                     <div className="text-xl xl:text-2xl pt-1">
//                       {GB_CURRENCY.format(product.price)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//     </div>
//   );
// };

// export default SearchResults;
import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDetails } from "./";
import { GB_CURRENCY } from "../utils/constants";
import { useGetAllProductQuery } from "../redux/productApi";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const { data: { products: myproducts } = {}, isLoading } = useGetAllProductQuery();

  const getSearchResults = () => {
    const searchTerm = searchParams.get("searchTerm");
    const category = searchParams.get("category");

    if (myproducts) {
      const categoryResults = category
        ? myproducts.filter((product) => product.category === category)
        : myproducts;
// console.log(categoryResults)
      if (searchTerm) {
        const results = categoryResults.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(results);
      } else {
        setProducts(categoryResults);
      }
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [searchParams, myproducts]);

  return (
    <>
      {" "}
      {console.log("pr", products)}
      {products && products.length === 0 && (
        <h1 className="p-6 md:p-20 font-bold text-center  text-2xl md:text-5xl text-green-500  ">
          <span className="text-indigo-600">OOPS!</span> NO PRODUCTS FOUND FOR THIS CATEGORY!😭
        </h1>
      )}
      <div className="m-auto pt-4 h-auto">
        {products &&
          products.map((product, key) => {
            return (
              <Link key={key} to={`/product/${product._id}`}>
                <div className="p-10 h-auto w-fit grid grid-cols-12 rounded mt-1 mb-1 gap-5 md:gap-8 lg:gap-10">
                  <div className="p-3 w-[100%] h-[100%] md:w-[240px] md:h-[240px] col-span-12 md:col-span-2 bg-gray-200 m-2 md:m-0">
                    <img
                      className="m-auto w-full h-full"
                      src={product.image_small || product?.images[0]?.url}
                      alt="Search result product"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-10 bg-gray-50 border border-gray-100 hover:bg-gray-100 ">
                    <div className="font-medium text-black p-2">
                      <ProductDetails product={product} ratings={true} />

                      <div className="text-xl xl:text-2xl pt-1">
                        {GB_CURRENCY.format(product.price)}
                      </div>
                    </div>
                    <button className="btn">Add To Cart</button>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default SearchResults;
