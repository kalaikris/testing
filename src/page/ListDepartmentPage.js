import { useFormik } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import addIcon from "../assets/addicon.svg";
import closeIcon from "../assets/close-icon.svg";
import searchIcon from "../assets/search.svg";
import UIButton from "../components/UIButton";
import UIInputText from "../components/UIInputText";
import networkInstance from "../singleton/Network";
import "../styles/Modal.css";
import { addDepartment, getDepartments } from "../utils/EndpointHelper";

function ListDepartmentPage() {
  const [departmentData, setDepartmentData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  let [modalVisibility, setModalVisibilty] = useState(false);
  const [errorDepartmentName, setErrorDepartmentName] = useState(null);
  const instance = networkInstance.getNetworkInstance();

  useEffect(() => {
    getDepartmentData(instance);
  }, [instance]);

  // remote request to fetch all departments
  const getDepartmentData = (instance) => {
    instance
      .get(getDepartments)
      .then(function (response) {
        setFilterData(response.data.data);
        setDepartmentData(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };

  // search filter
  const handleSearch = (e) => {
    const keyword = e.target.value.trim();
    setInputSearch(keyword);

    let filterResult = departmentData.filter((item) => {
      if (keyword === "") return item;
      return item.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilterData(filterResult);
  };

  // validate add department input parameters
  const validateDepartment = (departmentName) => {
    if (departmentName) {
      setErrorDepartmentName(null);
      const deparmentData = {
        name: departmentName,
      };
      createDepartment(deparmentData);
      handleModal(false);
    } else {
      setErrorDepartmentName(t("enter_valid_department_name"));
    }
  };

  // remote request to create department
  const createDepartment = (data) => {
    instance
      .post(addDepartment, data)
      .then(function (response) {
        const createdDepartment = response.data.data.department;
        const currentData = [...departmentData];
        departmentData.push(createdDepartment);
        setDepartmentData(currentData);
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  // modal visibilty handler
  const handleModal = (visibilty) => {
    formik.resetForm();
    setModalVisibilty(visibilty);
  };

  const formik = useFormik({
    initialValues: {
      inputDepartmentName: "",
    },
  });

  return (
    <div>
      <div className="search-filter-set">
        <div className="title flex-column">
          <h2>{t("departments")}</h2>
          <p>
            {filterData.length} {t("departments")}
          </p>
        </div>
        <div className="seacr-filter-input-group">
          <input
            type="text"
            value={inputSearch}
            onChange={handleSearch}
            className="search-filter-input"
            placeholder={t("search")}
          />
          <img src={searchIcon} className="search-icon" alt="search icon" />
        </div>
      </div>
      <div className="department-grid">
        {filterData.length > 0 &&
          filterData.map((department) => {
            return (
              <div key={department.token} className="grid-items">
                <div className="grid-items--card">
                  <div className="grid-items--department-list">
                    <h3>{department.name}</h3>
                    <p>{department.created_at}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <span
        className="add-widget"
        variant="primary"
        onClick={() => handleModal(true)}
      >
        <img src={addIcon} className="add-icon" alt="add icon" />
      </span>

      {/* add new department modal popup */}
      <div className="modal fade in">
        <div className=""></div>
      </div>
      <Modal show={modalVisibility} onHide={() => handleModal(false)}>
        <img
          src={closeIcon}
          className="modal-close-icon"
          alt="close"
          onClick={() => handleModal(false)}
        />
        <Modal.Body>
          <div className="modal-body-inner">
            <div className="modal-title">
              <h2>Add new department</h2>
            </div>
            <div className="add-department-input-form">
              <UIInputText
                id="inputDepartmentName"
                type="email"
                placeholder={t("enter_department_name")}
                label={t("department_name")}
                value={formik.values.inputDepartmentName}
                onChange={formik.handleChange}
                error={errorDepartmentName}
              />
            </div>
            <UIButton
              type="submit"
              label={t("add_department")}
              onClick={() =>
                validateDepartment(formik.values.inputDepartmentName.trim())
              }
              className="cust-btn cust-btn-primary cust-btn-fw cust-btn-lg"
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ListDepartmentPage;
