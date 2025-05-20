import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function UserActionButtons({ role, onEdit, onDelete }) {
  const inactiveClass = role !== "Admin" ? "inactive-admin" : "";
  const cursorStyle = role !== "Admin" ? "not-allowed" : "pointer";

  return (
    <div
      className="user-info-btns"
      style={{ marginTop: "12px", display: "flex", gap: "16px" }}
    >
      <div className={`icon-div-btn ${inactiveClass}`} onClick={onEdit}>
        <FaEdit
          style={{ color: "#007bff", fontSize: "26px", cursor: cursorStyle }}
        />
      </div>
      <div className={`icon-div-btn ${inactiveClass}`} onClick={onDelete}>
        <MdDelete
          style={{ color: "#dc3545", fontSize: "26px", cursor: cursorStyle }}
        />
      </div>
    </div>
  );
}

export default UserActionButtons;
