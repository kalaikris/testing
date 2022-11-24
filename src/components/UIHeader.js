import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import headerlogo from "../assets/logo.svg";

function UIHeader({ ...props }) {
  const { t } = useTranslation();
  return (
    <header>
      <div className="nav-left">
        <img src={headerlogo} className="nav-logo" alt="logo" />
        <p>{t("employee_management")}</p>
      </div>
      <div className="nav-right">
        <div className="nav-profile">
          <img src={props.profilePic} className="nav-profile-logo" alt="logo" />
          <div className="nav-profile-drop-down">
            <p>{props.wish}</p>
            <h2 className="profileview-down-arrow">{props.username}</h2>
            <div className="nav-dropdown-box">
              <ul>
                <li>
                  <Link to="/myprofile" className="profile-icon">
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
  );
}

export default UIHeader;
