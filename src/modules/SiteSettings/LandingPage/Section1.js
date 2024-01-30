import { Button, Form , message, Spin, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../../Components/Inputs";
// import { addFaqSections } from "./services";
import Alert from "../../../Components/Alert";
import TextArea from "../../../Components/TextArea";
import { UploadOutlined } from '@ant-design/icons';
import { addLandingPageSection1, getLandingPagesection1 } from "./services";

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
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState(null);
  const type = "faqs-section1";
//   const handleUpload = () => {
//     // Perform upload logic here using the selected file
//     console.log(selectedFile);
//   };
useEffect(() => {
    updateIsLoading(true)
    getLandingPagesection1(
        (success)=>{
            setData(success)
            if(!success.section1.photo){
             return null
            }else{
            setFileList([...fileList, success.section1.photo]);
            }
            updateIsLoading(false)
            console.log(success)
            console.log(success.section1.title)
        },
        (fail)=>{
            updateIsLoading(false)
            console.log(fail)
        }
    )
}, [])


  const onFinish = (values) => {
    console.log(values)
    const reader = new FileReader();
	reader.readAsDataURL(values.photo.file);

    reader.onload = ()=>{
        let base64 = reader.result
        let data = {
            ...values ,
            photo : base64
        }
        addLandingPageSection1(
            data ,
            (success)=>{
                form.resetFields()
                updateHasError({
                    status: true,
                    severity: "success",
                    message: success.message,
                  });
                console.log(success)
                updateIsLoading(false)
            },
            (fail)=>{
                console.log(fail)
                updateIsLoading(false)

            }
        )
    }

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
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList([]);
    },
    beforeUpload: (file) => {
    setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  if(isLoading && data === null){
    return(
            <div
                className={`bg-white loader-spinner d-flex align-items-center justify-content-center`}>
                <Spin size="large" />
            </div>
    )
  }else{
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
    
          <div className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}>
            {t("Section1")}
          </div>
    
          <Form form={form} onFinish={onFinish} ref={formRef}>
            <div className="d-flex align-items-center my-2">
              <Form.Item
                className="my-0"
                label=""
                name="title"
                rules={[
                  {
                    required: true,
                    message: t("pleaseTypeTheTitle"),
                  },
                ]}
                initialValue={data?.section1?.title}
              >
                <InputForm
                  className="input-xmd"
                  type="text"
                  label={t("title")}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.section1?.title}
                />
              </Form.Item>
              <Form.Item
                className="mx-2 my-0"
                label=""
                name="photo"
                rules={[
                  {
                    required: true,
                    message: t("pleaseEnterBackground"),
                  },
                ]}
                initialValue={data?.section1.photo}
              >
                {/* <InputForm
                  className="input-xmd"
                  type="file"
                  onChange={handleFileChange}
                  label={t("background")}
                /> */}
                      <Upload {...props}>
                      {fileList.length === 1 ? '' : <Button icon={<UploadOutlined />}>Select File</Button>} 
                      </Upload>
              </Form.Item>
            </div>
            <Form.Item
                label=""
                className="m-0 fit-component"
                name="description"
                rules={[
                  {
                    required: true,
                    message: t("pleaseTypeTheSubtitle"),
                  },
                ]}
                initialValue={data?.section1?.description}
              >
                <TextArea
                  className="textArea"
                  title={t("subtitle")}
                  cols={50}
                  onKeyPress={onEnterKeyPress}
                  defaultValue={data?.section1?.description}
                />
              </Form.Item>
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
      );
  }


}
