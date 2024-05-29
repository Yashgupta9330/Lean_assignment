import React from "react";

export default function Textinput({ label, required, value, onChange }) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label className="label" htmlFor="emailInput">
        {label}
        {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input id="emailInput" type="text" className="email-input" value={value} onChange={handleInputChange} />
    </div>
  );
}
