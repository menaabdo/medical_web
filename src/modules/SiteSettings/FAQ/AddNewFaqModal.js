import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputForm from "../../../Components/Inputs";

export default function AddNewFaqModal({
  open,
  onCancel,
  onFinish,
  onEnterKeyPress,
  isLoading,
}) {
  const { t } = useTranslation();

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

  return (
    <Modal
      title=""
      width={480}
      footer={[null]}
      open={open}
      onCancel={onCancel}
      className="text-center"
    >
      <Form
        className="d-flex flex-column align-items-start my-2"
        onFinish={(values) => {
          onFinish({ ...values });
        }}
      >
        <div>
          <div className="d-flex  mb-4">
            <div className={`f-rubik-32px`}>{t("addNewFaq")}</div>
          </div>

          <Form.Item
            label=""
            className="mx-2"
            name="question"
            rules={[
              {
                required: true,
                message: t("pleaseTypeTheQuestion"),
              },
            ]}
          >
            <InputForm
              className="input-lg"
              label={t("question")}
              onKeyPress={onEnterKeyPress}
            />
          </Form.Item>

          <Form.Item
            label=""
            className="mx-2"
            name="for_user"
            rules={[
              {
                required: true,
                message: t("pleaseSelectForWhatSpecific"),
              },
            ]}
          >
            <InputForm
              className="input-lg"
              label={t("ForWhatSpecific")}
              type="select"
              options={forUsersList}
              onChange={onChangeForUsersList}
            />
          </Form.Item>

          <div className="answer-section">
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
        </div>
        <div className="d-flex justify-content-center flex-1 text-center m-auto">
          <Button
            htmlType="submit"
            className="btn-primary-lg"
            isLoading={isLoading}
          >
            {t("saveChanges")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
