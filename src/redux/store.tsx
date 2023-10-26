import { configureStore } from "@reduxjs/toolkit";
import { StudentsApi } from "./StudentsSlice";

export const store = configureStore({
  reducer: {
    [StudentsApi.reducerPath]: StudentsApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(StudentsApi.middleware);
  },
});
