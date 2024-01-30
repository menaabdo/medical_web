import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		auth: {},
	},
	reducers: {
		login: (state, action) => {
			state.auth = action.payload;
		},
		logout: (state, action) => {
			state.auth = {};
		},
		changeAuthData: (state, action) => {
			state.auth = { ...state.auth, ...action.payload };
		},
	},
});

const { reducer, actions } = authSlice;
export const { login, logout, changeAuthData } = actions;
export default reducer;
