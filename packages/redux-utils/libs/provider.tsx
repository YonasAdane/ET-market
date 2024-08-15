"use client"
import { ReactNode } from "react";
import { store } from "./redux/store"
import { Provider } from "react-redux"
export function ReduxProvider({ children }: { children: ReactNode }): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
}