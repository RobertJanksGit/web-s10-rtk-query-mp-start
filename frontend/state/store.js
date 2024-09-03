import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from "./quotesSlice";
import { quoteApi } from "./quotesApi";

export const store = configureStore({
  reducer: {
    quotesState: quotesReducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(quoteApi.middleware),
});
