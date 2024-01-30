import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import { ROUTES } from "../../../constants/_routes";
import { useTranslation } from "react-i18next";
import dashboardIcon from "@assets/icons/dashboard-icon.svg";
import doctorsIcon from "@assets/icons/doctors-icon.svg";
import nursesIcon from "@assets/icons/nurse-icon.svg";

function MobileSideBar({ parent, showDrawerr }) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setVisible(true);
  }, [showDrawerr]);
  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);
  // const showDrawer = () => {
  // 	setVisible(true);
  // };

  const onClose = () => {
    setVisible(false);
  };
  const tabs = [
    {
      to: ROUTES.DASHBOARD,
      isActive: parent === "dashboard",
      icon: dashboardIcon,
      tabName: t("Dashboard"),
    },
    {
      to: ROUTES.DOCTORS,
      isActive: parent === "doctors",
      icon: doctorsIcon,
      tabName: t("Doctors"),
    },
    {
      to: ROUTES.NURSES,
      isActive: parent === "nurses",
      icon: nursesIcon,
      tabName: t("Nurses"),
    },
  ];
  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={onClose}
        visible={visible}
        className="sideBar"
        mask={true}
      >
        <div className="ant-drawer-body">
          <div className="my-4">
            {tabs.map((tab) => (
              <Link
                key={tab}
                to={tab.to}
                className={`d-flex ${tab.isActive ? "activeTab" : ""} tab`}
              >
                <img src={tab.icon} alt={tab.tabName} />
                <label className="mx-4 f-rubik-18px  cursor-pointer">
                  {tab.tabName}
                </label>
              </Link>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default MobileSideBar;
