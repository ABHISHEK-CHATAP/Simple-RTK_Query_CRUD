import { configureStore } from "@reduxjs/toolkit";
import { Api } from "./ContactApi";

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
  },

// adding middleware for caching the server data or we need to a valiadtion or we need to do the pulling of the data
middleware: (getDefaultMiddleware) => {
  return getDefaultMiddleware().concat(Api.middleware)}
});
