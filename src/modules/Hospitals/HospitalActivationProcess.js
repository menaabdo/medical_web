import { Button, Form, Table } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import inactiveIcon from "@assets/icons/active.svg";
import pendingIcon from "@assets/icons/pending.svg";
import rejectedIcon from "@assets/icons/rejected.svg";
import acceptedIcon from "@assets/icons/doubleRight.svg";
import rightBgGreen from "@assets/icons/right-bg-green.svg";
import wrongBgRed from "@assets/icons/wrong-bg-red.svg";
import right from "@assets/icons/right.svg";
import wrong from "@assets/icons/wrong.svg";
import defaultAvatar from "@assets/images/default_avatar.svg";
//import doubleRight from "@assets/icons/doubleRight.svg";
import { acceptRejectUser, getActivationForms } from "./services";
import ConfirmationModal from "../Common/ConfirmationModal";
import InputForm from "../../Components/Inputs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/_routes";
import { baseUrl } from "../../network";

export default function HospitalActivationProcess() {
  const [dataSource, updateDataSource] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [currentPage, updateCurrentPage] = useState(1);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const [selectedRow, updateSelectedRow] = useState({});
  const [pagination, updatePagination] = useState();
  const [rejectionReasonSelect, updateRejectionReasonSelect] = useState("");
  const type = "hospital";
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { size } = useSelector((state) => state.screen);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const handleAcceptRejectHospitals = (data) => {
    const allData = { ...data, type };
    acceptRejectUser(
      allData,
      (success) => {
        handleCallActivationForms();
        updateIsConfModalVisible({
          status: false,
          icon: null,
          title: null,
          additionalFields: null,
          buttons: [],
        });
      },
      (fail) => {}
    );
  };
  const handleCallActivationForms = () => {
    updateLoading(true);
    const data = { page: currentPage - 1, type };
    if (auth?.search?.length) {
      data.hospital_name = auth.search;
    }
    getActivationForms(
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
    handleCallActivationForms();
    // eslint-disable-next-line
  }, [currentPage, auth?.search]);
  useEffect(() => {
    updateCurrentPage(1);
  }, [auth?.search]);

  useEffect(() => {
    if (isConfModalVisible.status) {
      onOpenRejectUser(selectedRow);
    }
    // eslint-disable-next-line
  }, [rejectionReasonSelect, selectedRow]);
  const onOpenRejectUser = (_) => {
    updateIsConfModalVisible({
      status: true,
      icon: wrongBgRed,
      title: t("rejectHospitalText"),
      additionalFields: (
        <Form
          form={form}
          onFinish={(values) => {
            handleAcceptRejectHospitals({
              isAccept: false,
              id: _.id,
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
  const rejectionReasonsOptions = [
    { _id: t("notCompleted_papers"), value: "notCompleted" },
    { _id: t("others"), value: "others" },
  ];
  const handleOpenAcceptUser = (_) => {
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
      onCell: (record) => {
        return {
          onClick: (e) => {
            onCellClick(record);
          },
        };
      },
    },
    {
      title: t("establishmentType"),
      key: "establishmentType",
      dataIndex: "establishmentType",
      render: (type, _) => {
        const type_of_establishment =
          _?.HospitalActivationForm?.type_of_establishment;
        return (
          <div
            className={`${
              type_of_establishment?.toLowerCase() === "hospital"
                ? "status-box-light-blue"
                : type_of_establishment?.toLowerCase() === "clinic"
                ? "status-box-dark-blue"
                : ""
            } fixed_width`}
          >
            {type_of_establishment}
          </div>
        );
      },
    },
    {
      title: t("submissionDate"),
      key: "submission_date",
      dataIndex: "submission_date",
      render: (date, _) => {
        const submission_date = _?.HospitalActivationForm?.createdAt;
        return (
          <>
            {submission_date
              ? moment(submission_date).format("MMMM DD, YYYY")
              : "-"}
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
      title: t("activationForm"),
      key: "status",
      dataIndex: "status",
      onCell: (record) => {
        return {
          onClick: (e) => {
            onCellClick(record);
          },
        };
      },
      render: (status) => {
        //Active inactive pending rejected
        switch (status) {
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
                <span>{t("inactive")}</span>
              </div>
            );
          }
          case "active": {
            return (
              <div className="status-box-green fixed_width d-flex">
                <img src={acceptedIcon} alt="acceptedIcon" className="mx-2" />
                <span>{t("active")}</span>
              </div>
            );
          }
          default: {
            break;
          }
        }
      },
    },
    {
      title: t("action"),
      key: "action",
      dataIndex: "action",
      render: (action, _) => {
        updateSelectedRow(_);
        return (
          <>
            <img
              src={right}
              alt="right"
              className="mx-2 cursor-pointer"
              onClick={() => {
                handleOpenAcceptUser(_);
              }}
            />
            <img
              src={wrong}
              alt="wrong"
              className="mx-2 cursor-pointer"
              onClick={() => onOpenRejectUser(_)}
            />
          </>
        );
      },
    },
  ];
  const onCellClick = (record) => {
    navigate(ROUTES.HOSPITALACTIVATIONPROCESSDETAILS, {
      state: record,
    });
  };
  return (
    <div className="page">
      <div className="sub-section">
        <div className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}>
          {t("activationProcess")}
        </div>
        <Table
          className="table-container"
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          loading={loading}
          locale={{ emptyText: t("no_data") }}
          // onRow={(record, index) => ({
          // 	onClick: () => onCellClick(record),
          // })}
        />
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
    </div>
  );
}
