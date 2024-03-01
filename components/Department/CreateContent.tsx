import React from "react";
import InputField from "../InputField";
import TextButton from "../Buttons/TextButton";

interface CreateContentProps {
  /** Function to submit the department. */
  submitToggle?: () => void;
}

const CreateContent: React.FC<CreateContentProps> = ({
  submitToggle = () => {},
}) => {
  return (
    <form
      onSubmit={submitToggle}
      className="grid flex-1 grid-rows-1xauto overflow-hidden"
    >
      <ul className="flex flex-col gap-5 overflow-y-auto p-5 md:px-10">
        <li>
          <InputField
            minLength={2}
            maxLength={25}
            required
            id="departmentName"
            name="Name"
            label="Provide a name for the Department"
            placeholder="E.g. Frank's Diner"
          />
        </li>
        <li>
          <InputField
            minLength={10}
            maxLength={100}
            required
            id="departmentDescription"
            name="Description"
            label="Provide a description for the Department"
            placeholder="E.g. A place to share menus."
            type="textarea"
          />
        </li>
        <li className="flex flex-col gap-3">
          <label htmlFor="department-status">
            <p className="text-sm text-grey md:text-base">Initial Status</p>
          </label>
          <select
            id="departmentStatus"
            className="block w-full rounded border-2 border-dark-500 bg-dark-100 p-3 text-sm text-white outline-0 md:text-base"
          >
            <option defaultValue value="online">
              Online
            </option>
            <option value="paused">Paused</option>
            <option value="offline">Offline</option>
          </select>
        </li>
      </ul>
      <section className="flex justify-end bg-dark-300 p-4 md:px-12">
        <TextButton
          className="w-full md:w-fit"
          type="submit"
          label="Save and create department"
          toolTip={true}
          text="Create"
          icon="save"
        />
      </section>
    </form>
  );
};

export default CreateContent;
