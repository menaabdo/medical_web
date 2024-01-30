import { Button, Form } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../Components/Inputs";
import CustomInput from "../../Components/CustomInput";
import {
  sendSingleEmail,
  sendEmailToAll,
  getAllUsersDropdown,
} from "./services";
import Alert from "../../Components/Alert";
import TextArea from "../../Components/TextArea";

export default function SendEmail() {
  const [hasError, updateHasError] = useState({
    status: false,
    message: "null",
  });
  const [isLoading, updateIsLoading] = useState(false);
  const [forWhatSpecification, updateForWhatSpecification] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [allUsersList, updateAllUsersList] = useState([]);
  const [form] = Form.useForm();
  const formRef = useRef();
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);
  const [userType, updateUserType] = useState("");
  const [limit, updateLimit] = useState(1000);

  const forWhomOptions = [
    { value: "all", _id: t("all_doctors_nurses_hospitals") },
    { value: "allDoctorNurses", _id: t("all_doctors_nurses") },
    { value: "allDoctors", _id: t("all_doctors") },
    { value: "allNurses", _id: t("all_nurses") },
    { value: "allHospitals", _id: t("all_hospitals") },
    { value: "doctor", _id: t("specific_doctor") },
    { value: "nurse", _id: t("specific_nurse") },
    { value: "hospital", _id: t("specific_hospital") },
  ];

  const handleGetAllUsersList = () => {
    updateLoading(true);
    switch (forWhatSpecification) {
      case "doctor":
        getAllUsersDropdown(
          { userType: "doctor", limit },
          (success) => {
            updateLoading(false);
            updateAllUsersList(success?.data?.items);
          },
          (fail) => {
            updateLoading(false);
          }
        );
        break;
      case "nurse":
        getAllUsersDropdown(
          { userType: "nurse", limit },
          (success) => {
            updateLoading(false);
            updateAllUsersList(success?.data?.items);
          },
          (fail) => {
            updateLoading(false);
          }
        );
        break;
      case "hospital":
        getAllUsersDropdown(
          { userType: "hospital", limit },
          (success) => {
            updateLoading(false);
            updateAllUsersList(success?.data?.items);
          },
          (fail) => {
            updateLoading(false);
          }
        );
        break;
    }
  };

  const resetForm = () => {
    form.resetFields();
    updateForWhatSpecification([]);
  };

  const onFinish = (values) => {
    updateIsLoading(true);

    switch (values?.topics) {
      case "all":
        sendEmailToAll(
          { ...values, topics: ["doctor", "nurse", "hospital"] },
          (success) => {
            updateIsLoading(false);
            updateHasError({
              status: true,
              severity: "success",
              message: success.message,
            });
            resetForm(); // Reset the form fields
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
        break;

      case "allDoctorNurses":
        sendEmailToAll(
          { ...values, topics: ["doctor", "nurse"] },
          (success) => {
            updateIsLoading(false);
            updateHasError({
              status: true,
              severity: "success",
              message: success.message,
            });
            resetForm(); // Reset the form fields
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
        break;

      case "allDoctors":
        sendEmailToAll(
          { ...values, topics: ["doctor"] },
          (success) => {
            updateIsLoading(false);
            updateHasError({
              status: true,
              severity: "success",
              message: success.message,
            });
            resetForm(); // Reset the form fields
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
        break;

      case "allNurses":
        sendEmailToAll(
          { ...values, topics: ["nurse"] },
          (success) => {
            updateIsLoading(false);
            updateHasError({
              status: true,
              severity: "success",
              message: success.message,
            });
            resetForm(); // Reset the form fields
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
        break;

      case "allHospitals":
        sendEmailToAll(
          { ...values, topics: ["hospital"] },
          (success) => {
            updateIsLoading(false);
            updateHasError({
              status: true,
              severity: "success",
              message: success.message,
            });
            resetForm(); // Reset the form fields
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
        break;

      case "doctor":
      case "nurse":
      case "hospital":
        const { topics, ...data } = values; // Exclude "topics" field
        data.userId = form.getFieldsValue().userId; // Set the selected doctor's/nurse's/hospital's ID as userId

        if (forWhatSpecification === "doctor") {
          data.userType = "doctor";
        } else if (forWhatSpecification === "nurse") {
          data.userType = "nurse";
        } else if (forWhatSpecification === "hospital") {
          data.userType = "hospital";
        } else {
          data.userType = userType;
        }

        sendSingleEmail(
          data,
          (success) => {
            updateIsLoading(false);
            updateHasError({
              status: true,
              severity: "success",
              message: success.message,
            });
            resetForm(); // Reset the form fields
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
        break;
    }
  };

  const handleForWhomChange = (value) => {
    if (value === "doctor") {
      form.setFieldsValue({ topics: value });
      updateForWhatSpecification(value);
    } else if (value === "nurse") {
      form.setFieldsValue({ topics: value });
      updateForWhatSpecification(value);
    } else if (value === "hospital") {
      form.setFieldsValue({ topics: value });
      updateForWhatSpecification(value);
    } else {
      updateForWhatSpecification(value.target.value);
    }
  };

  // const handleForWhomChangeAutoComplete = (value) => {
  //   const selectedValue = value instanceof Event ? value.target.value : value;

  //   if (selectedValue === "doctor") {
  //     form.setFieldsValue({ topics: selectedValue });
  //     updateForWhatSpecification(selectedValue);
  //   } else if (selectedValue === "nurse") {
  //     form.setFieldsValue({ topics: selectedValue });
  //     updateForWhatSpecification(selectedValue);
  //   } else if (selectedValue === "hospital") {
  //     form.setFieldsValue({ topics: selectedValue });
  //     updateForWhatSpecification(selectedValue);
  //   } else {
  //     updateForWhatSpecification(selectedValue);
  //   }
  // };

  useEffect(() => {
    if (
      forWhatSpecification === "doctor" ||
      forWhatSpecification === "nurse" ||
      forWhatSpecification === "hospital"
    ) {
      handleGetAllUsersList();
    }
    // eslint-disable-next-line
  }, [forWhatSpecification]);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formRef.current
        .validateFields()
        .then(() => {
          formRef.current.submit();
        })
        .catch((error) => {});
    }
  };

  const validateSpaces = (rule, value, callback) => {
    if (!value || value.trim().length === 0) {
      callback(t("field_cant_be_empty"));
    } else {
      callback();
    }
  };

  return (
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

      <Form form={form} onFinish={onFinish} ref={formRef}>
        <div className="d-flex flex-wrap">
          <Form.Item
            label=""
            name="topics"
            rules={[
              {
                required: true,
                message: t("pleaseSelectForWhatSpecific"),
              },
            ]}
          >
            <InputForm
              className="w-100 input-lg mx-1"
              label={t("ForWhatSpecific")}
              type="select"
              options={forWhomOptions}
              onChange={(value) => handleForWhomChange(value)}
            />
            {/* <CustomInput
              className="w-100 input-lg mx-1 autoComplete-input"
              label={t("ForWhatSpecific")}
              type="select"
              options={forWhomOptions}
              onChange={(value) => handleForWhomChangeAutoComplete(value)}
            /> */}
          </Form.Item>

          {forWhatSpecification === "doctor" ||
          forWhatSpecification === "nurse" ||
          forWhatSpecification === "hospital" ? (
            <Form.Item
              label=""
              name="userId"
              rules={[
                {
                  required: true,
                  message: t("pleaseSelectTheAccount"),
                },
              ]}
            >
              <InputForm
                loading={loading}
                type="select"
                label={t("accountName")}
                className="w-100 input-lg mx-1"
                options={
                  allUsersList && allUsersList.length > 0
                    ? allUsersList.map((user) => ({
                        _id:
                          forWhatSpecification === "hospital"
                            ? user.HospitalActivationForm?.hospital_name
                            : `${user.first_name} ${user.last_name}`,
                        value: user.id,
                      }))
                    : [{ _id: t("no_data"), value: null }]
                }
                defaultValue={[]}
                onChange={(e) => {
                  form.setFieldsValue({ userId: e?.target?.value });
                }}
              />
            </Form.Item>
          ) : (
            <></>
          )}
        </div>
        <div className="send-msg-modal">
          <p className="f-rubik-16px my-0">{t("messageInfo")}</p>

          <Form.Item
            label=""
            name="subject"
            rules={[
              {
                required: true,
                message: t("pleaseTypeTheTitle"),
                validator: validateSpaces,
              },
            ]}
          >
            <InputForm
              className="w-100 input-xmd"
              label={t("title")}
              type="text"
              onKeyPress={onEnterKeyPress}
            />
          </Form.Item>

          <Form.Item
            label=""
            name="text"
            rules={[
              {
                required: true,
                message: t("pleaseEnterMsgBody"),
                validator: validateSpaces,
              },
            ]}
          >
            <InputForm
              multiline
              label={t("msgBody")}
              className="text-area w-100"
            />
            {/* <TextArea
              value={form.getFieldValue("text")}
              onChange={(value) => form.setFieldsValue({ text: value })}
            /> */}
          </Form.Item>
        </div>

        <div className="d-flex flex-wrap">
          <Button
            htmlType="submit"
            className="btn-primary-md mx-2 my-0"
            isLoading={isLoading}
          >
            {t("send")}
          </Button>
        </div>
      </Form>
    </>
  );
}
