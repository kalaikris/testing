import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import userAuth from "../model/UserAuth";
import headerlogo from "../assets/logo.svg";
import employeeActive from "../assets/employee-active.svg";
import departmentActive from "../assets/department-active.svg";

function UIHeaderSidebar() {
  const { t } = useTranslation();
  const [sidemenuActiveKey, setSidemenuActiveKey] = useState("myemployees");
  const { username, wish, profilePic } = userAuth;
  const [sidemenuhambuger,setSidemenuhambuger] = useState(false); //sidemenu toggle state
  return (
    <>
      <header>
        <div className="nav-left">
          <img src={headerlogo} className="nav-logo" alt="logo" />
          <p>{t("employee_management")}</p>
          <span class="hamburger-box" onClick={()=>{setSidemenuhambuger(!sidemenuhambuger)}}>
            <span class="hamburger-inner"></span>
          </span>
        </div>
        <div className="nav-right">
          <div className="nav-profile">
            <img src={profilePic} className="nav-profile-logo" alt="logo" />
            <div className="nav-profile-drop-down">
              <p>{wish}</p>
              <h2 className="profileview-down-arrow">{username}</h2>
              <div className="nav-dropdown-box">
                <ul>
                  <li>
                    <Link to="/home/my_profile" className="profile-icon" onClick={() => {
                      setSidemenuActiveKey("null");
                    }}>
                      {t("my_profile")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="logout-icon">
                      {t("logout")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className={sidemenuhambuger ? "side-menu sidebar-open" : "side-menu"}>
          <div className="side-menu-nav-vertical">
            <ul>
              <li>
                <Link
                  to="/home/list_employee"
                  className={
                    sidemenuActiveKey === "myemployees" ? "sidebar-active" : ""
                  }
                  state={userAuth}
                  onClick={() => {
                    setSidemenuActiveKey("myemployees");
                  }}
                >
                  <img
                    src={employeeActive}
                    className="sidebar-icon"
                    alt="sidebar icon"
                  />
                  <span>{t("my_employees")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/home/list_department"
                  className={
                    sidemenuActiveKey === "department" ? "sidebar-active" : ""
                  }
                  state={userAuth}
                  onClick={() => {
                    setSidemenuActiveKey("department");
                  }}
                >
                  <img
                    src={departmentActive}
                    className="sidebar-icon"
                    alt="sidebar icon"
                  />
                  <span>{t("departments")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="body-container">
          <div className="boddy-container--inner">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
export default UIHeaderSidebar;
