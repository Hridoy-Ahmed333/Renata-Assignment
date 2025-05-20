const SelectInput = ({
  name,
  value,
  onChange,
  options,
  label,
  required = false,
  className = "",
}) => {
  return (
    <div className="label-div">
      <label className="modal-label">{label}:</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={className}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
