"use client";
import useTimeMachine from "@/hooks/useTimeMachine";
import NavigationBar from "./NavigationBar";
import Week from "./Week";

type CalendarProps = {
  userId?: string;
  departmentId?: string;
};

export default function Calendar({
  userId = "",
  departmentId = "",
}: CalendarProps) {
  const {
    week,
    type,
    weekTypeSwitcher,
    hours,
    weekHighlighter,
    weekBackward,
    weekForward,
    weekReset,
    currentWeekNumber,
    lockDay,
    togglePublished,
  } = useTimeMachine(userId, departmentId);

  return (
    <>
      <NavigationBar
        departmentId={departmentId}
        jumpBack={weekBackward}
        weekNumber={currentWeekNumber}
        jumpForward={weekForward}
        currentDateHighlight={weekHighlighter}
        currentDateReset={weekReset}
        typeToggle={weekTypeSwitcher}
      />
      <Week
        userId={userId}
        departmentId={departmentId}
        days={week.week_days}
        type={type}
        hours={hours()}
        lockDay={lockDay}
        togglePublished={togglePublished}
      />
    </>
  );
}
