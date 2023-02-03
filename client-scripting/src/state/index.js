import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    customers: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) =>
        {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) =>
        {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) =>
        {
            state.user = null;
            state.token = null;
        },
        setCustomers: (state, action) => 
        {
            state.customers = action.payload.customers;
        },
    }

});

export const { setMode, setLogin, setLogout, setCustomers } = authSlice.actions;
export default authSlice.reducer;