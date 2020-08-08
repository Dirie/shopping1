import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          proudct => proudct.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          proudct => proudct.id !== action.pid
        )
      };
  }
  return state;
};
