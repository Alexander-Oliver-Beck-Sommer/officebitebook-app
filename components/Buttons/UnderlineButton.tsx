import React from "react";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import QuestionIcon from "@/components/Icons/QuestionIcon";

type Icons = "arrow-up" | "arrow-right" | "arrow-down" | "arrow-left";
type Direction = "left" | "right";

interface UnderlineButtonProps {
  /** Select what icons should be displayed in. */
  icon: Icons;
  /** What direction the icon should be in - left & right. */
  direction: Direction;
  /** The label for the button */
  label: string;
  /** Provide optional styling for the text inside the button, if needed. */
  className: string;
  /** Attach functionality to the button. */
  toggle: () => void;
  /** Define if the button should have a tooltip - value will be the label. */
  toolTip: boolean;
  /** Define the text that should be shown inside the button. */
  text: string;
  /** Define if the button should have an icon. */
  showIcon?: boolean;
}

const icons = (icon: Icons | string): JSX.Element | null => {
  switch (icon) {
    case "arrow-up":
    case "arrow-right":
    case "arrow-down":
    case "arrow-left":
      return <ArrowIcon variant={icon.split("-")[1]} />;
    default:
      return <QuestionIcon />;
  }
};

const UnderlineButton: React.FC<UnderlineButtonProps> = ({
  icon = "",
  direction = "left",
  label = "",
  className = "",
  toggle = () => {},
  toolTip = false,
  text = "",
  showIcon = false,
}) => {
  const iconValue = icons(icon);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      {...(toolTip && { title: label })}
      className={`group/underline-button transition-300 relative flex items-center gap-2 fill-grey text-grey outline-0 hover:fill-primary hover:text-white focus-visible:fill-primary focus-visible:text-white ${
        direction === "right" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <p className={className}>{text}</p>
      {showIcon && iconValue}
      <div className="transition-300 pointer-events-none absolute -bottom-1 h-0.5 w-0 rounded bg-grey opacity-0 group-hover/underline-button:w-full group-hover/underline-button:bg-primary group-hover/underline-button:opacity-100 group-focus-visible/underline-button:w-full group-focus-visible/underline-button:bg-primary group-focus-visible/underline-button:opacity-100"></div>
    </button>
  );
};

export default UnderlineButton;
