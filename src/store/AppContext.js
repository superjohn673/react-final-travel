import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import appReducer from "./appReducer";

export const AppContext = createContext(null);

const initialState = {
  products: [],
  isLoading: false,
  pagination: {},
  selectedDate: localStorage.getItem("selectedDateStorage"),
  adultQuantity: parseInt(localStorage.getItem("adultQuantityStorage")),
  childrenQuantity: parseInt(localStorage.getItem("childrenQuantityStorage")),
  finalTotal: parseInt(localStorage.getItem("finalTotalStorage")),
  finalCouponTotal: parseInt(localStorage.getItem("finalCouponTotalStorage")),
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getAllProducts = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    console.log(productRes);
    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        products: productRes.data.products,
        pagination: productRes.data.pagination,
      },
    });
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  const setSelectedDate = (date) => {
    dispatch({ type: "SET_SELECTED_DATE", payload: date });
  };

  const setAdultQuantity = (quantity) => {
    dispatch({ type: "SET_ADULT_QUANTITY", payload: quantity });
  };

  const setChildrenQuantity = (quantity) => {
    dispatch({ type: "SET_CHILDREN_QUANTITY", payload: quantity });
  };

  const setFinalTotal = (price) => {
    dispatch({ type: "SET_FINAL_TOTAL", payload: price });
  };

  const setFinalCouponTotal = (price) => {
    dispatch({ type: "SET_FINAL_COUPON_TOTAL", payload: price });
  };

  const addToFavorites = (product) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: product });
    //localStorage.setItem("favorites", JSON.stringify(state.favorites));
    localStorage.setItem(
      "favorites",
      JSON.stringify([...state.favorites, product])
    );
  };

  const removeFromFavorites = (productId) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: productId });
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        getAllProducts,
        setSelectedDate,
        setAdultQuantity,
        setChildrenQuantity,
        setFinalTotal,
        setFinalCouponTotal,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// import React, { createContext, useState, useCallback } from "react";
// import axios from "axios";

// export const AppContext = createContext(null);

// export const AppProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({});
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [adultQuantity, setAdultQuantity] = useState(0);
//   const [childrenQuantity, setChildrenQuantity] = useState(0);

//   //選完人數下拉選單歸0
//   const resetSelectedQuantity = () => {
//     setAdultQuantity(0);
//     setChildrenQuantity(0);
//   };

//   //取得所有產品資料
//   const getAllProducts = useCallback(async () => {
//     setLoading(true);
//     const productRes = await axios.get(
//       `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
//     );
//     console.log(productRes);
//     setProducts(productRes.data.products);
//     setPagination(productRes.data.pagination);
//     setLoading(false);
//   }, []);

//   return (
//     <AppContext.Provider
//       value={{
//         products,
//         setProducts,
//         pagination,
//         setPagination,
//         isLoading,
//         setLoading,
//         selectedDate,
//         setSelectedDate,
//         adultQuantity,
//         setAdultQuantity,
//         childrenQuantity,
//         setChildrenQuantity,
//         resetSelectedQuantity,
//         getAllProducts,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };
