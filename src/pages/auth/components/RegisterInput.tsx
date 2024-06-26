import React from "react";
import { RegisterDTO } from "../../../interfaces/DTOS/auth/RegisterDTO";

interface Props {
  inputTitle: string;
  inputType: React.HTMLInputTypeAttribute | undefined;
  handleOnChange: (
    fieldName: keyof RegisterDTO
  ) => (changeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  inputNameValue: keyof RegisterDTO;
  isError: boolean;
  value: string;
  leftAddonIcon?: string;
  rightAddonIcon?: string;
}

function RegisterInput({
  inputTitle,
  inputType,
  handleOnChange,
  inputNameValue,
  leftAddonIcon,
  rightAddonIcon,
  isError,
  value
}: Props) {
  return (
    <div className={`mb-1`}>
      <label htmlFor={inputType} className="form-label">
        {inputTitle}
      </label>
      <div className="input-group">
        {leftAddonIcon ? (
          <span className="input-group-text" id="leftAddon">
            <i className={leftAddonIcon}></i>
          </span>
        ) : null}

        <input
          type={inputType}
          className={`form-control ${isError ? "is-invalid" : ""}`}
          id={inputNameValue}
          aria-describedby={inputNameValue}
          onChange={handleOnChange(inputNameValue)}
          value={value}
          style={{textTransform: inputNameValue === "Nombres" || inputNameValue === "Apellido1" || inputNameValue === "Apellido2" ? "capitalize" : "none" }}
        />
        {rightAddonIcon ? (
          <span className="input-group-text" id="rightAddon">
            <i className={rightAddonIcon}></i>
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default RegisterInput;
