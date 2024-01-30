import { Button, Form } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../../Components/Inputs";
import { addFaqSections, getFaqSections } from "./services";
import Alert from "../../../Components/Alert";
import Loader from "../../../Components/Loader/Loader";

export default function Section2() {
  const [hasError, updateHasError] = useState({
    status: false,
    message: "null",
  });
  const [data, setData] = useState([]);
  const [isLoading, updateIsLoading] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef();
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);

  const [forUsersList, updateForUsersList] = useState([
    { value: "general", _id: t("general") },
    { value: "doctor_nurse", _id: t("doctors_nurses") },
    { value: "hospital", _id: t("hospitals") },
  ]);

  const onChangeForUsersList = (value) => {
    const updatedForUsersList = [
      { value: "general", _id: t("general") },
      { value: "doctor_nurse", _id: t("doctors_nurses") },
      { value: "hospital", _id: t("hospitals") },
    ];
    updateForUsersList(updatedForUsersList);
  };

  const type = "faqs-section2";

  const handleGetFaqSection2 = () => {
    updateIsLoading(true);
    getFaqSections(
      (success) => {
        setData(success[1]);
        updateIsLoading(false);
      },
      (fail) => {
        updateIsLoading(false);
      }
    );
  };

  const onFinish = (values) => {
    const data = { ...values, type };
    updateIsLoading(true);
    addFaqSections(
      data,
      (success) => {
        updateIsLoading(false);
        updateHasError({
          status: true,
          severity: "success",
          message: success.message,
        });
        handleGetFaqSection2();
        // form.resetFields(); // Reset the form fields
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
  };

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

  useEffect(() => {
    handleGetFaqSection2();
  }, []);

  return (
    <>
      {isLoading && data === null ? (
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

          <div className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}>
            {t("Section2")}
          </div>

          <Form form={form} onFinish={onFinish} ref={formRef}>
            <div className="d-flex flex-wrap align-items-center my-2">
              <Form.Item
                className="me-lg-3"
                label=""
                name="question"
                rules={[
                  {
                    required: true,
                    message: t("pleaseTypeTheQuestion"),
                  },
                ]}
              >
                <InputForm
                  className="input-xmd"
                  label={t("question")}
                  onKeyPress={onEnterKeyPress}
                />
              </Form.Item>
              <Form.Item
                className="me-lg-3"
                label=""
                name="for_user"
                rules={[
                  {
                    required: true,
                    message: t("pleaseSelectForWhatSpecific"),
                  },
                ]}
              >
                <InputForm
                  className="input-xmd"
                  label={t("ForWhatSpecific")}
                  type="select"
                  options={forUsersList}
                  onChange={onChangeForUsersList}
                />
              </Form.Item>
            </div>

            <div className="send-msg-modal">
              <Form.Item
                label=""
                name="answer"
                rules={[
                  {
                    required: true,
                    message: t("pleaseEnterAnswer"),
                  },
                ]}
              >
                <InputForm
                  multiline
                  label={t("answer")}
                  className="text-area w-100"
                />
              </Form.Item>
            </div>

            <div className="d-flex flex-wrap">
              <Button
                htmlType="submit"
                className="btn-primary-md my-3"
                isLoading={isLoading}
              >
                {t("saveChanges")}
              </Button>
            </div>
          </Form>
        </>
      )}
    </>
  );
}
