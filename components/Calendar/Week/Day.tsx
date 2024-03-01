import React from "react";
import ToggleInput from "@/components/Inputs/ToggleInput";
import LockIcon from "@/components/Icons/LockIcon";
import CelebrationsIcon from "@/components/Icons/CelebrationsIcon";
import { UserProps } from "@/types/UserProps";

interface DayProps {
  /** Date of the day */
  date: number;
  /** Day of the week */
  day: string;
  /** Boolean to check if the day is the current day */
  currentDate: boolean;
  /** Locked boolean - FALSE = LOCKED | TRUE = UNLOCKED */
  locked: boolean;
  /** Function to toggle the lock of the day */
  lockToggle: () => void;
  /** Published boolean - FALSE = UNPUBLISHED | TRUE = PUBLISHED */
  published: boolean;
  /** Function to toggle the published state of the day */
  publishToggle: () => void;
  /** Boolean that controls whether to show the celebrations' button or not. */
  showCelebrations: boolean;
  /** Attach functionality on the celebrations' button. */
  celebrationsToggle: () => void;
  /** Array of celebrations for the day */
  celebrations: UserProps[];
}

const Day: React.FC<DayProps> = ({
  date = 0,
  day = "",
  currentDate = false,
  locked = false,
  lockToggle = () => {},
  published = false,
  publishToggle = () => {},
  showCelebrations = true,
  celebrationsToggle = () => {},
  celebrations = [],
}) => {
  return (
    <section className="bg-dark-300">
      <div
        className={`flex h-12 items-center justify-between border-t-2 px-3 transition-all duration-300 ease-in-out  ${
          currentDate
            ? published
              ? "border-red"
              : "border-primary"
            : "border-transparent"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <h3 className="font-semibold">{date}</h3>
          <p className="text-sm text-grey">{day}</p>
        </div>
        <div className="flex items-center gap-3">
          {celebrations.length > 0 && (
            <button
              aria-label="Someone is celebrating today! 🎉"
              onClick={celebrationsToggle}
              className="group relative h-6 w-6"
            >
              🎂
              <div className="invisible absolute -top-full right-0 z-50 opacity-0 shadow-lg shadow-dark-100 transition duration-300 group-hover:visible group-hover:-translate-y-3/4 group-hover:opacity-100">
                <ul className="max-h-20 w-80 overflow-y-auto rounded border-2 border-dark-500 bg-dark-100">
                  {celebrations.map((celebration, index) => (
                    <li
                      key={celebration.user_id}
                      className="grid h-10 grid-cols-1Xauto items-center gap-2 px-4 text-left even:bg-dark-300"
                    >
                      <p className="truncate text-sm text-grey">
                        {celebration.user_name}
                      </p>
                      <h5 className="">{index + 1}</h5>
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          )}
          <button
            onClick={lockToggle}
            aria-label={locked ? "Locked" : "Unlocked"}
            title={locked ? "Locked" : "Unlocked"}
          >
            <LockIcon
              className={`transition-all duration-300 ease-in-out ${
                locked ? "fill-red" : "fill-primary"
              }`}
              variant={locked ? "locked" : "unlocked"}
            />
          </button>
        </div>
      </div>
      <div
        className={`flex h-12 items-center justify-between border-b border-t border-t-dark-500 px-3 transition-all duration-300 ease-in-out ${
          published ? "border-b-dark-500" : "border-b-transparent"
        }`}
      >
        <ToggleInput
          label={published ? "Published" : "Unpublished"}
          onChange={publishToggle}
          initialValue={published}
        />
      </div>
    </section>
  );
};

export default Day;
