import { useState } from "react";
import "./pie.css";

function CountBy({ setLabel }) {
  const [activeBtn, setActiveBtn] = useState("groupBtn1");

  const handleClick = (btn) => {
    if (btn === 1) {
      setActiveBtn("groupBtn1");
      setLabel && setLabel("People");
    }
    if (btn === 2) {
      setActiveBtn("groupBtn2");
      setLabel && setLabel("Income");
    }
  };

  return (
    <div className="grp-btn-cnt">
      <div className="op-text ">Group By</div>
      <div className="groupby-container">
        <div
          className={`groupby-btn groupby-style1 ${
            activeBtn === "groupBtn1" ? "groupby-active" : ""
          }`}
          onClick={() => handleClick(1)}
        >
          People
        </div>
        <div
          className={`groupby-btn groupby-style2 ${
            activeBtn === "groupBtn2" ? "groupby-active" : ""
          }`}
          onClick={() => handleClick(2)}
        >
          Income
        </div>
      </div>
    </div>
  );
}

export default CountBy;
