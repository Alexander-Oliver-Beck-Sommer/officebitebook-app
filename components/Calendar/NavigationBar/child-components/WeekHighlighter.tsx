type WeekHighlighterProps = {
  weekHighlighterValue?: number;
  weekHighlighterReset?: () => void;
};

export default function WeekHighlighter({
  weekHighlighterValue = 0,
  weekHighlighterReset = () => {},
}: WeekHighlighterProps) {
  const weekNumber = weekHighlighterValue.toString().padStart(2, "0");
  return (
    <button
      onClick={weekHighlighterReset}
      aria-label="Reset the calendar to the current week"
      title="Reset the calendar to the current week"
    >
      <p className="text-grey uppercase">
        Current:{" "}
        <span className="text-white font-semibold">Week {weekNumber}</span>
      </p>
    </button>
  );
}
