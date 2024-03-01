import React, { useState, useEffect } from "react";

type ToggleInputProps = {
  initialValue?: boolean | null;
  onChange?: (value: boolean | null) => void;
};

const ToggleInput = ({
  label = "",
  onChange,
  initialValue = false,
  className = "",
}: ToggleInputProps) => {
  const [value, setValue] = useState<boolean | null>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleInputChange = () => {
    const newValue = value ? false : true;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
      <h5
        className={`${value ? " text-red" : "text-primary"}`}
        onClick={handleInputChange}
      >
        {value ? "Unpublished" : "Published"}
      </h5>
      <label
        className={`flex cursor-pointer select-none items-center ${className}`}
      >
        <div className="relative">
          <input
            onClick={handleInputChange}
            aria-label={label}
            type="checkbox"
            className="sr-only"
            readOnly
            checked={value === true}
          />
          <div
            className={`box block h-6 w-12 rounded-full border transition-all duration-300 ease-in-out ${
              value ? "border-red" : "border-primary"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
              value ? "bg-red" : "translate-x-6 bg-primary"
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default ToggleInput;
