import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import back from "@assets/icons/back-icon.svg";
import defaultAvatar from "@assets/images/default_avatar.svg";
import pdfIcon from "@assets/icons/pdf-icon.svg";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import moment from "moment";
import doubleRight from "@assets/icons/doubleRight.svg";
import { cancelRejection, deleteUser, getActivationFormById } from "./services";
import ConfirmationModal from "../Common/ConfirmationModal";
import stopIcon from "@assets/icons/stop-icon.svg";
import { ROUTES } from "../../constants/_routes";
import Loader from "../../Components/Loader/Loader";

export default function NurseRejectedDetails() {
  const [nurseDetails, updateNurseDetails] = useState({});
  const [workExperiences, updateWorkExperiences] = useState([]);
  const [careerInterests, updateCareerInterests] = useState({});
  const [isLoading, updateIsLoading] = useState(false);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const [loading, updateLoading] = useState(false);

  const location = useLocation();
  const { t } = useTranslation();
  const type = "nurse";

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
        firstSpan.style.width = `${largestWidth}px`;
      }
    });
  }, [careerInterests, workExperiences]);
  const id = location?.state?.id;

  useEffect(() => {
    updateLoading(true);
    let data = { id, type };
    getActivationFormById(
      data,
      (success) => {
        updateLoading(false);
        updateNurseDetails(success?.data?.nurseDetails);
        updateWorkExperiences(success?.data?.workExperience);
        updateCareerInterests(success?.data?.career);
      },
      (fail) => {
        updateLoading(false);
      }
    );
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(ROUTES.NURSESREJECTED);
  };

  const {
    user_image,
    activation_percentage,
    first_name,
    last_name,
    country,
    city,
    region,
    postalCode,
    gender,
    specialization,
    createdAt,
    submission_date,
    business_license,
    business_license_name,
  } = nurseDetails;

  const handleCancelRejection = () => {
    updateIsLoading(true);
    const data = {
      type,
      id,
    };
    cancelRejection(
      data,
      (success) => {
        updateIsLoading(false);
        handleBack();
      },
      (fail) => {
        updateIsLoading(true);
      }
    );
  };
  const handleDeleteUser = () => {
    updateIsLoading(true);

    const data = {
      type,
      id,
    };
    deleteUser(
      data,
      (success) => {
        updateIsLoading(false);
        handleBack();
      },
      (fail) => {
        updateIsLoading(true);
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
                <img
                  src={user_image ? user_image : defaultAvatar}
                  onError={(e) => (e.target.src = defaultAvatar)}
                  alt="user_image"
                  className="user_image mx-4"
                />
                <div className="f-rubik-28px">
                  {first_name} {last_name}
                </div>
              </div>
              <div className="d-flex flex-wrap">
                {/* <Button
                  loading={isLoading}
                  className="btn-primary-red-sm mx-2"
                  onClick={handleDeleteUser}
                >
                  {t("deleteUser")}
                </Button> */}
                <Button
                  loading={isLoading}
                  className="btn-primary-green-sm mx-2"
                  onClick={handleCancelRejection}
                >
                  {t("cancelRejection")}
                </Button>
              </div>
            </div>
            <div className="my-3">
              <div className="main-color f-rubik-24px fw-500 my-2">
                {t("userDetails")}
              </div>
              <ul className="f-poppins-16px fw-500">
                <li className="d-flex my-2">
                  <div className="fw-500">{t("userType")}:</div>
                  <div className="status-box-blue mx-4">{t("nurse")}</div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500">{t("location")}:</div>
                  <div className="mx-4">
                    {country},{city},{region},{postalCode}
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500">{t("gender")}:</div>
                  <div className="mx-4">{gender}</div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500">{t("specialization")}:</div>
                  <div className="mx-4">{specialization}</div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500">{t("phone")}:</div>
                  <div className="mx-4">{nurseDetails?.phoneNumber}</div>
                </li>{" "}
                <li className="d-flex my-2">
                  <div className="fw-500">{t("email")}:</div>
                  <div className="mx-4">{nurseDetails?.email}</div>
                </li>
              </ul>
            </div>
            <div className="my-3">
              <div className="main-color f-rubik-24px fw-500 my-2">
                {t("activationForm")}
              </div>
              <ul className="f-poppins-16px fw-500">
                <li className="d-flex my-2">
                  <div className="fw-500">{t("adminState")}:</div>
                  <div className="status-box-dark-red mx-4">
                    <img src={stopIcon} alt="stopIcon" className="mx-2" />
                    <span>{t("rejected")}</span>
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500">{t("state")}:</div>
                  <div
                    className={`status-box-${
                      activation_percentage === "100%"
                        ? "green"
                        : parseInt(activation_percentage) < 100
                        ? "yellow"
                        : "red"
                    } mx-4`}
                  >
                    {activation_percentage === "100" ? (
                      <img src={doubleRight} alt="right" />
                    ) : activation_percentage === null ? (
                      0
                    ) : (
                      activation_percentage
                    )}{" "}
                    {t("completed")}
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500">{t("submissionDate")}:</div>
                  <div className="mx-4">
                    {submission_date
                      ? moment(submission_date).format("MMMM DD, YYYY")
                      : "-"}
                  </div>
                </li>
                <li className="d-flex my-2">
                  <div className="fw-500">{t("businessLicence")}:</div>
                  <div className="mx-4 d-flex align-items-center">
                    {business_license ? (
                      <>
                        <img src={pdfIcon} alt="pdf-icon" />
                        <Link
                          className="f-poppins-16px mx-2"
                          to={business_license}
                          target="_blank"
                        >
                          {business_license_name}
                        </Link>
                      </>
                    ) : (
                      "---"
                    )}
                  </div>
                </li>
              </ul>
            </div>
            <div className="my-3">
              <div className="main-color f-rubik-24px fw-500 my-2">
                {t("activationForm")}
              </div>
              <div className="f-poppins-16px">
                <div className="fw-500 f-poppins-16px">
                  1- {t("workExeriences")}
                </div>
                <div>
                  {workExperiences?.map((workExperience) => {
                    return (
                      <ul className="f-poppins-16px fw-500 my-4">
                        <li className="d-flex my-2">
                          <div className="fw-500">{t("jobTitle")}:</div>
                          <div className="mx-4">{workExperience.job_title}</div>
                        </li>
                        <li className="d-flex my-2">
                          <div className="fw-500">{t("speciality")}:</div>
                          <div className="mx-4">
                            {workExperience.speciality}
                          </div>
                        </li>
                        <li className="d-flex my-2">
                          <div className="fw-500">{t("startingFrom")}:</div>
                          <div className="mx-4">
                            {moment(workExperience.start_date).format(
                              "MMMM DD, YYYY"
                            )}
                          </div>
                        </li>
                        <li className="d-flex my-2">
                          <div className="fw-500">{t("endingTo")}:</div>
                          <div className="mx-4">
                            {workExperience.end_date
                              ? moment(workExperience.end_date).format(
                                  "MMMM DD, YYYY"
                                )
                              : t("present")}
                          </div>
                        </li>
                        <li className="d-flex my-2">
                          <div className="fw-500">{t("companyName")}:</div>
                          <div className="mx-4">
                            {workExperience.company_name}
                          </div>
                        </li>
                        <li className="d-flex my-2">
                          <div className="fw-500">{t("website")}:</div>
                          <div className="mx-4">{workExperience.website}</div>
                        </li>
                        <li className="d-flex my-2">
                          <div className="fw-500">{t("careerLevel")}:</div>
                          <div className="mx-4">
                            {workExperience.career_level}
                          </div>
                        </li>
                        <li className="d-flex my-2">
                          <div className="fw-500">{t("salary")}:</div>
                          <div className="mx-4">{workExperience.salary}</div>
                        </li>
                        <li className="d-flex my-2">
                          <div className="fw-500">{t("acheivment")}:</div>
                          <div className="mx-4">
                            {workExperience.acheivment?.map(
                              (acheivment, indx) => {
                                return (
                                  <span key={indx} className="mx-2">
                                    {acheivment}{" "}
                                  </span>
                                );
                              }
                            )}
                          </div>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
              <div className="f-poppins-16px">
                <div className="fw-500 f-poppins-16px">
                  2- {t("careerIntrest")}
                </div>
                <div>
                  {" "}
                  <ul className="f-poppins-16px fw-500 my-4">
                    <li className="d-flex my-2">
                      <div className="fw-500">{t("location")}:</div>
                      <div className="mx-4">
                        {careerInterests?.location?.map((locationn, indx) => (
                          <span className="mx-2" key={indx}>
                            {locationn}
                          </span>
                        ))}
                      </div>
                    </li>
                    <li className="d-flex my-2">
                      <div className="fw-500">{t("specialty")}:</div>
                      <div className="mx-4">
                        {careerInterests?.specialty?.map((specialty, indx) => (
                          <span className="mx-2" key={indx}>
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </li>

                    <li className="d-flex my-2">
                      <div className="fw-500">{t("careerLevel")}:</div>
                      <div className="mx-4">
                        {careerInterests?.career_level?.map(
                          (careerLevel, indx) => (
                            <span className="mx-2" key={indx}>
                              {careerLevel}
                            </span>
                          )
                        )}
                      </div>
                    </li>
                    <li className="d-flex my-2">
                      <div className="fw-500">{t("jobType")}:</div>
                      <div className="mx-4">
                        {careerInterests?.job_type?.map((job_type, indx) => (
                          <span className="mx-2" key={indx}>
                            {job_type}
                          </span>
                        ))}
                      </div>
                    </li>
                    <li className="d-flex my-2">
                      <div className="fw-500">{t("typeOfEstablishment")}:</div>
                      <div className="mx-4">
                        {careerInterests?.type_of_establishment?.map(
                          (type_of_establishment, indx) => (
                            <span className="mx-2" key={indx}>
                              {type_of_establishment}
                            </span>
                          )
                        )}
                      </div>
                    </li>
                    <li className="d-flex my-2">
                      <div className="fw-500">{t("germanEducationLevel")}:</div>
                      <div className="mx-4">
                        {careerInterests?.german_education_level}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
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
