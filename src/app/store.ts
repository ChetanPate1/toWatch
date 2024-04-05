import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// Local
import { apiSlice } from "./api/towatch";
import appReducer from "./features/appSlice";
import storageReducer from "./features/storageSlice";
import mostPopularReducer from "./features/mostPopularSlice";
import movieReducer from "./features/movieSlice";
import watchedShowReducer from "./features/watchedShowSlice";
import watchingReducer from "./features/watchingSlice";

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
