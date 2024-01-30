import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/_routes";
import circledHamGreyBG from "@assets/icons/Circled-ham-grey-bg.svg";
import localBallDark from "@assets/icons/local-ball-dark.svg";
import searchPrimary from "@assets/icons/search-primary.svg";
import searchGrey from "@assets/icons/search-grey.svg";
import { changeLocal } from "../../store/local";
import CustomizedMenus from "../CustomizedMenus";
import logoutIcon from "@assets/icons/logout.svg";
import gear from "@assets/icons/gear.svg";
import user from "@assets/icons/user.svg";
import TemporaryDrawer from "../TemporaryDrawer";
import notificationBell from "@assets/icons/notification-bell.svg";
import { changeAuthData, logout } from "../../store/auth";
import logoImg from "@assets/icons/logo-new.svg";

function NavBar({ emptyCenteredNav, hideSearch }) {
  const [searchValue, updateSearchValue] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);
  const { local } = useSelector((state) => state.local);
  const location = useLocation();
  const navigate = useNavigate();
  const routeToSearchIn = location?.pathname?.split("/")[1];
  //   console.log("routeToSearchIn", routeToSearchIn);
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  useEffect(() => {
    updateSearchValue("");
    dispatch(changeAuthData({ search: "" }));
  }, [location?.pathname]);
  const languagesItems = [
    {
      label: "English",
      value: "en",
    },
    {
      label: "Germany",
      value: "ge",
    },
  ];
  const hamburgerItems = [
    // {
    //   label: (
    //     <div>
    //       <img src={user} alt="user" className="me-2" />
    //       <span>{t("mySetting")}</span>
    //     </div>
    //   ),
    //   value: ROUTES.MYSETTING,
    // },
    // {
    //   label: (
    //     <div>
    //       <img src={gear} alt="gear" className="me-2" />
    //       <span>{t("rulesAndPermissions")}</span>
    //     </div>
    //   ),
    //   value: ROUTES.ADMINS,
    // },
    // {
    //   label: "divider",
    //   value: null,
    // },
    {
      label: (
        <div onClick={handleLogout}>
          <img src={logoutIcon} alt="logout" className="me-2" />
          <span className="fail-text">{t("logout")}</span>
        </div>
      ),
      value: null,
    },
  ];

  const onLocalChange = (key) => {
    dispatch(changeLocal(key));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeAuthData({ searchValue }));
  };

  return (
    <nav className="nav">
      <div
        className={`nav-items d-flex align-items-center flex-1 justify-content-between  f-poppins-${
          size === "small" ? "14px" : "20px"
        }`}
      >
        {emptyCenteredNav ? (
          <div className="d-flex justify-content-center flex-1">
            <Link to={ROUTES.DASHBOARD}>
              <img src={logoImg} className="logo" alt="logo" />
            </Link>
          </div>
        ) : (
          <>
            {size === "small" ? (
              <>
                <div className="d-flex justify-content-between flex-1 align-items-center">
                  <Link to={ROUTES.DASHBOARD}>
                    <img src={logoImg} className="logo" alt="logo" />
                  </Link>
                  <div className="d-flex">
                    {hideSearch ? (
                      <></>
                    ) : (
                      <img
                        src={searchGrey}
                        alt="searchGrey"
                        className="searchGrey cursor-pointer me-4"
                      />
                    )}
                    <TemporaryDrawer
                      items={hamburgerItems}
                      beforeClose={(value) => {
                        navigate(value);
                      }}
                      active={location.pathname}
                    >
                      <img
                        src={circledHamGreyBG}
                        alt="circledHamburgerIcon"
                        className="cursor-pointer"
                      />
                    </TemporaryDrawer>
                    <span className="mx-2 d-flex align-items-center">
                      <CustomizedMenus
                        className="f-poppins-12px"
                        items={languagesItems}
                        id="lang-menu"
                        beforeClose={onLocalChange}
                        active={local}
                        children={
                          <div className="d-flex align-items-center">
                            <span className="d-flex cursor-pointer">
                              <img src={localBallDark} alt="local-ball" />
                              <div className="f-rubik-14px fw-600 mx-1">
                                {t("language")}
                              </div>
                            </span>
                          </div>
                        }
                      />
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex flex-1 align-items-center">
                  <Link to={ROUTES.DASHBOARD}>
                    <img src={logoImg} className="logo" alt="logo" />
                  </Link>
                </div>
                <div className="d-flex">
                  {hideSearch ? (
                    <></>
                  ) : (
                    <>
                      {location?.pathname === ROUTES.DASHBOARD ||
                      location?.pathname === ROUTES.DOCTORDETAILS ||
                      location?.pathname ===
                        ROUTES.DOCTORACTIVATIONPROCESSDETAILS ||
                      location?.pathname === ROUTES.DOCTORREJECTEDDETAILS ||
                      location?.pathname === ROUTES.NURSEDETAILS ||
                      location?.pathname ===
                        ROUTES.NURSEACTIVATIONPROCESSDETAILS ||
                      location?.pathname === ROUTES.NURSEREJECTEDDETAILS ||
                      location?.pathname === ROUTES.HOSPITALDETAILS ||
                      location?.pathname ===
                        ROUTES.HOSPITALACTIVATIONPROCESSDETAILS ||
                      location?.pathname === ROUTES.HOSPITALPACKAGEDETAILS ||
                      location?.pathname === ROUTES.HOSPITALREJECTEDDETAILS ||
                      location?.pathname === ROUTES.SendMessage ||
                      location?.pathname === ROUTES.INACTIVEPACKAGES ||
                      location?.pathname === ROUTES.LANDING_PAGE ||
                      location?.pathname === ROUTES.ABOUT_US ||
                      location?.pathname === ROUTES.CONTACT_US ||
                      location?.pathname === ROUTES.FAQ ||
                      location?.pathname === ROUTES.ADDRESS ||
                      location?.pathname === ROUTES.DROPDOWNS ||
                      location?.pathname === ROUTES.ACTIVE_PACKAGES ||
                      location?.pathname === ROUTES.INACTIVE_PACKAGES ||
                      location?.pathname === ROUTES.ADD_PACKAGE ||
                      location?.pathname === ROUTES.EDIT_ACTIVE_PACKAGE ||
                      location?.pathname === ROUTES.EDIT_INACTIVE_PACKAGE ||
                      location?.pathname === ROUTES.PACKAGES ? (
                        <></>
                      ) : (
                        <form
                          onSubmit={handleSubmit}
                          className={`search-form mx-2 f-poppins-${
                            size === "small" ? "12px" : "16px"
                          }`}
                        >
                          <input
                            type="text"
                            placeholder={
                              t("typeToSearch") + " " + t(`${routeToSearchIn}`)
                            }
                            value={searchValue}
                            onChange={(e) => {
                              updateSearchValue(e.target.value);
                              dispatch(
                                changeAuthData({ search: e.target.value })
                              );
                            }}
                          />
                          <img
                            src={searchPrimary}
                            alt="searchPrimary"
                            className="searchPrimary cursor-pointer"
                          />
                        </form>
                      )}
                    </>
                  )}
                  {/* <img
										src={notificationBell}
										alt="notificationBell"
										className="cursor-pointer mx-2"
									/> */}
                  <span className="mx-2 d-flex align-items-center">
                    <CustomizedMenus
                      className="f-poppins-12px"
                      items={languagesItems}
                      id="lang-menu"
                      beforeClose={onLocalChange}
                      active={local}
                      children={
                        <div className="d-flex align-items-center">
                          <span className="d-flex cursor-pointer">
                            <img src={localBallDark} alt="local-ball" />
                            <div className="f-rubik-14px fw-600 mx-1">
                              {t("language")}
                            </div>
                          </span>
                        </div>
                      }
                    />
                  </span>
                  <CustomizedMenus
                    className="f-poppins-12px"
                    items={hamburgerItems}
                    id="hamburger-menu"
                    beforeClose={(value) => {
                      navigate(value);
                    }}
                    active={location.pathname}
                    children={
                      <img
                        src={circledHamGreyBG}
                        alt="circledHamburgerIcon"
                        className="cursor-pointer"
                      />
                    }
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
