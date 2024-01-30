import { createSlice } from "@reduxjs/toolkit";

export const screenSizeSlice = createSlice({
	name: "screenSize",
	initialState: {
		size: "large",
		btnSize: "lg",
	},
	reducers: {
		changeScreenSize: (state, action) => {
			const breakPoints = {
				small: { min: 360, max: 768 },
				medium: { min: 769, max: 1199 },
				large: { min: 1200, max: 2000 },
			};
			if (action.payload)
				state.size =
					action.payload > breakPoints.small.max
						? action.payload > breakPoints.medium.max
							? "large"
							: "medium"
						: "small";
			state.btnSize =
				action.payload > breakPoints.small.max
					? action.payload > breakPoints.medium.max
						? "lg"
						: "md"
					: "sm";
		},
	},
});

const { reducer, actions } = screenSizeSlice;
export const { changeScreenSize } = actions;
export default reducer;
