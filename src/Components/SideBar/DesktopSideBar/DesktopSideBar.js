import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/_routes";
import dashboardIcon from "@assets/icons/dashboard-icon.svg";
import doctorsIcon from "@assets/icons/doctors-icon.svg";
import nursesIcon from "@assets/icons/nurse-icon.svg";
import hospitalIcon from "@assets/icons/hospital-icon.svg";
import siteSettingsIcon from "@assets/icons/settings-icon.svg";
import money from "@assets/icons/money.svg";
import deleteIcon from "@assets/icons/delete-icon.svg";
import messageIcon from "@assets/icons/message-icon.svg";

import { useTranslation } from "react-i18next";

function DesktopSideBar() {
  const { t } = useTranslation();
  const location = useLocation();
  const subRoutesForDoctors = [
    ROUTES.DOCTORS,
    ROUTES.DOCTORSACTIVATIONPROCESS,
    ROUTES.DOCTORSREJECTED,
    ROUTES.DOCTORACTIVATIONPROCESSDETAILS,
    ROUTES.DOCTORREJECTEDDETAILS,
    ROUTES.DOCTORDETAILS,
  ];
  const subRoutesForNurses = [
    ROUTES.NURSES,
    ROUTES.NURSESACTIVATIONPROCESS,
    ROUTES.NURSESREJECTED,
    ROUTES.NURSEACTIVATIONPROCESSDETAILS,
    ROUTES.NURSEREJECTEDDETAILS,
    ROUTES.NURSEDETAILS,
  ];
  const subRoutesForHospitals = [
    ROUTES.HOSPITALS,
    ROUTES.HOSPITALSACTIVATIONPROCESS,
    ROUTES.HOSPITALSREJECTED,
    ROUTES.HOSPITALACTIVATIONPROCESSDETAILS,
    ROUTES.HOSPITALREJECTEDDETAILS,
    ROUTES.HOSPITALDETAILS,
    ROUTES.HOSPITALPACKAGE,
    ROUTES.HOSPITALPACKAGEDETAILS,
  ];
  const subRoutesForSiteSettings = [
    ROUTES.LANDING_PAGE,
    ROUTES.ABOUT_US,
    ROUTES.CONTACT_US,
    ROUTES.FAQ,
    ROUTES.ADDRESS,
    ROUTES.DROPDOWNS,
  ];
  const subRoutesForMessages = [ROUTES.SendMessage, ROUTES.ContactUsRequests];

  const subRoutesForPackages = [
    ROUTES.ACTIVE_PACKAGES,
    ROUTES.INACTIVE_PACKAGES,
    ROUTES.ADD_PACKAGE,
    ROUTES.EDIT_ACTIVE_PACKAGE,
    ROUTES.EDIT_INACTIVE_PACKAGE,
  ];

  const tabs = [
    {
      to: ROUTES.DASHBOARD,
      isActive: ROUTES.DASHBOARD === location.pathname,
      icon: dashboardIcon,
      tabName: t("dashboard"),
    },
    {
      to: ROUTES.DOCTORS,
      isActive: subRoutesForDoctors.includes(location.pathname),
      icon: doctorsIcon,
      tabName: t("doctors"),
      subTabs: [
        {
          to: ROUTES.DOCTORS,
          isActive: ROUTES.DOCTORS === location.pathname,
          tabName: t("allDoctors"),
        },
        {
          to: ROUTES.DOCTORSACTIVATIONPROCESS,
          isActive: ROUTES.DOCTORSACTIVATIONPROCESS === location.pathname,
          tabName: t("activationProcess"),
        },
        {
          to: ROUTES.DOCTORSREJECTED,
          isActive: ROUTES.DOCTORSREJECTED === location.pathname,
          tabName: t("rejected"),
        },
      ],
    },
    {
      to: ROUTES.NURSES,
      isActive: subRoutesForNurses.includes(location.pathname),
      icon: nursesIcon,
      tabName: t("nurses"),
      subTabs: [
        {
          to: ROUTES.NURSES,
          isActive: ROUTES.NURSES === location.pathname,
          tabName: t("allNurses"),
        },
        {
          to: ROUTES.NURSESACTIVATIONPROCESS,
          isActive: ROUTES.NURSESACTIVATIONPROCESS === location.pathname,
          tabName: t("activationProcess"),
        },
        {
          to: ROUTES.NURSESREJECTED,
          isActive: ROUTES.NURSESREJECTED === location.pathname,
          tabName: t("rejected"),
        },
      ],
    },
    {
      to: ROUTES.HOSPITALS,
      isActive: subRoutesForHospitals.includes(location.pathname),
      icon: hospitalIcon,
      tabName: t("hospital"),
      subTabs: [
        {
          to: ROUTES.HOSPITALS,
          isActive: ROUTES.HOSPITALS === location.pathname,
          tabName: t("allHospitals"),
        },
        {
          to: ROUTES.HOSPITALSACTIVATIONPROCESS,
          isActive: ROUTES.HOSPITALSACTIVATIONPROCESS === location.pathname,
          tabName: t("activationProcess"),
        },
        {
          to: ROUTES.HOSPITALSREJECTED,
          isActive: ROUTES.HOSPITALSREJECTED === location.pathname,
          tabName: t("rejected"),
        },
        {
          to: ROUTES.HOSPITALPACKAGE,
          isActive: ROUTES.HOSPITALPACKAGE === location.pathname,
          tabName: t("package"),
        },
      ],
    },
    // {
    //   to: ROUTES.LANDING_PAGE,
    //   isActive: subRoutesForSiteSettings.includes(location.pathname),
    //   icon: siteSettingsIcon,
    //   tabName: t("site_settings"),
    //   subTabs: [
    //     {
    //       to: ROUTES.LANDING_PAGE,
    //       isActive: ROUTES.LANDING_PAGE === location.pathname,
    //       tabName: t("landing_page"),
    //     },
    //     {
    //       to: ROUTES.ABOUT_US,
    //       isActive: ROUTES.ABOUT_US === location.pathname,
    //       tabName: t("about_us"),
    //     },
    //     {
    //       to: ROUTES.CONTACT_US,
    //       isActive: ROUTES.CONTACT_US === location.pathname,
    //       tabName: t("contact_us"),
    //     },
    //     {
    //       to: ROUTES.FAQ,
    //       isActive: ROUTES.FAQ === location.pathname,
    //       tabName: t("faq"),
    //     },
    //     {
    //       to: ROUTES.ADDRESS,
    //       isActive: ROUTES.ADDRESS === location.pathname,
    //       tabName: t("address"),
    //     },
    //     {
    //       to: ROUTES.DROPDOWNS,
    //       isActive: ROUTES.DROPDOWNS === location.pathname,
    //       tabName: t("dropdowns"),
    //     },
    //   ],
    // },

    {
      to: ROUTES.SendMessage,
      isActive: subRoutesForMessages.includes(location.pathname),
      icon: messageIcon,
      tabName: t("messages"),
      subTabs: [
        {
          to: ROUTES.SendMessage,
          isActive: ROUTES.SendMessage === location.pathname,
          tabName: t("send"),
        },
        {
          to: ROUTES.ContactUsRequests,
          isActive: ROUTES.ContactUsRequests === location.pathname,
          tabName: t("receive"),
        },
      ],
    },
    // {
    //   to: ROUTES.PACKAGES,
    //   isActive: location.pathname === ROUTES.PACKAGES,
    //   icon: money,
    //   tabName: t("package"),
    // },
    {
      to: ROUTES.ACTIVE_PACKAGES,
      isActive: subRoutesForPackages.includes(location.pathname),
      icon: money,
      tabName: t("packages"),
    },
    {
      to: ROUTES.DELETED_ACCOUNTS,
      isActive: location.pathname === ROUTES.DELETED_ACCOUNTS,
      icon: deleteIcon,
      tabName: t("deleted_accounts"),
    },
  ];
  return (
    <div className="sideBar">
      <div className="ant-drawer-body mx-2">
        <div className="my-4">
          {tabs.map((tab) => (
            <div
              className={`tab f-poppins-12px  ${
                tab.isActive ? "activeTab" : ""
              }`}
            >
              <Link
                key={tab}
                to={tab.to}
                className={`d-flex align-items-center`}
              >
                <img src={tab.icon} alt={tab.tabName} />
                <label className="mx-2  cursor-pointer">{tab.tabName}</label>
              </Link>
              <div className={`${tab.isActive ? "" : "d-none"}`}>
                {tab?.subTabs?.map((subTab) => (
                  <Link
                    to={subTab.to}
                    className={`m-2 d-block ${
                      subTab.isActive ? "sub-active-tab" : ""
                    } p-1`}
                  >
                    {subTab.tabName}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesktopSideBar;
