import React from "react";
import "./AddUserModal.css";
import SelectInput from "../Select/SelectInput";
import {
  divisionOptions,
  genderOptions,
  maritalStatusOptions,
} from "./option.js";

function AddUserModal({ formData, onChange, onSubmit, onClose, mode }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form className="modal-form" onSubmit={onSubmit}>
          <label className="modal-label">
            Customer Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="modal-input"
              placeholder="Enter customer name"
            />
          </label>

          <SelectInput
            name="division"
            value={formData.division}
            onChange={onChange}
            options={divisionOptions}
            label="Division"
            required
            className="modal-select"
          />

          <SelectInput
            name="gender"
            value={formData.gender}
            onChange={onChange}
            options={genderOptions}
            label="Gender"
            required
            className="modal-select"
          />

          <SelectInput
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={onChange}
            options={maritalStatusOptions}
            label="Marital Status"
            required
            className="modal-select"
          />

          <label className="modal-label">
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={onChange}
              min="0"
              required
              className="modal-input"
              placeholder="Enter age"
            />
          </label>

          <label className="modal-label">
            Income:
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={onChange}
              min="0"
              step="0.01"
              required
              className="modal-input"
              placeholder="Enter income"
            />
          </label>

          <div className="modal-buttons">
            <button type="submit" className="btn btn-primary">
              {mode === "add" ? "Add User" : "Edit User"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
