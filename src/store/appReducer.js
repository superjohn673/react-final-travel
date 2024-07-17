const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
        pagination: action.payload.pagination,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_SELECTED_DATE":
      return {
        ...state,
        selectedDate: action.payload,
      };
    case "SET_ADULT_QUANTITY":
      return {
        ...state,
        adultQuantity: action.payload,
      };
    case "SET_CHILDREN_QUANTITY":
      return {
        ...state,
        childrenQuantity: action.payload,
      };
    case "SET_FINAL_TOTAL":
      return {
        ...state,
        finalTotal: action.payload,
      };
    case "SET_FINAL_COUPON_TOTAL":
      return {
        ...state,
        finalCouponTotal: action.payload,
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default appReducer;
