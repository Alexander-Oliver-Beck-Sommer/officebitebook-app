import { useState, useEffect } from "react";
import weekData from "@/data/weekData";
import useDateCalculator from "./useDateCalculator";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserProps } from "@/types/UserProps";
import useDepartments from "./useDepartments";

type WeekDay = {
  name: string;
  date: string;
  locked: boolean;
  users: UserProps[];
};

type Week = {
  week_number: number;
  week_location: string;
  week_days: WeekDay[];
};

type HourCell = {
  fullHour: string;
  halfHour: string;
};

const useTimeMachine = (userId: string, departmentId: string) => {
  const [week, setWeek] = useState<Week>({
    week_number: 0,
    week_location: "",
    week_days: [],
  });
  const [type, setWeekType] = useState(true);
  const [weekStartTime, setWeekStartTime] = useState("08:00");
  const [weekEndTime, setWeekEndTime] = useState("17:00");
  const [currentDate, setCurrentDate] = useState(new Date());
  const { getCurrentWeekNumber } = useDateCalculator();
  const supabase = createClientComponentClient();
  const { getUserCollectionFromDepartment } = useDepartments();

  const [weekHighlighter, setWeekHighlighter] = useState(
    getCurrentWeekNumber(),
  );
  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    getCurrentWeekNumber(),
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data: lockedData, error: lockedError } = await supabase
        .from("locked_dates")
        .select("date")
        .eq("user_id", userId);

      if (lockedError) {
        console.error("Error fetching locked dates", lockedError);
        return;
      }

      const lockedDatesSet = new Set(lockedData?.map((item) => item.date));

      const { data: publishedData, error: publishedError } = await supabase
        .from("unpublished_dates")
        .select("date")
        .eq("user_id", userId);

      if (publishedError) {
        console.error("Error fetching published dates", publishedError);
        return;
      }

      const publishedDatesSet = new Set(
        publishedData?.map((item) => item.date),
      );

      const { weekStart } = weekDates(currentWeekNumber);
      const language = weekData[navigator.language] ? navigator.language : "en";
      const weekSettings = weekData[language];
      const days = type ? weekSettings.workWeek : weekSettings.fullWeek;

      const formattedWeekDays = days.map((dayName, index) => {
        const date = new Date(weekStart.getTime());
        date.setDate(date.getDate() + index);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        const isLocked = lockedDatesSet.has(formattedDate);
        const isPublished = publishedDatesSet.has(formattedDate);

        return {
          name: dayName,
          date: formattedDate,
          locked: isLocked,
          published: isPublished,
        };
      });

      // Fetch users from the department and attach to days
      const users = await getUserCollectionFromDepartment(departmentId);
      const usersByBirthday = users.reduce((acc, user) => {
        const birthday = user.user_birthday.split("-").slice(1).join("-"); // Assuming YYYY-MM-DD format
        (acc[birthday] = acc[birthday] || []).push(user);
        return acc;
      }, {});

      const updatedWeekDays = formattedWeekDays.map((day) => {
        const dayMonth = day.date.slice(5); // Extract MM-DD format
        return {
          ...day,
          users: usersByBirthday[dayMonth] || [],
        };
      });

      setWeek({
        week_number: currentWeekNumber,
        week_location: language,
        week_days: updatedWeekDays,
      });
    };

    fetchData();
  }, [userId, currentWeekNumber, type, supabase, departmentId]);

  const lockDay = async (dayDate: string, lockedValue: boolean) => {
    const day = week.week_days.find((day) => day.date === dayDate);
    if (!day) return;

    if (day.locked) {
      // Remove the date from locked_dates
      await supabase
        .from("locked_dates")
        .delete()
        .match({ user_id: userId, date: dayDate });
    } else {
      // Insert the date into locked_dates
      await supabase
        .from("locked_dates")
        .insert([{ user_id: userId, date: dayDate }]);
    }

    // Toggle the day's locked status in the local state
    const updatedWeekDays = week.week_days.map((day) =>
      day.date === dayDate ? { ...day, locked: !day.locked } : day,
    );
    setWeek((currentWeek) => ({
      ...currentWeek,
      week_days: updatedWeekDays,
    }));

    try {
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("date", dayDate)
        .eq("user_id", userId);

      if (error) {
        console.log("Error locking day", error);
        return;
      } else if (data) {
        for (const menu of data) {
          const { error } = await supabase
            .from("menus")
            .update({ locked: !lockedValue })
            .eq("menu_id", menu.menu_id);
        }
      }
    } catch (error) {
      console.log("Error locking day", error);
    }
  };

  const togglePublished = async (dayDate: string, publishedValue: boolean) => {
    const dayIndex = week.week_days.findIndex((day) => day.date === dayDate);
    if (dayIndex === -1) return;

    const day = week.week_days[dayIndex];
    const newPublishedStatus = !day.published;

    // Update in Supabase
    if (newPublishedStatus) {
      await supabase
        .from("unpublished_dates")
        .insert([{ user_id: userId, date: dayDate }]);
    } else {
      await supabase
        .from("unpublished_dates")
        .delete()
        .match({ user_id: userId, date: dayDate });
    }

    // Update local state
    const updatedWeekDays = [...week.week_days];
    updatedWeekDays[dayIndex] = { ...day, published: newPublishedStatus };
    setWeek((currentWeek) => ({ ...currentWeek, week_days: updatedWeekDays }));

    try {
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("date", dayDate)
        .eq("user_id", userId);

      if (error) {
        console.log("Error publishing day", error);
        return;
      } else if (data) {
        for (const menu of data) {
          const { error } = await supabase
            .from("menus")
            .update({ published: !publishedValue })
            .eq("menu_id", menu.menu_id);
        }
      }
    } catch (error) {
      console.log("Error publishing day", error);
    }
  };

  // Function, if executed, will update the current week number to one week back
  const weekBackward = () => {
    const previousWeek = currentWeekNumber - 1;
    setCurrentWeekNumber(previousWeek < 1 ? 52 : previousWeek);
  };

  // Function, if executed, will update the current week number to one week forward
  const weekForward = () => {
    const nextWeek = currentWeekNumber + 1;
    setCurrentWeekNumber(nextWeek > 52 ? 1 : nextWeek);
  };

  const weekDates = (weekNumber) => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const weekStart = new Date(
      startOfYear.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000,
    );
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return { weekStart, weekEnd };
  };

  const weekReset = () => {
    setCurrentWeekNumber(getCurrentWeekNumber());
  };

  const weekTypeSwitcher = () => {
    setWeekType(!type);
  };

  const hours = () => {
    const startHour = parseInt(weekStartTime.split(":")[0], 10);
    const endHour = parseInt(weekEndTime.split(":")[0], 10);
    const hourCells: HourCell[] = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      const fullHour = hour.toString().padStart(2, "0") + ":00";
      const halfHour = hour.toString().padStart(2, "0") + ":30";
      hourCells.push({ fullHour, halfHour });
    }

    return hourCells;
  };

  return {
    week,
    type,
    weekTypeSwitcher,
    hours,
    weekHighlighter,
    currentWeekNumber,
    setWeekStartTime,
    setWeekEndTime,
    weekForward,
    weekBackward,
    weekReset,
    lockDay,
    togglePublished,
  };
};

export default useTimeMachine;
