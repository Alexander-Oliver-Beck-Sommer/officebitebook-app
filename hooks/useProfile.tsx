import { useEffect, useState, useRef } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";

const useProfile = (userId, userEmail) => {
  const [userName, setUserName] = useState<string>("");
  const [originalUserName, setOriginalUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userAvatarName, setUserAvatarName] = useState<string>("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
  const [userBirthday, setUserBirthday] = useState<Date | null>(null);
  const [userDiet, setUserDiet] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  // TODO: This should be an array of strings, not a single string
  const [userAllergies, setUserAllergies] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);

  // Lets grab our user's information from the 'users' table
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && userEmail) {
        // Making sure we get the absolute precise user.
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", userId)
          .eq("user_email", userEmail)
          .single();

        // Scream in agony if we fail to retrieve the user.
        if (userError) {
          console.error("Error fetching user data", userError);
          return;
        }

        // Alright. Now we got the data, let's store it in our states.
        if (userData) {
          setUserName(userData.user_name);
          setOriginalUserName(userData.user_name);
          setUserPhone(userData.user_phone);
          setUserAvatarName(userData.user_avatar);
          setUserBirthday(
            userData.user_birthday ? new Date(userData.user_birthday) : null,
          );
          setUserDiet(userData.user_diet);
          setUpdatedAt(userData.updated_at);
          setUserAllergies(userData.user_allergies);

          // The user has an avatar? Nice - let's get the URL for it.
          if (userData.user_avatar) {
            const { data: avatarUrlData, error: avatarUrlError } =
              supabase.storage
                .from(`users_avatars/${userId}`)
                .getPublicUrl(`${userData.user_avatar}`);

            if (avatarUrlError) {
              console.error("Error fetching avatar URL", avatarUrlError);
            } else {
              setUserAvatarUrl(avatarUrlData.publicUrl);
            }
          }
        }
      }
    };
    fetchUserData();
  }, [userId, userEmail]);

  // User wants to have a new avatar? Nice - let's get it
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    // Make sure the image is a JPEG or PNG
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      let processedFile = file;
      // Lets convert pngs to jpgs - this will make sure no matter what the user uploads, we'll have a jpg at the end
      if (file.type === "image/png") {
        processedFile = await convertPNGtoJPG(file);
      }
      const fileExtension = processedFile.type.split("/").pop();
      const fileName = `${userId}.${fileExtension}`;
      // the 'avatarFile' should now contains the uploaded image.
      setAvatarFile(processedFile);
      // the 'userAvatarName' should now contain the name of the uploaded image + file extension.
      setUserAvatarName(fileName);
      // the 'userAvatarUrl' should now contain the URL of the uploaded image.
      setUserAvatarUrl(URL.createObjectURL(processedFile));
    } else {
      alert("Please select a JPEG or PNG image.");
    }
  };

  // Process for converting PNGs to JPGs
  const convertPNGtoJPG = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(new File([blob], `${userId}.jpg`, { type: "image/jpeg" }));
          }, "image/jpeg");
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // User wants to update their avatar? Bravo - let's update!
  const handleSubmit = async () => {
    const updates = {
      user_name: userName,
      user_phone: userPhone,
      user_avatar: userAvatarName,
      user_birthday: userBirthday ? userBirthday.toISOString() : null,
      user_diet: userDiet,
      user_allergies: userAllergies,
    };

    // Upload the avatar (if it exists) and have it replace the old, if there is one already.
    if (avatarFile) {
      await supabase.storage
        .from(`users_avatars/${userId}`)
        .upload(userAvatarName, avatarFile, { upsert: true });
    }

    // Actual logic for updating the user's details into supabase.
    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("user_id", userId)
      .eq("user_email", userEmail);

    if (error) {
      console.error("Error updating user details", error);
    } else {
      alert("Profile updated successfully!");
    }
  };

  // User wants to delete their avatar? Fine - let's delete it
  const handleDeleteAvatar = async () => {
    const { error: deleteAvatarError } = await supabase.storage
      .from(`users_avatars/${userId}`)
      .remove(userAvatarName);

    let userAvatarError = null;

    // And if the above went right, let's make sure the user doesn't have a non-existing avatar.
    if (!deleteAvatarError) {
      const { error } = await supabase
        .from("users")
        .update({ user_avatar: "" })
        .eq("user_id", userId)
        .eq("user_email", userEmail);

      userAvatarError = error;
    }

    // If any problems occured in either of the two, let's scream in shared agony.
    if (deleteAvatarError || userAvatarError) {
      console.error(
        "Error deleting avatar",
        deleteAvatarError || userAvatarError,
      );
    } else {
      alert("Avatar deleted successfully!");
      setUserAvatarName("");
      setUserAvatarUrl("");
      setAvatarFile(null);
    }
  };

  // This is a wicked function to format user dates into a more readable format
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(",", " |");
  };

  return {
    userName,
    setUserName,
    originalUserName,
    setOriginalUserName,
    userPhone,
    setUserPhone,
    userAvatarName,
    setUserAvatarName,
    userAvatarUrl,
    setUserAvatarUrl,
    userBirthday,
    setUserBirthday,
    userDiet,
    setUserDiet,
    updatedAt,
    userAllergies,
    setUserAllergies,
    avatarFile,
    setAvatarFile,
    fileInputRef,
    handleAvatarChange,
    handleSubmit,
    handleDeleteAvatar,
    formatDate,
  };
};

export default useProfile;
