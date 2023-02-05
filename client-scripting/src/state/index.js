import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    customers: [],
    bills: [],
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
        setUser: (state, action) =>
        {
            state.user = action.payload.user;
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
        setBills: (state, action) => {
            state.bills = action.payload.bills;
        },
        setCities: (state, action) => {
            state.cities = action.payload.cities;
        },
        setStates: (state, action) => {
            state.states = action.payload.states;
        }
    }

});

export const { setMode, setLogin, setLogout, setCustomers, setBills, setCities, setStates, setUser } = authSlice.actions;
export default authSlice.reducer;