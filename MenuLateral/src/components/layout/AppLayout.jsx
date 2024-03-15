// AppLayout.js

import { Outlet, Route, Routes } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { Gestor } from "../../pages/Gestor";
import { Perfil } from "../../pages/Perfil";
import Blank from "../../pages/Blank";

const AppLayout = () => {
  return (
    <div style={{ padding: "50px 0px 0px 370px" }}>
      <Sidebar />
      <Routes>
        <Route path="/" element={ <Blank />} />
        <Route path="/order" element={<Gestor />} />
        <Route path="/user" element={<Perfil />} />
        {/* Add more routes as needed */}
      </Routes>
      <Outlet />
    </div>
  );
};

export default AppLayout;
