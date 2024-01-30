import { Button, Form, Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import InputForm from "../../Components/Inputs";

export default function SendMessageModal({
  open,
  onCancel,
  onFinish,
  isLoading,
}) {
  const { t } = useTranslation();
  return (
    <Modal
      title=""
      width={480}
      footer={[null]}
      open={open}
      onCancel={onCancel}
      className="send-msg-modal"
    >
      <div className="f-rubik-24px fw-500 mb-4">{t("sendMsg")}</div>
      <Form onFinish={onFinish}>
        <div className="f-rubik-16px">{t("messageInfo")}</div>
        <Form.Item
          label=""
          name="subject"
          rules={[
            {
              required: true,
              message: t("pleaseTypeTitle"),
            },
          ]}
        >
          <InputForm label={t("title")} className="w-100 input-xmd" />
        </Form.Item>

        <Form.Item
          label=""
          name="text"
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
          loading={isLoading}
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
