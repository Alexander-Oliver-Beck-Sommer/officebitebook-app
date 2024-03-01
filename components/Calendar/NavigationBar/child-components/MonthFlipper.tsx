import ArrowIcon from "@/components/Icons/ArrowIcon";

export default function MonthFlipper() {
  return (
    <button
      className="flex items-center gap-1"
      aria-label="Click and choose inbetween months and weeks"
    >
      <h4>October 2023</h4>
      <ArrowIcon variant="down" className="fill-primary" />
    </button>
  );
}
