type AddIconProps = {
  className?: string;
};

const AddIcon = ({ className = "" }: AddIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      className={className}
    >
      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
    </svg>
  );
};

export default AddIcon;
