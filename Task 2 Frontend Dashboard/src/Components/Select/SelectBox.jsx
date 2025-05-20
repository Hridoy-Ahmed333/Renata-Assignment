function SelectBox({ id, label, options, onChange, defaultValue = "none" }) {
  return (
    <div className="select-box">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="common-select"
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
