import { useEffect, useLayoutEffect } from "react";
import WebsiteTitle from "./helpers/WebsiteTitle";
import RouterFile from "./router";
import { useLocation } from "react-router-dom";
import { getLang, getToken } from "./network";
import { useDispatch, useSelector } from "react-redux";
import i18next from "@localization/i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import { changeScreenSize } from "./store/screenSize";
import NavBar from "./Components/NavBar/NavBar.js";
import {
  pagesNotHaveSearchNav,
  pagesNotHaveNavbar,
  pagesNotHaveSideBar,
  pagesHaveEmptyCenteredNav,
} from "./constants/_routes";
import SideBar from "./Components/SideBar/SideBar";
import "./App.css";

export const colors = {
  main: "#66ccff",
  disabled: "#C8C8C8",
  hover: "#66ccff",
  greyRegular: "#8D8D8D",
  white: "#fff",
  insideComp: "#FAFBFB",
  grey54: "#545454",
};
function App() {
  const { local, dir } = useSelector((state) => state.local);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const title = location.pathname.split("/")[1].toUpperCase();
  getToken(auth?.token);
  useEffect(() => {
    i18next.init({
      lng: local,
      fallbackLng: local,
    });
    getLang(local);
  }, [local, dir]);
  useLayoutEffect(() => {
    i18next.init({
      lng: local,
      fallbackLng: local,
    });
    getLang(local);
  }, [local]);
  useEffect(() => {
    const handleResize = () => {
      dispatch(changeScreenSize(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
  const theme = createTheme({
    direction: dir,
    palette: {
      primary: {
        main: colors.main,
        contrastText: colors.white,
      },
      secondary: {
        main: "#FF0000",
      },
      action: {
        disabled: colors.disabled,
        hover: colors.hover,
      },
    },
  });
  const isNavbarVisible = !pagesNotHaveNavbar.includes(location.pathname);
  const isSideBarVisible = !pagesNotHaveSideBar.includes(location.pathname);
  const hideSearch = pagesNotHaveSearchNav.includes(location.pathname);
  const isEmptyCenteredNav = pagesHaveEmptyCenteredNav.includes(
    location.pathname
  );
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Helmet>
          <html lang={local} dir={dir}></html>
        </Helmet>
        <WebsiteTitle title={title} />

        {isNavbarVisible && (
          <NavBar
            hideSearch={hideSearch}
            emptyCenteredNav={isEmptyCenteredNav}
          />
        )}
        <div className="d-flex flex-1">
          {isSideBarVisible && <SideBar showDrawer={true} />}
          <RouterFile />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
