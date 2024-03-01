import { useEffect, useState } from "react";
import useMenus from "./useMenus";
import useDepartments from "./useDepartments";
import { MenuProps } from "@/types/MenuProps";
import { supabase } from "@/components/Supabase/supabaseClient";
import useDateCalculator from "./useDateCalculator";

const useHome = (userId: string, departmentId: string) => {
  const { getWeekMenusFromDepartment, getDishesFromMenu } = useMenus();
  const { checkIfApartOfDepartment, isAllowed } = useDepartments();
  const { getCurrentWeekNumber, formatDate, getDayNameFromDate } =
    useDateCalculator();
  const [checkedMenus, setCheckedMenus] = useState([]);
  const [menus, setMenus] = useState([]);
  const [organizedMenus, setOrganizedMenus] = useState({});
  const [week, setWeek] = useState(1);
  const [weekNumber, setWeekNumber] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [guestOpen, setGuestOpen] = useState(false);

  useEffect(() => {
    checkIfApartOfDepartment(departmentId, userId);
  }, []);

  useEffect(() => {
    if (!isAllowed) {
      return;
    }

    const fetchMenus = async () => {
      const weekNumber = getCurrentWeekNumber(week);
      setWeekNumber(weekNumber);
      let retrievedMenus = await getWeekMenusFromDepartment(
        weekNumber,
        departmentId,
      );

      retrievedMenus = retrievedMenus.filter((menu) => !menu.published);

      setMenus(retrievedMenus);

      if (retrievedMenus.length > 0) {
        const menusWithDishesAndChecked = await Promise.all(
          retrievedMenus.map(async (menu) => {
            const dishes = await getDishesFromMenu(menu.menu_id);
            const declined_participants = menu.declined_participants || [];
            const accepted_participants = menu.accepted_participants || [];
            const menu_checked = accepted_participants.includes(userId)
              ? true
              : declined_participants.includes(userId)
                ? false
                : null;
            return { ...menu, dishes, menu_checked };
          }),
        );
        setMenus(menusWithDishesAndChecked);
      }
    };

    fetchMenus();
  }, [isAllowed, week, userId]);

  useEffect(() => {
    if (!isAllowed) {
      return;
    }

    const organizeMenusByDay = () => {
      const dayOrder = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const organized = dayOrder.reduce(
        (acc, day) => ({ ...acc, [day]: { menus: [], date: "" } }),
        {},
      );

      menus.forEach((menu) => {
        const dayName = getDayNameFromDate(menu.date);
        const date = formatDate(menu.date);
        if (organized[dayName]) {
          organized[dayName].menus.push(menu);
          if (!organized[dayName].date) {
            organized[dayName].date = date;
          }
        }
      });

      setOrganizedMenus(organized);
    };

    if (menus.length > 0) {
      organizeMenusByDay();
    }
  }, [isAllowed, menus, getDayNameFromDate, formatDate]);

  // Modals
  const handleModalOpen = (menu) => {
    setModalData(menu);
    setModalStatus(true);
  };

  const handleModalClose = () => {
    setModalData(null);
    setModalStatus(false);
  };

  // Week Control
  const decreaseWeek = () => {
    setWeek(week - 1);
  };

  const increaseWeek = () => {
    setWeek(week + 1);
  };

  const resetWeek = () => {
    setWeek(1);
  };

  const handleGuest = () => {
    setGuestOpen(!guestOpen);
  };

  const checkMenu = async (menuId, checked) => {
    const updatedMenus = menus.map((menu) => {
      if (menu.menu_id === menuId) {
        return { ...menu, menu_checked: checked };
      }
      return menu;
    });

    let { data: menuData, error: menuError } = await supabase
      .from("menus")
      .select("accepted_participants, declined_participants")
      .eq("menu_id", menuId)
      .single();

    if (menuError) {
      console.error("Error fetching menu:", menuError);
      return;
    }

    let accepted_participants = menuData.accepted_participants || [];
    let declined_participants = menuData.declined_participants || [];

    if (checked) {
      if (!accepted_participants.includes(userId)) {
        accepted_participants.push(userId);
      }
      declined_participants = declined_participants.filter(
        (id) => id !== userId,
      );
    } else {
      if (!declined_participants.includes(userId)) {
        declined_participants.push(userId);
      }
      accepted_participants = accepted_participants.filter(
        (id) => id !== userId,
      );
    }

    const { data: updateData, error: updateError } = await supabase
      .from("menus")
      .update({
        accepted_participants: accepted_participants,
        declined_participants: declined_participants,
      })
      .eq("menu_id", menuId);

    if (updateError) {
      console.error("Error updating menu:", updateError);
      return;
    }
  };

  const toggleAllMenusStatus = async (acceptAll) => {
    // First, update the local state to reflect the changes immediately on the UI
    const updatedMenus = menus.map((menu) => {
      const accepted_participants = acceptAll
        ? [...menu.accepted_participants, userId]
        : menu.accepted_participants.filter((id) => id !== userId);
      const declined_participants = acceptAll
        ? menu.declined_participants.filter((id) => id !== userId)
        : [...menu.declined_participants, userId];
      return {
        ...menu,
        accepted_participants,
        declined_participants,
        menu_checked: acceptAll,
      };
    });

    setMenus(updatedMenus);

    // Then, update each menu in the database
    updatedMenus.forEach(async (menu) => {
      const { menu_id, accepted_participants, declined_participants } = menu;

      const { error } = await supabase
        .from("menus")
        .update({
          accepted_participants: accepted_participants.filter(
            (id) => id !== null,
          ),
          declined_participants: declined_participants.filter(
            (id) => id !== null,
          ),
        })
        .eq("menu_id", menu_id);

      if (error) {
        console.error("Error updating menu status:", error);
      }
    });
  };

  return {
    getCurrentWeekNumber,
    weekNumber,
    menus,
    organizedMenus,
    decreaseWeek,
    increaseWeek,
    resetWeek,
    handleModalOpen,
    handleModalClose,
    modalStatus,
    modalData,
    checkMenu,
    handleGuest,
    guestOpen,
    toggleAllMenusStatus,
    isAllowed,
  };
};

export default useHome;
