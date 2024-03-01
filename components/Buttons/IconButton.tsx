import React from "react";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import ResetIcon from "@/components/Icons/ResetIcon";
import UserAddIcon from "@/components/Icons/UserAddIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import EraseIcon from "@/components/Icons/EraseIcon";
import ArchiveIcon from "@/components/Icons/ArchiveIcon";
import AddIcon from "@/components/Icons/AddIcon";
import FilterIcon from "@/components/Icons/FilterIcon";
import SortAlphabetIcon from "@/components/Icons/SortAlphabetIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";

type Size = "normal" | "small" | "responsive";
type Color = "primary" | "red" | "orange";
type Icon =
  | "arrow-up"
  | "arrow-right"
  | "arrow-down"
  | "arrow-left"
  | "reset"
  | "user-add"
  | "close"
  | "delete"
  | "erase"
  | "archive"
  | "add"
  | "filter"
  | "alphabet-ascending"
  | "alphabet-descending"
  | "settings";
type Variant = "filled" | "icon";

interface IconButtonProps {
  /** Attach a function for the component to trigger. */
  toggle: () => void;
  /** Defines a string value that labels the current element. */
  label: string;
  /** Supported sizes: small, normal, responsive. */
  size: Size;
  /** Supported: primary, red, orange. */
  color: Color;
  /** Defines which icon to display. */
  icon: Icon;
  /** Normal: icon with border and background. Icon: icon with no border or background. */
  variant: Variant;
  /** Attach optional styling if needed. */
  className: string;
  /** Define the id of the element, the button controls. */
  controls: string;
  /** Define if the button should be disabled. */
  disabled: boolean;
  /** Define if the button should have a tooltip - value will be the label. */
  toolTip: boolean;
}

const sizes = (size: Size): { button: string; icon: string } => {
  switch (size) {
    case "normal":
      return { button: "h-10 w-10", icon: "h-5 w-5" };
    case "small":
      return { button: "h-8 w-8", icon: "h-4 w-4" };
    case "responsive":
      return {
        button: "h-8 w-8 lg:h-10 lg:w-10",
        icon: "h-4 w-4 lg:h-5 lg:w-5",
      };
    default:
      return { button: "", icon: "" };
  }
};

const colors = (color: Color): string => {
  switch (color) {
    case "primary":
    case "red":
    case "orange":
      return `hover:fill-dark-100 focus-visible:fill-dark-100 focus-visible:border-${color} focus-visible:bg-${color} hover:border-${color} hover:bg-${color}`;
    default:
      return "hover:fill-dark-100 focus-visible:fill-dark-100 focus-visible:border-primary focus-visible:bg-primary hover:border-primary hover:bg-primary";
  }
};

const icons = (icon: Icon, size: Size): JSX.Element | null => {
  const sizeClasses = sizes(size);
  switch (icon) {
    case "arrow-up":
    case "arrow-right":
    case "arrow-down":
    case "arrow-left":
      return (
        <ArrowIcon variant={icon.split("-")[1]} className={sizeClasses.icon} />
      );
    case "alphabet-ascending":
    case "alphabet-descending":
      return (
        <SortAlphabetIcon
          variant={icon.split("-")[1]}
          className={sizeClasses.icon}
        />
      );
    case "reset":
      return <ResetIcon className={sizeClasses.icon} />;
    case "user-add":
      return <UserAddIcon className={sizeClasses.icon} />;
    case "close":
      return <CloseIcon className={sizeClasses.icon} />;
    case "delete":
      return <DeleteIcon className={sizeClasses.icon} />;
    case "erase":
      return <EraseIcon className={sizeClasses.icon} />;
    case "archive":
      return <ArchiveIcon className={sizeClasses.icon} />;
    case "add":
      return <AddIcon className={sizeClasses.icon} />;
    case "filter":
      return <FilterIcon className={sizeClasses.icon} />;
    case "settings":
      return <SettingsIcon className={sizeClasses.icon} />;
    default:
      return null;
  }
};

const variants = (variant: Variant): string => {
  switch (variant) {
    case "filled":
      return "border-dark-500 bg-dark-100";
    case "icon":
      return "border-transparent";
    default:
      return "";
  }
};

const IconButton: React.FC<IconButtonProps> = ({
  toggle = () => {},
  label = "",
  size = "normal",
  color = "primary",
  icon = "arrow-up",
  variant = "filled",
  className = "",
  controls = "",
  disabled = false,
  toolTip = false,
}) => {
  const sizeValue = sizes(size);
  const colorValue = variant !== "icon" ? colors(color) : "";
  const iconValue = icons(icon, size);
  const variantValue = variants(variant);

  return (
    <button
      {...(controls ? { "aria-controls": controls } : {})}
      onClick={toggle}
      {...(label ? { "aria-label": label } : {})}
      {...(toolTip ? { title: label } : {})}
      {...(disabled ? { disabled: true } : {})}
      className={`flex items-center justify-center rounded border-2 outline-0 transition-300 ${colorValue} ${
        sizeValue.button
      } ${variantValue} ${
        disabled ? "fill-dark-500" : "fill-grey"
      } ${className}`}
    >
      {iconValue}
    </button>
  );
};

export default IconButton;
