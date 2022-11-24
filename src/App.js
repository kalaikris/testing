import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ListEmployeePage from "./page/ListEmployeePage";
import ForgotPwdPage from "./page/ForgotPwdPage";
import LoginPage from "./page/LoginPage";
import CreateEmployeePage from "./page/CreateEmployeePage";
import ViewEmployeePage from "./page/ViewEmployeePage";
import ListDepartmentPage from "./page/ListDepartmentPage";
import UIHeaderSidebar from "./components/UIHeaderSidebar";
import ProfilePage from "./page/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <div className="view-container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot_password" element={<ForgotPwdPage />} />
          <Route path="/home" element={<UIHeaderSidebar />}>
            <Route path="/home" element={<ListEmployeePage />} />
            <Route path="/home/list_employee" element={<ListEmployeePage />} />
            <Route path="/home/view_employee" element={<ViewEmployeePage />} />
            <Route path="/home/create_employee" element={<CreateEmployeePage />} />
            <Route path="/home/list_department" element={<ListDepartmentPage />} />
            <Route path="/home/my_profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
