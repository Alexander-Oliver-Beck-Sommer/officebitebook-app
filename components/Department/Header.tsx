import React from "react";
import IconButton from "../Buttons/IconButton";

interface DepartmentProps {
  /** Count of how many departments the user is apart of. */
  amountOfDepartments?: number;
  /** Function to toggle the filter. */
  filterToggle?: () => void;
  /** Function to toggle the create department modal. */
  createToggle?: () => void;
}

const Header: React.FC<DepartmentProps> = ({
  amountOfDepartments = 0,
  filterToggle = () => {},
  createToggle = () => {},
}) => {
  return (
    <header className="flex rounded border-dark-500 md:border-2 md:bg-dark-100 md:px-5 md:py-2.5">
      <div className="flex w-full items-center justify-between">
        <h4>
          Showing:{" "}
          <span className="font-normal text-grey">
            {amountOfDepartments} departments
          </span>
        </h4>
        <div className="flex gap-2.5">
          <IconButton
            toggle={createToggle}
            icon="add"
            size="responsive"
            label="Create Department"
            toolTip={true}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
