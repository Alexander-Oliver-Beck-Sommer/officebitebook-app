import React from "react";
import ArchiveIcon from "../Icons/ArchiveIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import GroupIcon from "../Icons/GroupIcon";
import StatisticsIcon from "../Icons/StatisticsIcon";
import FinancesIcon from "../Icons/FinancesIcon";
import FeedbackIcon from "../Icons/FeedbackIcon";
import CelebrationsIcon from "../Icons/CelebrationsIcon";
import NotificationIcon from "../Icons/NotificationIcon";
import RobotIcon from "../Icons/RobotIcon";
import QuestionIcon from "../Icons/QuestionIcon";

type Icon =
  | "archive"
  | "settings"
  | "group"
  | "statistics"
  | "finances"
  | "feedback"
  | "celebrations"
  | "notification"
  | "robot";

interface ModeButtonProps {
  /** Define the icon to display. */
  icon: Icon | string;
  /** Define the title of the grid item. */
  title: string;
  /** Define the description of the grid item. */
  description: string;
  /** Attach a function for the component to trigger. */
  toggle: () => void;
  /** Defines a string value that labels the current element. */
  label: string;
  /** Define if the button should be disabled. */
  disabled: boolean;
}

const icons = (icon: Icon | string): JSX.Element | null => {
  switch (icon) {
    case "archive":
      return <ArchiveIcon />;
    case "settings":
      return <SettingsIcon />;
    case "group":
      return <GroupIcon />;
    case "statistics":
      return <StatisticsIcon />;
    case "finances":
      return <FinancesIcon />;
    case "feedback":
      return <FeedbackIcon />;
    case "celebrations":
      return <CelebrationsIcon />;
    case "notification":
      return <NotificationIcon />;
    case "robot":
      return <RobotIcon />;
    default:
      return <QuestionIcon />;
  }
};

const ModeButton: React.FC<ModeButtonProps> = ({
  icon = "",
  title = "",
  description,
  toggle = () => {},
  label = "",
  disabled = false,
}) => {
  const iconValue = icons(icon);

  return (
    <li>
      <button
        {...(disabled && { disabled: true })}
        onClick={toggle}
        className={`group/mode-button grid grid-cols-autoX1 gap-4 outline-0 ${
          disabled ? "cursor-default" : "cursor-pointer"
        }`}
        aria-label={disabled ? "Disabled" : label}
        title={disabled ? "Disabled" : label}
      >
        <div
          className={`transition-300 flex h-12 w-12 items-center justify-center rounded border-2 bg-dark-100  ${
            disabled
              ? "border-dark-300 fill-dark-500"
              : "border-dark-500 fill-grey group-hover/mode-button:border-primary group-hover/mode-button:bg-primary group-hover/mode-button:fill-dark-100 group-focus-visible/mode-button:border-primary group-focus-visible/mode-button:bg-primary group-focus-visible/mode-button:fill-dark-100"
          }`}
        >
          {iconValue}
        </div>
        <div className="text-left">
          <h4
            className={`transition-300 ${
              disabled
                ? "text-dark-500"
                : "text-white group-hover/mode-button:text-primary group-focus-visible/mode-button:text-primary"
            }`}
          >
            {title}
          </h4>
          <p
            className={`transition-300 text-sm ${
              disabled
                ? "text-dark-500"
                : "text-grey group-hover/mode-button:text-white group-focus-visible/mode-button:text-white"
            }`}
          >
            {description}
          </p>
        </div>
      </button>
    </li>
  );
};

export default ModeButton;
