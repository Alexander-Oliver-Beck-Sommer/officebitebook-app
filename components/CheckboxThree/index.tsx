// Needs a rework.
import React, { useState, useEffect } from "react";
import CheckIcon from "../Icons/CheckIcon";
import CloseIcon from "../Icons/CloseIcon";
import QuestionIcon from "../Icons/QuestionIcon";
import LockIcon from "../Icons/LockIcon";

type CheckboxThreeProps = {
  initialValue?: boolean | null;
  label?: string;
  onChange?: (value: boolean | null) => void;
  disabled?: boolean;
};

const CheckboxThree = ({
  initialValue = null,
  label = "",
  onChange,
  disabled = false, // Default value for disabled
}: CheckboxThreeProps) => {
  const [value, setValue] = useState<boolean | null>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleInputChange = () => {
    // Prevent any change if the component is disabled
    if (disabled) return;

    const newValue = value === null ? true : value === true ? false : null;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const checkboxStyles = () => {
    if (disabled) {
      return "border-dark-500 fill-grey"; // Adjusted styles for disabled state
    } else if (value === true) {
      return "border-primary fill-primary";
    } else if (value === false) {
      return "border-red fill-red";
    }
    return "border-orange fill-orange";
  };

  const checkboxIcons = disabled ? (
    <LockIcon />
  ) : value === true ? (
    <CheckIcon />
  ) : value === false ? (
    <CloseIcon />
  ) : (
    <QuestionIcon />
  );

  return (
    <div className="relative h-8 w-8 overflow-hidden">
      <input
        className="group absolute opacity-0"
        aria-label={label}
        type="checkbox"
        checked={value === true}
        readOnly
        disabled={disabled} // Disable input when component is disabled
      />
      <label
        className={`absolute inset-0 flex cursor-pointer items-center justify-center rounded border-2 bg-dark-100 p-1 outline-primary transition-all duration-300 ease-in-out group-focus:outline ${checkboxStyles()}`}
        onClick={handleInputChange}
        tabIndex={disabled ? -1 : 0} // Prevent focusing when disabled
        onKeyPress={(e) => {
          if (!disabled && (e.key === " " || e.key === "Enter")) {
            handleInputChange();
          }
        }}
      >
        {checkboxIcons}
      </label>
    </div>
  );
};

export default CheckboxThree;
