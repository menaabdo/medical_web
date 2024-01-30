import { Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../Components/Inputs";
import {
  editPackageTitle,
  getAllPackages,
  getPackagesSectionTitle,
} from "./services";
import Alert from "../../Components/Alert";
import CapsuleTabs from "../../Components/CapsuleTabs";
import Loader from "../../Components/Loader/Loader";
import PackageCard from "./PackageCard";
import moment from "moment";
import { Link } from "react-router-dom";

export default function ActivePackages() {
  const [packages, updatePackages] = useState([]);
  const [hasError, updateHasError] = useState({
    status: false,
    message: "null",
  });
  const [activeTab, updateActiveTab] = useState(true);
  const [titleValue, updateTitleValue] = useState(null);
  const [loading, updateLoading] = useState(false);
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);

  const tabs = [
    { tabName: t("active_package"), isActive: activeTab === true, id: true },
    {
      tabName: t("inactive_package"),
      isActive: activeTab === false,
      id: false,
    },
  ];

  const handleGetPackageSectionTitle = () => {
    updateLoading(true);
    getPackagesSectionTitle(
      (success) => {
        updateLoading(false);
        updateTitleValue(success);
      },
      (fail) => {
        updateLoading(false);
      }
    );
  };
  const handleGetAllPackages = () => {
    updateLoading(true);
    getAllPackages(
      (success) => {
        updateLoading(false);
        const filteredData = success.data.filter(
          (pack) => pack.visible === activeTab
        );
        updatePackages(filteredData);
      },
      (fail) => {
        updateLoading(false);
      }
    );
  };

  const onSectionTitleFinish = (values) => {
    editPackageTitle(
      values,
      (success) => {
        updateHasError({
          status: true,
          severity: "success",
          message: success.message,
        });
      },
      (fail) => {
        updateHasError({
          status: true,
          severity: "error",
          message: fail.data.message,
        });
      }
    );
  };

  useEffect(() => {
    handleGetPackageSectionTitle();
    handleGetAllPackages();
  }, [activeTab]);

  return (
    <div className="page">
      <div className="sub-section">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="d-flex justify-content-center alert-box">
              <Alert
                severity={hasError?.severity || "error"}
                open={hasError.status}
                onClose={() => {
                  updateHasError({ status: false, message: null });
                }}
              >
                {t(hasError.message)}
              </Alert>
            </div>

            <div className="d-flex flex-wrap justify-content-between">
              <div
                className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}
              >
                {t("packages")}
              </div>
              <Button className="btn-primary-green-md">
                <Link to="/packages/add">{t("addNewPackage")}</Link>
              </Button>
            </div>

            <Form
              onFinish={onSectionTitleFinish}
              initialValues={titleValue}
              key={titleValue}
            >
              <div className="send-msg-modal align-items-center my-2">
                <Form.Item
                  className="my-0"
                  label=""
                  name={"sectionTitle"}
                  rules={[
                    {
                      required: true,
                      message: t("pleaseEnterSectionTitle"),
                    },
                  ]}
                >
                  <InputForm
                    className="w-100 input-xmd"
                    label={t("sectionTitle")}
                  />
                </Form.Item>
              </div>

              <div className="d-flex flex-wrap">
                <Button
                  htmlType="submit"
                  className="btn-primary-sm my-1"
                  classNames="mx-2"
                >
                  {t("saveChanges")}
                </Button>
              </div>
            </Form>

            <div className="my-4">
              <CapsuleTabs
                tabs={tabs}
                onActiveTabChange={(selectedTab) => {
                  updateActiveTab(selectedTab);
                }}
              />
            </div>

            {packages &&
              packages.length > 0 &&
              packages.map((pack, indx) => {
                return (
                  <>
                    <PackageCard
                      packageType="active"
                      packageName={pack?.name}
                      isPopular={pack?.most_popular}
                      connection={pack?.connection_quota || 0}
                      job={pack?.job_quota || 0}
                      createIn={moment(pack?.createdAt).format("MMM DD, YYYY")}
                      packageId={pack.id}
                    />
                  </>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}
