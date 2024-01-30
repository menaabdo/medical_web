import { Button, Form, Table } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ConfirmationModal from "../Common/ConfirmationModal";
import { getRejectedAccounts, handleEditRejectionReason } from "./services";
import defaultAvatar from "@assets/images/default_avatar.svg";
import wrongBgRed from "@assets/icons/wrong-bg-red.svg";
import InputForm from "../../Components/Inputs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/_routes";
import { baseUrl } from "../../network";

function DoctorRejected() {
  const [dataSource, updateDataSource] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [currentPage, updateCurrentPage] = useState(1);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const [selectedRow, updateSelectedRow] = useState({});
  const [rejectionReasonSelect, updateRejectionReasonSelect] = useState("");
  const [pagination, updatePagination] = useState();
  const type = "doctor";
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { size } = useSelector((state) => state.screen);
  const { t } = useTranslation();
  const { auth } = useSelector((state) => state.auth);

  const handleCallRejectedAccounts = () => {
    updateLoading(true);
    const data = { page: currentPage - 1, type };
    if (auth?.search?.length) {
      data.name = auth.search;
    }
    getRejectedAccounts(
      data,
      (success) => {
        updateLoading(false);
        updateDataSource(success.data.users);
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
  useEffect(() => {
    handleCallRejectedAccounts();
    // eslint-disable-next-line
  }, [currentPage, auth?.search]);
  useEffect(() => {
    updateCurrentPage(1);
  }, [auth?.search]);

  useEffect(() => {
    if (isConfModalVisible.status) {
      onOpenEditReason(selectedRow);
    }
  }, [rejectionReasonSelect, selectedRow]);

  const rejectionReasonsOptions = [
    { _id: t("notCompleted_papers"), value: "notCompleted" },
    { _id: t("others"), value: "others" },
  ];
  const onOpenEditReason = (_) => {
    updateRejectionReasonSelect(
      _.RejectionReasons[_.RejectionReasons.length - 1].reason
    );
    updateIsConfModalVisible({
      status: true,
      icon: wrongBgRed,
      title: t("editReasonOfRejection"),
      additionalFields: (
        <Form
          form={form}
          onFinish={(values) => {
            let data = {
              ...values,
              other: values.anotherReason,
              id: _.RejectionReasons[_.RejectionReasons.length - 1].id,
              userId: _.id,
              type,
            };
            handleEditRejectionReason(
              data,
              (success) => {
                updateIsConfModalVisible({
                  status: false,
                });
                handleCallRejectedAccounts();
              },
              (fail) => {}
            );
          }}
          initialValues={{
            reason: _.RejectionReasons[_.RejectionReasons.length - 1].reason,
            anotherReason:
              _.RejectionReasons[_.RejectionReasons.length - 1].other,
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
            {t("save")}
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
  const onOpenReadExlanation = (_) => {
    updateIsConfModalVisible({
      status: true,
      title: t("explanationOfRefusal"),
      additionalFields: (
        <div>
          {_.RejectionReasons[_.RejectionReasons.length - 1].reason === "others"
            ? _.RejectionReasons[_.RejectionReasons.length - 1].other
            : _.RejectionReasons[_.RejectionReasons.length - 1].reason}
        </div>
      ),
      buttons: [
        {
          name: t("editReason"),
          onClick: () => {
            onOpenEditReason(_);
            updateSelectedRow(_);
          },
        },
        {
          name: t("close"),
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
      title: t("submissionDate"),
      key: "createdAt",
      dataIndex: "createdAt",
      render: (submissionDate) => (
        <>{moment(submissionDate).format("MMMM DD, YYYY")}</>
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
      title: t("explain"),
      key: "explain",
      dataIndex: "explain",

      render: (explain, _) => {
        return (
          <Button
            className="btn-primary-sm"
            onClick={() => onOpenReadExlanation(_)}
          >
            {t("readExplanation")}
          </Button>
        );
      },
    },
  ];
  const onCellClick = (record) => {
    navigate(ROUTES.DOCTORREJECTEDDETAILS, {
      state: record,
    });
  };

  return (
    <div className="page">
      <div className="sub-section">
        <div className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}>
          {t("Rejected")}
        </div>
        <Table
          className="table-container"
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
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
      </div>
    </div>
  );
}

export default DoctorRejected;
