import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import backArrow from "../assets/back-arrow.svg";
import phoneIcon from "../assets/call.svg";
import mailIcon from "../assets/mail.svg";
import UIButtonImg from "../components/UIButtonImg";
import { triggerEmail, triggerPhone } from "../utils/IntentHelper";

function ViewEmployeePage() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <Link
        to=""
        className="title"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        {" "}
        {/* /home/list_employee */}
        <img src={backArrow} className="" alt="" />
        <p>{t("back")}</p>
      </Link>
      <div className="profile-card">
        <div className="profile-card--inner">
          <div className="profile-card--img">
            <img
              src={state.photo}
              className="profile-card-avatar"
              alt={t("profile_pic")}
            />
          </div>
          <div className="profile-card--desc">
            <ul className="profile-card--desc-name-designation">
              <li>
                <h2>{state.name}</h2>
                <span className="weidget weidget-sm widget-default">
                  {state.department_name}
                </span>
              </li>
              <li>
                <div className="grid-items--call-action">
                  <UIButtonImg
                    type="submit"
                    label={t("Mail")}
                    btnImg={true}
                    className="btn-outline-primary btn-mail"
                    onClick={() => triggerEmail(state.email)}
                  />
                  <UIButtonImg
                    type="submit"
                    label={t("Call")}
                    className="btn-outline-primary btn-call"
                    onClick={() => triggerPhone(state.mobile_number)}
                  />
                </div>
              </li>
            </ul>
            <div className="profile-div-underline"></div>
            <ul className="contact-detail">
              <li>
                <img src={mailIcon} className="contact-sm-icon" alt="icon" />
                <p>{state.email}</p>
              </li>
              <li>
                <img src={phoneIcon} className="contact-sm-icon" alt="icon" />
                <p>{state.mobile_number}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-card--inner">
          <div className="profile-card--title">
            <h2>{t("basic_information")}</h2>
          </div>
          <div className="profile-div-underline"></div>
          <div className="basic-info-box">
            <ul>
              <li>
                <label>{t("date_of_birth")}</label>
                <p>{state.date_of_birth}</p>
              </li>
              <li>
                <label>{t("blood_group")}</label>
                <p>{state.blood_group}</p>
              </li>
              <li>
                <label>{t("address")}</label>
                <p>{state.address}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployeePage;
