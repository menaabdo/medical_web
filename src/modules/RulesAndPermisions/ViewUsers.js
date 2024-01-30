import { Button, Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import adminActiveState from "@assets/icons/admin-active-status.svg";
import adminInactiveState from "@assets/icons/admin-inactive-status.svg";

function ViewUsers({ isOpen, onCancel, adminData, onEdit }) {
  const { t } = useTranslation();
  // Get all the li elements
  const liElements = document.querySelectorAll("li");

  // Initialize a variable to store the largest width
  let largestWidth = 0;

  // Loop through all the li elements and get the largest width
  liElements.forEach((li) => {
    const firstSpan = li.querySelector("span:first-child");
    if (firstSpan) {
      const width = firstSpan.offsetWidth;
      if (width > largestWidth) {
        largestWidth = width;
      }
    }
  });
  // Set the largest width as the width of the first span element in every li element
  liElements.forEach((li) => {
    const firstSpan = li.querySelector("span:first-child");
    if (firstSpan) {
      firstSpan.style.width = `${largestWidth}px`;
    }
  });
  return (
    <Modal
      footer={[]}
      className="add-user-modal d-flex"
      title={
        <div className="text-center f-rubik-24px fw-500">
          {t("userDetails")}
        </div>
      }
      open={isOpen}
      onCancel={onCancel}
    >
      <ul className="mb-4">
        <li className="my-2">
          <span className="f-poppins-16px fw-500 d-inline-block">
            {t("userName")}:
          </span>
          <span className="f-poppins-16px ms-4 my-2">{adminData.name}</span>
        </li>
        <li className="my-2">
          <span className="f-poppins-16px fw-500 d-inline-block">
            {t("email")}:
          </span>
          <span className="f-poppins-16px ms-4 my-2">{adminData.email}</span>
        </li>
        {/* <li className="my-2">
					<span className="f-poppins-16px fw-500 d-inline-block">
						{t("rule")}:
					</span>
					<span className="f-poppins-16px ms-4 my-2">{adminData.rule}</span>
				</li> */}
        <li className="my-2">
          <span className="f-poppins-16px fw-500 d-inline-block">
            {t("active")}:
          </span>
          <span className="f-poppins-16px ms-4 my-2">
            {adminData.isActive ? (
              <img src={adminActiveState} alt="adminAactiveState" />
            ) : (
              <img src={adminInactiveState} alt="adminInactiveState" />
            )}
          </span>
        </li>
      </ul>
      <div className="d-flex align-items-center flex-column">
        <Button onClick={onEdit} className={`btn-primary-lg`}>
          {t("edit")}
        </Button>
        {/* <Button
					onClick={() => onCancel()}
					loading={isLoading}
					className={`btn-text-lg mt-2`}>
					{t("deleteUser")}
				</Button> */}
      </div>
    </Modal>
  );
}

export default ViewUsers;
