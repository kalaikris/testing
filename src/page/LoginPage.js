import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import UIButton from "../components/UIButton";
import UIHeadingText from "../components/UIHeadingText";
import UIInputText from "../components/UIInputText";
import userAuth from "../model/UserAuth";
import networkInstance from "../singleton/Network";
import "../styles/Login.css";
import "../styles/Main.css";
import { adminLogin } from "../utils/EndpointHelper";
import { validateEmail } from "../utils/ValidationHelper";

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [errorParameters, setErrorParameters] = useState({
    errorEmail: null,
    errorPassword: null,
  });

  const storedEmail = localStorage.getItem("email");
  const storedPasssword = localStorage.getItem("password");

  const formik = useFormik({
    initialValues: {
      inputLoginEmail: storedEmail == null ? "" : storedEmail,
      inputLoginPassword: storedPasssword == null ? "" : storedPasssword,
    },
  });

  // validate login input parameters
  const validateLogin = (email, password) => {
    if (!email || !validateEmail(email)) {
      setErrorParameters({
        errorEmail: t("invalid_email"),
        errorPassword: null,
      });
    } else if (!password || password.length < 6) {
      setErrorParameters({
        errorEmail: null,
        errorPassword: t("invalid_password"),
      });
    } else {
      setErrorParameters({
        errorEmail: null,
        errorPassword: null,
      });
      login(email, password);
    }
  };

  // remote login reqeust
  const login = (email, password) => {
    const instance = networkInstance.getNetworkInstance();

    const data = {
      email: email,
      password: password,
    };

    instance
      .post(adminLogin, data)
      .then(function (response) {
        console.log(response.data);
        userAuth.token = response.data.data.token;
        userAuth.username = response.data.data.name;
        userAuth.wish = response.data.data.message;
        userAuth.profilePic =
          "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("token", userAuth.token);
        networkInstance.buildAuthNetworkInstance();
        navigate("/home", {
          state: userAuth,
        });
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="login-form-main">
      <div className="login-form-main-inner">
        <div className="login-form-main-title">
          <img src={logo} className="login-form-main-title--logo" alt="icon" />
          <h3>{t("employee_management")}</h3>
        </div>
        <span className="underline"></span>
        <div className="login-form-main--submit-form">
          <div className="login-form-main--sub-title">
            <UIHeadingText name={t("login")} />
            <p>{t("enter_credentials")}</p>
          </div>
          <div className="login-form-main-input-form">
            <UIInputText
              id="inputLoginEmail"
              type="email"
              placeholder={t("enter_email")}
              label={t("email_address")}
              value={formik.values.inputLoginEmail}
              onChange={formik.handleChange}
              error={errorParameters.errorEmail}
            />
            <UIInputText
              id="inputLoginPassword"
              type="password"
              label={t("password")}
              placeholder={t("enter_password")}
              onChange={formik.handleChange}
              value={formik.values.inputLoginPassword}
              error={errorParameters.errorPassword}
            />
            <Link
              to="/forgot_password"
              className="login-form-main--forgot-link"
            >
              Forgot Password ?
            </Link>
          </div>
          <UIButton
            id="loginSubmit"
            type="submit"
            label={t("login")}
            className="cust-btn cust-btn-primary cust-btn-fw cust-btn-lg"
            onClick={() =>
              validateLogin(
                formik.values.inputLoginEmail.trim(),
                formik.values.inputLoginPassword.trim()
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
