import { Button, Form } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../../Components/Inputs";
import { addContactUsSections, getContactUsSections } from "./services";
import Alert from "../../../Components/Alert";
import Loader from "../../../Components/Loader/Loader";

export default function Section4() {
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

  const type = "section4";

  const handleGetContactUsSection4 = () => {
    updateIsLoading(true);
    getContactUsSections(
      (success) => {
        setData(success[3]);
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
          message: success.message,
        });
        handleGetContactUsSection4();
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
    handleGetContactUsSection4();
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
            {t("Section3")}
          </div>

          <Form form={form} onFinish={onFinish} ref={formRef}>
            <div className="d-flex flex-wrap align-items-center my-2">
              <Form.Item
                className="me-lg-3"
                label=""
                name="facebook"
                rules={[
                  { required: true, message: t("pleaseEnterUrl") },
                  { type: "url", message: t("InvalidUrl") },
                ]}
                initialValue={data?.facebook}
              >
                <InputForm
                  className="input-xmd"
                  label={t("facebook")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.facebook}
                />
              </Form.Item>
              <Form.Item
                className="me-lg-3"
                label=""
                name="twitter"
                rules={[
                  { required: true, message: t("pleaseEnterUrl") },
                  { type: "url", message: t("InvalidUrl") },
                ]}
                initialValue={data?.twitter}
              >
                <InputForm
                  className="input-xmd"
                  label={t("twitter")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.twitter}
                />
              </Form.Item>
              <Form.Item
                className="me-lg-3"
                label=""
                name="linkedIn"
                rules={[
                  { required: true, message: t("pleaseEnterUrl") },
                  { type: "url", message: t("InvalidUrl") },
                ]}
                initialValue={data?.linkedIn}
              >
                <InputForm
                  className="input-xmd"
                  label={t("linkedIn")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.linkedIn}
                />
              </Form.Item>

              <Form.Item
                className="me-lg-3"
                label=""
                name="youtube"
                rules={[
                  { required: true, message: t("pleaseEnterUrl") },
                  { type: "url", message: t("InvalidUrl") },
                ]}
                initialValue={data?.youtube}
              >
                <InputForm
                  className="input-xmd"
                  label={t("youtube")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.youtube}
                />
              </Form.Item>
              <Form.Item
                className="me-lg-3"
                label=""
                name="instagram"
                rules={[
                  { required: true, message: t("pleaseEnterUrl") },
                  { type: "url", message: t("InvalidUrl") },
                ]}
                initialValue={data?.instagram}
              >
                <InputForm
                  className="input-xmd"
                  label={t("instagram")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.instagram}
                />
              </Form.Item>
              <Form.Item
                className="me-lg-3"
                label=""
                name="whatsapp"
                rules={[
                  { required: true, message: t("pleaseEnterUrl") },
                  { type: "url", message: t("InvalidUrl") },
                ]}
                initialValue={data?.whatsapp}
              >
                <InputForm
                  className="input-xmd"
                  label={t("whatsapp")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.whatsapp}
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
