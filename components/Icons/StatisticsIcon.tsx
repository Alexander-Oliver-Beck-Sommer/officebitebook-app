type StatisticsIconProps = {
  className?: string;
};

const StatisticsIcon = ({ className = "" }: StatisticsIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      className={className}
    >
      <path d="M3 12H5V21H3V12ZM19 8H21V21H19V8ZM11 2H13V21H11V2Z" />
    </svg>
  );
};

export default StatisticsIcon;
