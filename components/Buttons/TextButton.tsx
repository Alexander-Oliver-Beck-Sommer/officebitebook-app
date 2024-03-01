import React from "react";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import QuestionIcon from "@/components/Icons/QuestionIcon";

type Icon =
  | "save"
  | "close"
  | "arrow-up"
  | "arrow-right"
  | "arrow-down"
  | "arrow-left"
  | "upload"
  | "question";
type Color = "primary" | "red" | "orange";
type Type = "button" | "submit" | "reset";

interface TextButtonProps {
  /** Declare styling for the component if necessary */
  className: string;
  /** Declare a string that will serve as text inside the button. */
  text: string;
  /** Defines a string value that labels the current element. */
  label: string;
  /** Defines which icon to display. */
  icon: Icon;
  /** Supported: primary, red, orange. */
  color: Color;
  /** Define if the button should be disabled. */
  disabled: boolean;
  /** Attach functionality to the button. */
  toggle: () => void;
  /** Define the type of button. */
  type: Type;
  /** Define if the button should have a tooltip - value will be the label. */
  toolTip: boolean;
}

const icons = (icon: Icon): JSX.Element | null => {
  switch (icon) {
    case "arrow-up":
    case "arrow-right":
    case "arrow-down":
    case "arrow-left":
      return <ArrowIcon variant={icon.split("-")[1]} />;
    case "save":
      return <SaveIcon />;
    case "close":
      return <CloseIcon />;
    case "upload":
      return <UploadIcon />;
    case "question":
      return <QuestionIcon />;
    default:
      return null;
  }
};

const colors = (color: Color): string => {
  switch (color) {
    case "primary":
    case "red":
    case "orange":
      return `focus-visible:border-${color} focus-visible:bg-${color} hover:border-${color} hover:bg-${color}`;
    default:
      return "focus-visible:border-primary focus-visible:bg-primary hover:border-primary hover:bg-primary";
  }
};

const TextButton: React.FC<TextButtonProps> = ({
  className = "",
  text = "",
  label = "",
  icon = "question",
  color = "primary",
  disabled = false,
  toggle = () => {},
  type = "button",
  toolTip = false,
}) => {
  const colorValue = colors(color);
  const iconValue = icons(icon);

  return (
    <button
      onClick={toggle}
      type={type}
      aria-label={label}
      {...(toolTip ? { title: label } : {})}
      {...(disabled ? { disabled: true } : {})}
      className={`flex items-center justify-center gap-1.5 rounded border-2 border-dark-500 bg-dark-100 px-4 py-2 outline-0 transition-300 hover:fill-dark-100 hover:text-dark-100 focus-visible:fill-dark-100 focus-visible:text-dark-100 ${colorValue} ${
        disabled ? "fill-dark-500 text-dark-500" : "fill-grey text-grey"
      } ${className}`}
    >
      <h4>{text}</h4>
      {iconValue}
    </button>
  );
};

export default TextButton;
