import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import back from "@assets/icons/back-icon.svg";
import { Button, Form } from "antd";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  acceptRejectUser,
  getActivationFormById,
  getRejectionReason,
} from "./services";
import ConfirmationModal from "../Common/ConfirmationModal";
import rightBgGreen from "@assets/icons/right-bg-green.svg";
import wrongBgRed from "@assets/icons/wrong-bg-red.svg";
import InputForm from "../../Components/Inputs";
import { ROUTES } from "../../constants/_routes";
import doubleRight from "@assets/icons/doubleRight.svg";
import HistoryOfRejectionModal from "../Common/HistoryOfRejectionModal";
import Loader from "../../Components/Loader/Loader";

export default function HospitalActivationProcessDetails() {
  const [hospitalDetails, updateHospitalDetails] = useState({});
  const [hospital, updateHospital] = useState([]);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const [isHistoryOfRejectionModalVis, updateIsHistoryOfRejectionModalVis] =
    useState(false);
  const [rejectionList, updateRejectionList] = useState([]);
  const [rejectionReasonSelect, updateRejectionReasonSelect] = useState(null);
  const [loading, updateLoading] = useState(false);

  const location = useLocation();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const type = "hospital";
  const handleAcceptRejectHospitals = (data) => {
    const allData = { ...data, type };

    acceptRejectUser(
      allData,
      (success) => {
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
        handleBack();
      },
      (fail) => {}
    );
  };
  useEffect(() => {
    const liElements = document.querySelectorAll("li");
    // Initialize a variable to store the largest width
    let largestWidth = 0;

    // Loop through all the li elements and get the largest width
    liElements.forEach((li) => {
      const firstSpan = li.querySelector("div:first-child");
      if (firstSpan) {
        //const width = firstSpan.offsetWidth;
        const { width } = firstSpan.getBoundingClientRect();
        if (width > largestWidth) {
          largestWidth = width;
        }
      }
    });
    // Set the largest width as the width of the first span element in every li element
    liElements.forEach((li) => {
      const firstSpan = li.querySelector("div:first-child");
      if (firstSpan) {
        firstSpan.style.width = `${largestWidth + 10}px`;
        firstSpan.style.whiteSpace = "pre";
      }
    });
  }, []);
  const id = location?.state?.id;

  useEffect(() => {
    updateLoading(true);
    let data = { id, type };
    getActivationFormById(
      data,
      (success) => {
        updateLoading(false);
        updateHospitalDetails(success?.data?.hospitalAF);
        updateHospital(success?.data?.hospital);
      },
      (fail) => {
        updateLoading(false);
      }
    );
    let rejectionData = { id, type };

    getRejectionReason(
      rejectionData,
      (success) => {
        updateLoading(false);
        updateRejectionList(success.data);
      },
      (fail) => {
        updateLoading(false);
      }
    );
  }, [id, type]);

  const rejectionReasonsOptions = [
    { _id: t("notCompleted_papers"), value: "notCompleted" },
    { _id: t("others"), value: "others" },
  ];
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(ROUTES.HOSPITALSACTIVATIONPROCESS);
  };
  useEffect(() => {
    if (isConfModalVisible.status) {
      onOpenRejectUser();
    }
    // eslint-disable-next-line
  }, [rejectionReasonSelect]);

  const {
    hospital_name,
    beds_number,
    bio,
    city,
    country,
    createdAt,
    hospital_email,
    hospital_phone,
    postal_code,
    region,
    specialties,
    type_of_establishment,
    status,
  } = hospitalDetails;

  const onOpenRejectUser = (_) => {
    updateIsConfModalVisible({
      status: true,
      icon: wrongBgRed,
      title: t("rejectText"),
      additionalFields: (
        <Form
          form={form}
          onFinish={(values) => {
            handleAcceptRejectHospitals({
              isAccept: false,
              id,
              reason: values?.reason ? values.reason : values.anotherReason,
            });
          }}
        >
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
              label={t("reasonsForReject")}
              type="select"
              options={rejectionReasonsOptions}
              onChange={(e) => {
                updateRejectionReasonSelect(e.target.value);
              }}
            />
          </Form.Item>
          {rejectionReasonSelect === "others" ? (
            <Form.Item
              label=""
              name="anotherReason"
              rules={[
                {
                  required: true,
                  message: t("pleaseTypeTheReason"),
                },
              ]}
            >
              <InputForm
                className="w-100 input-lg mt-2"
                label={t("anotherReason")}
                type="text"
              />
            </Form.Item>
          ) : (
            <></>
          )}
          <Button htmlType="submit" className={"btn-primary-lg"}>
            {t("reject")}
          </Button>
          <Button
            onClick={() => {
              updateIsConfModalVisible({
                status: false,
                icon: null,
                title: null,
                additionalFields: null,
                buttons: [],
              });
            }}
            className={"btn-text-lg"}
          >
            {t("cancel")}
          </Button>
        </Form>
      ),
      buttons: [],
    });
  };
  const handleOpenAcceptUser = () => {
    updateIsConfModalVisible({
      status: true,
      icon: rightBgGreen,
      title: t("acceptHospitalConf"),
      buttons: [
        {
          name: t("accept"),
          onClick: () => {
            handleAcceptRejectHospitals({
              isAccept: true,
              id,
            });
          },
        },
        {
          name: t("cancel"),
          onClick: () => {
            updateIsConfModalVisible({
              status: false,
              icon: null,
              title: null,
              additionalFields: null,
              buttons: [],
            });
          },
        },
      ],
    });
  };
  return (
    <div className="page">
      <div className="sub-section">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <img
                  src={back}
                  onClick={handleBack}
                  className="cursor-pointer"
                  alt="back"
                />

                <div className="f-rubik-28px mx-2">{hospital_name}</div>
              </div>
              <div className="d-flex flex-wrap">
                {/* <Button className="btn-primary-red-sm mx-2">
                  {t("deleteUser")}
                </Button> */}

                {/* {hospital?.status === "pending" && (
                  <> */}
                <Button
                  className="btn-primary-green-xs mx-2"
                  onClick={handleOpenAcceptUser}
                >
                  {t("accept")}
                </Button>
                <Button
                  className="btn-secondary-grey-xs mx-2"
                  onClick={onOpenRejectUser}
                >
                  {t("reject")}
                </Button>

                <Button
                  className="btn-text-sm mx-2"
                  onClick={() => {
                    updateIsHistoryOfRejectionModalVis(true);
                  }}
                >
                  {t("historyRejection")}
                </Button>
                {/* </>
                )} */}
              </div>
            </div>
            <div className="my-3">
              <div className="main-color f-rubik-24px fw-500 f-poppins-16px my-2">
                {t("responsibleDetails")}
              </div>
              <ul className="f-poppins-16px fw-500 f-poppins-16px">
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px ">{t("name")}:</div>
                  <div className="mx-4">
                    {hospital?.first_name} {hospital?.last_name}
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px ">{t("location")}:</div>
                  <div className="mx-4">
                    {hospital?.country},{hospital?.region},{hospital?.city},
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px ">
                    {t("ruleOfHiring")}:
                  </div>
                  <div className="mx-4">{hospital?.job_role}</div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px ">{t("phone")}:</div>
                  <div className="mx-4">{hospital?.employer_phone}</div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px ">{t("email")}:</div>
                  <div className="mx-4">{hospital?.email}</div>
                </li>
              </ul>
            </div>
            <div className="my-3">
              <div className="main-color f-rubik-24px fw-500 f-poppins-16px my-2">
                {t("userDetails")}
              </div>
              <ul className="f-poppins-16px fw-500 f-poppins-16px">
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">
                    {t("hospitalType")}:
                  </div>
                  <div className="status-box-blue mx-4">
                    {type_of_establishment}
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">{t("state")}:</div>
                  <div className={`mx-4 status-box-green`}>
                    <img src={doubleRight} alt="doubleRight" className="mx-1" />
                    {t("completed")}
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">
                    {t("submissionDate")}:
                  </div>
                  <div className="mx-4">
                    {moment(createdAt).format("MMMM DD, YYYY")}
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">
                    {t("hospitalPhone")}:
                  </div>
                  <div className="mx-4">{hospital_phone}</div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">
                    {t("hospitalEmail")}:
                  </div>
                  <div className="mx-4">{hospital_email}</div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">{t("location")}:</div>
                  <div className="mx-4">
                    {country},{city},{region},{postal_code}
                  </div>
                </li>{" "}
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">
                    {t("bedsNumber")}:
                  </div>
                  <div className="mx-4">{beds_number}</div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">
                    {t("specialities")}:
                  </div>
                  <div className="mx-4 specialties-section">
                    {specialties?.map((specialty, index) => (
                      <>
                        {specialty}{" "}
                        {index !== specialties.length - 1 ? " , " : ""}
                      </>
                    ))}
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">
                    {t("bioAboutHospital")}:
                  </div>
                  <div className="mx-4 bio-section">{bio}</div>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      {isConfModalVisible.status ? (
        <ConfirmationModal
          open={isConfModalVisible}
          onCancel={() => {
            updateIsConfModalVisible({
              status: false,
              icon: null,
              title: null,
              additionalFields: null,
              buttons: [],
            });
            form?.setFieldsValue({
              reason: "",
              anotherReason: "",
            });
          }}
        />
      ) : (
        <></>
      )}
      {isHistoryOfRejectionModalVis ? (
        <HistoryOfRejectionModal
          open={isHistoryOfRejectionModalVis}
          onCancel={() => {
            updateIsHistoryOfRejectionModalVis(false);
          }}
          rejectionList={rejectionList}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
