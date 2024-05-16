import React from "react";
import { RegisterDTO } from "../../../interfaces/DTOS/RegisterDTO";

interface Props {
  inputTitle: string;
  inputType: React.HTMLInputTypeAttribute | undefined;
  handleOnChange: (
    fieldName: keyof RegisterDTO
  ) => (changeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  inputNameValue: keyof RegisterDTO;
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
}: Props) {
  return (
    <>
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
          className="form-control"
          id={inputType}
          aria-describedby={inputType}
          onChange={handleOnChange(inputNameValue)}
        />
        {rightAddonIcon ? (
          <span className="input-group-text" id="rightAddon">
            <i className={rightAddonIcon}></i>
          </span>
        ) : null}
      </div>
    </>
  );
}

export default RegisterInput;
