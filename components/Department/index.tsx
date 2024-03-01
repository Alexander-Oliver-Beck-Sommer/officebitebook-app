"use client";
import React from "react";
import useDepartment from "./useDepartment";
import Header from "./Header";
import DepartmentCard from "./DepartmentCard";
import ContentModal from "../Modals/ContentModal";
import CreateContent from "./CreateContent";
import EditModal from "./EditModal";

interface DepartmentProps {
  /** Email that belongs to the logged-in user. */
  userEmail?: string;
  /** UUID that belongs to the logged-in user. */
  userId?: string;
}

const Department: React.FC<DepartmentProps> = ({ userEmail, userId }) => {
  const {
    departments,
    visibility,
    loading,
    closeModal,
    departmentId,
    ownerName,
    name,
    createDepartment,
    editDepartment,
    description,
    status,
    usersAmount,
    mode,
    saveDepartment,
    allowed,
    ownerId,
  } = useDepartment(userEmail, userId);

  if (allowed === false) {
    return (
      <div>
        <h1>Not allowed</h1>
      </div>
    );
  } else {
    return (
      <>
        <section className="fill-body pattern flex justify-center p-5 pb-10 md:px-10">
          <div className="flex w-full max-w-screen-xl flex-col gap-10">
            <Header
              amountOfDepartments={departments.length}
              createToggle={createDepartment}
            />
            {departments.length > 0 ? (
              <>
                {["online", "paused", "offline"].map((status) => {
                  const filteredDepartments = departments.filter(
                    (department) => department.status === status,
                  );
                  if (filteredDepartments.length > 0) {
                    return (
                      <section
                        key={status}
                        aria-label={status}
                        className="flex flex-col gap-5"
                      >
                        <h4 className="capitalize text-grey">{`(${filteredDepartments.length}) ${status} departments`}</h4>
                        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {filteredDepartments.map((department) => (
                            <DepartmentCard
                              key={department.department_id}
                              department={department}
                              settingsToggle={() => editDepartment(department)}
                            />
                          ))}
                        </ul>
                      </section>
                    );
                  }
                  return null;
                })}
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className=" flex animate-fade-up flex-col items-center gap-5 animate-delay-1000 animate-ease-in-out">
                  <h1 className="text-4xl">ಥ_ಥ</h1>
                  <div className="text-center">
                    <h4>No Departments Found</h4>
                    <p className="text-sm text-grey">
                      Want to change that? Feel free to create a new department
                      or ask to become apart of one 🎉
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <ContentModal
          size="medium"
          visibility={visibility}
          toggle={closeModal}
          title={mode === "create" ? "New Department" : name}
          loading={loading}
        >
          {mode === "create" ? (
            <CreateContent submitToggle={saveDepartment} />
          ) : (
            <EditModal
              departmentId={departmentId}
              name={name}
              description={description}
              status={status}
              ownerName={ownerName}
              ownerId={ownerId}
              userId={userId}
              usersAmount={usersAmount}
              leaveToggle={() => {}}
            />
          )}
        </ContentModal>
      </>
    );
  }
};

export default Department;
