import { createSlice, PayloadAction, Reducer, Slice } from "@reduxjs/toolkit";

interface AuthState {
    isAuth: boolean;
    username: string;
    uid: string;
    isModerator: boolean;
};

const initialState: AuthState = {
    isAuth: false,
    username: "",
    uid: "",
    isModerator: false,
};

const auth: Slice<AuthState> = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.isAuth = false;
            state.username = "";
            state.uid = "";
            state.isModerator = false;
        },
        logIn: (state, action: PayloadAction<string>) => {
            state.isAuth = true;
            state.username = action.payload;
            state.uid = "asdfsdaf";
            state.isModerator = false;
        },
    },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer as Reducer<AuthState>;
