import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import adminActiveState from "@assets/icons/admin-active-status.svg";
import adminInactiveState from "@assets/icons/admin-inactive-status.svg";
//import filterIcon from "@assets/icons/filter-icon.svg";
import { getAllAdmins } from "./services";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/_routes";
// import InputForm from "../../Components/Inputs";
// import { InputAdornment } from "@mui/material";
import AddUsers from "./AddUsers";
import ViewUsers from "./ViewUsers";
function AllUsers() {
  const [dataSource, updateDataSource] = useState([]);
  const [adminData, updateAdminData] = useState(null);
  const [isViewUserModalOpen, updateIsViewUserModalOpen] = useState(false);
  const [loading, updateLoading] = useState(false);
  const { size } = useSelector((state) => state.screen);
  const [isAddUserModalOpen, updateIsAddUserModalOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const requestToAllAdmins = () => {
    updateLoading(true);
    getAllAdmins(
      (success) => {
        updateDataSource(success.data.staff);
        updateLoading(false);
      },
      (fail) => {
        updateLoading(false);
      }
    );
  };
  useEffect(() => {
    requestToAllAdmins();
  }, []);
  const columns = [
    {
      title: t("userName"),
      key: "name",
      dataIndex: "name",
    },
    {
      title: t("Email"),
      key: "email",
      dataIndex: "email",
    },
    // {
    // 	title: t("password"),
    // 	key: "password",
    // 	dataIndex: "password",
    // },
    // {
    // 	title: t("rule"),
    // 	key: "rule",
    // 	dataIndex: "rule",
    // },
    {
      title: t("active"),
      key: "isActive",
      dataIndex: "isActive",
      render: (isActive) => {
        return isActive ? (
          <img src={adminActiveState} alt="adminInactiveState" />
        ) : (
          <img src={adminInactiveState} alt="adminInActiveState" />
        );
      },
    },
  ];
  const subTabs = [
    {
      pathname: ROUTES.ADMINS,
      tabname: t("allUsers"),
      isActive: ROUTES.ADMINS === location.pathname,
    },
    {
      pathname: ROUTES.RULESANDPERMISSIONS,
      tabname: t("rulesAndPermissions"),
      isActive: ROUTES.RULESANDPERMISSIONS === location.pathname,
    },
  ];
  // const inputSearchSx = {
  // 	"&": {
  // 		borderRadius: "100px",
  // 		height: "40px",
  // 		padding: "8px 16px",
  // 	},
  // 	"& .MuiInputBase-root": {
  // 		borderRadius: "100px",
  // 	},
  // };
  // const inputSelect = {
  // 	"&": {
  // 		borderRadius: "100px",
  // 		height: "40px",
  // 		width: "146px",
  // 	},
  // 	"& .MuiFilledInput-input": {
  // 		padding: "8px 16px",
  // 		width: "146px",
  // 	},
  // };

  return (
    <div className="page rules-and-permissions">
      <div className="sub-section">
        <div className="d-flex justify-content-between">
          <div className={`mb-4 f-rubik-${size === "small" ? "16px" : "28px"}`}>
            {t("rulesAndPermissions")}
          </div>
          <div className="d-flex">
            {/* <Button className={"btn-primary-xs mx-2"}>{t("addNew")}</Button> */}
            <Button
              className={"btn-secondary-xs mx-2 "}
              onClick={() => {
                updateIsAddUserModalOpen(true);
              }}
            >
              {t("addUser")}
            </Button>
          </div>
        </div>
        <div className="my-2 d-flex justify-content-between align-items-center">
          <ul className="d-flex">
            {subTabs.map((tab) => {
              return (
                <li className={`${tab.isActive ? "tab-active" : ""} me-3`}>
                  <Link to={tab.pathname} className="f-poppins-16px">
                    {tab.tabname}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* <div className="d-flex">
						<InputForm
							type="search"
							label={t("typeToSearch")}
							// value={searchKeyword}
							// onChange={(e) => setSearchKeyword(e.target.value)}
							sx={inputSearchSx}
							endAdornment={
								<InputAdornment position="end">
									<img src={filterIcon} alt="filterIcon" />
								</InputAdornment>
							}
							className="mx-2"
						/>
						<InputForm
							type="select"
							sx={inputSelect}
							label={t("sortByNew")}
							className="w-100"
						/>
					</div> */}
        </div>
        <Table
          className="table-container"
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                updateAdminData(dataSource[rowIndex]);
                updateIsViewUserModalOpen(true);
              },
            };
          }}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          locale={{ emptyText: t("no_data") }}
        />
      </div>
      {isAddUserModalOpen && (
        <AddUsers
          isOpen={isAddUserModalOpen}
          onCancel={() => {
            updateIsAddUserModalOpen(false);
            requestToAllAdmins();
            updateAdminData(null);
          }}
          adminData={adminData}
        />
      )}

      {isViewUserModalOpen && (
        <ViewUsers
          isOpen={isViewUserModalOpen}
          onCancel={() => {
            updateIsViewUserModalOpen(false);
            updateAdminData(null);
          }}
          adminData={adminData}
          onEdit={() => {
            updateIsViewUserModalOpen(false);
            updateIsAddUserModalOpen(true);
          }}
        />
      )}
    </div>
  );
}

export default AllUsers;
