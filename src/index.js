import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import persistStore from "redux-persist/es/persistStore";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18next from "@localization/i18next";
import Loader from "./Components/Loader/Loader";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@assets/styles/Styles.scss";
import "./index.css";

const persistor = persistStore(store);
ConfigProvider.config({
  theme: {
    primaryColor: "red",
    secondaryColor: "red",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18next}>
        <ConfigProvider direction={"ltr"}>
          <Suspense fallback={<Loader />}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Suspense>
        </ConfigProvider>
      </I18nextProvider>
    </PersistGate>
  </Provider>
);

reportWebVitals();
