import { Button, Form, Table } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import registeredStatus from "@assets/icons/registered-status.svg";
import rejectedStatus from "@assets/icons/rejected-status.svg";
//import pendingStatus from "@assets/icons/pending-status.svg";
import acceptedStatus from "@assets/icons/accepted-status.svg";
import rightBgGreen from "@assets/icons/right-bg-green.svg";
import wrongBgRed from "@assets/icons/wrong-bg-red.svg";
import right from "@assets/icons/right.svg";
import wrong from "@assets/icons/wrong.svg";
import defaultAvatar from "@assets/images/default_avatar.svg";
//import doubleRight from "@assets/icons/doubleRight.svg";
import {
  acceptRejectUser,
  getActivationForms,
  getDropdownData,
} from "./services";
import ConfirmationModal from "../Common/ConfirmationModal";
import InputForm from "../../Components/Inputs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/_routes";
import { baseUrl } from "../../network";
function DoctorActivationProcess() {
  const [dataSource, updateDataSource] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [currentPage, updateCurrentPage] = useState(1);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const [selectedRow, updateSelectedRow] = useState({});
  const [pagination, updatePagination] = useState();
  const [rejectionReasonSelect, updateRejectionReasonSelect] = useState("");
  const [isLoading, updateIsLoading] = useState(false);
  const [rejectionList, updateRejectionList] = useState([]);
  const { auth } = useSelector((state) => state.auth);
  const type = "doctor";
  const navigate = useNavigate();
  const { size } = useSelector((state) => state.screen);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const handleAcceptRejectDoctors = (data) => {
    const allData = { ...data, type };
    updateIsLoading(true);
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
        updateIsLoading(false);
      },
      (fail) => {
        updateIsLoading(false);
      }
    );
  };
  const handleCallActivationForms = () => {
    updateLoading(true);
    const data = { page: currentPage - 1, type };
    if (auth?.search?.length) {
      data.name = auth.search;
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
      title: t("rejectText"),
      additionalFields: (
        <Form
          form={form}
          onFinish={(values) => {
            let finalValues = {
              isAccept: false,
              id: _.id,
              reason: values?.reason,
            };

            if (values?.reason === "others") {
              finalValues.other = values.anotherReason;
            }
            handleAcceptRejectDoctors(finalValues);
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
              options={rejectionList}
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
          <Button
            loading={isLoading}
            htmlType="submit"
            className={"btn-primary-lg"}
          >
            {t("reject")}
          </Button>
          <Button
            loading={isLoading}
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

  const handleOpenAcceptUser = (_) => {
    updateIsConfModalVisible({
      status: true,
      icon: rightBgGreen,
      title: t("acceptDoctorNurseConf"),
      buttons: [
        {
          name: t("accept"),
          onClick: () => {
            handleAcceptRejectDoctors({
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
  useEffect(() => {
    let data = {
      questions: "reject_reason",
    };
    getDropdownData(
      data,
      (success) => {
        const dropdown = success.data.dropdowns;
        const reject_reason_List = dropdown.filter(
          (menu) => menu.question === "reject_reason"
        )[0]?.answers;
        const reject_reason_List_Menu = reject_reason_List.map((rejection) => {
          return { _id: rejection.answer, value: rejection.answer };
        });
        updateRejectionList([
          ...reject_reason_List_Menu,
          { value: "other", _id: t("other") },
        ]);
      },
      (fail) => {}
    );
  }, []);
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
      title: t("submissionDate"),
      key: "submission_date",
      dataIndex: "submission_date",
      render: (submission_date) => (
        <>
          {submission_date
            ? moment(submission_date).format("MMMM DD, YYYY")
            : "-"}
        </>
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
        switch (status) {
          case "registered": {
            return <img src={registeredStatus} alt="registeredStatus" />;
          }
          case "accepted": {
            return <img src={acceptedStatus} alt="acceptedStatus" />;
          }
          case "pending": {
            return <div className="status-box-yellow">{status}</div>;
          }
          case 4: {
            return <img src={rejectedStatus} alt="rejectedStatus" />;
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
              src={wrong}
              alt="wrong"
              className="mx-2 cursor-pointer"
              onClick={() => onOpenRejectUser(_)}
            />
          </div>
        );
      },
    },
  ];
  const onCellClick = (record) => {
    navigate(ROUTES.DOCTORACTIVATIONPROCESSDETAILS, {
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

export default DoctorActivationProcess;
