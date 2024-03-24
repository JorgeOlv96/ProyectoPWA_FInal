import React from "react";
import Grafica from "../components/gestor/Grafica";
import { RightBar } from "../components/gestor/RightBar";
import "../components/css/gestor.scss";

export const Gestor = () => {
  return (
    <div className="container">
      <div className="container-grafica">
        <Grafica />
      </div>

      <div className="container-controls">
        <RightBar />
      </div>
    </div>
  );
};

