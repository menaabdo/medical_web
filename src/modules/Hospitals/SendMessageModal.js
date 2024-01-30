import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputForm from "../../Components/Inputs";

function SendMessageModal({ open, onCancel }) {
  const { t } = useTranslation();
  const onFinish = (values) => {
    console.log({ ...values, attachment: selectedFile });
  };
  const [typesOptions, updateTypeOptions] = useState([
    { label: "Type 1", value: "Value 1" },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Perform upload logic here using the selected file
    console.log(selectedFile);
  };
  return (
    <Modal
      title=""
      width={480}
      footer={[null]}
      open={open}
      onCancel={onCancel}
      className=" send-msg-modal"
    >
      <div className="f-rubik-24px fw-500 mb-4">{t("sendMsg")}</div>
      <Form onFinish={onFinish}>
        <Form.Item
          label=""
          name="type"
          rules={[
            {
              required: true,
              message: t("pleaseSelectTheMsgType"),
            },
          ]}
        >
          <InputForm
            type="select"
            label={t("type")}
            className="w-100"
            options={typesOptions}
          />
        </Form.Item>
        <div className="f-rubik-16px">{t("msgInfo")}</div>
        <Form.Item
          label={""}
          name={"title"}
          rules={[
            {
              required: true,
              message: t("pleaseTypeTitle"),
            },
          ]}
        >
          <InputForm label={t("title")} className="w-100" />
        </Form.Item>
        <Form.Item label={""} name={"attachment"}>
          <InputForm
            type="file"
            onChange={handleFileChange}
            label={t("attachments")}
          />
        </Form.Item>
        <Form.Item
          label={""}
          name={"body"}
          rules={[
            {
              required: true,
              message: t("pleaseEnterMsgBody"),
            },
          ]}
        >
          <InputForm
            multiline
            label={t("msgBody")}
            className="text-area w-100"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-primary-lg mb-2"
        >
          {t("send")}
        </Button>
        <Button className="btn-secondary-lg" onClick={onCancel}>
          {t("cancel")}
        </Button>
      </Form>
    </Modal>
  );
}

export default SendMessageModal;
