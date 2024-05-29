import React, { useState } from "react";
import Arrowup from "../assets/Arrowup.svg";

export default function Select({ label, sect, onChange, section }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(sect); // Set initial value to sect

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onChange(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <label className="label" htmlFor="dropdown">{label}</label>
    <div className={`custom-select ${isOpen ? "open" : ""}`}>
      <div className="selected-item" onClick={toggleDropdown} id="dropdown">
        <span>{selectedItem}</span>
        <img src={Arrowup} alt="arrow" className={isOpen ? "rotate" : ""} />
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {[...Array(5)].map((_, index) => (
            <li key={index} onClick={() => handleItemClick(`Item ${index + 1}`)}>
              Item {index + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}
