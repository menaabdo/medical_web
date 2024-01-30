import { Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ShowModalVideo({
  open,
  onCancel,
  video_name,
  video_url,
}) {
  const { t } = useTranslation();
  return (
    <Modal
      title=""
      width={580}
      footer={null}
      open={open}
      onCancel={onCancel}
      className="show-video-modal"
    >
      {video_name && video_url ? (
        <>
          <div className="f-rubik-24px fw-500">{video_name}</div>
          <div className="f-poppins-14px d-flex mt-2 video-container">
            <video className="responsive-video" controls>
              <source src={video_url} type="video/mp4" />
            </video>
          </div>
        </>
      ) : (
        <div className="f-rubik-24px fw-500 text-center my-5">
          {t("noData")}
        </div>
      )}
    </Modal>
  );
}
