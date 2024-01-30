import { Button, Form, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputForm from "../../../Components/Inputs";
import { getFaqSections, addFaqSections, deleteFaq, editFaq } from "./services";
import Alert from "../../../Components/Alert";
import AddNewFaqModal from "./AddNewFaqModal";
import Loader from "../../../Components/Loader/Loader";
import { DeleteOutlined } from "@ant-design/icons";

export default function Section2() {
  const [data, setData] = useState([]);
  const [initialValues, updateInitialValues] = useState({});
  const [hasError, updateHasError] = useState({
    status: false,
    message: "null",
  });
  const [isAddFaqModalVisible, updateIsAddFaqModalVisible] = useState(false);
  const [isLoading, updateIsLoading] = useState(false);
  const [loading, updateLoading] = useState(false);
  const { t } = useTranslation();
  const { size } = useSelector((state) => state.screen);
  const [form] = Form.useForm();
  const formRef = useRef();

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

  const type = "faqs-section2";

  const handleGetFaqSection2 = () => {
    updateLoading(true);
    getFaqSections(
      (success) => {
        updateLoading(false);

        const faqs = success.data[1] || [];
        const initialValues = faqs.reduce((acc, faq, index) => {
          acc[`question_${index}`] = faq.question; // Set the initial value for each field based on the index
          acc[`for_user_${index}`] = faq.for_user;
          acc[`answer_${index}`] = faq.answer;

          return acc;
        }, {});
        updateInitialValues(initialValues);
        setData(faqs);
      },
      (fail) => {
        updateLoading(false);
      }
    );
  };

  const onFinish = (values) => {
    const formData = { ...values, type };
    updateIsLoading(true);
    addFaqSections(
      formData,
      (success) => {
        updateIsLoading(false);
        handleGetFaqSection2();
        updateIsAddFaqModalVisible(false);
        updateHasError({
          status: true,
          severity: "success",
          message: success.message,
        });
      },
      (fail) => {
        updateIsLoading(false);
        updateIsAddFaqModalVisible(false);
        updateHasError({
          status: true,
          severity: "error",
          message: fail?.data?.message,
        });
      }
    );
  };

  useEffect(() => {
    handleGetFaqSection2();
  }, []);

  const handleAddNewFaq = () => {
    updateIsAddFaqModalVisible(true);
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

  const handleDeleteFaq = (indx) => {
    const allFaqs = [...data];
    console.log(allFaqs[indx].FAQID, "Dataa");
    if (allFaqs[indx].FAQID) {
      deleteFaq(
        allFaqs[indx].FAQID,
        (success) => {
          allFaqs.splice(indx, 1);
          const initialValues = allFaqs.reduce((acc, faq, index) => {
            acc[`question_${index}`] = faq.question; // Set the initial value for each field based on the index
            acc[`for_user_${index}`] = faq.for_user;
            acc[`answer_${index}`] = faq.answer;

            return acc;
          }, {});
          updateInitialValues(initialValues);
          setData(allFaqs);
          updateHasError({
            status: true,
            severity: "success",
            message: success.message,
          });
        },
        (fail) => {
          updateHasError({
            status: true,
            severity: "error",
            message: fail.data.message,
          });
        }
      );
    }
  };

  const handleUpdateFaq = (indx) => {
    const allFaqs = [...data];
    if (allFaqs[indx].FAQID) {
      const { FAQID, createdAt, ...rest } = allFaqs[indx]; // Exclude FAQID and createdAt from the data object
      editFaq(
        allFaqs[indx].FAQID,
        rest, // Send the updated rest object to the editFaq function
        (success) => {
          const updatedFaqs = [...data];
          updatedFaqs[indx] = {
            ...updatedFaqs[indx],
            ...rest,
          };
          setData(updatedFaqs);
          updateHasError({
            status: true,
            severity: "success",
            message: success.message,
          });
        },
        (fail) => {
          updateHasError({
            status: true,
            severity: "error",
            message: fail.data.message,
          });
        }
      );
    }
  };

  // const onFinishEdit = (values) => {
  //   const result = {};
  //   for (const key in values) {
  //     const splittedKey = key.split("_");
  //     let newKey = splittedKey[0];
  //     result[newKey] = values[key];
  //   }
  //   const allResults = { ...result };
  //   if (allResults.id) {
  //     updateIsLoading(allResults.indx);
  //     delete allResults.indx;
  //     editFaq(
  //       allResults,
  //       (success) => {
  //         updateIsLoading(false);
  //         updateHasError({
  //           status: true,
  //           severity: "success",
  //           message: success.message,
  //         });
  //         handleGetFaqSection2();
  //       },
  //       (fail) => {
  //         updateIsLoading(false);
  //         updateHasError({
  //           status: true,
  //           severity: "error",
  //           message: fail.data.message,
  //         });
  //       }
  //     );
  //   }
  // };

  return (
    <>
      {loading ? (
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

          <div className="d-flex justify-content-between">
            <div
              className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}
            >
              {t("Section2")}
            </div>
            <Button className="btn-primary-green-md" onClick={handleAddNewFaq}>
              {t("addNewFaq")}
            </Button>
          </div>

          {data &&
            data.length > 0 &&
            data?.map((faq, indx) => {
              return (
                <div key={indx}>
                  <div className="d-flex justify-content-between">
                    <div className={`f-rubik-16px`}>
                      {t("faq")} {indx + 1}
                    </div>

                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleDeleteFaq(indx);
                      }}
                    />
                  </div>
                  <Form
                    form={form}
                    className="d-flex flex-column align-items-start my-2"
                    // onFinish={() => {
                    //   handleUpdateFaq(indx);
                    // }}
                    initialValues={initialValues}
                    name={`form_${indx}`}
                  >
                    <div className="d-flex flex-wrap align-items-center my-2">
                      <Form.Item
                        className="me-lg-3"
                        label=""
                        name={`question_${indx}`}
                        rules={[
                          {
                            required: true,
                            message: t("pleaseTypeTheQuestion"),
                          },
                        ]}
                      >
                        <InputForm
                          className="input-xmd"
                          label={t("question")}
                          onKeyPress={onEnterKeyPress}
                        />
                      </Form.Item>
                      <Form.Item
                        className="me-lg-3"
                        label=""
                        name={`for_user_${indx}`}
                        rules={[
                          {
                            required: true,
                            message: t("pleaseSelectForWhatSpecific"),
                          },
                        ]}
                      >
                        <InputForm
                          className="input-xmd"
                          label={t("ForWhatSpecific")}
                          type="select"
                          options={forUsersList}
                          onChange={onChangeForUsersList}
                        />
                      </Form.Item>
                    </div>

                    <div className="answer-section">
                      <Form.Item
                        label=""
                        name={`answer_${indx}`}
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

                    <Button
                      htmlType="submit"
                      className="btn-primary-md my-3"
                      isLoading={isLoading && isLoading === indx}
                      onClick={() => {
                        handleUpdateFaq(indx);
                      }}
                    >
                      {t("saveChanges")}
                    </Button>
                  </Form>
                </div>
              );
            })}

          {isAddFaqModalVisible ? (
            <AddNewFaqModal
              onCancel={() => {
                updateIsAddFaqModalVisible(false);
              }}
              isLoading={isLoading}
              open={isAddFaqModalVisible}
              onFinish={onFinish}
              onEnterKeyPress={onEnterKeyPress}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
