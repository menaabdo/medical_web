import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DonutPlot from "../../Components/Charts/DonutPlot";
import VerticalGroupedColumns from "../../Components/Charts/VerticalGroupedColumns";
import { Progress } from "antd";
import { getStatistics } from "./services";
import { Col, Row } from "antd";
import doneIcon from "@assets/icons/done-icon.svg";
import pendingIcon from "@assets/icons/pending-icon.svg";
import inactiveIcon from "@assets/icons/inactive-icon.svg";
import Loader from "../../Components/Loader/Loader";
import CustomizedMenus from "../../Components/CustomizedMenus";
import { DownOutlined } from "@ant-design/icons";

export default function Statistics() {
  const [doctorDetails, setDoctorDetails] = useState({});
  const [nursesDetails, setNursesDetails] = useState({});
  const [hospitalDetails, setHospitalDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const { size } = useSelector((state) => state.screen);
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState("doctor");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const ActivationStatusList = [
    {
      label: t("doctor"),
      value: "doctor",
    },
    {
      label: t("nurse"),
      value: "nurse",
    },
    {
      label: t("hospital"),
      value: "hospital",
    },
  ];

  useEffect(() => {
    setLoading(true);
    let data;
    getStatistics(
      data,
      (success) => {
        setLoading(false);
        setDoctorDetails(success?.data?.doctor);
        setNursesDetails(success?.data?.nurse);
        setHospitalDetails(success?.data?.hospital);
      },
      (fail) => {
        setLoading(false);
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="page">
        <div className="sub-section">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div
                className={`mx-2 mb-2 f-rubik-${
                  size === "small" ? "16px" : "28px"
                }`}
              >
                {t("dashboard")}
              </div>
              <Row>
                <Col md={24} lg={12}>
                  <div className="sub-section mt-0 mx-3">
                    <DonutPlot
                      doctorsCount={doctorDetails?.totalCount}
                      nursesCount={nursesDetails?.totalCount}
                      hospitalsCount={hospitalDetails?.totalCount}
                    />
                  </div>
                </Col>
                <Col md={24} lg={12}>
                  <div className="sub-section">
                    <Row justify="space-between">
                      <Col xs={24} md={20}>
                        <h4>{t("total_activation")}</h4>
                      </Col>
                      <Col xs={24} md={4} className="my-1 totalCount">
                        <div>
                          {doctorDetails?.totalCount +
                            nursesDetails?.totalCount +
                            hospitalDetails?.totalCount}
                        </div>
                      </Col>
                      <Col xs={24}>
                        <span>{t("doctors")}</span>
                        <Progress
                          percent={doctorDetails?.active}
                          format={() => doctorDetails?.totalCount}
                          strokeColor={{ "0%": "#009FEE", "100%": "#009FEE" }}
                        />
                      </Col>

                      <Col xs={24}>
                        <span>{t("nurses")}</span>
                        <Progress
                          percent={nursesDetails?.active}
                          format={() => nursesDetails?.totalCount}
                          strokeColor={{ "0%": "#66CCFF", "100%": "#66CCFF" }}
                        />
                      </Col>

                      <Col xs={24}>
                        <span>{t("hospitals")}</span>
                        <Progress
                          percent={hospitalDetails?.active}
                          format={() => hospitalDetails?.totalCount}
                          strokeColor={{ "0%": "#DDF4FF", "100%": "#DDF4FF" }}
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col md={24} lg={16}>
                  <div className="sub-section mx-3">
                    <h4>{t("interaction")}</h4>

                    <VerticalGroupedColumns
                      doctorsCount={doctorDetails?.totalCount}
                      nursesCount={nursesDetails?.totalCount}
                      hospitalsCount={hospitalDetails?.totalCount}
                    />
                  </div>
                </Col>
                <Col md={24} lg={8}>
                  <div className="sub-section">
                    <Row justify="space-between">
                      <Col xs={24} md={20}>
                        <h4>{t("activation_status")}</h4>
                      </Col>
                      <Col xs={24} md={4}>
                        <CustomizedMenus
                          items={ActivationStatusList}
                          id="active-menu"
                          active={selectedOption}
                          beforeClose={handleOptionChange}
                          children={
                            <>
                              <div className="d-flex align-items-center active-menu my-1">
                                <span className="d-flex cursor-pointer">
                                  {t(`${selectedOption}`)} <DownOutlined />
                                </span>
                              </div>
                            </>
                          }
                        />
                      </Col>

                      <Col xs={24} md={20}>
                        <div>
                          <img
                            src={doneIcon}
                            className="status-icon"
                            alt="done"
                          />
                          {t("activate")}
                        </div>
                      </Col>
                      <Col xs={24} md={4}>
                        <div className="my-4">
                          {selectedOption === "doctor"
                            ? doctorDetails?.active
                            : selectedOption === "nurse"
                            ? nursesDetails?.active
                            : hospitalDetails?.active}
                        </div>
                      </Col>

                      <Col xs={24} md={20}>
                        <div>
                          <img
                            src={pendingIcon}
                            className="status-icon"
                            alt="done"
                          />
                          {t("pending")}
                        </div>
                      </Col>
                      <Col xs={24} md={4}>
                        <div className="my-4">
                          {selectedOption === "doctor"
                            ? doctorDetails?.pending
                            : selectedOption === "nurse"
                            ? nursesDetails?.pending
                            : hospitalDetails?.pending}
                        </div>
                      </Col>

                      <Col xs={24} md={20}>
                        <div>
                          <img
                            src={inactiveIcon}
                            className="status-icon"
                            alt="done"
                          />
                          {t("inactive")}
                        </div>
                      </Col>
                      <Col xs={24} md={4}>
                        <div className="my-4">
                          {selectedOption === "doctor"
                            ? doctorDetails?.inactive
                            : selectedOption === "nurse"
                            ? nursesDetails?.inactive
                            : hospitalDetails?.inactive}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    </>
  );
}
