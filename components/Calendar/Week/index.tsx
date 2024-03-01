import Hour from "./Hour";
import MenuEditor from "../MenuEditor";
import MenuCard from "./MenuCard";
import useMenuCreator from "@/hooks/useMenuCreator";
import Day from "./Day";

type WeekProps = {
  userId?: string;
  departmentId?: string;
  days?: [];
  type?: boolean;
  hours?: string[];
  lockDay?: (date: string, locked: boolean) => void;
  togglePublished?: () => void;
};

const Week = ({
  userId = "",
  departmentId,
  days = [],
  type = true,
  hours = [],
  lockDay = () => {},
  togglePublished = () => {},
}: WeekProps) => {
  const {
    createMenu,
    createDish,
    editMenu,
    saveMenu,
    closeMenu,
    visibility,
    loading,
    menus,
    dishes,
    title,
    setTitle,
    location,
    setLocation,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    calculateCardButtonPosition,
    calculateCardButtonHeight,
    deleteMenu,
    deleteDish,
  } = useMenuCreator(userId, departmentId);

  return (
    <>
      <ul className="flex">
        <li className="w-16 bg-dark-100">
          <div className="h-24"></div>
          {hours.map((hour) => (
            <span
              key={`sidebar-${hour.fullHour}`}
              className="flex h-20 w-full justify-center"
            >
              <p className="text-sm text-grey">{hour.fullHour}</p>
            </span>
          ))}
        </li>
        {days.map((day) => {
          const getTodaysDate = new Date();
          const todaysDate = getTodaysDate.toISOString().split("T")[0];
          const dayDate = day.date;
          const currentDate = todaysDate === dayDate;
          const date = day.date.split("-")[2];
          const menuCards = menus.filter((menu) =>
            menu.date.startsWith(day.date),
          );
          return (
            <li
              key={`${day.name}-${day.date}`}
              className={`flex-1 border-r border-dark-500 transition-all duration-300 ease-in-out last:border-r-0 ${
                day.published ? "bg-dark-300" : "bg-dark-400"
              }`}
            >
              <Day
                date={date}
                day={day.name}
                currentDate={currentDate}
                lockToggle={() => lockDay(day.date, day.locked)}
                locked={day.locked}
                publishToggle={() => togglePublished(day.date, day.published)}
                published={day.published}
                celebrations={day.users}
              />
              <div className="relative flex flex-col">
                {hours.map((hour) => (
                  <Hour
                    key={`${day.name}-${hour.fullHour}`}
                    locked={day.locked}
                    date={day.date}
                    half={hour.halfHour}
                    halfToggle={() =>
                      createMenu(day.date, hour.halfHour, day.locked)
                    }
                    full={hour.fullHour}
                    fullToggle={() =>
                      createMenu(day.date, hour.fullHour, day.locked)
                    }
                  />
                ))}
                {menuCards.map((menuCard) => (
                  <MenuCard
                    key={`menu-${menuCard.menu_id}`}
                    title={menuCard.title}
                    location={menuCard.location}
                    accepted={menuCard.accepted_participants?.length}
                    declined={menuCard.declined_participants?.length}
                    toggle={() => editMenu(menuCard)}
                    disabled={day.published}
                    locked={day.locked}
                    positioning={{
                      top: `${calculateCardButtonPosition(
                        menuCard.start_time,
                      )}px`,
                      height: `${calculateCardButtonHeight(
                        menuCard.start_time,
                        menuCard.end_time,
                      )}px`,
                    }}
                  />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <MenuEditor
        removeDishFromMenu={deleteDish}
        removeMenu={deleteMenu}
        visibility={visibility}
        loading={loading}
        title={title}
        setTitle={setTitle}
        location={location}
        setLocation={setLocation}
        date={date}
        setDate={setDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        closeToggle={closeMenu}
        saveToggle={saveMenu}
        dishes={dishes}
        addNewDishToMenu={createDish}
      />
    </>
  );
};

export default Week;
