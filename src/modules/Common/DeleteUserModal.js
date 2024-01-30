import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useTranslation } from "react-i18next";
import InputForm from "../../Components/Inputs";
import deleteImage from "@assets/icons/trash-delete.svg";

export default function DeleteUserModal({
  open,
  onCancel,
  onFinish,
  isLoading,
  icon,
  title,
}) {
  const { t } = useTranslation();
  const [reasonsList, updateReasonsList] = useState([
    { _id: t("temporaryClose"), value: "tempClosing" },
    { _id: t("other"), value: "other" },
  ]);
  const [selectedReason, updateSelectedReason] = useState("");

  return (
    <Modal
      title=""
      width={480}
      footer={[null]}
      open={open}
      onCancel={onCancel}
      className="send-msg-modal text-center"
    >
      <img src={icon || deleteImage} alt="status-img" />
      <div className={`f-rubik-24px fw-500 my-2`}>{title}</div>
      <Form onFinish={onFinish}>
        <Form.Item
          label=""
          name="reason"
          rules={[
            {
              required: true,
              message: t("pleaseSelectTheReason"),
            },
          ]}
        >
          <InputForm
            className="w-100 input-lg"
            label={t("reasonsForDelete")}
            type="select"
            options={reasonsList}
            onChange={(e) => {
              updateSelectedReason(e.target.value);
            }}
          />
        </Form.Item>

        {selectedReason === "other" ? (
          <Form.Item
            label=""
            name="other"
            rules={[
              {
                required: true,
                message: t("pleaseTypeTheReason"),
              },
            ]}
          >
            <InputForm
              multiline
              label={t("anotherReason")}
              className="text-area w-100"
            />
          </Form.Item>
        ) : (
          <></>
        )}
        <Button
          type="primary"
          htmlType="submit"
          className={"btn-primary-lg"}
          loading={isLoading}
        >
          {t("send")}
        </Button>
        <Button className={"btn-text-lg"} onClick={onCancel}>
          {t("cancel")}
        </Button>
      </Form>
    </Modal>
  );
}
