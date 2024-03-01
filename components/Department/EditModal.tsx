import React from "react";
import Link from "next/link";

interface EditModalProps {
  /** Id of the department. */
  departmentId: string;
  /** The name of the department. */
  name?: string;
  /** The description of the department. */
  description?: string;
  /** The status of the department. */
  status?: string;
  /** The amount of users in the department. */
  usersAmount?: number;
  /** Name of the owner of the department. */
  ownerName?: string;
  /** Function to leave the specific department. */
  leaveToggle?: () => void;
  ownerId?: string;
  userId?: string;
}

const EditModal: React.FC<EditModalProps> = ({
  departmentId,
  name,
  description,
  status,
  usersAmount = 0,
  ownerName,
  leaveToggle,
  ownerId,
  userId,
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
    <section className="flex flex-1 flex-col gap-5 overflow-y-auto p-5 md:px-10">
      <ul className="flex grid-cols-2 flex-col gap-2.5 md:grid md:gap-5">
        <li className="grid grid-cols-20X80 items-center gap-2.5">
          <h5 className="md:text-base">Name:</h5>
          <p className="truncate text-sm text-grey md:text-base">{name}</p>
        </li>
        <li className="grid grid-cols-20X80 items-center gap-2.5">
          <h5 className="md:text-base">Status:</h5>
          <div className="flex items-center gap-1.5">
            <p className="text-sm capitalize text-grey md:text-base">
              {status}
            </p>
            <div
              aria-label={statusLabel(status)}
              title={statusLabel(status)}
              className={`h-2.5 w-2.5 rounded-full md:h-3 md:w-3 ${statusColor(
                status,
              )}`}
            ></div>
          </div>
        </li>
        <li className="grid grid-cols-20X80 items-center gap-2.5">
          <h5 className="md:text-base">Owner:</h5>
          <p className="truncate text-sm text-grey md:text-base">{ownerName}</p>
        </li>
        <li className="grid grid-cols-20X80 items-center gap-2.5">
          <h5 className="md:text-base">Users:</h5>
          <p className="truncate text-sm text-grey md:text-base">
            {usersAmount} Users
          </p>
        </li>
      </ul>
      <div className="h-0.5 rounded-full bg-dark-400"></div>
      <div className="flex flex-col gap-1.5">
        <h5 className="md:text-base">Description:</h5>
        <p className="text-sm text-grey md:text-base">{description}</p>
      </div>
      <ul className="flex flex-1 grid-cols-2 flex-col justify-end gap-5 md:grid md:items-end">
        {ownerId === userId ? (
          <li>
            <Link
              href={`/admin/${departmentId}`}
              title={`Administrate ${name}`}
              aria-label={`Administrate ${name}`}
              className="flex w-full items-center justify-center rounded border-2 border-dark-500 bg-dark-100 px-5 py-3 text-grey outline-0 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-dark-100 focus-visible:border-primary focus-visible:bg-primary focus-visible:text-dark-100"
            >
              <h4>Admin Dashboard</h4>
            </Link>
          </li>
        ) : (
          <li>
            <button
              onClick={() => leaveToggle(departmentId)}
              title={`Leave ${name}`}
              aria-label={`Leave ${name}`}
              className="flex w-full items-center justify-center rounded border-2 border-dark-500 bg-dark-100 px-5 py-3 text-grey outline-0 transition-all duration-300 ease-in-out hover:border-red hover:bg-red hover:text-dark-100 focus-visible:border-red focus-visible:bg-red focus-visible:text-dark-100"
            >
              <h4>Leave Department</h4>
            </button>
          </li>
        )}
        <li>
          <Link
            href={`/department/${departmentId}`}
            title={`View ${name}`}
            aria-label={`View ${name}`}
            className="flex items-center justify-center rounded border-2 border-dark-500 bg-dark-100 px-5 py-3 text-grey outline-0 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-dark-100 focus-visible:border-primary focus-visible:bg-primary focus-visible:text-dark-100"
          >
            <h4>View Department</h4>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default EditModal;
