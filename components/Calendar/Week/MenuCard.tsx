import React from "react";
import LockIcon from "@/components/Icons/LockIcon";

interface MenuCardProps {
  /** Provide a title for the card. */
  title?: string;
  /** Provide a location for the card. */
  location?: string;
  /** Provide calculated height & top. */
  positioning?: string;
  /** Provide the number of accepted participants. */
  accepted?: number;
  /** Provide the number of unanswered participants. */
  unanswered?: number;
  /** Provide the number of declined participants. */
  declined?: number;
  /** Provide functionality for the card - used to open menus. */
  toggle?: () => void;
  /** Provide a disabled state for the card. */
  disabled?: boolean;
  /** Provide a locked state for the card. */
  locked?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  location,
  positioning,
  accepted = 0,
  unanswered = 0,
  declined = 0,
  toggle = () => {},
  disabled = false,
  locked = false,
}) => {
  return (
    <button
      className="group/card-button absolute w-full animate-fade p-1 pl-2 animate-ease-in-out"
      style={positioning}
      aria-label={`Inspect ${title}`}
      title={`Inspect ${title}`}
      onClick={toggle}
    >
      <section
        className={`grid h-full w-full grid-cols-1Xauto gap-5 rounded-br rounded-tr border-l-4 bg-dark-100 p-2.5 transition-all duration-300 ease-in-out group-hover/card-button:bg-dark-300 group-focus-visible/card-button:bg-dark-300
       ${disabled ? "border-red" : "border-primary"}
      `}
      >
        <div className="flex flex-col items-start justify-between overflow-hidden">
          <div className="flex items-center gap-1">
            <LockIcon
              variant={locked ? "locked" : "unlocked"}
              className={`h-4 w-4 ${locked ? "fill-red" : "fill-primary"}`}
            />
            <h5 className="truncate">{title}</h5>
          </div>
          <h6 className="truncate text-grey">{location}</h6>
        </div>
        <div className="flex flex-col justify-end">
          <ul
            className="flex flex-col gap-1.5"
            aria-label="Participants Statistics"
          >
            <li
              className="grid grid-cols-2 items-center gap-1.5"
              aria-label="Number of accepted participants"
            >
              <h6>{accepted}</h6>
              <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
            </li>
            <li
              className="grid grid-cols-2 items-center gap-1.5"
              aria-label="Number of unanswered participants"
            >
              <h6>{unanswered}</h6>
              <span className="h-2.5 w-2.5 rounded-full bg-orange"></span>
            </li>
            <li
              className="grid grid-cols-2 items-center gap-1.5"
              aria-label="Number of declined participants"
            >
              <h6>{declined}</h6>
              <span className="h-2.5 w-2.5 rounded-full bg-red"></span>
            </li>
          </ul>
        </div>
      </section>
    </button>
  );
};

export default MenuCard;
