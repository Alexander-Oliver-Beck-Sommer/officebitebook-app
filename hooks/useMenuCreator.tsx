import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useMenus from "./useMenus";
import useDateCalculator from "./useDateCalculator";
import useUtilities from "./useUtilities";
import useDishes from "./useDishes";
import useBucket from "./useBucket";
import { MenuProps } from "@/types/MenuProps";
import { DishProps } from "@/types/DishProps";
import { supabase } from "@/components/Supabase/supabaseClient";

type Mode = "create" | "edit" | "";

const useMenuCreator = (userId: string, departmentId: string) => {
  const [mode, setMode] = useState<Mode>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuID, setMenuID] = useState<string>("");
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [dishes, setDishes] = useState<DishProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locked, setLocked] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const { uploadMenu, getMenusFromDepartment, updateMenu } = useMenus();
  const {
    getCurrentWeekNumber,
    getWeekNumberFromDate,
    convertStringToMinutes,
    increaseWithOneHour,
  } = useDateCalculator();
  const { calculateCardButtonPosition, calculateCardButtonHeight } =
    useUtilities();
  const { getDishesFromMenu, insertDish } = useDishes();
  const { uploadFile, getFileUrl } = useBucket();

  const verifyMenu = () => {
    if (!title || !location || !date || !startTime || !endTime) {
      return false;
    }

    const startConverted = convertStringToMinutes(startTime);
    const endConverted = convertStringToMinutes(endTime);

    const areTimesValid = endConverted - startConverted >= 60;

    return areTimesValid;
  };

  // The createMenu function is called upon clicking a <HourCell/> button.
  const createMenu = (date: string, hour: string, locked: boolean) => {
    setMode("create");
    setVisibility(true);
    setMenuID(uuidv4()); // This could technically be done automatically in the backend, but we need the menuID to be available for the dishes.
    setDate(date);
    setStartTime(hour);
    setLocked(locked);
    setEndTime(increaseWithOneHour(hour)); // Automatically set the end time to be one hour after the start time.
  };

  // Create a new dish object and add it to the dishes array - a unique dish_id is generated using uuidv4().
  const createDish = () => {
    const newDish: DishProps = {
      dish_id: uuidv4(),
      user_id: userId,
      menu_id: [menuID],
      title: "",
      subtitle: "",
      description: "",
      recipe: "",
      thumbnail_url: "",
      thumbnail_file: null,
    };

    setDishes((dishes) => [...dishes, newDish]);
  };

  // The editMenu function is called upon clicking a <CardButton/> button.
  const editMenu = (menu: MenuProps) => {
    setMode("edit");
    setVisibility(true);
    setMenuID(menu.menu_id);
    setTitle(menu.title);
    setLocation(menu.location);
    setDate(menu.date);
    setLocked(menu.locked);
    setStartTime(menu.start_time);
    setEndTime(menu.end_time);
    loadDishes(menu.menu_id);
  };

  // Function that is triggered upon whenever the modal is closed, automatically fetching newly added menus.
  const loadMenus = async () => {
    const fetchedMenus = await getMenusFromDepartment(departmentId);
    setMenus(fetchedMenus);
  };

  // Load the dishes from a specific menu - only used when editing a menu.
  const loadDishes = async (menuID: string) => {
    const fetchedDishes = await getDishesFromMenu(menuID);
    setDishes(fetchedDishes);
  };

  const saveMenu = async () => {
    setLoading(true);

    const dishIds = dishes.map((dish) => dish.dish_id);

    if (mode === "create") {
      if (!verifyMenu()) {
        setLoading(false);
        return;
      }

      const menu: MenuProps = {
        menu_id: menuID,
        user_id: userId,
        department_id: departmentId,
        title: title,
        location: location,
        date: date,
        locked: locked,
        start_time: startTime,
        end_time: endTime,
        week: getWeekNumberFromDate(date),
        dishes: dishIds,
      };
      await uploadDishes();
      await uploadMenu(menu);
      setVisibility(false);
    }

    if (mode === "edit") {
      const menu: MenuProps = {
        title: title,
        location: location,
        date: date,
        start_time: startTime,
        end_time: endTime,
        week: getWeekNumberFromDate(date),
        locked: locked,
        dishes: dishIds,
      };
      await uploadDishes();
      await updateMenu(menuID, menu);
      setVisibility(false);
    }
  };

  const closeMenu = () => {
    setVisibility(false);
  };

  const deleteMenu = async () => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from("menus")
          .delete()
          .eq("menu_id", menuID);

        if (error) {
          console.log("Error deleting menu", error);
          return;
        }
      } catch (error) {
        console.log("Error deleting menu", error);
      }

      setVisibility(false);
      setLoading(false);
    }
  };

  const deleteDish = async (dishId: string) => {
    const newDishes = dishes.filter((dish) => dish.dish_id !== dishId);
    setDishes(newDishes);
  };

  // This is a hefty function, so let's break it down:
  // 1️⃣ The function is called upon saving a menu.
  const uploadDishes = async () => {
    // 2️⃣ We loop through each form (dish) in the modal.
    const forms = document.querySelectorAll("form");

    // 3️⃣ We grab the dish_id from the form and begin saving whatever data we can find inside the form.
    for (const [index, form] of Array.from(forms).entries()) {
      const dishId = form.getAttribute("data-dish-id");
      const formCount = index + 1; // Since there can be multiple dishes at once with the same id’s, we need to differentiate them.
      const fields = [
        "title",
        "subtitle",
        "description",
        "thumbnail", // The thumbnail in this point carries the File (if there is one), and not the url.
        "recipe",
      ];
      const dishData = {};

      // 4️⃣ We loop through each field in the form and slowly build up the dishData object.
      for (const field of fields) {
        const inputId = `dish-${formCount}-${field}`;
        const inputElement = form.querySelector(`#${inputId}`);
        if (inputElement) {
          // If we find a file inside our file input, we upload it to the bucket and save the publicURL to the dishData object.
          if (inputElement.type === "file") {
            const file = inputElement.files[0];
            if (file) {
              dishData[field] = file;
              // This is pretty weird without context, but rest assured:
              // 1. Define the bucket name, which in this case is "dishes_thumbnails".
              // 2. Define the file path, which is the menuID and the dishId with the file extension. The menuId will become a folder, where our files are stored under.
              await uploadFile(
                "dishes_thumbnails",
                `${menuID}/${dishId}.${file.type.split("/")[1]}`,
                file,
              );
            } else {
              dishData[field] = null;
            }
          } else {
            dishData[field] = inputElement.value;
          }
        }
      }

      // 5️⃣ We create a new dish object and add it to the dishes array.
      const newDish: DishProps = {
        dish_id: dishId,
        user_id: userId,
        menu_id: [menuID],
        title: dishData.title,
        subtitle: dishData.subtitle,
        description: dishData.description,
        recipe: dishData.recipe,
      };

      // 6️⃣ If we have a thumbnail, we fetch the publicURL and add it to the newDish object. This is to avoid pre-existing thumbnails from being overwritten, if they don't have a file.
      if (dishData.thumbnail) {
        const mimeType = dishData.thumbnail.type;
        const extension = mimeType.split("/")[1];
        const thumbnailFile = `${menuID}/${dishId}.${extension}`;
        newDish.thumbnail_url = await getFileUrl(
          "dishes_thumbnails",
          thumbnailFile,
        );
      }

      // 7️⃣ We ship the newDish object to the dishes table.
      // This function works both for creating and updating dishes.
      await insertDish(newDish);
    }
  };

  useEffect(() => {
    if (visibility === false) {
      setMode("");
      loadMenus();
      setDishes([]);
      setLoading(false);
      setMenuID("");
      setTitle("");
      setLocation("");
      setDate("");
      setLocked(false);
      setStartTime("");
      setEndTime("");
    }
  }, [visibility]);

  return {
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
  };
};

export default useMenuCreator;
