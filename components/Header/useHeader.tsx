import { useState, useEffect } from "react";
import useUtilities from "@/hooks/useUtilities";
import useSupabaseUsers from "@/hooks/useSupabaseUsers";

const useHeader = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);
  const { disableBodyScroll } = useUtilities();
  const { fetchUserFromSession } = useSupabaseUsers();

  // Array of links that will be displayed in both menus 📚
  const links = [
    {
      text: "Departments", // Text to display
      label: "Departments", // value for aria-label and title
      path: "/", // Path to navigate to
      icon: "office", // Icon name - must be provided in the underlined link component
    },
    {
      text: "Profile",
      label: "Profile",
      path: "/profile",
      icon: "profile",
    },
  ];

  // Awaits fetchUserFromSession and determines if user is logged in
  const fetchUser = async () => {
    const user = await fetchUserFromSession();

    if (user) {
      setUser(true);
    } else {
      setUser(false);
    }
  };

  // Disable body scroll when menu is visible
  disableBodyScroll(visibility);

  // Toggle menu visibility
  const handleBurgerMenu = () => {
    setVisibility(!visibility);
  };

  // Check if user is logged in on page load
  useEffect(() => {
    fetchUser();
  }, []);

  return {
    visibility,
    handleBurgerMenu,
    user,
    links,
  };
};

export default useHeader;
