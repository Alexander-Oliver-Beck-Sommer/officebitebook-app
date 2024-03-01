type UploadIconProps = {
  className?: string;
};

const UploadIcon = ({ className = "" }: UploadIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      className={className}
    >
      <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z" />
    </svg>
  );
};

export default UploadIcon;
