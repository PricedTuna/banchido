import { transferFormInterface } from "../actionsPages/TransferenciaActPage";

interface Props {
  inputTitle: string;
  inputType: React.HTMLInputTypeAttribute | undefined;
  handleOnChange: (fieldName: keyof transferFormInterface) => (changeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  inputNameValue: keyof transferFormInterface;
  leftAddonIcon?: string;
  rightAddonIcon?: string;
}

function ActionInput({
  inputTitle,
  inputType,
  handleOnChange,
  inputNameValue,
  leftAddonIcon,
  rightAddonIcon,
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
          className="form-control"
          id={inputNameValue}
          aria-describedby={inputNameValue}
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

export default ActionInput
