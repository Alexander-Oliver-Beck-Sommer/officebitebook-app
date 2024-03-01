import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  };

  const fetchAllUsers = async () => {
    const { data: users, error } = await supabase.from("users").select("*");

    if (error) {
      console.log("Error fetching users", error);
    }

    return users;
  };

  // Creates a user session and redirects to the home page if successful
  const handleLogin = async (form: any) => {
    form.preventDefault();
    setLoading(true);
    const email = form.target.emailField.value;
    const password = form.target.passwordField.value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.log("Error logging in", error);
        toast.error("Invalid email or password");
        return;
      } else if (data) {
        setUser(true);
        router.push("/");
        router.refresh();
        toast.success("Signed in");
        console.log("This console is 42% more awesome now that you're here.");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  // Ends the user session and reloads the page
  const handleLogout = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out", error);
      return;
    }
    setUser(false);
    router.refresh();
    console.log("So long, and thanks for all the fish. Until next time.");

    setLoading(false);
  };

  // Check if a user is logged in - pretty much used to shift between login/logoug states.
  const checkIfUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        return;
      } else if (data) {
        setUser(true);
      }
    } catch (error) {
      console.log("Error checking session", error);
    }
  };

  const createUser = async (form: any) => {
    form.preventDefault();
    const email = form.target.emailField.value;
    const password = form.target.passwordField.value;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "https://example.com/welcome",
        },
      });

      if (error) {
        console.log("Error signing up", error);
        toast.error(
          "Email is either in use, or the password is not 6 characters long. Please try again.",
        );
        return;
      } else if (data) {
        const { error: userError } = await supabase
          .from("users")
          .insert({ user_id: data.user.id, user_email: email });

        if (userError) {
          console.log("Error creating user", userError);
          return;
        }

        router.push("/login/sign-up/verification-pending");
      }
    } catch (error) {
      console.log("Error signing up", error);
    }
  };

  const getUserFromId = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("user_id", userId);

      if (error) {
        console.log("Error getting user from ID", error);
        return;
      } else if (data) {
        return data;
      }
    } catch (error) {
      console.log("Error getting user from ID", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    checkIfUser();
  }, [user]);

  return {
    loading,
    handleLogin,
    handleLogout,
    user,
    createUser,
    getUserFromId,
    fetchAllUsers,
  };
};

export default useUser;
