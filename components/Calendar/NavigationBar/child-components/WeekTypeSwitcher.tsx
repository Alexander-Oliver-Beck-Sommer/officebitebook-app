import { useState } from "react";
import CalendarIcon from "@/components/Icons/CalendarIcon";

type WeekTypeSwitcherProps = {
  weekTypeSwitcherToggle: () => void;
};

const WeekTypeSwitcher = ({
  weekTypeSwitcherToggle = () => {},
}: WeekTypeSwitcherProps) => {
  const [type, setWeekType] = useState(false);
  const fullWeek = type ? "fill-white" : "fill-dark-500";
  const workWeek = type ? "fill-dark-500" : "fill-white";

  const weekTypeChange = () => {
    setWeekType(!type);
    weekTypeSwitcherToggle();
  };

  return (
    <button
      aria-label={
        type ? "Switch to work week view" : "Switch to full week view"
      }
      title={type ? "Switch to work week view" : "Switch to full week view"}
      onClick={weekTypeChange}
      aria-pressed={type}
      className="flex items-center gap-3"
    >
      <CalendarIcon
        className={`transition-all duration-300 ease-in-out ${workWeek}`}
      />
      <CalendarIcon
        variant="fullWeek"
        className={`transition-all duration-300 ease-in-out ${fullWeek}`}
      />
    </button>
  );
};

export default WeekTypeSwitcher;
