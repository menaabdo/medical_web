import React from "react";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import Section1 from "./Section1";
import Section2 from "./Section2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import browseIcon from "../../../assets/icons/browse-icon.svg";

export default function Faq() {
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);

  const items = [
    {
      key: "Section1",
      label: t("Section1"),
      children: <Section1 />,
    },
    {
      key: "Section2",
      label: t("Section2"),
      children: <Section2 />,
    },
  ];

  return (
    <>
      <div className="page">
        <div className="sub-section">
          <div className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}>
            {t("faq")}
            <span>
              <Link
                className="f-poppins-16px mx-2 site-settings-link "
                to="https://main.dt6ausaqcn3zv.amplifyapp.com/frequentlyaskedquestions"
              >
                <img src={browseIcon} alt="browse-icon" className="mx-1" />
                {""}
                {t("browse_it")}
              </Link>
            </span>
          </div>

          <Tabs defaultActiveKey="Section1" items={items} />
        </div>
      </div>
    </>
  );
}
