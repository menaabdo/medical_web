import React from "react";
import { Pie, measureTextWidth } from "@ant-design/plots";
import { useTranslation } from "react-i18next";

export default function DonutPlot({
  doctorsCount,
  nursesCount,
  hospitalsCount,
}) {
  const { t } = useTranslation();

  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    );
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      );
    }

    const textStyleStr = `width:${containerWidth}px;text-align:center;font-size:${
      scale * 0.4
    }em;line-height: 1.2em;`; // Adjust the font-size and line-height values as desired
    return `<div style="${textStyleStr}">${text}</div>`;
  }

  const data = [
    {
      type: t("doctors"),
      value: doctorsCount,
    },
    {
      type: t("nurses"),
      value: nursesCount,
    },
    {
      type: t("hospitals"),
      value: hospitalsCount,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",

    colorField: "type",
    color: ["#009FEE", "#66CCFF", "#DDF4FF"],
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v}`,
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        textAlign: "center",
      },
      autoRotate: false,
      content: "{value}",
    },
    statistic: {
      title: {
        style: {
          fontSize: "28px",
          fontWeight: "bold",
        },
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : t("total_users");
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: "28px",
          fontWeight: "bold",
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? ` ${datum.value}`
            : ` ${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 28,
          });
        },
      },
    },

    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "pie-statistic-active",
      },
    ],
  };
  return <Pie {...config} />;
}
