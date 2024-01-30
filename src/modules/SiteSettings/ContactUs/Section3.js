import { Button, Form } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../../Components/Inputs";
import { addContactUsSections, getContactUsSections } from "./services";
import Alert from "../../../Components/Alert";
import Loader from "../../../Components/Loader/Loader";
import { DeleteOutlined } from "@ant-design/icons";

export default function Section3() {
  const [hasError, updateHasError] = useState({
    status: false,
    message: "null",
  });
  const [isLoading, updateIsLoading] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef();
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);
  const [initialValues, updateInitialValues] = useState({});
  const [contactForm, setContactForm] = useState([
    {
      name: "",
      email: "",
      phone: "",
      reasonForCommunication: "",
      message: "",
    },
  ]);

  const type = "section3";

  const handleGetContactUsSection3 = () => {
    updateIsLoading(true);
    getContactUsSections(
      (success) => {
        updateIsLoading(false);
        const initialValues = success[2].contactForm.reduce(
          (acc, contact, index) => {
            acc[`contactForm[${index}].name`] = contact.name; // Set the initial value for each field based on the index
            acc[`contactForm[${index}].email`] = contact.email;
            acc[`contactForm[${index}].phone`] = contact.phone;
            acc[`contactForm[${index}].reasonForCommunication`] =
              contact.reasonForCommunication;
            acc[`contactForm[${index}].message`] = contact.message;
            return acc;
          },
          {}
        );

        form.setFieldsValue(initialValues); // Set the initial values for the form fields
        setContactForm(success[2].contactForm);
      },
      (fail) => {
        updateIsLoading(false);
      }
    );
  };

  const onFinish = (values) => {
    // console.log(values)
    // for (let value in values) {
    //   console.log(`${value} : ${values[value]}`)

    // }
    // const data = { ...values, type };
    const payload = {
      contactForm: contactForm.map((formData) => ({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reasonForCommunication: formData.reasonForCommunication,
        message: formData.message,
      })),
      type,
    };

    updateIsLoading(true);
    addContactUsSections(
      payload,
      (success) => {
        updateIsLoading(false);
        updateHasError({
          status: true,
          severity: "success",
          message: success?.message,
        });
        handleGetContactUsSection3();
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
      formRef.current.validateFields().then(() => {
        formRef.current.submit();
      });
    }
  };

  // const handleAddForm = () => {
  //   let allContactForms = [...contactForm];
  //   const newObject = {
  //     name: "",
  //     email: "",
  //     phone: "",
  //     reasonForCommunication: "",
  //     message: "",
  //   };
  //   allContactForms.push(newObject);
  //   setContactForm([...allContactForms]);
  // };

  const handleAddForm = () => {
    setContactForm([
      ...contactForm,
      {
        name: "",
        email: "",
        phone: "",
        reasonForCommunication: "",
        message: "",
      },
    ]);
  };

  const handleDeleteForm = (index) => {
    const updatedContactForm = [...contactForm];
    updatedContactForm.splice(index, 1); // Remove the form at the specified index

    const initialValues = updatedContactForm.reduce((acc, contact, index) => {
      acc[`contactForm[${index}].name`] = contact.name; // Set the initial value for each field based on the index
      acc[`contactForm[${index}].email`] = contact.email;
      acc[`contactForm[${index}].phone`] = contact.phone;
      acc[`contactForm[${index}].reasonForCommunication`] =
        contact.reasonForCommunication;
      acc[`contactForm[${index}].message`] = contact.message;
      return acc;
    }, {});

    form.setFieldsValue(initialValues); // Set the initial values for the form fields
    setContactForm(updatedContactForm); // Update the array of contactForm
  };

  useEffect(() => {
    handleGetContactUsSection3();
  }, []);

  return (
    <>
      {isLoading ? (
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
          <div className="d-flex flex-wrap justify-content-between">
            <div
              className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}
            >
              {t("Section3")}
            </div>
            <div className="d-flex">
              <Button
                className="btn-primary-green-sm mx-2"
                onClick={handleAddForm}
              >
                {t("add")}
              </Button>
            </div>
          </div>

          <Form
            form={form}
            onFinish={onFinish}
            ref={formRef}
            initialValues={initialValues}
          >
            {contactForm.map((formData, index) => (
              <>
                {contactForm.length > 1 && (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteForm(index)} // Pass the index to delete the specific form
                  />
                )}
                <div
                  key={index}
                  className="d-flex flex-wrap align-items-center my-2"
                >
                  <Form.Item
                    className="me-lg-3"
                    label=""
                    name={`contactForm[${index}].name`}
                    rules={[
                      {
                        required: true,
                        message: t("pleaseEnterTheName"),
                      },
                    ]}
                  >
                    <InputForm
                      className="input-xmd"
                      label={t("name")}
                      onKeyPress={onEnterKeyPress}
                      onChange={(e) =>
                        setContactForm(
                          [...contactForm],
                          (contactForm[index].name = e.target.value)
                        )
                      }
                      defaultValue={contactForm?.[index]?.name}
                    />
                  </Form.Item>

                  <Form.Item
                    className="me-lg-3"
                    label=""
                    name={`contactForm[${index}].email`}
                    rules={[
                      { required: true, message: t("pleaseEnterEmail") },
                      { type: "email", message: t("InvalidEmail") },
                    ]}
                  >
                    <InputForm
                      className="input-xmd"
                      label={t("email")}
                      onKeyPress={onEnterKeyPress}
                      onChange={(e) =>
                        setContactForm(
                          [...contactForm],
                          (contactForm[index].email = e.target.value)
                        )
                      }
                      defaultValue={contactForm?.[index]?.email}
                    />
                  </Form.Item>

                  <Form.Item
                    className="me-lg-3"
                    name={`contactForm[${index}].phone`}
                    label=""
                    rules={[
                      {
                        required: true,
                        message: t("pleaseEnterYourPhone"),
                      },
                    ]}
                  >
                    <InputForm
                      className="input-xmd"
                      // type="number"
                      label={t("phone")}
                      onKeyPress={onEnterKeyPress}
                      onChange={(e) =>
                        setContactForm(
                          [...contactForm],
                          (contactForm[index].phone = e.target.value)
                        )
                      }
                      defaultValue={contactForm?.[index]?.phone}
                    />
                  </Form.Item>

                  <div className="send-msg-modal w-100">
                    <Form.Item
                      label=""
                      name={`contactForm[${index}].reasonForCommunication`}
                      rules={[
                        {
                          required: true,
                          message: t("pleaseEnterYourReason"),
                        },
                      ]}
                    >
                      <InputForm
                        className="input-xmd"
                        label={t("reasonForCommunication")}
                        type="text"
                        onKeyPress={onEnterKeyPress}
                        onChange={(e) =>
                          setContactForm(
                            [...contactForm],
                            (contactForm[index].reasonForCommunication =
                              e.target.value)
                          )
                        }
                        defaultValue={
                          contactForm?.[index]?.reasonForCommunication
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label=""
                      name={`contactForm[${index}].message`}
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
                        className="text-area"
                        onChange={(e) =>
                          setContactForm(
                            [...contactForm],
                            (contactForm[index].message = e.target.value)
                          )
                        }
                        defaultValue={contactForm?.[index]?.message}
                      />
                    </Form.Item>
                  </div>
                </div>
              </>
            ))}

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
