// Needs a rework to use form instead of state logic and proper TypeScript practices
"use client";
import useProfile from "@/hooks/useProfile";
import Header from "./Header";
import Footer from "./Footer";
import InputList from "./InputList";

type ProfileComponentProps = {
  userId?: string;
  userEmail?: string;
};

const ProfileComponent = ({
  userId = "",
  userEmail = "",
}: ProfileComponentProps) => {
  const {
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
  } = useProfile(userId, userEmail);

  return (
    <section className="pattern fill-body flex flex-col justify-between">
      <Header
        fileRef={fileInputRef}
        changeAvatar={handleAvatarChange}
        avatarToggle={() => fileInputRef.current.click()}
        avatarURL={userAvatarUrl}
        originalUserName={originalUserName}
      />
      <InputList
        name={userName}
        changeName={setUserName}
        phone={userPhone}
        changePhone={setUserPhone}
        birthday={userBirthday ? userBirthday.toISOString().split("T")[0] : ""}
        changeBirthday={(dateString) => setUserBirthday(new Date(dateString))}
        diet={userDiet}
        changeDiet={setUserDiet}
        allergies={userAllergies}
        changeAllergies={setUserAllergies}
        email={userEmail}
      />
      <Footer
        lastUpdated={updatedAt ? formatDate(updatedAt) : "00-00-0000 | 00:00"}
        saveProfile={handleSubmit}
      />
    </section>
  );
};

export default ProfileComponent;
