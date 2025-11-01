// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import baseApi from "./baseApi";
import languageReducer from './slices/languageSlice'; // ✅ import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer, // ✅ add
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // Add the RTK Query middleware for caching, invalidation, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types for later use
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
