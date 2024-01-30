import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import cardTravel from "@assets/icons/card_travel.svg";
import listIcon from "@assets/icons/list_alt.svg";
import { ROUTES } from "../../constants/_routes";
import { useNavigate } from "react-router-dom";

export default function PackageCard({
  packageName,
  isPopular,
  connection,
  job,
  createIn,
  packageType,
  packageId,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onButtonClick = (pack) => {
    console.log(packageId);
    if (packageType === "active") {
      navigate(ROUTES.EDIT_ACTIVE_PACKAGE, {
        state: { id: pack }, // Wrap the packageId in an object with the key 'id'
      });
    } else {
      navigate(ROUTES.EDIT_INACTIVE_PACKAGE, {
        state: { id: pack }, // Wrap the packageId in an object with the key 'id'
      });
    }
  };

  return (
    <div className="sub-section package-card py-4">
      <div className="package-title mb-1">
        <div className="f-rubik-24px">
          {packageName}
          {isPopular && (
            <span className="my-2 mx-1 text-orange">{t("most_popular")}</span>
          )}
        </div>
      </div>
      {/* <div className="col-12 col-md-9"> */}
      <div className="row justify-content-end align-items-center  package-details">
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-6 col-md-3">
              <img className="mx-1" src={listIcon} alt="pdf-icon" />
              {t("connection")}: {connection}
            </div>
            <div className="col-6 col-md-2">
              <img className="mx-1" src={cardTravel} alt="pdf-icon" />
              {t("job")}: {job}
            </div>
            <div className="col-6 col-md-4">
              {t("created_in")}: {createIn}
            </div>
            <div className="col-6 col-md-2">
              <Button
                className="btn-primary-sm"
                onClick={() => onButtonClick(packageId)}
              >
                {t("viewDetails")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
