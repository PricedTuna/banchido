import React from 'react'
import { EditProfileForm } from '../../../interfaces/DTOS/actions/editProfile/EditProfileForm';

interface Props {
  inputTitle: string;
  inputType: React.HTMLInputTypeAttribute | undefined;
  handleOnChange: (fieldName: keyof EditProfileForm) => (changeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  inputNameValue: keyof EditProfileForm;
  isError: boolean;
  value: string;
  leftAddonIcon?: string;
  rightAddonIcon?: string;
}

function EditProfileInput({
  inputTitle,
  inputType,
  handleOnChange,
  inputNameValue,
  leftAddonIcon,
  rightAddonIcon,
  isError,
  value,
}: Props) {
  return (
    <>
      <label htmlFor={inputNameValue} className="form-label">
        {inputTitle}
      </label>
      <div className="input-group mb-3">
      {
          leftAddonIcon ? 
          (<span className="input-group-text" id="leftAddon">
            <i className={leftAddonIcon}></i>
          </span>) : null
        }

        <input
          type={inputType}
          className={`form-control ${isError ? "is-invalid" : ""}`}
          id={inputNameValue}
          aria-describedby={inputNameValue}
          onChange={handleOnChange(inputNameValue)}
          value={value}
        />
        {
          rightAddonIcon ? 
          (<span className="input-group-text" id="rightAddon">
            <i className={rightAddonIcon}></i>
          </span>) : null
        }
      </div>
    </>
  );
}

export default EditProfileInput
