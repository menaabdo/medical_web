import { createSlice } from "@reduxjs/toolkit";

export const localSlice = createSlice({
	name: "local",
	initialState: {
		local: "en",
		dir: "ltr",
	},
	reducers: {
		changeLocal: (state, action) => {
			state.local = action.payload;
			state.dir = action.payload === "ar" ? "rtl" : "ltr";
		},
	},
});

const { reducer, actions } = localSlice;
export const { changeLocal } = actions;
export default reducer;
