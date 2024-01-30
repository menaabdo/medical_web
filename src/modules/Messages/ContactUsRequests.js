import { Button, Form, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ConfirmationModal from "../Common/ConfirmationModal";
import { getContactUsRequests, sendContactUsFormsMessage } from "./services";
import InputForm from "../../Components/Inputs";

export default function ContactUsRequests() {
  const [dataSource, updateDataSource] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [currentPage, updateCurrentPage] = useState(1);
  // const [limit, updateLimit] = useState(10);
  const [isConfModalVisible, updateIsConfModalVisible] = useState({
    status: false,
  });
  const [selectedRow, updateSelectedRow] = useState({});
  const [pagination, updatePagination] = useState();
  const [form] = Form.useForm();
  const { size } = useSelector((state) => state.screen);
  const { t } = useTranslation();

  const handleCallContactUsRequests = () => {
    updateLoading(true);
    const data = {
      page: currentPage,
      // limit: limit
    };
    getContactUsRequests(
      data,
      (success) => {
        updateLoading(false);
        updateDataSource(success?.items);
        updatePagination({
          pageSize: success.total_count,
          total: success.total_count,
          showSizeChanger: false,
          current: currentPage,
          // limit: limit,
          onChange: (page) => {
            updateCurrentPage(page);
            // updateLimit(page);
          },
        });
      },
      (fail) => {
        updateLoading(false);
      }
    );
  };

  useEffect(() => {
    handleCallContactUsRequests();
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    if (isConfModalVisible.status) {
      onOpenEditMessage(selectedRow);
    }
  }, [selectedRow]);

  const onOpenEditMessage = (_) => {
    updateIsConfModalVisible({
      status: true,
      icon: null,
      title: t("sendMsg"),
      additionalFields: (
        <Form
          form={form}
          onFinish={(values) => {
            let data = {
              ...values,
              formId: _.id,
            };
            sendContactUsFormsMessage(
              data,
              (success) => {
                updateIsConfModalVisible({
                  status: false,
                });
                handleCallContactUsRequests();
              },
              (fail) => {}
            );
          }}
        >
          <div className="d-flex f-rubik-16px">
            <p>{t("messageInfo")}</p>
          </div>
          <div>
            <div className="send-msg-modal">
              <Form.Item
                label=""
                name="subject"
                rules={[
                  {
                    required: true,
                    message: t("pleaseTypeTheTitle"),
                  },
                ]}
              >
                <InputForm className="w-100" label={t("title")} type="text" />
              </Form.Item>

              <Form.Item
                label=""
                name="text"
                rules={[
                  {
                    required: true,
                    message: t("pleaseEnterMsgBody"),
                  },
                ]}
              >
                <InputForm
                  multiline
                  label={t("msgBody")}
                  className="text-area w-100"
                />
              </Form.Item>
            </div>
          </div>

          <Button htmlType="submit" className={"btn-primary-lg"}>
            {t("send")}
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

  const onOpenReadExplanation = (_) => {
    updateIsConfModalVisible({
      status: true,
      title: t("messageText"),
      additionalFields: <div>{_.message || "---"}</div>,
      buttons: [
        {
          name: t("sendMessage"),
          onClick: () => {
            onOpenEditMessage(_);
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
      render: (name) => <>{name || "---"}</>,
    },

    {
      title: t("email"),
      key: "email",
      dataIndex: "email",
      render: (email) => <>{email || "---"}</>,
    },

    {
      title: t("phone"),
      key: "phone",
      dataIndex: "phone",
      render: (phone) => <>{phone || "---"}</>,
    },

    {
      title: t("reason"),
      key: "reason",
      dataIndex: "reasonForCommunication",
      render: (reasonForCommunication) => (
        <>{reasonForCommunication || "---"}</>
      ),
    },

    {
      title: t("message"),
      key: "message",
      dataIndex: "message",

      render: (message, _) => {
        return (
          <Button
            className="btn-primary-sm"
            onClick={() => onOpenReadExplanation(_)}
          >
            {t("read")}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="page">
      <div className="sub-section">
        <div className={`mb-2 f-rubik-${size === "small" ? "16px" : "28px"}`}>
          {t("ContactUsRequests")}
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
