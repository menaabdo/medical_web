import { Button, Form } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../../Components/Inputs";
import { addContactUsSections, getContactUsSections } from "./services";
import Alert from "../../../Components/Alert";
import Loader from "../../../Components/Loader/Loader";

export default function Section2() {
  const [hasError, updateHasError] = useState({
    status: false,
    message: "null",
  });
  const [isLoading, updateIsLoading] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef();
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);
  const [data, setData] = useState(null);

  const type = "section2";

  const handleGetContactUsSection2 = () => {
    updateIsLoading(true);
    getContactUsSections(
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
    addContactUsSections(
      data,
      (success) => {
        updateIsLoading(false);
        updateHasError({
          status: true,
          severity: "success",
          message: success?.message,
        });
        handleGetContactUsSection2();
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
    handleGetContactUsSection2();
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
                name="email"
                rules={[
                  { required: true, message: t("pleaseEnterEmail") },
                  { type: "email", message: t("InvalidEmail") },
                ]}
                initialValue={data?.email}
              >
                <InputForm
                  className="input-xmd"
                  label={t("email")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.title}
                />
              </Form.Item>
              <Form.Item
                className="me-lg-3"
                name="phone"
                label=""
                rules={[
                  {
                    required: true,
                    message: t("pleaseEnterYourPhone"),
                  },
                ]}
                initialValue={data?.phone}
              >
                <InputForm
                  className="input-xmd"
                  // type="number"
                  label={t("phone")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.phone}
                />
              </Form.Item>
              <Form.Item
                className="me-lg-3"
                label=""
                name="address"
                rules={[
                  {
                    required: true,
                    message: t("pleaseTypeTheAddress"),
                  },
                ]}
                initialValue={data?.address}
              >
                <InputForm
                  className="input-xmd"
                  label={t("address")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.address}
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
