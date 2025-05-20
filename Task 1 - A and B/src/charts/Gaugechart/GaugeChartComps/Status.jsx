import React from "react";
import "./Status.css";

function Status({ status }) {
  return (
    <div className="status-container-top">
      <div className="status-container">Status : </div>
      <div className="status-desc">{status}</div>
    </div>
  );
}

export default Status;
