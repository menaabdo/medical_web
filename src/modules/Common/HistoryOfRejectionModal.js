import { Modal } from "antd";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

function HistoryOfRejectionModal({ open, onCancel, rejectionList }) {
  const { t } = useTranslation();
  return (
    <Modal
      title=""
      width={480}
      footer={[null]}
      open={open}
      onCancel={onCancel}
      className="history-of-rejection-modal"
    >
      {rejectionList?.length > 0 ? (
        <>
          <div className="f-rubik-24px fw-500">{t("historyRejection")}</div>
          <div className="f-poppins-14px d-flex mt-2">
            {rejectionList?.map((rejection, idx) => {
              return (
                <div key={idx} className="d-flex flex-1 flex-column">
                  <div className="text-danger">
                    {t("rejection")} #{idx + 1}
                  </div>
                  <div className="grey-section my-2">
                    <div className="d-flex justify-content-between flex-1">
                      <div>{rejection?.createdBy}</div>
                      <div>
                        {moment(rejection?.createdAt).format("MMMM DD, YYYY")}
                      </div>
                    </div>
                    <div className="divider my-2"></div>
                    <div>{rejection?.reason}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="f-rubik-24px fw-500 text-center my-5">
          {t("noHistory")}
        </div>
      )}
    </Modal>
  );
}

export default HistoryOfRejectionModal;
