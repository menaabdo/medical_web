import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/_routes";

function CapsuleTabs({ tabs, onActiveTabChange }) {
  const { size } = useSelector((state) => state.screen);
  const navigate = useNavigate();
  return (
    <div className="d-flex capsule-tabs">
      {tabs.map((tab) => (
        <div
          onClick={() => {
            navigate(
              tab.id ? ROUTES.ACTIVE_PACKAGES : ROUTES.INACTIVE_PACKAGES
            );
          }}
          // onClick={() => {
          // 	navigate(tab.id ? ROUTES.PACKAGES : ROUTES.INACTIVEPACKAGES);
          // }}
          className={`tab-capsule cursor-pointer me-2 f-poppins-${
            size === "small" ? "12px" : "16px"
          } ${tab.isActive ? "fw-600 active" : "fw-400"}`}
        >
          {tab.tabName}
        </div>
      ))}
    </div>
  );
}

export default CapsuleTabs;
