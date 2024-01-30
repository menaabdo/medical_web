import { Button, Table } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../Common/ConfirmationModal";
import { getDeletedAccounts, acceptRejectUser } from "./services";
import defaultAvatar from "@assets/images/default_avatar.svg";
import { baseUrl } from "../../network";
import { useSelector } from "react-redux";
import rightBgGreen from "@assets/icons/right-bg-green.svg";
import right from "@assets/icons/right.svg";
import eye from "@assets/icons/remove_red_eye.svg";
import Alert from "../../Components/Alert";

export default function DeletedNurses() {
  const { t } = useTranslation();
  const [hasError, updateHasError] = useState({
    status: false,
    message: "null",
  });
  const [deletedNursesDetails, updateDeletedNursesDetails] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [currentPage, updateCurrentPage] = useState(1);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const { auth } = useSelector((state) => state.auth);

  const [pagination, updatePagination] = useState();
  const type = "nurse";

  const handleGetDeletedNursesAccounts = () => {
    updateLoading(true);
    const data = { page: currentPage - 1, type };
    if (auth?.search?.length) {
      data.name = auth.search;
    }
    getDeletedAccounts(
      data,
      (success) => {
        updateLoading(false);
        updateDeletedNursesDetails(success.data.users);
        updatePagination({
          pageSize: success.data.pageSize,
          total: success.data.count,
          showSizeChanger: false,
          current: currentPage,
          onChange: (page) => {
            updateCurrentPage(page);
          },
        });
      },
      (fail) => {
        updateLoading(false);
      }
    );
  };

  const handleAcceptRejectNurses = (data) => {
    const allData = { ...data, type };
    updateLoading(true);
    acceptRejectUser(
      allData,
      (success) => {
        updateLoading(false);
        handleGetDeletedNursesAccounts();
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
        updateHasError({
          status: true,
          severity: "success",
          message: success.message,
        });
      },
      (fail) => {
        updateLoading(false);
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
        updateHasError({
          status: true,
          severity: "error",
          message: fail?.data?.message,
        });
      }
    );
  };

  useEffect(() => {
    handleGetDeletedNursesAccounts();
    // eslint-disable-next-line
  }, [currentPage, auth?.search]);
  useEffect(() => {
    updateCurrentPage(1);
  }, [auth?.search]);

  const onOpenReadExplanation = (_) => {
    updateIsConfModalVisible({
      status: true,
      title: t("explanationOfRefusal"),
      additionalFields: (
        <>
          <div>
            {(_.DeleteAccountReasons && _.DeleteAccountReasons.length > 0 && (
              <>
                {_.DeleteAccountReasons[_.DeleteAccountReasons?.length - 1]
                  .reason === "others"
                  ? _.DeleteAccountReasons[_.DeleteAccountReasons?.length - 1]
                      .other || "---"
                  : _.DeleteAccountReasons[_.DeleteAccountReasons?.length - 1]
                      .reason || "---"}
              </>
            )) ||
              "---"}
          </div>
        </>
      ),
    });
  };

  const handleOpenAcceptUser = (_) => {
    updateIsConfModalVisible({
      status: true,
      icon: rightBgGreen,
      title: t("acceptNurseConf"),
      buttons: [
        {
          name: t("accept"),
          onClick: () => {
            handleAcceptRejectNurses({
              isAccept: true,
              id: _.id,
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

  const columns = [
    {
      title: t("name"),
      key: "name",
      dataIndex: "name",
      render: (name, _) => {
        return (
          <div>
            <img
              src={_.user_image ? baseUrl + "/" + _.user_image : defaultAvatar}
              alt="user_image"
              className="user_image me-2"
              onError={(e) => (e.target.src = defaultAvatar)}
            />
            <>
              {_.first_name} {_.last_name}
            </>
          </div>
        );
      },
    },

    {
      title: t("submissionDate"),
      key: "createdAt",
      dataIndex: "createdAt",
      render: (submissionDate) => (
        <>{moment(submissionDate).format("MMMM DD, YYYY") || "---"}</>
      ),
    },
    {
      title: t("specialization"),
      key: "specialization",
      dataIndex: "specialization",
      render: (specialization) => <>{specialization || "---"}</>,
    },

    {
      title: t("explain"),
      key: "explain",
      dataIndex: "explain",

      render: (explain, _) => {
        return (
          <div className="d-flex">
            <img
              src={right}
              alt="right"
              className="mx-2 cursor-pointer"
              onClick={() => {
                handleOpenAcceptUser(_);
              }}
            />
            <img
              src={eye}
              alt="eye"
              className="mx-2 cursor-pointer"
              onClick={() => {
                onOpenReadExplanation(_);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
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
      <Table
        className="table-container"
        pagination={pagination}
        columns={columns}
        dataSource={deletedNursesDetails}
        loading={loading}
        locale={{ emptyText: t("no_data") }}
      />

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
    </>
  );
}
