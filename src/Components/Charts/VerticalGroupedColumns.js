import React from "react";
import { Column } from "@ant-design/plots";
import { useTranslation } from "react-i18next";

export default function VerticalGroupedColumns({
  doctorsCount,
  nursesCount,
  hospitalsCount,
}) {
  const { t } = useTranslation();

  const data = [
    {
      type: t("doctors"),
      time: "2023-01",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-01",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-01",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-02",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-02",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-02",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-03",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-03",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-03",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-04",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-04",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-04",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-05",
      value: doctorsCount,
    },
    {
      type: t("nurses"),
      time: "2023-05",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-05",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-06",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-06",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-06",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-07",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-07",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-07",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-08",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-08",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-08",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-09",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-09",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-09",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-10",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-10",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-10",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-11",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-11",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-11",
      value: hospitalsCount,
    },
    {
      type: t("Doctors"),
      time: "2023-12",
      value: doctorsCount,
    },

    {
      type: t("nurses"),
      time: "2023-12",
      value: nursesCount,
    },

    {
      type: t("hospitals"),
      time: "2023-12",
      value: hospitalsCount,
    },
  ];

  const config = {
    data,
    xField: "time",
    yField: "value",
    seriesField: "type",
    isGroup: true,
    color: ["#122738", "#66CCFF", "#DAE8F3"],
    columnStyle: {
      radius: [30, 30, 0, 0],
      innerWidth: 25,
      outerHeight: 25,
    },
  };

  return <Column {...config} />;
}
