import { useEffect, useState } from "react";
import useUtilities from "@/hooks/useUtilities";
import useUser from "@/hooks/useUser";
import { UserProps } from "@/types/UserProps";
import useDepartments from "@/hooks/useDepartments";

const useAdminDashboard = (departmentId: string, visibility: boolean) => {
  const [innerModal, setInnerModal] = useState<boolean>(false); // the "inner modal" is the slide-menu that opens when a user clicks on a specific item in the admin dashboard
  const [title, setTitle] = useState<string>("");
  const [users, setUsers] = useState<UserProps[]>([]);
  const [mode, setMode] = useState<string>(""); // The mode is used to display different content within the inner modal - this is primarily done due to different markup and content
  const { fetchAllUsers } = useUser();
  const { disableBodyScroll } = useUtilities();
  const { getUserCollectionFromDepartment } = useDepartments();

  // Disable body scroll when the admin dashboard is open
  disableBodyScroll(visibility);

  // Async function that is called upon opening the admin dashboard
  const loadUsers = async () => {
    if (departmentId) {
      // Check if departmentId is provided
      try {
        const userCollection =
          await getUserCollectionFromDepartment(departmentId);
        setUsers(userCollection); // Assuming userCollection is an array of user details
      } catch (error) {
        console.error("Error loading users:", error);
        // Optionally, handle the error, e.g., setting an error state or showing an error message
      }
    } else {
      // Optionally, handle the case where departmentId is not provided or is invalid
      console.warn("No departmentId provided");
      setUsers([]); // Reset users or handle appropriately
    }
  };

  // Load users and empty states whenever the admin dashboard is closed (the entire freaking component)
  useEffect(() => {
    if (visibility === false) {
      loadUsers();
      setInnerModal(false);
      setTitle("");
      setMode("");
    }
  }, [visibility]);

  // Function to open the inner modal and populate the title and mode
  const openInnerModal = (title: string, mode: string) => {
    setInnerModal(true);
    setTitle(title);
    setMode(mode);
  };

  // Do the oppopsite of the above function
  const closeInnerModal = () => {
    loadUsers();
    setInnerModal(false);
    setTitle("");
    setMode("");
  };

  // Enabled items are items that are shown in the admin dashboard under "Ready and Available"
  const enabledItems = [
    {
      mode: "celebrations",
      icon: "celebrations",
      title: "Celebrations",
      label: "Inspect Celebrations",
      description:
        "Get an oversight of current, or upcoming, user anniversaries or birthdays",
      toggle: function () {
        return () => openInnerModal(this.title, this.mode);
      },
    },
  ];

  // Disabled items are items that are shown in the admin dashboard under "Under Development"
  const disabledItems = [
    {
      mode: "settings",
      icon: "settings",
      label: "Inspect General Settings",
      title: "General Settings",
      description: "View and update your department details",
    },
    {
      mode: "user-management",
      icon: "group",
      label: "Inspect User Management",
      title: "User Management",
      description:
        "View and manage current users in your department, including roles & registrations",
    },
    {
      mode: "archive",
      icon: "archive",
      label: "Inspect Archive",
      title: "Archive",
      description:
        "Manage and access your department’s archive, containing menus and dishes",
    },
    {
      mode: "statistics",
      icon: "statistics",
      title: "Statistics",
      label: "Inspect Statistics",
      description:
        "Read and get an oversight of your departments in an variety of forms",
    },
    {
      mode: "finances",
      icon: "finances",
      title: "Finances",
      label: "Inspect Finances",
      description:
        "Handle and maintain billing for dishes and menus in terms of costs",
    },
    {
      mode: "feedback",
      icon: "feedback",
      title: "Feedback",
      label: "Inspect Feedback",
      description:
        "Read what users in your department has to say about your dishes & menus",
    },
    {
      mode: "notifications",
      icon: "notification",
      title: "Notifications",
      label: "Inspect Notifications",
      description:
        "Manage notifications sent to you and your department’s users",
    },
    {
      mode: "kitchen-buddy",
      icon: "robot",
      title: "Kitchen Buddy",
      label: "Inspect Kitchen Buddy",
      description:
        "Manage and customize your department’s bot and when, and what, it sends and alerts",
    },
  ];

  return {
    innerModal,
    closeInnerModal,
    enabledItems,
    disabledItems,
    title,
    users,
    mode,
  };
};

export default useAdminDashboard;
