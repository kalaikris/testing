import { useTranslation } from "react-i18next";
import React from "react";
import { Link } from "react-router-dom";
import employeeActive from "../assets/employee-active.svg";
import employeeInactive from "../assets/employee-inactive.svg";
import departmentActive from "../assets/department-active.svg";
import departmentInactive from "../assets/department-inactive.svg";
import userAuth from "../model/UserAuth";

function UiSideMenu(props) {
  const sidemenuactivekey = props.sidebaractivekey;
  const { t } = useTranslation();
  return (
    <div className="side-menu">
      <div className="side-menu-nav-vertical">
        <ul>
          <li>
            <Link to="/list_employee" className= {sidemenuactivekey === "myemployees" ? 'sidebar-active' : ''} state={userAuth}>
              <img src={employeeActive} className="sidebar-icon" alt="sidebar icon"/>
              {t("my_employees")}
            </Link>
          </li>
          <li>
            <Link to="/list_department" className={sidemenuactivekey === "department" ? 'sidebar-active' : ''} state={userAuth}>
              <img src={departmentActive} className="sidebar-icon" alt="sidebar icon"/>
              {t("departments")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default UiSideMenu;
