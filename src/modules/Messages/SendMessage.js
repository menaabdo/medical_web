import React from "react";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import SendNotification from "./SendNotification";
import SendEmail from "./SendEmail";

export default function SendMessage() {
  const { t } = useTranslation();

  const items = [
    {
      key: "sendEmail",
      label: t("sendEmail"),
      children: <SendEmail />,
    },
    {
      key: "sendNotification",
      label: t("sendNotification"),
      children: <SendNotification />,
    },
  ];

  return (
    <>
      <div className="page">
        <div className="sub-section">
          <Tabs defaultActiveKey="sendEmail" items={items} />
        </div>
      </div>
    </>
  );
}
