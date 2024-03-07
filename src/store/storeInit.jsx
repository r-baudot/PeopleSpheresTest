import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/index";

import { fetchCategories } from "./actions/categories";
import { fetchProducts } from "./actions/products";

// createStore depracated replaced by configureStore -> https://redux-toolkit.js.org/api/configureStore
const storeInit = configureStore({
  reducer: reducers,
  // Thunk middleware is included by default
});

const populateStore = () => {
  storeInit.dispatch(fetchCategories());
  storeInit.dispatch(fetchProducts());
};

export { storeInit, populateStore };
