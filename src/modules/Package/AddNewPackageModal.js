import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputForm from "../../Components/Inputs";

function AddNewPackageModal({ open, onCancel, packagesLengths, onFinish }) {
  const [isLoading, updateIsLoading] = useState();
  const { t } = useTranslation();

  const features_list = ["", "", ""];
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
          <div className="d-flex justify-content-center mb-4">
            <div className={`f-rubik-32px`}>{t("addNewPackage")}</div>
          </div>

          <Form.Item
            label=""
            className="mx-2"
            name={`name_${packagesLengths}`}
            rules={[
              {
                required: true,
                message: t("pleaseEnterTheName"),
              },
            ]}
          >
            <InputForm className="input-lg" label={t("name")} />
          </Form.Item>
          <Form.Item
            label=""
            className="mx-2"
            name={`cost_${packagesLengths}`}
            rules={[
              {
                required: true,
                message: t("pleaseEnterTheCost"),
              },
            ]}
          >
            <InputForm className="input-lg" label={t("cost")} type="number" />
          </Form.Item>

          <Form.Item
            label=""
            className="mx-2"
            name={`quota_${packagesLengths}`}
            rules={[
              {
                required: true,
                message: t("pleaseEnterTheNumberOfConnections"),
              },
            ]}
          >
            <InputForm
              className="input-lg"
              label={t("numberOfConnections")}
              type="number"
            />
          </Form.Item>
          <Form.Item
            label=""
            className="mx-2"
            name={`duration_${packagesLengths}`}
            rules={[
              {
                required: true,
                message: t("pleaseEnterTheSubscriptionPeriod"),
              },
            ]}
          >
            <InputForm
              className="input-lg"
              label={t("subscriptionPeriod")}
              type="number"
            />
          </Form.Item>
          {features_list.map((feature, featureIndx) => {
            return (
              <Form.Item
                label=""
                className="mx-2"
                name={`feature_${packagesLengths}_${featureIndx}`}
                rules={[
                  {
                    required: true,
                    message: t("pleaseEnterTheFeature"),
                  },
                ]}
              >
                <InputForm
                  className="input-lg"
                  label={`${t("feature")}  #${featureIndx + 1}`}
                />
              </Form.Item>
            );
          })}
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

export default AddNewPackageModal;
