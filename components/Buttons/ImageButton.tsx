import React from "react";
import ImageIcon from "@/components/Icons/ImageIcon";
import EditIcon from "@/components/Icons/EditIcon";

type Sizes = "normal" | "responsive";

interface ImageButtonProps {
  /** Select at what size the button should be displayed in. */
  size: Sizes;
  /** Attach functionality to the button. */
  toggle: () => void;
  /** URL to the image that should be displayed on the button as a background image. */
  url: string;
  /** Label for the button. */
  label: string;
  /** Define if the button should have a tooltip - value will be the label. */
  toolTip: boolean;
  /** Define if the button should show a hover effect. For example: if someone wants to upload a image */
  showHover?: boolean;
}

const sizes = (size: Sizes) => {
  switch (size) {
    case "normal":
      return { button: "h-20 w-20", icon: "h-10 w-10" };
    case "responsive":
      return {
        button: "h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20",
        icon: "h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10",
      };
    default:
      return { button: "h-20 w-20", icon: "h-10 w-10" };
  }
};

const ImageButton: React.FC<ImageButtonProps> = ({
  size = "responsive",
  toggle = () => {},
  url = "",
  label = "",
  toolTip = false,
  showHover = false,
}) => {
  const sizeValue = sizes(size);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      {...(toolTip && { title: label })}
      className={`group/image-button relative flex items-center justify-center rounded border-2 border-dark-500 bg-dark-100 bg-cover bg-center fill-dark-500 ${sizeValue.button}`}
      style={{ backgroundImage: `url(${url})` }}
    >
      {!url && <ImageIcon className={sizeValue.icon} />}
      {showHover && (
        <section className="transition-300 absolute inset-0 flex items-center justify-center opacity-0 group-hover/image-button:opacity-100">
          <EditIcon className="relative z-50 h-6 w-6 fill-white" />
          <div className="absolute inset-0 z-40 bg-dark-400 opacity-80"></div>
        </section>
      )}
    </button>
  );
};

export default ImageButton;
