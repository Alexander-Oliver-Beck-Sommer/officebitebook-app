// Needs a rework.
import React, { useState, useEffect } from "react";
import CheckIcon from "../Icons/CheckIcon";
import CloseIcon from "../Icons/CloseIcon";
import LockIcon from "../Icons/LockIcon";

interface CheckboxTwoProps {
  /** Define if the checkbox should be checked by default. */
  initialValue?: boolean;
  /** Define a string value that labels the current element. */
  label?: string;
  /** Attach functionality to the checkbox. */
  onChange?: (value: boolean) => void;
  /** Define if the checkbox should be disabled. */
  disabled?: boolean;
}

const CheckboxTwo: React.FC<CheckboxTwoProps> = ({
  initialValue = false,
  label,
  onChange,
  disabled = false,
}) => {
  const [value, setValue] = useState<boolean | null>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleInputChange = () => {
    if (disabled) return;

    const newChecked = !value;
    setValue(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  const checkboxStyles = () => {
    if (disabled) {
      return "border-dark-500 fill-grey";
    } else if (value) {
      return "border-primary fill-primary";
    }
    return "border-dark-500 fill-grey";
  };

  const checkboxIcons = () => {
    if (disabled) {
      return <LockIcon />;
    } else if (value) {
      return <CheckIcon />;
    }
    return <CloseIcon />;
  };

  return (
    <div className="relative h-8 w-8 overflow-hidden">
      <input
        className="group opacity-0"
        aria-label={label}
        type="checkbox"
        checked={value}
        onChange={handleInputChange}
        readOnly
        {...(disabled && { disabled: true })}
      />
      <label
        className={`absolute inset-0 flex cursor-pointer items-center justify-center rounded border-2 bg-dark-100 p-1 outline-primary transition-all duration-300 ease-in-out group-focus:outline ${checkboxStyles()}`}
        onClick={handleInputChange}
      >
        {checkboxIcons()}
      </label>
    </div>
  );
};

export default CheckboxTwo;
