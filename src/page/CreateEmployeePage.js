import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import UIButton from "../components/UIButton";
import UIInputText from "../components/UIInputText";
import networkInstance from "../singleton/Network";
import backArrow from "../assets/back-arrow.svg";
import fileUploadImg from "../assets/file-upload-img.svg";
import { addEmployee } from "../utils/EndpointHelper";

let imageData = null;

function CreateEmployeePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imgProfile, setImageProfile] = useState(null);
  const [errorParameters, setErrorParameters] = useState({
    errorEmployeeName: null,
    errorEmployeeEmail: null,
    errorEmployeeDept: null,
    errorEmployeeMobile: null,
    errorEmployeeDOB: null,
  });

  // selected image changed callback
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageProfile(URL.createObjectURL(event.target.files[0]));
      getBase64FromUrl(imgProfile);
    }
  };

  // validate input parameters
  const validateEmployeeInput = (inputData) => {
    const inputEmployeeName = inputData.inputEmployeeName.trim();
    const inputEmployeeDept = inputData.inputEmployeeDept.trim();
    const inputEmployeeEmail = inputData.inputEmployeeEmail.trim();
    const inputEmployeeMobile = inputData.inputEmployeeMobile;
    const inputEmployeeDOB = inputData.inputEmployeeDOB.trim();
    const inputEmployeeBloodGroup = inputData.inputEmployeeBloodGroup.trim();
    const inputEmployeeAddress = inputData.inputEmployeeAddress.trim();

    if (
      !!inputEmployeeName &&
      !!inputEmployeeDept &&
      !!inputEmployeeEmail &&
      !!inputEmployeeMobile &&
      !!inputEmployeeDOB
    ) {
      setErrorParameters({
        errorEmployeeName: null,
        errorEmployeeEmail: null,
        errorEmployeeDept: null,
        errorEmployeeMobile: null,
        errorEmployeeDOB: null,
      });
      const employeeData = {
        inputEmployeeProfile: imageData,
        inputEmployeeName: inputEmployeeName,
        inputEmployeeDept: inputEmployeeDept,
        inputEmployeeEmail: inputEmployeeEmail,
        inputEmployeeMobile: inputEmployeeMobile,
        inputEmployeeDOB: inputEmployeeDOB,
        inputEmployeeBloodGroup: inputEmployeeBloodGroup,
        inputEmployeeAddress: inputEmployeeAddress,
      };
      console.log(employeeData);
      // createEmployee(employeeData);
    } else {
      setErrorParameters({
        errorEmployeeName: !inputEmployeeName ? t("valid_employee_name") : null,
        errorEmployeeEmail: !inputEmployeeEmail ? t("invalid_email") : null,
        errorEmployeeDept: !inputEmployeeDept ? t("valid_dept") : null,
        errorEmployeeMobile: !inputEmployeeMobile
          ? t("valid_contact_number")
          : null,
        errorEmployeeDOB: !inputEmployeeDOB ? t("valid_dob") : null,
      });
    }
  };

  // remote request to create an employee
  const createEmployee = (employeeData) => {
    const instance = networkInstance.getNetworkInstance();

    instance
      .post(addEmployee, employeeData)
      .then(function (response) {
        console.log(response.data);
        if (response.data.status_code === 200) {
          navigate(-1);
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // formik library for input parameters
  const formik = useFormik({
    initialValues: {
      inputEmployeeName: "",
      inputEmployeeEmail: "",
      inputEmployeeDept: "",
      inputEmployeeMobile: "",
      inputEmployeeDOB: "",
      inputEmployeeAddress: "",
      inputEmployeeBloodGroup: "",
    },
  });

  return (
    <div>
      <Link to="/home/list_employee" className="title">
        <img src={backArrow} className="back-arrow" alt="" />
        <p onClick={() => navigate(-1)}>{t("back")}</p>
      </Link>
      <label htmlFor="group_image" className="file-upload">
        <input
          type="file"
          onChange={onImageChange}
          className="filetype hide"
          id="group_image"
        />
        <img id="target" src={fileUploadImg} alt={t("profile_pic")} />
      </label>
      <div className="crete-emp-grid">
        <UIInputText
          id="inputEmployeeName"
          type="text"
          placeholder={t("enter_employee_name")}
          label={t("employee_name")}
          value={formik.values.inputEmployeeName}
          onChange={formik.handleChange}
          error={errorParameters.errorEmployeeName}
        />
        <UIInputText
          id="inputEmployeeDept"
          type="select"
          placeholder={t("choose_department")}
          label={t("department")}
          value={formik.values.inputEmployeeDept}
          onChange={formik.handleChange}
          error={errorParameters.errorEmployeeDept}
        />
        <UIInputText
          id="inputEmployeeEmail"
          type="text"
          placeholder={t("enter_email")}
          label={t("email_address")}
          value={formik.values.inputEmployeeEmail}
          onChange={formik.handleChange}
          error={errorParameters.errorEmployeeEmail}
        />
        <UIInputText
          id="inputEmployeeMobile"
          type="phone"
          placeholder={t("enter_contact_number")}
          label={t("contact_number")}
          value={formik.values.inputEmployeeMobile}
          onChange={formik.handleChange}
          error={errorParameters.errorEmployeeMobile}
        />
        <UIInputText
          id="inputEmployeeDOB"
          type="date"
          placeholder={t("date_of_birth")}
          label={t("date_of_birth")}
          value={formik.values.inputEmployeeDOB}
          onChange={formik.handleChange}
          error={errorParameters.errorEmployeeDOB}
        />
        <UIInputText
          id="inputEmployeeBloodGroup"
          type="text"
          placeholder={t("enter_blood_group")}
          label={t("blood_group")}
          value={formik.values.inputEmployeeBloodGroup}
          onChange={formik.handleChange}
        />
        <UIInputText
          id="inputEmployeeAddress"
          type="textarea"
          placeholder={t("enter_address")}
          label={t("address")}
          value={formik.values.inputEmployeeAddress}
          onChange={formik.handleChange}
          rows="6"
        />
      </div>
      <div className="text-center">
        <UIButton
          id="addEmployee"
          type="submit"
          label={t("add_employee")}
          onClick={() => validateEmployeeInput(formik.values)}
          className="cust-btn cust-btn-primary cust-btn-hw cust-btn-lg"
        />
      </div>
    </div>
  );
}

// conterter util for selected blob URL to base64
const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
      imageData = base64data;
    };
  });
};

export default CreateEmployeePage;
