import { SendLoginDTO } from "../../../interfaces/DTOS/auth/login/LoginDTO";

interface Props {
  inputTitle: string;
  inputType: React.HTMLInputTypeAttribute | undefined;
  handleOnChange: (
    fieldName: keyof SendLoginDTO
  ) => (changeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  inputNameValue: keyof SendLoginDTO;
  isError: boolean;
  leftAddonIcon?: string;
  rightAddonIcon?: string;
}

function LoginInput({
  inputTitle,
  inputType,
  handleOnChange,
  inputNameValue,
  leftAddonIcon,
  rightAddonIcon,
  isError,
}: Props) {
  return (
    <>
      <label htmlFor={inputType} className="form-label fs-5">
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
          id={inputType}
          aria-describedby={inputType}
          onChange={handleOnChange(inputNameValue)}
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

export default LoginInput;
