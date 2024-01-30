import { Table } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import inactiveIcon from "@assets/icons/active.svg";
import pendingIcon from "@assets/icons/pending.svg";
import rejectedIcon from "@assets/icons/rejected.svg";
import acceptedIcon from "@assets/icons/doubleRight.svg";
import { getAllUsers } from "./services";
import { ROUTES } from "../../constants/_routes";
import { useNavigate } from "react-router-dom";

export default function AllDoctors() {
  const [dataSource, updateDataSource] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [pagination, updatePagination] = useState();
  const [currentPage, updateCurrentPage] = useState(1);
  const { size } = useSelector((state) => state.screen);
  const { auth } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onCellClick = (record) => {
    navigate(ROUTES.DOCTORDETAILS, {
      state: record,
    });
  };
  const handleCallGetAllUsers = () => {
    updateLoading(true);
    let data = {
      type: "doctor",
      page: currentPage - 1,
    };
    if (auth?.search?.length) {
      data.name = auth.search;
    }
    getAllUsers(
      data,
      (success) => {
        updateLoading(false);
        updateDataSource(success.data.users);
        updatePagination({
          ...pagination,
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
  useEffect(() => {
    handleCallGetAllUsers();
    // eslint-disable-next-line
  }, [currentPage, auth?.search]);
  useEffect(() => {
    updateCurrentPage(1);
  }, [auth?.search]);

  const columns = [
    {
      title: t("name"),
      key: "name",
      dataIndex: "name",
      render: (name, _) => {
        return (
          <>
            {_.first_name} {_.last_name}
          </>
        );
      },
      onCell: (record) => {
        return {
          onClick: (e) => {
            onCellClick(record);
          },
        };
      },
    },
    {
      title: t("submissionDate"),
      key: "createdAt",
      dataIndex: "createdAt",
      render: (createdAt) => (
        <>{createdAt ? moment(createdAt).format("MMMM DD, YYYY") : "-"}</>
      ),
      onCell: (record) => {
        return {
          onClick: (e) => {
            onCellClick(record);
          },
        };
      },
    },
    {
      title: t("specialization"),
      key: "specialization",
      dataIndex: "specialization",
      onCell: (record) => {
        return {
          onClick: (e) => {
            onCellClick(record);
          },
        };
      },
    },

    {
      title: t("status"),
      key: "status",
      dataIndex: "status",
      render: (phase) => {
        //Active inactive pending rejected
        switch (phase) {
          case "inactive": {
            return (
              <div className="status-box-grey fixed_width d-flex">
                <img src={inactiveIcon} alt="inactiveIcon" />
                <span>{t("inactive")}</span>
              </div>
            );
          }
          case "pending": {
            return (
              <div className="status-box-pending fixed_width d-flex">
                <img src={pendingIcon} alt="pendingIcon" />
                <span>{t("pending")}</span>
              </div>
            );
          }
          case "rejected": {
            return (
              <div className="status-box-red fixed_width d-flex">
                <img src={rejectedIcon} alt="rejectedIcon" />
                <span>{t("rejected")}</span>
              </div>
            );
          }
          case "active": {
            return (
              <div className="status-box-green fixed_width d-flex">
                <img src={acceptedIcon} alt="acceptedIcon" className="mx-1" />
                <span>{t("active")}</span>
              </div>
            );
          }
          default: {
            break;
          }
        }
      },
      onCell: (record) => {
        return {
          onClick: (e) => {
            onCellClick(record);
          },
        };
      },
    },
  ];
  return (
    <div className="page">
      <div className="sub-section">
        <div className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}>
          {t("allDoctors")}
        </div>
        <Table
          className="table-container"
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          locale={{ emptyText: t("no_data") }}
        />
      </div>
    </div>
  );
}
