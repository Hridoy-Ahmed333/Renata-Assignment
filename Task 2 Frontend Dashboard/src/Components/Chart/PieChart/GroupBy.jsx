import { useState } from "react";
import "./pie.css";

function GroupBy({ setSelectedGroup }) {
  const [activeBtn, setActiveBtn] = useState("countBtn1");

  const handleClick = (btn) => {
    if (btn === 1) {
      setActiveBtn("countBtn1");
      setSelectedGroup && setSelectedGroup("Division");
    }
    if (btn === 2) {
      setActiveBtn("countBtn2");
      setSelectedGroup && setSelectedGroup("Gender");
    }
    if (btn === 3) {
      setActiveBtn("countBtn3");
      setSelectedGroup && setSelectedGroup("MaritalStatus");
    }
  };

  return (
    <div className="grp-btn-cnt">
      <div className="op-text ">Count By</div>
      <div className="groupby-container">
        <div
          className={`groupby-btn groupby-style1 ${
            activeBtn === "countBtn1" ? "groupby-active" : ""
          }`}
          onClick={() => handleClick(1)}
        >
          Division
        </div>
        <div
          className={`groupby-btn groupby-style2 ${
            activeBtn === "countBtn2" ? "groupby-active" : ""
          }`}
          onClick={() => handleClick(2)}
        >
          Gender
        </div>
        <div
          className={`groupby-btn groupby-style3 ${
            activeBtn === "countBtn3" ? "groupby-active" : ""
          }`}
          onClick={() => handleClick(3)}
        >
          Marital Status
        </div>
      </div>
    </div>
  );
}

export default GroupBy;
