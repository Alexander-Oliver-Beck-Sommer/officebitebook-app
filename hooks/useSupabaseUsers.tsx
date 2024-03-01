import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserProps } from "@/types/UserProps";
import { useRouter } from "next/navigation";

// This hook is used to manage API calls to the "users" within the Supabase database. 4️⃣
// - Used to fetch, insert, update, and delete users. 📡
// - Includes logic in terms of fetching users from the "departments" table as well. 📚
// - Includes logic in terms of user management (login, public profiles, etc.)🔐

const useSupabaseUsers = () => {
  const supabase = createClientComponentClient();
  const router = useRouter(); // Router is used to perform actions e.g. redirection, refresh, etc.

  // ---------------------- Operations for the "users" table ---------------------- //
  // Fetch a single user from the "users" table with a given UUID that corresponds to the "user_id" column. 🔑
  const fetchOneUser = async (userId: string) => {
    try {
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userId);

      if (userError) {
        console.error("Error occured with fetching user", userError);
        console.error(
          "Make sure the user_id is correct and that the function is awaited properly.",
        );
      } else if (user) {
        return user;
      }
    } catch (error) {
      console.error("Error occured with executing fetchOneUser", error);
    }
  };

  // Fetch all users from the "users" table and return them as an array. 📚
  const fetchAllUsers = async () => {
    try {
      const { data: users, error: usersError } = await supabase
        .from("users")
        .select("*");

      if (usersError) {
        console.error("Error occured with fetching all users", usersError);
        console.error("Make sure the function is awaited properly.");
      } else if (users) {
        return users;
      }
    } catch (error) {
      console.error("Error occured with executing fetchAllUsers", error);
    }
  };

  // Insert a new user in the "users" table with the provided user object. 📝
  // "user_id" is the id the user's public profile 🔑
  // Inspect the "UserProps" to see what the userObject should look like. 🕵️‍♂️
  const insertUser = async (userObject: UserProps) => {
    try {
      const { error } = await supabase.from("users").insert(userObject);

      if (error) {
        console.error("Error occured with creating user", error);
        console.error(
          "Make sure the userObject is correct and that the function is awaited properly.",
        );
      }
    } catch (error) {
      console.error("Error occured with executing createUser", error);
    }
  };

  // Update a user in the "users" table with a provided "user_id" and user object. 🔑📝
  const updateUser = async (userId: string, userObject: UserProps) => {
    try {
      const { error } = await supabase
        .from("users")
        .update(userObject)
        .eq("user_id", userId);

      if (error) {
        console.error("Error occured with updating user", error);
        console.error(
          "Make sure the userObject is correct and that the function is awaited properly.",
        );
      }
    } catch (error) {
      console.error("Error occured with executing updateUser", error);
    }
  };

  // Delete a user from the "users" table with a provided "user_id". 🔑
  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("user_id", userId);

      if (error) {
        console.error("Error occured with deleting user", error);
        console.error(
          "Make sure the user_id is correct and that the function is awaited properly.",
        );
      }
    } catch (error) {
      console.error("Error occured with executing deleteUser", error);
    }
  };

  // ---------------------- Operations for the "departments" table ---------------------- //
  // Check if a user is apart of a department with a given "user_id" and "department_id". 🔑
  // This can be used to secure dynamic routes from users that are not apart of a department. 🔒
  const checkIfUserIsApartOfDepartment = async (
    userId: string,
    departmentId: string,
  ) => {
    try {
      const { data, error } = await supabase;
      from("departments")
        .select("*")
        .eq("department_id", departmentId)
        .contains("users_collection", `["${userId}"]`);

      if (error) {
        console.error(
          "Error occured with checking if user is apart of department",
          error,
        );
        console.error(
          "Make sure the user_id and department_id are correct and that the function is awaited properly.",
        );
      } else if (data) {
        return data;
      }
    } catch (error) {
      console.error(
        "Error occured with executing checkIfUserIsApartOfDepartment",
        error,
      );
    }
  };

  // Fetch all users from a department with a given "department_id" and return them as an array. 🔑📚
  // The function will be be broken down, step by step, with ascending comments. 🔢
  const fetchAllUsersFromDepartment = async (departmentId: string) => {
    try {
      // 1️⃣ Fetch the specified department with the given "department_id".
      const { data: department, error: departmentError } = await supabase
        .from("departments")
        .select("users_collection")
        .eq("department_id", departmentId)
        .single();

      if (departmentError) {
        console.error(
          "Error occured with fetching department",
          departmentError,
        );
      }

      // 2️⃣ If the department's "user_collection" is either null or empty, return an empty array.
      if (
        !department ||
        !department.users_collection ||
        department.users_collection.length === 0
      ) {
        console.log("No users found in this department.");
        return [];
      }

      // 3️⃣ Now that we have the "users_collection" from the department, we can fetch all acquired users from the "users" table.
      const { data: users, error: usersError } = await supabase
        .from("users")
        .select("*")
        .in("user_id", department.users_collection);

      if (usersError) {
        console.error(
          "Error occured with fetching users from department",
          usersError,
        );
      }

      return users; // 4️⃣ Return an array of users from the department.
    } catch (error) {
      console.log(
        "Error occured with executing fetchAllUsersFromDepartment",
        error,
      );
    }
  };

  // ---------------------- Operations for the user management ---------------------- //
  // Execute this function to retrieve the user from the session - mainly used for grabbing "user_id" and "user_email". 🔑
  const fetchUserFromSession = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "Make sure the function is awaited properly and that an active session exists.",
        );
      } else if (user) {
        return user;
      }
    } catch (error) {
      console.error("Error occured with executing fetchUserFromSession", error);
    }
  };

  // Create a new user within the public profile and the "users" table. 🔐
  // This function calls the "insertUser" function to create a user within the "users" table. 📝
  const createUser = async (email: string, password: string) => {
    try {
      const { data: user, error: userError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "localhost:3000/login/sign-up/verification-success", // Once the time comes, replace this with the actual URL.
        },
      });

      if (userError) {
        console.error("Error occured with signing up", userError);
        console.error(
          "Make sure the email and password are correct and that the function is awaited properly.",
        );
        return;
      } else if (user) {
        const userObject = {
          user_id: user.id, // We use the users public profile's id as the "user_id". This creates a connection between the "users" and public table.
          user_email: email,
        };
        await insertUser(userObject);
      }
    } catch (error) {
      console.log("Error occured with executing createUser", error);
    }
  };

  // Check if a session exists, if not, redirect the user to the login page. 🔑
  const checkIfSession = async () => {
    try {
      const session = supabase.auth.session();
      if (!session) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error checking session", error);
    }
  };

  // Login a user with a given email and password. 🔐
  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Error occured with signing in", error);
        console.error("Make sure the email and password are correct.");
      } else if (data) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log("Error occured with executing handleLogin", error);
    }
  };

  // Logout the user and refresh the page. 🔐
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error occured with signing out", error);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.log("Error occured with executing handleLogout", error);
    }
  };

  return {
    // "users" table operations
    fetchOneUser,
    fetchAllUsers,
    insertUser,
    updateUser,
    deleteUser,
    // "departments" table operations
    checkIfUserIsApartOfDepartment,
    fetchAllUsersFromDepartment,
    // User management operations
    fetchUserFromSession,
    createUser,
    checkIfSession,
    handleLogin,
    handleLogout,
  };
};

export default useSupabaseUsers;
