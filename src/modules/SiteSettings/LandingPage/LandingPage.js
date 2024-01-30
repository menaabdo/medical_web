import React from 'react'
import Section1 from './Section1';
import { useTranslation } from 'react-i18next';
import { Tabs } from "antd";
import browseIcon from "../../../assets/icons/browse-icon.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const {t} = useTranslation()
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
      // children: <Section2 />,
    },
    {
      key: "Section3",
      label: t("Section3"),
      // children: <Section2 />,
    },
    {
      key: "Section4",
      label: t("Section4"),
      // children: <Section2 />,
    },
    {
      key: "Section5",
      label: t("Section5"),
      // children: <Section2 />,
    },
    {
      key: "Section6",
      label: t("Section6"),
      // children: <Section2 />,
    },
    {
      key: "Section7",
      label: t("Section7"),
      // children: <Section2 />,
    },
    {
      key: "Section8",
      label: t("Section8"),
      // children: <Section2 />,
    },
  ];


  return (
    <div className="page">
    <div className="sub-section">
      <div className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}>
        {t("landing_page")}
        <span>
          <Link
            className="f-poppins-16px mx-2 site-settings-link "
            to="https://main.dt6ausaqcn3zv.amplifyapp.com/"
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
  )
}
