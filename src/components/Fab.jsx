import React, { useState } from "react";
import close from "../assets/close.svg";
import open1 from "../assets/open1.svg";
import "../App.css";
import InputBox from "./Inputbox"; 

const FAB = ({ actions }) => {
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleItemClick = () => {
    setOpen(!open);
    setSelectedAction(null); 
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  return (
    <div className={`fab-container`}>
      {selectedAction && <InputBox action={selectedAction} setOpen={setOpen} setSelectedAction={setSelectedAction}/>}

      <ul className={`items ${selectedAction ? 'row-reverse' : 'col-reverse'}`}>
        <li onClick={handleItemClick} style={{ margin: selectedAction ? "0px" : "4px" }}>
          {open ? (
            <img src={close} alt="close" width={60} height={60} />
          ) : (
            <img src={open1} alt="open1" width={60} height={60} />
          )}
        </li>

        {open &&
          actions.map((action, index) => (
            <li
              key={action.label}
              onClick={() => handleActionClick(action.label)}
              className={selectedAction === action.label ? 'selected' : ''}
            >
              <img
                src={action.icon}
                alt={action.label}
                width={60}
                height={60}
              />
              {!selectedAction && (
                <div className="tooltip">
                  <span>{action.label}</span>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FAB;
