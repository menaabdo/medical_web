import { Button, Form } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../../Components/Inputs";
import { addFaqSections, getFaqSections } from "./services";
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

  const [selectedFile, updateSelectedFile] = useState(null);
  const type = "faqs-section1";
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    updateSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Perform upload logic here using the selected file
    console.log(selectedFile);
  };

  const handleGetFaqSection1 = () => {
    updateIsLoading(true);
    getFaqSections(
      (success) => {
        setData(success?.data[0]);
        if (!success.data[0].backGround) {
          return null;
        } else {
          setFileList([...fileList, success.data[0].backGround]);
        }
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
        handleGetFaqSection1();
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
    handleGetFaqSection1();
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
                // initialValue={data?.backGround}
              >
                <InputForm
                  className="input-xmd"
                  type="file"
                  onChange={handleFileChange}
                  label={t("background")}
                  // defaultValue={data?.backGround}
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
