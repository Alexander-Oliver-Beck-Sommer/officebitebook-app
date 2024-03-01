import React from "react";
import ImageIcon from "../Icons/ImageIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import UploadIcon from "../Icons/UploadIcon";

type Type =
  | "text"
  | "password"
  | "email"
  | "tel"
  | "date"
  | "time"
  | "url"
  | "textarea"
  | "file";
type AutoComplete = "on" | "off";

interface InputFieldProps {
  /** Defines a string value that labels the current element. */
  label?: string;
  /** Defines the name of the input element. */
  name?: string;
  /** Supported types: text, password, email, tel, date, time, url. */
  type?: Type;
  /** Defines if the input is required. */
  required?: boolean;
  /** Defines a string value that specifies a short hint that describes the expected value of the input field. */
  placeholder?: string;
  /** Defines a string value that specifies the default value of the input field. */
  defaultValue?: string;
  /** Defines if the input is disabled. */
  disabled?: boolean;
  /** Used to link the label element together with the input field. */
  id?: string;
  /** Supported: on, off. */
  autoComplete?: AutoComplete;
  /** Defines the minimum number of characters allowed in the input field. */
  minLength?: number;
  /** Defines the maximum number of characters allowed in the input field. */
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  defaultValue,
  disabled = false,
  id,
  autoComplete = "off",
  minLength,
  maxLength,
}) => {
  const props = {
    autoComplete,
    ...(placeholder && { placeholder }),
    ...(required && { required }),
    ...(label && { "aria-label": label }),
    ...(id && { id }),
    ...(defaultValue && { defaultValue }),
    ...(minLength && { minLength }),
    ...(maxLength && { maxLength }),
    disabled,
  };

  return (
    <>
      {type === "textarea" ? (
        <div className="flex h-full flex-col gap-3">
          {name && (
            <label htmlFor={id}>
              <p className="text-sm text-grey md:text-base">{name}</p>
            </label>
          )}
          <textarea
            {...props}
            className="h-full rounded border-2 border-dark-500 bg-dark-100 p-3 text-sm outline-none placeholder:opacity-100 placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:opacity-0 md:text-base"
          />
        </div>
      ) : type === "file" ? (
        <div className="flex h-full flex-col gap-3">
          {name && <p className="text-sm text-grey md:text-base">{name}</p>}
          <div className="grid grid-cols-30X70">
            <div className="relative flex aspect-square items-center justify-center rounded border-2 border-dark-500 bg-dark-100 fill-grey">
              {defaultValue ? (
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${defaultValue})` }}
                ></div>
              ) : (
                <ImageIcon className="h-10 w-10" />
              )}
            </div>
            <label className="ml-3 flex cursor-pointer flex-col items-center justify-center gap-1 rounded border-2 border-dark-500 bg-dark-100 fill-grey p-3 text-grey outline-none transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:fill-dark-100 hover:text-dark-100 focus-visible:border-primary focus-visible:bg-primary focus-visible:fill-dark-100 focus-visible:text-dark-100">
              <input
                {...(label && { "aria-label": label })}
                {...(id && { id })}
                type={type}
                className="hidden"
                accept="image/png, image/jpeg"
              />
              <UploadIcon className="h-10 w-10" />
              <h4>Upload Thumbnail</h4>
              <h6>JPEG & PNG</h6>
            </label>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {name && (
            <label htmlFor={id}>
              <p className="text-sm text-grey md:text-base">{name}</p>
            </label>
          )}
          <input
            {...props}
            type={type}
            className={`rounded border-2 bg-dark-100 p-3 text-sm outline-none placeholder:opacity-100 placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:opacity-0 md:text-base ${
              disabled
                ? "border-dark-300 text-grey"
                : "border-dark-500 text-white"
            }`}
          />
        </div>
      )}
    </>
  );
};

export default InputField;
