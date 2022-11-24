import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UIButton from "../components/UIButton";
import UIHeadingText from "../components/UIHeadingText";
import UIInputText from "../components/UIInputText";
import logo from "../assets/logo.svg";

function ForgotPwdPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [errorEmail, setErrorEmail] = useState(null);

  const formik = useFormik({
    initialValues: {
      inputLoginEmail: "",
    },
  });

  const validateForgotPwd = (email) => {
    if (!email || !validateEmail(email)) {
      setErrorEmail(t("invalid_email"));
    } else {
      navigate("/");
      console.log(email);
    }
  };

  return (
    <>
      <div className="login-form-main">
        <div className="login-form-main-inner">
          <div className="login-form-main-title">
            <img
              src={logo}
              className="login-form-main-title--logo"
              alt="icon"
            />
            <h3>{t("employee_management")}</h3>
          </div>
          <span className="underline"></span>
          <div className="login-form-main--sub-title">
            <UIHeadingText name={t("forgot_password_title")} />
          </div>
          <div className="login-form-main-input-form">
            <UIInputText
              id="inputLoginEmail"
              type="email"
              placeholder={t("enter_email")}
              label={t("email_address")}
              value={formik.values.inputLoginEmail}
              onChange={formik.handleChange}
              error={errorEmail}
            />
          </div>
          <UIButton
            className="cust-btn cust-btn-primary cust-btn-fw cust-btn-lg"
            id="loginSubmit"
            type="submit"
            label={t("submit")}
            onClick={() =>
              validateForgotPwd(formik.values.inputLoginEmail.trim())
            }
          />
        </div>
      </div>
    </>
  );
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default ForgotPwdPage;
