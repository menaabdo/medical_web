import { Button, Form, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InputForm from "../../Components/Inputs";
import { BpCheckbox } from "../../Components/Checkbox";
import { addAdmin, editAdmin } from "./services";
import Alert from "../../Components/Alert";

function AddUsers({ isOpen, onCancel, adminData }) {
  const [isLoading, updateIsLoading] = useState(false);
  const [isActive, updateIsActive] = useState(false);
  const [toast, updateToast] = useState({
    status: "success",
    isActive: false,
    message: "",
  });
  const { t } = useTranslation();
  const formRef = useRef();
  useEffect(() => {
    if (adminData) {
      updateIsActive(adminData?.isActive);
    }
  }, [adminData]);
  const onFinish = (values) => {
    updateIsLoading(true);
    if (adminData) {
      let allValues = { ...values, id: adminData.id, isActive };
      editAdmin(
        allValues,
        (success) => {
          updateIsLoading(false);
          updateToast({
            status: "Success",
            isActive: true,
            message: success.message,
          });
          onCancel();
        },
        (fail) => {
          updateIsLoading(false);
          updateToast({
            status: "error",
            isActive: true,
            message: fail.data.message,
          });
        }
      );
    } else {
      let allValues = { ...values, isActive };
      addAdmin(
        allValues,
        (success) => {
          updateIsLoading(false);
          updateToast({
            status: "Success",
            isActive: true,
            message: success.message,
          });
          onCancel();
        },
        (fail) => {
          updateIsLoading(false);
          updateToast({
            status: "error",
            isActive: true,
            message: fail.data.message,
          });
        }
      );
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
        .catch((error) => {
          console.log("Form validation failed:", error);
        });
    }
  };
  return (
    <Modal
      footer={[]}
      className="add-user-modal d-flex"
      title={
        <div className="text-center f-rubik-24px fw-500">{t("AddUser")}</div>
      }
      open={isOpen}
      onCancel={onCancel}
    >
      <Form onFinish={onFinish} ref={formRef} initialValues={adminData}>
        <div className="d-flex justify-content-center alert-box">
          <Alert
            severity={toast.status}
            open={toast.isActive}
            onClose={() => {
              updateToast({ status: false, message: null });
            }}
          >
            {toast.message}
          </Alert>
        </div>
        <Form.Item
          label=""
          name="name"
          rules={[{ required: true, message: t("pleaseEnterAdminName") }]}
          className={`my-4`}
        >
          <InputForm
            label={t("name")}
            className={`input-lg`}
            onKeyPress={onEnterKeyPress}
          />
        </Form.Item>
        <Form.Item
          label=""
          name="email"
          rules={[
            { required: true, message: t("pleaseEnterEmail") },
            { type: "email", message: t("InvalidEmail") },
          ]}
          className={`my-4`}
        >
          <InputForm
            label={t("email")}
            className={`input-lg`}
            onKeyPress={onEnterKeyPress}
          />
        </Form.Item>
        <Form.Item
          label=""
          name="password"
          rules={[
            {
              validator: (_, value) => {
                if (!value) return Promise.reject(t("pleaseEnterPassword"));
                else if (value.length < 8)
                  return Promise.reject(t("PleaseEnterAtLeas8Characters"));
                else return Promise.resolve();
              },
            },
          ]}
        >
          <InputForm
            label={t("password")}
            type="password"
            className={`input-lg`}
            onKeyPress={onEnterKeyPress}
          />
        </Form.Item>
        {/* <Form.Item
					label=""
					name="rule"
					rules={[{ required: true, message: t("pleaseSelectAdminRule") }]}>
					<InputForm
						label={t("rule")}
						type="select"
						className={`input-lg`}
						onKeyPress={onEnterKeyPress}
						options={[
							{
								value: "Super Admin",
							},
							{
								value: "Admin",
							},
						]}
					/>
				</Form.Item>*/}
        <Form.Item label="" name="isActive" className="ml-auto mr-0">
          <BpCheckbox
            checked={isActive}
            onChange={(e) => updateIsActive(e.target.checked)}
          />
          <label className="f-poppins-16px">{t("active")}</label>
        </Form.Item>
        <div className="d-flex align-items-center flex-column">
          <Button
            htmlType="submit"
            loading={isLoading}
            className={`btn-primary-lg`}
          >
            {adminData ? t("editUser") : t("addNewUser")}
          </Button>
          <Button
            onClick={() => onCancel()}
            loading={isLoading}
            className={`btn-text-lg mt-2`}
          >
            {t("cancel")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddUsers;
