import React from "react";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import DeletedDoctors from "./DeletedDoctors";
import DeletedNurses from "./DeletedNurses";
import DeletedHospitals from "./DeletedHospitals";

export default function DeletedAccounts() {
  const { t } = useTranslation();

  const items = [
    {
      key: "doctors",
      label: t("doctors"),
      children: <DeletedDoctors />,
    },
    {
      key: "nurses",
      label: t("nurses"),
      children: <DeletedNurses />,
    },
    {
      key: "hospitals",
      label: t("hospitals"),
      children: <DeletedHospitals />,
    },
  ];

  return (
    <>
      <div className="page">
        <div className="sub-section">
          <Tabs defaultActiveKey="doctors" items={items} />
        </div>
      </div>
    </>
  );
}
