"use client";
import React from "react";
import useUtilities from "@/hooks/useUtilities";
import IconButton from "../../Buttons/IconButton";

// ContentModal:
// - A modal component that can be used to display content by inserting children.
// - Four different sizes can be used to restrict the width of the modal - default is max-w-screen-xl.
// - Several buttons can be enabled. All buttons except the close button are disabled by default.
// - When the visibility is set to true, the body will be locked to prevent scrolling.
// - A loading spinner can be shown while certain data is being processed f.x. saving data to supabase.

type Size = "small" | "medium" | "large" | "xl";

interface ContentModalProps {
  /** The visibility of the modal. FALSE = hidden | TRUE = visible. */
  visibility?: boolean;
  /** Show or hide the loading spinner. */
  loading?: boolean;
  /** Provide functionality that can switch the modal’s visibility to false. */
  toggle?: () => void;
  /** Specify the max-width of which the modal should restricted to. */
  size?: Size;
  /** Declare a title that represents the modal - will be shown in the header. */
  title?: string;
  /** Show or hide the close button. */
  showDeleteButton?: boolean;
  /** Attach a function to the close button. */
  deleteToggle?: () => void;
  /** Show or hide the erase button. */
  showEraseButton?: boolean;
  /** Attach a function to the erase button. */
  eraseToggle?: () => void;
  /** Show or hide the archive button. */
  showArchiveButton?: boolean;
  /** Attach a function to the archive button. */
  archiveToggle?: () => void;
  /** Show or hide the add dish button. */
  showAddDishButton?: boolean;
  /** Attach a function to the add dish button. */
  addDishToggle?: () => void;
  children?: React.ReactNode;
}

const sizes = (size: Size) => {
  switch (size) {
    case "small":
      return "max-w-screen-sm";
    case "medium":
      return "max-w-screen-md";
    case "large":
      return "max-w-screen-lg";
    case "xl":
      return "max-w-screen-xl";
    default:
      return "max-w-screen-xl";
  }
};

const ContentModal: React.FC<ContentModalProps> = ({
  visibility = false,
  loading = false,
  toggle = () => {},
  size = "max-w-screen-xl",
  title,
  showDeleteButton = false,
  deleteToggle = () => {},
  showEraseButton = false,
  eraseToggle = () => {},
  showArchiveButton = false,
  archiveToggle = () => {},
  showAddDishButton = false,
  addDishToggle = () => {},
  children = null,
}) => {
  const { disableBodyScroll } = useUtilities();
  disableBodyScroll(visibility);
  const sizeValue = sizes(size);

  return (
    <section
      aria-modal="true"
      aria-hidden={!visibility}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        visibility
          ? "pointer-events-auto visible opacity-100"
          : "pointer-events-none invisible opacity-0"
      }`}
    >
      <div className="relative flex flex-1 items-center justify-center px-5 py-10 md:p-10">
        <div
          role="button"
          aria-label="Close modal"
          className="absolute inset-0 z-40 bg-dark-100 opacity-95"
          onClick={toggle}
        ></div>
        <div
          className={`pattern relative z-50 flex h-full w-full flex-col overflow-auto rounded border-2 border-dark-500 animate-ease-in-out ${sizeValue} ${
            visibility ? "animate-fade-up " : "invisible opacity-0"
          }`}
        >
          <header className="relative z-50 grid grid-cols-1Xauto items-center gap-5 bg-dark-300 p-5 md:px-10">
            <h3 className="truncate font-semibold">{title}</h3>
            <ul className="flex gap-5" aria-label="Function buttons">
              {showAddDishButton && (
                <li>
                  <IconButton
                    icon="add"
                    toggle={addDishToggle}
                    label="Add dish"
                    toolTip={true}
                  />
                </li>
              )}
              {showArchiveButton && (
                <li>
                  <IconButton
                    icon="archive"
                    toggle={archiveToggle}
                    label="Archive menu"
                    toolTip={true}
                  />
                </li>
              )}
              {showEraseButton && (
                <li>
                  <IconButton
                    color="red"
                    icon="erase"
                    toggle={eraseToggle}
                    label="Erase menu"
                    toolTip={true}
                  />
                </li>
              )}
              {showDeleteButton && (
                <li>
                  <IconButton
                    color="red"
                    icon="delete"
                    toggle={deleteToggle}
                    label="Delete menu"
                    toolTip={true}
                  />
                </li>
              )}
              <li>
                <IconButton
                  color="red"
                  icon="close"
                  toggle={toggle}
                  label="Close modal"
                  toolTip={true}
                />
              </li>
            </ul>
          </header>
          {children}
          {loading === true && (
            <div className="absolute inset-0 z-50 flex animate-fade animate-delay-1000 animate-duration-300">
              <div className="relative flex flex-1 items-center justify-center">
                <div className="absolute inset-0 z-10 bg-dark-100 opacity-50"></div>
                <div className="relative z-20 flex flex-col items-center gap-4">
                  <svg
                    aria-hidden="true"
                    className="h-10 w-10 animate-spin fill-primary text-dark-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <p>Processing...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentModal;
