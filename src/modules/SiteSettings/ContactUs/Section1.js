import { Button, Form } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../../Components/Inputs";
import { addContactUsSections, getContactUsSections } from "./services";
import Alert from "../../../Components/Alert";
import Loader from "../../../Components/Loader/Loader";

export default function Section1() {
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
  const [selectedFile, updateSelectedFile] = useState(null);
  const type = "section1";

  const handleFileChange = (event) => {
    updateSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Perform upload logic here using the selected file
    console.log(selectedFile);
  };

  const handleGetContactUsSection1 = () => {
    updateIsLoading(true);
    getContactUsSections(
      (success) => {
        setData(success[0]);
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
        handleGetContactUsSection1();
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
    handleGetContactUsSection1();
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
            {t("Section1")}
          </div>

          <Form form={form} onFinish={onFinish} ref={formRef}>
            <div className="d-flex flex-wrap align-items-center my-2">
              <Form.Item
                className="me-lg-3"
                label=""
                name="title"
                rules={[
                  {
                    required: true,
                    message: t("pleaseTypeTheTitle"),
                  },
                ]}
                initialValue={data?.title}
              >
                <InputForm
                  className="input-xmd"
                  label={t("title")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.title}
                />
              </Form.Item>
              <Form.Item
                className="me-lg-3"
                label=""
                name="subtitle"
                rules={[
                  {
                    required: true,
                    message: t("pleaseTypeTheSubtitle"),
                  },
                ]}
                initialValue={data?.subtitle}
              >
                <InputForm
                  className="input-xmd"
                  label={t("subtitle")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.subtitle}
                />
              </Form.Item>

              <Form.Item
                className="me-lg-3"
                label=""
                name="backGround"
                rules={[
                  {
                    required: true,
                    message: t("pleaseEnterBackground"),
                  },
                ]}
              >
                <InputForm
                  className="input-xmd"
                  type="file"
                  onChange={handleFileChange}
                  label={t("background")}
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
