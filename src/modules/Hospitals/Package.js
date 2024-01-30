import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "antd";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { approveRejectHospitalPackage, getAllPackages } from "./services";
import right from "@assets/icons/right.svg";
import wrong from "@assets/icons/wrong.svg";
import wrongBgRed from "@assets/icons/wrong-bg-red.svg";
import InputForm from "../../Components/Inputs";
import ConfirmationModal from "../Common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/_routes";
import rightBgGreen from "@assets/icons/right-bg-green.svg";

export default function Package() {
  const [dataSource, updateDataSource] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [pagination, updatePagination] = useState();
  const [currentPage, updateCurrentPage] = useState(1);
  const { size } = useSelector((state) => state.screen);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const { auth } = useSelector((state) => state.auth);
  const [rejectionReasonSelect, updateRejectionReasonSelect] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const rejectionReasonsOptions = [
    { _id: t("notCompleted_papers"), value: "notCompleted" },
    { _id: t("others"), value: "others" },
  ];

  const handleCallHospitalPackages = () => {
    const data = { status: "pending", page: currentPage, limit: 10 };
    if (auth?.search?.length) {
      data.hospital_name = auth.search;
    }
    updateLoading(true);
    getAllPackages(
      data,
      (success) => {
        updateLoading(false);
        updateDataSource(success.data.items);
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
    handleCallHospitalPackages();
  }, [currentPage, auth?.search]);
  useEffect(() => {
    updateCurrentPage(1);
  }, [auth?.search]);

  const handleApproveRejectHospitalPackage = (data) => {
    approveRejectHospitalPackage(
      data,
      (success) => {
        handleCallHospitalPackages();
        updateIsConfModalVisible({
          status: false,
        });
      },
      (fail) => {}
    );
  };
  const onCellClick = (record) => {
    navigate(ROUTES.HOSPITALPACKAGEDETAILS, {
      state: record,
    });
  };

  const handleOpenAcceptPackage = (_) => {
    updateIsConfModalVisible({
      status: true,
      icon: rightBgGreen,
      title: t("acceptHospitalPackageConf"),
      buttons: [
        {
          name: t("accept"),
          onClick: () => {
            handleApproveRejectHospitalPackage({
              status: "approve",
              id: _.id,
            });
          },
          //   onClick: () => {
          //     let data = { status: "approve", id: _.id };
          //     handleApproveRejectHospitalPackage(data);
          //   },
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
      key: "hospital_name",
      dataIndex: "hospital_name",
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
      key: "type_of_establishment",
      dataIndex: "type_of_establishment",
      render: (type_of_establishment) => {
        return <div className="status-box-blue">{type_of_establishment} </div>;
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
      key: "submitted_at",
      dataIndex: "submitted_at",
      render: (submitted_at) => (
        <>{moment(submitted_at).format("MMMM DD, YYYY")}</>
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
      title: t("packageType"),
      key: "package_name",
      dataIndex: "package_name",
      onCell: (record) => {
        return {
          onClick: (e) => {
            onCellClick(record);
          },
        };
      },
    },
    {
      title: t("action"),
      key: "action",
      dataIndex: "action",
      render: (action, _) => {
        return (
          <>
            <img
              src={right}
              alt="right"
              className="mx-2 cursor-pointer"
              onClick={() => {
                handleOpenAcceptPackage(_);
              }}
            />
            <img
              src={wrong}
              alt="wrong"
              className="mx-2 cursor-pointer"
              onClick={() => {
                onOpenRejectPackage(_);
              }}
            />
          </>
        );
      },
    },
  ];

  const onOpenRejectPackage = (_) => {
    updateIsConfModalVisible({
      status: true,
      icon: wrongBgRed,
      title: t("rejectHospitalPackage"),
      additionalFields: (
        <Form
          form={form}
          onFinish={(values) => {
            let data = {
              status: "reject",
              id: _.id,
              reason:
                values.reason === "others"
                  ? values.anotherReason
                  : values.reason,
            };
            handleApproveRejectHospitalPackage(data);
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
                onOpenRejectPackage(_);
              }}
            />
          </Form.Item>
          {form.getFieldValue("reason") === "others" ? (
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
  return (
    <div className="page">
      <div className="sub-section">
        <div className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}>
          {t("package")}
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
