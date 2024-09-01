import { configureStore, Store } from "@reduxjs/toolkit";
 import authReducer from "./features/auth-slice";
 import counterReducer from "./features/counter-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sidebarReducer from "./features/sidebarFilter-slice";
export const store:Store=configureStore({
    reducer:{
        auth: authReducer, 
        counter: counterReducer,
        sidebar: sidebarReducer
    }
});
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;

// export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;

// import { useDispatch, useSelector } from 'react-redux'
// import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;