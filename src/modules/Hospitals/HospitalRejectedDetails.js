import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import back from "@assets/icons/back-icon.svg";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { cancelRejection } from "./services";
import ConfirmationModal from "../Common/ConfirmationModal";
//import wrongBgRed from "@assets/icons/wrong-bg-red.svg";
//import doubleRight from "@assets/icons/doubleRight.svg";
import stop from "@assets/icons/stop-icon.svg";
//import InputForm from "../../Components/Inputs";
import { ROUTES } from "../../constants/_routes";
import Loader from "../../Components/Loader/Loader";

export default function HOSPITALRejectedDetails() {
  const [hospitalDetails, updateHospitalDetails] = useState({});
  const [hospital, updateHospital] = useState([]);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const [isLoading, updateIsLoading] = useState(null);
  const [loading, updateLoading] = useState(false);

  const location = useLocation();
  const { t } = useTranslation();
  //const [form] = Form.useForm();

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

  useEffect(() => {
    const reasonChoise =
      location?.state?.RejectionReasons[
        location?.state?.RejectionReasons.length - 1
      ]?.reason;
    const othersReason =
      location?.state?.RejectionReasons[
        location?.state?.RejectionReasons.length - 1
      ]?.other;
    updateHospitalDetails({
      ...location?.state?.HospitalActivationForm,
      reasonOfRejection:
        reasonChoise === "others" ? othersReason : reasonChoise,
    });
    updateHospital(location?.state);
  }, [location.state]);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(ROUTES.HOSPITALSREJECTED);
  };

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
    reasonOfRejection,
  } = hospitalDetails;

  const handleCancelRejection = () => {
    let data = { type: "hospital", id: hospital?.id };
    updateIsLoading(true);
    cancelRejection(
      data,
      (success) => {
        updateIsLoading(false);
        handleBack();
      },
      (fail) => {
        updateIsLoading(false);
      }
    );
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
                {/* <Button loading={isLoading} className="btn-primary-red-sm mx-2">
              {t("deleteUser")}
            </Button> */}

                <Button
                  loading={isLoading}
                  className="btn-primary-sm mx-2"
                  onClick={handleCancelRejection}
                >
                  {t("cancelRejection")}
                </Button>
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
                </li>{" "}
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
                  <div className="fw-500 f-poppins-16px">
                    {t("adminState")}:
                  </div>
                  <div className={`mx-4 status-box-dark-red`}>
                    <img src={stop} alt="stop" className="mx-1" />
                    {t("rejected")}
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500 f-poppins-16px">
                    {t("reasonOfRejection")}:
                  </div>
                  <div className={`mx-4`}>
                    <img src={stop} alt="stop" className="mx-1" />
                    {reasonOfRejection}
                  </div>
                </li>
                {/* <li className="d-flex my-2">
							<div className="fw-500 f-poppins-16px">{t("state")}:</div>
							<div className={`mx-4 status-box-green`}>
								<img src={doubleRight} alt="doubleRight" className="mx-1" />{" "}
								Completed
							</div>
						</li> */}
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
                  <div className="mx-4">
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
                  <div className="mx-4">{bio}</div>
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
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
