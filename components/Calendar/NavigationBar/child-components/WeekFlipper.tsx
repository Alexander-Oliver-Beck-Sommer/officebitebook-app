import ArrowIcon from "@/components/Icons/ArrowIcon";

type WeekFlipperProps = {
  weekFlipperBackward: () => void;
  weekFlipperCurrentWeek: number;
  weekFlipperForward: () => void;
};

export default function WeekFlipper({
  weekFlipperBackward = () => {},
  weekFlipperCurrentWeek = 0,
  weekFlipperForward = () => {},
}: WeekFlipperProps) {
  const weekNumber = weekFlipperCurrentWeek.toString().padStart(2, "0");

  return (
    <ul className="flex items-center gap-1">
      <li className="flex items-center">
        <button
          aria-label="Regress 1 week"
          title="Regress 1 week"
          onClick={weekFlipperBackward}
        >
          <ArrowIcon variant="left" className="h-5 w-5 fill-primary" />
        </button>
      </li>
      <li className="flex items-center justify-center gap-1">
        <p className="font-normal uppercase text-grey">Week</p>
        <p className="w-5 font-semibold text-white">{weekNumber}</p>
      </li>
      <li className="flex items-center">
        <button
          aria-label="Forward 1 week"
          title="Forward 1 week"
          onClick={weekFlipperForward}
        >
          <ArrowIcon variant="right" className="fill-primary" />
        </button>
      </li>
    </ul>
  );
}
