import React from "react";
import ModeButton from "./ModeButton";
import IconButton from "../Buttons/IconButton";
import useAdminDashboard from "./useAdminDashboard";
import CelebrationsMode from "./modes/CelebrationsMode";
import DefaultMode from "./modes/DefaultMode";

interface AdminDashboardProps {
  /** Visibility of the admin dashboard. TRUE = OPEN | FALSE = CLOSED */
  visibility: boolean;
  /** Function to close/open the admin dashboard */
  toggle: () => void;
  /** Department ID - essential in retrieving the fully correct data in terms of the administration of the department. */
  departmentId: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  visibility = false,
  toggle = () => {},
  departmentId = "",
}) => {
  const {
    innerModal,
    enabledItems,
    disabledItems,
    title,
    closeInnerModal,
    mode,
    users,
  } = useAdminDashboard(departmentId, visibility);

  // Function to render content based on mode
  const renderContentBasedOnMode = () => {
    switch (mode) {
      case "celebrations":
        return <CelebrationsMode users={users} />;
      default:
        return <DefaultMode />;
    }
  };

  return (
    <section
      id="admin-dashboard"
      aria-modal="true"
      aria-hidden={visibility ? "false" : "true"}
      className={`transition-300 absolute inset-0 z-50 flex w-full overflow-hidden ${
        visibility ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="relative flex-1">
        <div
          className="absolute inset-0 z-30 bg-dark-100 opacity-95"
          onClick={toggle}
        ></div>
        <div
          className={`pattern transition-300 relative z-40 grid h-full max-w-screen-xl grid-rows-autoX1 border-r-2 border-dark-500 ${
            visibility
              ? "visible animate-fade-right opacity-100 animate-ease-in-out"
              : "invisible opacity-0"
          }`}
        >
          <header className="grid grid-cols-1Xauto items-center gap-4 bg-dark-300 px-12 py-4">
            <div className="flex items-center gap-1">
              <button aria-label="Admin Dashboard" onClick={closeInnerModal}>
                <h3
                  className={`transition-300
                   ${title != "" ? "text-grey" : "text-white"}
                  `}
                >
                  Admin Dashboard
                </h3>
              </button>
              {title != "" && (
                <h3 className="animate-fade-right animate-duration-300 animate-ease-in-out">
                  <span className="text-dark-500">/</span> {title}
                </h3>
              )}
            </div>
            <IconButton
              icon="close"
              controls="admin-dashboard"
              label="Close Admin Dashboard"
              toolTip={true}
              toggle={toggle}
            />
          </header>
          <div className="relative flex flex-col gap-12 overflow-y-auto p-12">
            <div className="flex flex-col gap-4">
              <h3>Ready and Available</h3>
              <ul className="grid grid-cols-3 gap-12">
                {enabledItems.map((item) => (
                  <ModeButton
                    key={item.title}
                    {...item}
                    toggle={item.toggle()}
                  />
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3>Under Development</h3>
              <ul className="grid grid-cols-3 gap-12">
                {disabledItems.map((item) => (
                  <ModeButton key={item.title} {...item} disabled />
                ))}
              </ul>
            </div>
            <section
              aria-hidden={innerModal ? "false" : "true"}
              className={`transition-300 absolute bottom-0 right-0 top-0 flex w-full overflow-hidden bg-dark-100 ${
                innerModal
                  ? "visible max-w-full opacity-100"
                  : "invisible max-w-0 opacity-0"
              }`}
            >
              {renderContentBasedOnMode()}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
