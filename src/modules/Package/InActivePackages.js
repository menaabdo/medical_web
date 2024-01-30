import { Button, Form, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../Components/Inputs";
import {
  createPackage,
  deletePackage,
  editPackage,
  editPackageTitle,
  getAllPackages,
  getPackagesSectionTitle,
} from "./services";
import garbage from "@assets/icons/garbage.svg";
import Alert from "../../Components/Alert";
import { Switch } from "../../Components/Switch";
import CapsuleTabs from "../../Components/CapsuleTabs";
import AddNewPackageModal from "./AddNewPackageModal";
import Loader from "../../Components/Loader/Loader";
import { DeleteOutlined } from "@ant-design/icons";

export default function InActivePackages() {
  const [packages, updatePackages] = useState([]);
  const [initialValues, updateInitialValues] = useState({});
  const [hasError, updateHasError] = useState({
    status: false,
    message: "null",
  });
  const [isAddPackModalVisible, updateIsAddPackModalVisible] = useState(false);
  const [activeTab, updateActiveTab] = useState(false);
  const [isLoading, updateIsLoading] = useState(false);
  const [titleValue, updateTitleValue] = useState(null);
  const [loading, updateLoading] = useState(false);
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);
  const [form] = Form.useForm();
  const formRef = useRef();

  const onFinish = (values, visible) => {
    const result = {};
    const features_list = [];
    for (const key in values) {
      if (key.startsWith("feature")) {
        features_list.push(values[key]);
      } else {
        const splittedKey = key.split("_");
        let newKey = splittedKey[0] === "cost" ? "price" : splittedKey[0];
        result[newKey] = values[key];
      }
    }
    const allResults = { ...result, features_list };
    if (allResults.id) {
      allResults.visible = visible ? visible : packages[values.indx]?.visible;
      updateIsLoading(allResults.indx);
      delete allResults.indx;
      editPackage(
        allResults,
        (success) => {
          updateIsLoading(false);
          updateHasError({
            status: true,
            severity: "success",
            message: success.message,
          });
          handleGetAllPackages();
        },
        (fail) => {
          updateIsLoading(false);
          updateHasError({
            status: true,
            severity: "error",
            message: fail.data.message,
          });
        }
      );
    } else {
      allResults.visible = true;
      updateIsLoading(allResults.indx);
      delete allResults.indx;
      delete allResults.id;
      createPackage(
        allResults,
        (success) => {
          updateIsLoading(false);
          updateHasError({
            status: true,
            severity: "success",
            message: success.message,
          });
          updateIsAddPackModalVisible(false);
          handleGetAllPackages();
        },
        (fail) => {
          updateIsLoading(false);
          updateHasError({
            status: true,
            severity: "error",
            message: fail?.data?.message,
          });
        }
      );
    }
  };
  const handleGetAllPackages = () => {
    updateLoading(true);
    getAllPackages(
      (success) => {
        updateLoading(false);
        const filteredData = success.data.filter(
          (pack) => pack.visible === activeTab
        );
        const initialValues = filteredData.reduce((acc, pack, index) => {
          acc[`name_${index}`] = pack.name; // Set the initial value for each field based on the index
          acc[`cost_${index}`] = pack.price;
          acc[`quota_${index}`] = pack.quota;
          acc[`duration_${index}`] = pack.duration;
          acc[`visible_${index}`] = pack.visible ? "on" : "off";
          pack.features_list.forEach((feature, featureIndex) => {
            acc[`feature_${index}_${featureIndex}`] = feature; // Set the initial value for each feature based on the pack index and feature index
          });

          return acc;
        }, {});
        updateInitialValues(initialValues);
        updatePackages(filteredData);
      },
      (fail) => {
        updateLoading(false);
      }
    );
  };
  useEffect(() => {
    handleGetAllPackages();
    handleGetPackageSectionTitle();
  }, [activeTab]);
  const handleGetPackageSectionTitle = () => {
    getPackagesSectionTitle(
      (success) => {
        updateTitleValue(success);
      },
      (fail) => {}
    );
  };
  const handleAddNewPackage = () => {
    // let allPackages = [...packages];
    // const newObject = {
    // 	createdAt: "",
    // 	deletedAt: "",
    // 	duration: "",
    // 	features_list: ["", "", ""],
    // 	id: null,
    // 	ltr_order: "",
    // 	name: "",
    // 	price: "",
    // 	quota: "",
    // 	updatedAt: "",
    // 	visible: true,
    // };
    // allPackages.push(newObject);
    // updatePackages([...allPackages]);
    updateIsAddPackModalVisible(true);
  };
  const handleDeletePackage = (indx) => {
    const allPackages = [...packages];
    if (allPackages[indx].id) {
      deletePackage(
        allPackages[indx],
        (success) => {
          allPackages.splice(indx, 1);
          const initialValues = allPackages.reduce((acc, pack, index) => {
            acc[`name_${index}`] = pack.name; // Set the initial value for each field based on the index
            acc[`cost_${index}`] = pack.price;
            acc[`quota_${index}`] = pack.quota;
            acc[`duration_${index}`] = pack.duration;
            acc[`visible_${index}`] = pack.visible;
            pack.features_list.forEach((feature, featureIndex) => {
              acc[`feature_${index}_${featureIndex}`] = feature; // Set the initial value for each feature based on the pack index and feature index
            });

            return acc;
          }, {});
          updateInitialValues(initialValues);
          updatePackages(allPackages);
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
    } else {
      allPackages.splice(indx, 1);
      const initialValues = allPackages.reduce((acc, pack, index) => {
        acc[`name_${index}`] = pack.name; // Set the initial value for each field based on the index
        acc[`cost_${index}`] = pack.price;
        acc[`quota_${index}`] = pack.quota;
        acc[`duration_${index}`] = pack.duration;
        acc[`visible_${index}`] = pack.visible;
        pack.features_list.forEach((feature, featureIndex) => {
          acc[`feature_${index}_${featureIndex}`] = feature; // Set the initial value for each feature based on the pack index and feature index
        });

        return acc;
      }, {});
      updateHasError({
        status: true,
        severity: "success",
        message: t("packageDeletedSuccessfully"),
      });
      updateInitialValues(initialValues);
      updatePackages(allPackages);
    }
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
  const tabs = [
    { tabName: t("active"), isActive: activeTab === true, id: true },
    { tabName: t("inActive"), isActive: activeTab === false, id: false },
  ];
  const handleSwitchVisible = (e, indx) => {
    let allPackages = [...packages];
    allPackages[indx].visible = e.target.checked;
    updatePackages(allPackages);
    editPackage(
      { visible: e.target.checked, id: packages[indx].id },
      (success) => {
        updateIsLoading(false);
        updateHasError({
          status: true,
          severity: "success",
          message: success.message,
        });
        handleGetAllPackages();
      },
      (fail) => {
        updateIsLoading(false);
        updateHasError({
          status: true,
          severity: "error",
          message: fail.data.message,
        });
      }
    );
  };

  const handleDeleteFeature = (packageIndex, featureIndex) => {
    const updatedPackages = [...packages];
    updatedPackages[packageIndex].features_list.splice(featureIndex, 1);
    updatePackages(updatedPackages);
  };

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

            <div className="d-flex justify-content-between">
              <div
                className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}
              >
                {t("packages")}
              </div>
              <Button
                className="btn-primary-green-md"
                onClick={handleAddNewPackage}
              >
                {t("addNewPackage")}
              </Button>
            </div>
            <Form
              onFinish={onSectionTitleFinish}
              initialValues={titleValue}
              key={titleValue}
            >
              <div className="d-flex align-items-center my-2">
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
                  <InputForm className="input-xmd" label={t("sectionTitle")} />
                </Form.Item>
              </div>
              <div className="d-flex flex-wrap">
                <Button
                  htmlType="submit"
                  className="btn-primary-md my-1"
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

            {packages.map((pack, indx) => {
              const handleFinish = ({ ...values }) => {
                onFinish({ ...values, id: packages[indx].id, indx });
              };
              return (
                <Form
                  form={form[indx]}
                  name={`form_${indx}`}
                  key={pack}
                  className="d-flex flex-column align-items-start my-2"
                  onFinish={handleFinish}
                  initialValues={initialValues}
                >
                  <div key={indx}>
                    <div className="d-flex justify-content-between">
                      <div className={`f-rubik-16px`}>
                        {t("package")} {indx + 1}
                      </div>
                      {/* <img
										src={garbage}
										alt="garbage"
										className="cursor-pointer"
										onClick={() => {
											handleDeletePackage(indx);
										}}
									/> */}
                      <Form.Item
                        label=""
                        className="mx-2"
                        name={`visible_${indx}`}
                      >
                        <Switch
                          checked={pack.visible}
                          onChange={(e) => handleSwitchVisible(e, indx)}
                        />
                      </Form.Item>
                    </div>

                    <div className="d-flex flex-wrap">
                      <Form.Item
                        label=""
                        className="mx-2"
                        name={`name_${indx}`}
                        rules={[
                          {
                            required: true,
                            message: t("pleaseEnterTheName"),
                          },
                        ]}
                      >
                        <InputForm className="input-md" label={t("name")} />
                      </Form.Item>
                      <Form.Item
                        label=""
                        className="mx-2"
                        name={`cost_${indx}`}
                        rules={[
                          {
                            required: true,
                            message: t("pleaseEnterTheCost"),
                          },
                        ]}
                      >
                        <InputForm
                          className="input-md"
                          label={t("cost")}
                          type="number"
                        />
                      </Form.Item>

                      <Form.Item
                        label=""
                        className="mx-2"
                        name={`quota_${indx}`}
                        rules={[
                          {
                            required: true,
                            message: t("pleaseEnterTheNumberOfConnections"),
                          },
                        ]}
                      >
                        <InputForm
                          className="input-md"
                          label={t("numberOfConnections")}
                          type="number"
                        />
                      </Form.Item>
                      <Form.Item
                        label=""
                        className="mx-2"
                        name={`duration_${indx}`}
                        rules={[
                          {
                            required: true,
                            message: t("pleaseEnterTheSubscriptionPeriod"),
                          },
                        ]}
                      >
                        <InputForm
                          className="input-md"
                          label={t("subscriptionPeriod")}
                          type="number"
                        />
                      </Form.Item>
                      {pack?.features_list.map((feature, featureIndx) => {
                        return (
                          <>
                            <Form.Item
                              label=""
                              className="mx-2"
                              name={`feature_${indx}_${featureIndx}`}
                              rules={[
                                {
                                  required: true,
                                  message: t("pleaseEnterTheFeature"),
                                },
                              ]}
                            >
                              <InputForm
                                className="input-md"
                                label={`${t("feature")}  #${featureIndx + 1}`}
                              />
                            </Form.Item>
                            <Tooltip title={t("delete")}>
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() =>
                                  handleDeleteFeature(indx, featureIndx)
                                }
                              />
                            </Tooltip>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    htmlType="submit"
                    className="btn-primary-md"
                    isLoading={isLoading && isLoading === indx}
                  >
                    {t("saveChanges")}
                  </Button>
                </Form>
              );
            })}
            {isAddPackModalVisible ? (
              <AddNewPackageModal
                onCancel={() => {
                  updateIsAddPackModalVisible(false);
                }}
                open={isAddPackModalVisible}
                packagesLengths={packages.length}
                onFinish={onFinish}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}
