import { rstForm } from "../../../interfaces/DTOS/actions/rst/rstForm";

interface Props {
  inputTitle: string;
  inputType: React.HTMLInputTypeAttribute | undefined;
  handleOnChange: (fieldName: keyof rstForm) => (changeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  inputNameValue: keyof rstForm;
  leftAddonIcon?: string;
  rightAddonIcon?: string;
}

function RSTInput({
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
      <div className="input-group mb-3">
      {
          leftAddonIcon ? 
          (<span className="input-group-text" id="leftAddon">
            <i className={leftAddonIcon}></i>
          </span>) : null
        }

        <input
          type={inputType}
          className="form-control"
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
  )
}

export default RSTInput
