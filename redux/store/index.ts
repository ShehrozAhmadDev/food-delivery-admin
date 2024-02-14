import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/user-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
};

const userReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    userReducer,
  },
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
