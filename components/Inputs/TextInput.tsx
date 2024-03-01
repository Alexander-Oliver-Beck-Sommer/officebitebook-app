"use client";
import React, { useRef } from "react";
import TimeIcon from "@/components/Icons/TimeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import TextIcon from "@/components/Icons/TextIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import EmailIcon from "@/components/Icons/EmailIcon";
import KeyIcon from "@/components/Icons/KeyIcon";
import LinkIcon from "../Icons/LinkIcon";

const variants = (variant: string) => {
  switch (variant) {
    case "text":
      return <TextIcon />;
    case "date":
      return <CalendarIcon />;
    case "time":
      return <TimeIcon />;
    case "location":
      return <LocationIcon />;
    case "tel":
      return <PhoneIcon />;
    case "email":
      return <EmailIcon />;
    case "password":
      return <KeyIcon />;
    case "link":
      return <LinkIcon />;
    default:
      return null;
  }
};

type TextInputProps = {
  variant?: string;
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  valid?: boolean;
  required?: boolean;
  valueChange: (value: string) => void;
  disabled?: boolean;
};

const TextInput = ({
  variant = "",
  label = "",
  value = "",
  name = "",
  placeholder = "",
  valid,
  required,
  valueChange = () => {},
  disabled = false,
}: TextInputProps) => {
  const inputField = useRef<HTMLInputElement>(null);

  const inputDisabled = disabled ? "text-dark-500" : "";

  const buttonDisabled = disabled ? "fill-dark-500" : "fill-grey";

  const borderDisabled = disabled ? "border-dark-400" : "";

  const invalidText = valid ? "text-red" : "";

  const invalidBorder = valid ? "border-red" : "";

  const invalidPlaceholder = valid ? "placeholder:text-red" : "";

  const invalidIcon = valid ? "fill-red" : "";

  const [isFocused, setIsFocused] = React.useState(false);

  const textInputIcon = variants(variant);

  // This is functionality is to remove the seconds from the time input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let timeValue = event.target.value;
    if (variant === "time") {
      timeValue = timeValue.substring(0, 5);
    }
    valueChange(timeValue);
  };

  const textInputIconClick = () => {
    inputField.current?.focus();
  };

  const textInputFocus = () => {
    setIsFocused(true);
  };

  const textInputBlur = () => {
    setIsFocused(false);
  };

  const labelFocus = `${isFocused ? "scale-75" : "scale-100"}`;

  return (
    <section className="relative flex flex-col gap-2 md:gap-4">
      <label htmlFor={name} className="w-fit">
        <p
          className={`text_white origin-bottom-left text-sm text-grey transition-all duration-300 ease-in-out md:text-base ${labelFocus} ${invalidText}`}
        >
          {name}
        </p>
      </label>
      <div
        className={`relative w-full overflow-hidden rounded border-2 border-dark-500 transition-all duration-300 ease-in-out ${invalidBorder} ${borderDisabled} `}
      >
        <input
          ref={inputField}
          type={variant}
          placeholder={placeholder}
          className={`text_white placeholder:text-test_grey w-full bg-dark-100 p-2.5 placeholder-opacity-100 outline-0 transition-all duration-300 ease-in-out md:p-4 ${invalidPlaceholder} ${invalidText} ${inputDisabled} placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus-visible:placeholder:opacity-0`}
          id={name}
          name={name}
          onBlur={textInputBlur}
          onFocus={textInputFocus}
          aria-label={label}
          onChange={handleChange}
          value={value}
          required={required}
          {...(disabled ? { disabled: true } : {})}
        />
      </div>
    </section>
  );
};

export default TextInput;
