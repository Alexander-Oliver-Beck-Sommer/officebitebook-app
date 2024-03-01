import React from "react";

interface HourProps {
  /** The date of the hour */
  date?: string;
  /** The full hour */
  full?: string;
  /** The function to toggle the full hour */
  fullToggle?: () => void;
  /** The half hour */
  half?: string;
  /** The function to toggle the half hour */
  halfToggle?: () => void;
  /** The lock status of the day */
  locked?: boolean;
}

const Hour: React.FC<HourProps> = ({
  date,
  full,
  fullToggle = () => {},
  half,
  halfToggle = () => {},
  locked = false,
}) => {
  return (
    <>
      <button
        value={full}
        data-date={date}
        data-locked={locked}
        aria-label={`Create a menu at ${full}`}
        title={`Create a menu at ${full}`}
        onClick={fullToggle}
        className="h-10 cursor-default border-b border-dashed border-dark-500 outline-0 transition duration-300 ease-in-out hover:bg-dark-500 focus-visible:bg-dark-500"
      ></button>
      <button
        value={half}
        data-date={date}
        data-locked={locked}
        aria-label={`Create a menu at ${half}`}
        title={`Create a menu at ${half}`}
        onClick={halfToggle}
        className="h-10 cursor-default border-b border-dark-500 outline-0 transition duration-300 ease-in-out hover:bg-dark-500 focus-visible:bg-dark-500"
      ></button>
    </>
  );
};

export default Hour;
