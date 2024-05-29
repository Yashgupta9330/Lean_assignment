import React, { useState } from "react";

export default function Checkbox({ isChecked, onChange }) {
  const handleCheckboxChange = () => {
    onChange(!isChecked);
  };

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id="anonymousCheckbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        style={{ width: "20px", height: "20px" }}
      />
      <label className="label" htmlFor="anonymousCheckbox" style={{ margin: "0px" }}>
        Share feedback anonymously
      </label>
    </div>
  );
}
