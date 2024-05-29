import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// Local
import { apiSlice } from "@/app/api";
import appReducer from "@/app/features/appSlice";
import storageReducer from "@/app/features/storageSlice";
import mostPopularReducer from "@/app/features/mostPopularSlice";
import movieReducer from "@/app/features/movieSlice";
import watchedShowReducer from "@/app/features/watchedShowSlice";
import watchingReducer from "@/app/features/watchingSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    app: appReducer,
    storage: storageReducer,
    mostPopular: mostPopularReducer,
    movie: movieReducer,
    watchedShow: watchedShowReducer,
    watching: watchingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Hooks type safe
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
