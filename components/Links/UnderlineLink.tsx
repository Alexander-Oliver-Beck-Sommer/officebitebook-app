import React from "react";
import Link from "next/link";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import QuestionIcon from "@/components/Icons/QuestionIcon";
import ProfileIcon from "../Icons/ProfileIcon";
import LogIcon from "../icons/LogIcon";
import OfficeIcon from "../Icons/OfficeIcon";

type Icons =
  | "arrow-up"
  | "arrow-right"
  | "arrow-down"
  | "arrow-left"
  | "question"
  | "profile"
  | "login"
  | "logout"
  | "office";
type Direction = "left" | "right";

type Variants = "underline-link" | "hamburger-link";

interface UnderlineLinkProps {
  /** Select what icons should be displayed in. */
  icon: Icons;
  /** What direction the icon should be in - left & right. */
  direction: Direction;
  /** The label for the button */
  label: string;
  /** Provide optional styling for the text inside the button, if needed. */
  className: string;
  /** Define if the button should have a tooltip - value will be the label. */
  toolTip: boolean;
  /** Define the text that should be shown inside the button. */
  text: string;
  /** Define if the button should have an icon. */
  showIcon: boolean;
  /** Attach a path for the link */
  path: string;
  /** Define what variant the link should be displayed in. */
  variant: Variants;
  /** Functionality for when a link is clicked. */
  toggle: () => void;
}

const variants = (variant: Variants): string => {
  switch (variant) {
    case "underline-link":
      return " relative flex items-center gap-2 outline-0 ";
    case "hamburger-link":
      return "flex w-full items-center justify-between p-4 md:px-12 border-b-2 border-dark-400";
    default:
      return "group/underline-link transition-300 relative flex items-center gap-2 outline-0";
  }
};

const icons = (icon: Icons | string): JSX.Element | null => {
  switch (icon) {
    case "arrow-up":
    case "arrow-right":
    case "arrow-down":
    case "arrow-left":
      return <ArrowIcon variant={icon.split("-")[1]} />;
    case "question":
      return <QuestionIcon />;
    case "profile":
      return <ProfileIcon />;
    case "login":
    case "logout":
      return <LogIcon variant={icon} />;
    case "office":
      return <OfficeIcon />;
    default:
      return <QuestionIcon />;
  }
};

const UnderlineLink: React.FC<UnderlineLinkProps> = ({
  icon = "",
  direction = "left",
  label = "",
  className = "",
  toolTip = false,
  text = "",
  showIcon = false,
  path = "/",
  variant = "underline-link",
  toggle = () => {},
}) => {
  const iconValue = icons(icon);
  const variantValue = variants(variant);

  return (
    <Link
      onClick={toggle}
      href={path}
      aria-label={label}
      {...(toolTip && { title: label })}
      className={`group/underline-link transition-300 fill-grey text-grey hover:border-primary hover:fill-primary hover:text-white focus-visible:border-primary focus-visible:fill-primary focus-visible:text-white ${variantValue} ${
        direction === "right" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <p className={className}>{text}</p>
      {showIcon && iconValue}
      <div className="transition-300 pointer-events-none absolute -bottom-1.5 h-0.5 w-0 rounded bg-grey opacity-0 group-hover/underline-link:w-full group-hover/underline-link:bg-primary group-hover/underline-link:opacity-100 group-focus-visible/underline-link:w-full group-focus-visible/underline-link:bg-primary group-focus-visible/underline-link:opacity-100"></div>
    </Link>
  );
};

export default UnderlineLink;
