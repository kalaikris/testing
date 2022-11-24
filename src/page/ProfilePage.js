import { useTranslation } from "react-i18next";
import userAuth from "../model/UserAuth";

function ProfilePage() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="user-profile-card">
        <div className="user-profile-card--inner">
          <h1>{t("profile_title")}</h1>
          <img
            src={userAuth.profilePic}
            className="user-profile-avathar"
            alt={t("profile_picture")}
          />
          <h2>{userAuth.username}</h2>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
