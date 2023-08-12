import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_PRODUCT_REQUEST" });
    const config = {
        headers: { "Content-Type": "multipart/formdata", },
        withCredentials:"include"
    };
console.log(productData)
    const { data } = await axios.post(`${baseUrl}/api/v1/create`, productData, config);
    dispatch({ type: "CREATE_PRODUCT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CREATE_PRODUCT_FAIL", payload: error?.response.data.msg });
  }
};
// Get All Products
export const getProduct =
  (keyword = "", sort = "", currentPage = 1, category ="") =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALL_PRODUCT_REQUEST" });

      let link = `${baseUrl}/api/v1/get?keyword=${keyword}&sort=${sort}&page=${currentPage}`;

      if (category) {
        link = `${baseUrl}/api/v1/get?keyword=${keyword}&sort=${sort}&page=${currentPage}&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: "ALL_PRODUCT_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ALL_PRODUCT_FAIL",
        payload: error.response.data.message,
      });
    }
  };