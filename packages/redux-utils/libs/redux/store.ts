import { configureStore } from "@reduxjs/toolkit";
 import authReducer from "./features/auth-slice";
 import counterReducer from "./features/counter-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import sidebarReducer from "./features/sidebarFilter-slice";
export const store=configureStore({
    reducer:{
        authReducer,
        counterReducer,
        sidebarReducer
    }
});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
