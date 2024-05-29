import React, { useState } from "react";
import attach from  "../assets/Attach.svg";
import close from  "../assets/close.svg";

export default function Textarea({ label, placeholder, required = true, value, onChange, fileValue, onFileChange }) {

   const handleTextChange = (event) => {
      onChange(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (onFileChange) {
      onFileChange(selectedFile);
    }
  }
  const removeFile = () => {
    onFileChange(null);
  };

  return (
    <div className="issue">
      {label && (
        <label htmlFor="issueText" className="label">
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <div className="attach">
        <textarea
          id="issueText"
          className="text"
          placeholder={placeholder}
          value={value}
          onChange={handleTextChange}
          required={required}
        />
        {required && (
          <div className="file">
            <button className="attachbutton" onClick={() => document.querySelector('input[type="file"]').click()}>
              <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
              <img src={attach} alt="attach" />
              <span>Attach</span>
            </button>
            {fileValue && (
              <div className="file-preview">
                <img src={URL.createObjectURL(fileValue)} alt="file preview" className="file-preview-img" />
                <img src={close} alt="close" className="remove-button" onClick={removeFile} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
