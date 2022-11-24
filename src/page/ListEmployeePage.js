import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import addIcon from "../assets/addicon.svg";
import searchIcon from "../assets/search.svg";
import UIButtonImg from "../components/UIButtonImg";
import networkInstance from "../singleton/Network";
import "../styles/Body.css";
import { getEmployees } from "../utils/EndpointHelper";
import { triggerEmail, triggerPhone } from "../utils/IntentHelper";

function ListEmployeePage() {
  const [employeeData, setEmployeeData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    getHomeData();
  }, []);

  // search filter
  const handleSearch = (e) => {
    const keyword = e.target.value.trim();
    setInputSearch(keyword);

    let filterResult = employeeData.filter((item) => {
      if (keyword === "") return item;
      return item.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilterData(filterResult);
  };

  // remote request to fetch all employees
  const getHomeData = () => {
    const instance = networkInstance.getNetworkInstance();

    instance
      .get(getEmployees)
      .then(function (response) {
        setEmployeeData(response.data.data);
        setFilterData(response.data.data);
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  // redirect to employee profile
  const viewEmployeeDetail = (employee) => {
    navigate("/home/view_employee", {
      state: employee,
    });
  };

  return (
    <div>
      <div className="search-filter-set">
        <div className="title flex-column">
          <h2>{t("my_employees")}</h2>
          <p>
            {filterData.length} {t("employees")}
          </p>
        </div>
        <div className="seacr-filter-input-group">
          <input
            onChange={handleSearch}
            value={inputSearch}
            type="text"
            className="search-filter-input"
            placeholder={t("search")}
          />
          <img src={searchIcon} className="search-icon" alt="search icon" />
        </div>
      </div>
      <div className="profile-grid">
        {filterData.length > 0 &&
          filterData.map((employee) => {
            return (
              <div
                key={employee.token}
                className="grid-items"
                onClick={() => viewEmployeeDetail(employee)}
              >
                <div className="grid-items--card">
                  <div className="grid-items--profile-details">
                    <img
                      src={employee.photo}
                      className="profile-grid-avatar"
                      alt="avatar"
                    />
                    <h3>{employee.name}</h3>
                    <span className="weidget weidget-sm widget-default">
                      {employee.department_name}
                    </span>
                  </div>
                  <div className="underline"></div>
                  <div className="grid-items--call-action">
                    <UIButtonImg
                      type="submit"
                      label={t("mail")}
                      btnImg={true}
                      className="btn-outline-primary btn-mail"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerEmail(employee.email);
                      }}
                    />
                    <UIButtonImg
                      type="submit"
                      label={t("call")}
                      className="btn-outline-primary btn-call"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerPhone(employee.mobile_number);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Link to="/home/create_employee" className="add-widget">
        <img src={addIcon} className="add-icon" alt="add icon" />
      </Link>
    </div>
  );
}

export default ListEmployeePage;
