import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth";
import localSlice from "./local";
import screenSizeSlice from "./screenSize";

const persistConfig = {
	key: "gate-plus-admin",
	version: 1,
	storage,
};

const reducer = {
	auth: authSlice,
	local: localSlice,
	screen: screenSizeSlice,
};

const rootReducer = combineReducers(reducer);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(logger),
	devTools: process.env.REACT_APP_NODE_ENV !== "live",
});

export default store;
