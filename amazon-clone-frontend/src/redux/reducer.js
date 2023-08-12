export const createProductReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT_REQUEST":
      return {
        loading: true,
        products: {},
        error: null,
      };
    case "CREATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,

        products: action.payload,
        error: null,
        created: true,
      };

    case "CREATE_PRODUCT_FAIL":
      return {
        ...state,
        loading: false,
        products: {},
        error: action.payload,
      };
    case "PRODUCT_CLEAR_ERRORS":
      return {
        ...state,
        error: null,
        created: false,
      };

    default:
      return state;
  }
};
export const getproductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "ALL_PRODUCT_REQUEST":
    
      return {
        loading: true,
        products: [],
      };
    case "ALL_PRODUCT_SUCCESS":
      return {
        loading: false,
        x: action.payload,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerpage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

   
    case "ALL_PRODUCT_FAIL":
    
      return {
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};