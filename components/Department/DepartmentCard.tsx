import React from "react";
import { DepartmentProps } from "@/types/DepartmentProps";
import IconButton from "../Buttons/IconButton";
import Link from "next/link";

interface DepartmentCardProps {
  /** Department object. */
  department?: DepartmentProps;
  /** Function to toggle settings. */
  settingsToggle?: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department = null,
  settingsToggle = () => {},
}) => {
  const statusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-primary";
      case "offline":
        return "bg-red";
      case "paused":
        return "bg-orange";
      default:
        return "bg-grey";
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      case "paused":
        return "Paused";
      default:
        return "Unknown";
    }
  };

  return (
    <li className="flex animate-fade flex-col gap-3.5 rounded border-2 border-dark-500 bg-dark-100 p-5 animate-ease-in-out">
      <section className="flex flex-col gap-2">
        <div className="grid grid-cols-1Xauto items-center gap-2">
          <h4 className="truncate uppercase">{department?.name}</h4>
          <div className="flex h-5 w-5 items-center justify-center">
            <div
              aria-label={statusLabel(department?.status)}
              title={statusLabel(department?.status)}
              className={`h-2.5 w-2.5 rounded-full ${statusColor(
                department?.status,
              )}`}
            ></div>
          </div>
        </div>
        <p className="h-10 overflow-hidden overflow-ellipsis text-sm text-grey">
          {department?.description}
        </p>
      </section>
      <ul className="grid grid-cols-1Xauto items-center gap-3.5">
        <li>
          <Link
            href={`/department/${department?.department_id}`}
            title={`View ${department?.name}`}
            aria-label={`View ${department?.name}`}
            className="flex h-full items-center justify-center rounded border-2 border-dark-500 bg-dark-100 px-5 py-2.5 text-grey outline-0 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-dark-100 focus-visible:border-primary focus-visible:bg-primary focus-visible:text-dark-100"
          >
            <h5>View Department</h5>
          </Link>
        </li>
        <li>
          <IconButton
            toggle={settingsToggle}
            className="h-fit w-fit"
            icon="settings"
            color="primary"
            variant="icon"
            label={`Adjust personal settings for ${department?.name}`}
            toolTip={true}
          />
        </li>
      </ul>
    </li>
  );
};

export default DepartmentCard;
