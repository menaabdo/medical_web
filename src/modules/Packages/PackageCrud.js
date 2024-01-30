import { Button, Form } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  createPackage,
  deletePackage,
  editPackage,
  getPackageDetails,
  getPackageDuration,
  activatePackage,
  deactivatePackage,
  isPopularPackage,
} from "./services";
import Alert from "../../Components/Alert";
import { Switch } from "../../Components/Switch";
import Loader from "../../Components/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import back from "@assets/icons/back-icon.svg";
import add from "@assets/icons/add.svg";
import { DeleteOutlined, StarFilled } from "@ant-design/icons";
import deleteImage from "@assets/icons/trash-delete.svg";
import ConfirmationModal from "../Common/ConfirmationModal";
import InputForm from "./components/selectInput";
import { Autocomplete, TextField } from "@mui/material";

export default function PackageCrud() {
  const [initialValues, updateInitialValues] = useState({});
  const [hasError, updateHasError] = useState({
    status: false,
    message: "null",
  });
  const [loading, updateLoading] = useState(false);
  const [loadingData, updateLoadingData] = useState(false);
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);
  const [form] = Form.useForm();
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.id;
  const [data, updateData] = useState(null);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const [packageDropdownList, updatePackageDropdownList] = useState([]);
  const [initialDurationsCount, setInitialDurationsCount] = useState(2);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [durations, setDurations] = useState([
    {
      duration_id: "",
      price: "",
    },
    {
      duration_id: "",
      price: "",
    },
  ]);
  const [featuresCount, setFeaturesCount] = useState(3);

  const [features, setFeatures] = useState([
    {
      feature_id: "",
    },
    {
      feature_id: "",
    },
    {
      feature_id: "",
    },
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const resetForm = () => {
    form.resetFields();
    updatePackageDropdownList([]);
  };

  const handleAddDuration = () => {
    setDurations((prevDurations) => [
      ...prevDurations,
      {
        duration_id: null,
        price: null,
      },
    ]);
  };

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      {
        feature_id: "",
      },
    ]);
  };

  const handleGetPackageDetails = () => {
    updateLoadingData(true);
    let data = { id };

    getPackageDetails(
      data,
      (success) => {
        updateLoadingData(false);
        const data1 = {};
        const data2 = {};
        for (let i = 0; i < success?.data?.PackageDurations.length; i++) {
          data1[`durations[${i}].duration_id`] =
            success?.data?.PackageDurations[i].duration_id;
        }
        for (let i = 0; i < success?.data?.PackageDurations.length; i++) {
          data2[`durations[${i}].price`] =
            success?.data?.PackageDurations[i].price;
        }
        const data3 = {};
        for (let i = 0; i < success?.data?.features_list.length; i++) {
          data3[`features[${i}].feature_id`] = success?.data?.features_list[i];
        }
        const initialValues = {
          connection_quota: success?.data?.connection_quota,
          job_quota: success?.data?.job_quota,
          ltr_order: success?.data?.ltr_order,
          name: success?.data?.name,
          ...data1,
          ...data2,
          ...data3,
          info: success?.data?.info,
        };
        updateInitialValues(initialValues);
        updateData(success?.data);
        setDurations(success.data?.PackageDurations);
        setFeatures(success.data?.features_list);
      },

      (fail) => {
        updateLoadingData(false);
      }
    );
  };
  // console.log({ initialValues });

  const handleGetPackageDuration = () => {
    updateLoading(true);
    getPackageDuration(
      (success) => {
        updateLoading(false);
        updatePackageDropdownList(success?.data?.items);
      },
      (fail) => {
        updateLoading(false);
      }
    );
  };

  const onFinish = (values) => {
    if (id) {
      const data = {
        id,
        name: values.name,
        connection_quota: values.connection_quota,
        job_quota: values.job_quota,
        visible: values.visible,
        features_list: features?.map((feature) => feature),
        durations: durations?.map((duration) => ({
          duration_id: duration.duration_id,
          price: duration.price,
        })),
        info: (values.info && values.info) || undefined,
      };
      updateLoading(true);
      editPackage(
        data,
        (success) => {
          updateLoading(false);
          updateHasError({
            status: true,
            severity: "success",
            message: success.message,
          });
          handleBack();
        },
        (fail) => {
          updateLoading(false);
          updateHasError({
            status: true,
            severity: "error",
            message: fail.data.message,
          });
        }
      );
    } else {
      const data = {
        name: values.name,
        connection_quota: values.connection_quota,
        job_quota: values.job_quota,
        visible: false,
        features_list: features?.map((feature) => feature.feature_id),
        durations: durations?.map((duration) => ({
          duration_id: duration.duration_id,
          price: duration.price,
        })),
        info: (values.info && values.info) || undefined,
      };

      updateLoading(true);
      createPackage(
        data,
        (success) => {
          updateLoading(false);
          updateHasError({
            status: true,
            severity: "success",
            message: success.message,
          });
          // resetForm();
          handleBack();
        },
        (fail) => {
          updateLoading(false);
          updateHasError({
            status: true,
            severity: "error",
            message: fail?.data?.message,
          });
        }
      );
    }
  };

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formRef.current.validateFields().then(() => {
        formRef.current.submit();
      });
    }
  };

  const handleDeleteDuration = (index) => {
    if (index >= initialDurationsCount) {
      const updatedDurations = [...durations];
      const deletedDuration = updatedDurations.splice(index, 1)[0];
      setSelectedDurations((prevSelected) =>
        prevSelected.filter((id) => id !== deletedDuration.duration_id)
      );
      const initialValues = updatedDurations.reduce((acc, contact, index) => {
        acc[`durations[${index}].duration_id`] = contact.duration_id;
        acc[`durations[${index}].price`] = contact.price;
        return acc;
      }, {});
      form.setFieldsValue(initialValues);
      setDurations(updatedDurations);
    }
  };

  const handleDeleteFeature = (index) => {
    if (index >= featuresCount) {
      const updatedFeatures = [...features];
      updatedFeatures.splice(index, 1);
      setFeatures(updatedFeatures);
    }
  };

  const handleDeletePackage = () => {
    updateLoading(true);
    let data = { id };
    deletePackage(
      data,
      (success) => {
        updateLoading(false);
        updateHasError({
          status: true,
          severity: "success",
          message: success.message,
        });
        handleBack();
      },
      (fail) => {
        updateLoading(true);
        updateHasError({
          status: true,
          severity: "error",
          message: fail.data.message,
        });
      }
    );
  };

  const handleOpenInactiveSwitchModal = () => {
    updateIsConfModalVisible({
      status: true,
      icon: null,
      title: t("inActivePackageConf"),
      buttons: [
        {
          name: t("inactive"),
          onClick: () => {
            handleDeactivatePackage({
              id,
            });
          },
        },
        {
          name: t("cancel"),
          onClick: () => {
            updateIsConfModalVisible({
              status: false,
              icon: null,
              title: null,
              additionalFields: null,
              buttons: [],
            });
          },
        },
      ],
    });
  };
  const handleOpenActiveSwitchModal = () => {
    updateIsConfModalVisible({
      status: true,
      icon: null,
      title: t("ActivePackageConf"),
      buttons: [
        {
          name: t("active"),
          onClick: () => {
            handleActivatePackage({
              id,
            });
          },
        },
        {
          name: t("cancel"),
          onClick: () => {
            updateIsConfModalVisible({
              status: false,
              icon: null,
              title: null,
              additionalFields: null,
              buttons: [],
            });
          },
        },
      ],
    });
  };
  const handleOpenIsPopularModal = () => {
    updateIsConfModalVisible({
      status: true,
      icon: null,
      title: t("isPopularConf"),
      buttons: [
        {
          name: t("confirm"),
          onClick: () => {
            handleIsPopularPackage({
              id,
            });
          },
        },
        {
          name: t("cancel"),
          onClick: () => {
            updateIsConfModalVisible({
              status: false,
              icon: null,
              title: null,
              additionalFields: null,
              buttons: [],
            });
          },
        },
      ],
    });
  };

  const handleIsPopularPackage = () => {
    updateLoading(true);
    let data = { id };
    isPopularPackage(
      data,
      (success) => {
        updateLoading(false);
        updateHasError({
          status: true,
          severity: "success",
          message: success.message,
        });
        handleGetPackageDetails();
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
      },
      (fail) => {
        updateLoading(true);
        updateHasError({
          status: true,
          severity: "error",
          message: fail.data.message,
        });
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
      }
    );
  };
  const handleActivatePackage = () => {
    updateLoading(true);
    let data = { id };
    activatePackage(
      data,
      (success) => {
        updateLoading(false);
        updateHasError({
          status: true,
          severity: "success",
          message: success.message,
        });
        handleGetPackageDetails();
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
      },
      (fail) => {
        updateLoading(true);
        updateHasError({
          status: true,
          severity: "error",
          message: fail.data.message,
        });
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
      }
    );
  };

  const handleDeactivatePackage = () => {
    updateLoading(true);
    let data = { id };
    deactivatePackage(
      data,
      (success) => {
        updateLoading(false);
        updateHasError({
          status: true,
          severity: "success",
          message: success.message,
        });
        handleGetPackageDetails();
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
      },
      (fail) => {
        updateLoading(true);
        updateHasError({
          status: true,
          severity: "error",
          message: fail.data.message,
        });
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
      }
    );
  };

  const handleDeletePackageModal = () => {
    updateIsConfModalVisible({
      status: true,
      icon: deleteImage,
      title: t("deletePackageConf"),
      buttons: [
        {
          name: t("delete"),
          onClick: () => {
            handleDeletePackage({
              id,
            });
          },
        },
        {
          name: t("cancel"),
          onClick: () => {
            updateIsConfModalVisible({
              status: false,
              icon: null,
              title: null,
              additionalFields: null,
              buttons: [],
            });
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (location?.state?.id) {
      handleGetPackageDetails();
    }
  }, [location?.state?.id]);

  useEffect(() => {
    handleGetPackageDuration();
  }, []);

  useEffect(() => {
    if (
      id &&
      Array.isArray(durations) &&
      durations.every((d) => typeof d.duration_id === "number")
    ) {
      setSelectedDurations((prevSelectedDurations) => {
        const newSelectedDurations = [
          ...prevSelectedDurations,
          ...durations.map((d) => d.duration_id),
        ];
        return newSelectedDurations;
      });
    }
  }, [durations, id, setSelectedDurations]);

  const arrayLength = packageDropdownList
    .filter((pack) => !selectedDurations.includes(pack.id))
    .map((pack) => ({
      _id: pack?.id,
      value: pack?.name_en,
    }));

  console.log("arrayLength", arrayLength.length);

  return (
    <div className="page">
      <div className="sub-section">
        {loadingData ? (
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
            <Form
              form={form}
              onFinish={onFinish}
              ref={formRef}
              initialValues={initialValues}
            >
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <img
                    src={back}
                    onClick={handleBack}
                    className="cursor-pointer mx-2"
                    alt="back"
                  />
                  <div
                    className={`mb-2 f-rubik-${
                      size === "small" ? "16px" : "28px"
                    }`}
                  >
                    {id ? data?.name : t("new_package")}
                  </div>
                </div>

                <div className="d-flex flex-wrap">
                  {id && (
                    <Button
                      danger
                      className="mx-1 mt-1 deleteBtn"
                      onClick={handleDeletePackageModal}
                    >
                      <span>
                        <DeleteOutlined /> {t("deletePackage")}
                      </span>
                    </Button>
                  )}
                  {id && data?.visible === true && (
                    <Button
                      className="btn-text-sm mx-1 mostPopularBtn"
                      type="text"
                      onClick={handleOpenIsPopularModal}
                    >
                      <span>
                        <StarFilled
                          className={data.most_popular ? "mostPopularStar" : ""}
                        />{" "}
                        {t("most_popular")} ?
                      </span>
                    </Button>
                  )}
                  <div className="mt-1 switchPackage">
                    <Switch
                      label={t("active_package")}
                      onClick={
                        id && data?.visible === true
                          ? handleOpenInactiveSwitchModal
                          : handleOpenActiveSwitchModal
                      }
                      name="visible"
                      disabled={id ? false : true}
                      checked={id && data?.visible}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap mt-4">
                <Form.Item
                  className="me-lg-3"
                  label=""
                  name="name"
                  rules={[{ required: true, message: t("pleaseEnterName") }]}
                >
                  <InputForm
                    className="input-xmd"
                    label={t("name")}
                    onKeyPress={onEnterKeyPress}
                  />
                </Form.Item>
                <Form.Item
                  className="me-lg-3"
                  label=""
                  name="connection_quota"
                  rules={[
                    { required: true, message: t("pleaseEnterConnectionNo") },
                  ]}
                >
                  <InputForm
                    className="input-xmd"
                    label={t("connection_number")}
                    onKeyPress={onEnterKeyPress}
                    type="number"
                  />
                </Form.Item>
                <Form.Item
                  className="me-lg-3"
                  label=""
                  name="job_quota"
                  rules={[{ required: true, message: t("pleaseEnterJobNo") }]}
                >
                  <InputForm
                    className="input-xmd"
                    label={t("jobs_number")}
                    onKeyPress={onEnterKeyPress}
                    type="number"
                  />
                </Form.Item>
              </div>
              {id
                ? durations?.map((duration, index) => {
                    return (
                      <div key={index} className="d-flex flex-wrap">
                        <Form.Item
                          className="me-lg-3"
                          label=""
                          name={`durations[${index}].duration_id`}
                          rules={[
                            {
                              required: true,
                              message: t("pleaseSelectThePeriod"),
                            },
                          ]}
                        >
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            className="input-xmd"
                            defaultValue={durations[index]}
                            options={
                              packageDropdownList
                                ? packageDropdownList
                                    .filter(
                                      (pack) =>
                                        !selectedDurations.includes(pack.id)
                                    )
                                    .map((pack) => ({
                                      _id: pack?.id,
                                      value: pack?.name_en,
                                    }))
                                : [{ _id: t("no_data"), value: null }]
                            }
                            getOptionLabel={(option) => {
                              console.log({ option });
                              console.log(
                                "durations[index]?.duration_id",
                                durations[index]?.duration_id,
                                durations[index]
                              );
                              const selectedPackage = packageDropdownList.find(
                                (pack) => pack.id === option
                              );
                              if (selectedPackage) {
                                return selectedPackage.name_en;
                              } else {
                                return option?.value ?? ""; // Provide a default label if the option is not found in packageDropdownList
                              }
                            }}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={t("subscriptionPeriod")}
                              />
                            )}
                            onChange={(event, value) => {
                              const updatedDurations = [...durations];
                              updatedDurations[index].duration_id = value?._id;
                              setDurations(updatedDurations);
                              form.setFieldValue(
                                durations[index].duration_id,
                                value?.value
                              );
                            }}
                            // onChange={(event, value) => {
                            //   selectedDurations.push(value?._id);
                            //   // console.log({ value, selectedDurations });
                            //   // setDurations((prevDurations) => {
                            //   //   const updatedDurations = [...prevDurations];
                            //   //   updatedDurations[index].duration_id =
                            //   //     value?._id;
                            //   //   return updatedDurations;
                            //   // });
                            //   form.setFieldValue(
                            //     durations[index].duration_id,
                            //     value?.value
                            //   );
                            // }}
                          />
                        </Form.Item>
                        <Form.Item
                          className="me-lg-3"
                          label=""
                          name={`durations[${index}].price`}
                          rules={[
                            { required: true, message: t("pleaseEnterPrice") },
                          ]}
                        >
                          <InputForm
                            type="number"
                            className="input-xmd"
                            label={t("price")}
                            onKeyPress={onEnterKeyPress}
                            onChange={(e) =>
                              setDurations((prevDurations) => {
                                const updatedDurations = [...prevDurations];
                                updatedDurations[index].price = e.target.value;
                                return updatedDurations;
                              })
                            }
                            defaultValue={durations?.[index]?.price}
                          />
                        </Form.Item>
                        {index >= initialDurationsCount && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteDuration(index)}
                          />
                        )}
                      </div>
                    );
                  })
                : durations?.map((duration, index) => {
                    return (
                      <div key={index} className="d-flex flex-wrap">
                        <Form.Item
                          className="me-lg-3"
                          label=""
                          name={`durations[${index}].duration_id`}
                          rules={[
                            {
                              required: true,
                              message: t("pleaseSelectThePeriod"),
                            },
                          ]}
                        >
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            className="input-xmd"
                            options={
                              packageDropdownList &&
                              packageDropdownList.length > 0
                                ? packageDropdownList
                                    .filter(
                                      (pack) =>
                                        !selectedDurations.includes(pack.id)
                                    )
                                    .map((pack) => ({
                                      _id: pack?.id,
                                      value: pack?.name_en,
                                    }))
                                : [{ _id: t("no_data"), value: null }]
                            }
                            getOptionLabel={(option) => option.value}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={t("subscriptionPeriod")}
                              />
                            )}
                            onChange={(event, value) => {
                              selectedDurations.push(value?._id);
                              setDurations((prevDurations) => {
                                const updatedDurations = [...prevDurations];
                                updatedDurations[index].duration_id =
                                  value?._id;
                                return updatedDurations;
                              });
                              form.setFieldsValue({
                                [durations[index].duration_id]: value,
                              });
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          className="me-lg-3"
                          label=""
                          name={`durations[${index}].price`}
                          rules={[
                            { required: true, message: t("pleaseEnterPrice") },
                          ]}
                        >
                          <InputForm
                            type="number"
                            className="input-xmd"
                            label={t("price")}
                            onKeyPress={onEnterKeyPress}
                            onChange={(e) =>
                              setDurations((prevDurations) => {
                                const updatedDurations = [...prevDurations];
                                updatedDurations[index].price = e.target.value;
                                return updatedDurations;
                              })
                            }
                            defaultValue={durations?.[index]?.price}
                          />
                        </Form.Item>
                        {index >= initialDurationsCount && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteDuration(index)}
                          />
                        )}
                      </div>
                    );
                  })}

              {durations &&
                durations?.length < packageDropdownList.length &&
                arrayLength.length !== 0 && (
                  <div className="d-flex flex-wrap">
                    <Button
                      onClick={handleAddDuration}
                      className="btn-text-sm addBtn mb-2 mt-0"
                    >
                      <img src={add} alt="add" />
                      {t("AddPeriod")}
                    </Button>
                  </div>
                )}

              <div className="d-flex flex-wrap">
                {features?.map((feature, index) => (
                  <>
                    <div key={index}>
                      <div className="d-flex">
                        {index >= featuresCount && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteFeature(index)}
                          />
                        )}
                      </div>
                      <Form.Item
                        className="me-lg-3"
                        label=""
                        name={`features[${index}].feature_id`}
                        rules={[
                          {
                            required: true,
                            message: t("pleaseEnterTheFeature"),
                          },
                        ]}
                      >
                        <InputForm
                          className="input-xmd"
                          label={t("feature")}
                          onKeyPress={onEnterKeyPress}
                          onChange={(e) =>
                            setFeatures(
                              [...features],
                              (features[index].feature_id = e.target.value)
                            )
                          }
                          defaultValue={feature.feature_id}
                        />
                      </Form.Item>
                    </div>
                  </>
                ))}
              </div>
              <div className="d-flex flex-wrap">
                <Button
                  className="btn-text-sm addBtn mb-2 mt-0"
                  onClick={handleAddFeature}
                >
                  <img src={add} alt="add" />
                  {t("AddFeature")}
                </Button>
              </div>
              <div className="send-msg-modal align-items-center my-2">
                <Form.Item className="my-0" label="" name="info">
                  <InputForm
                    multiline
                    label={t("moreInfo")}
                    className="text-area w-100"
                  />
                </Form.Item>
              </div>
              <div className="d-flex flex-wrap">
                <Button
                  htmlType="submit"
                  className="btn-primary-md my-1"
                  classNames="mx-2"
                  loading={loading}
                >
                  {id ? t("saveChanges") : t("createPackage")}
                </Button>
              </div>
            </Form>
          </>
        )}

        {isConfModalVisible.status ? (
          <ConfirmationModal
            open={isConfModalVisible}
            onCancel={() => {
              updateIsConfModalVisible({
                status: false,
                icon: null,
                title: null,
                additionalFields: null,
                buttons: [],
              });
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
