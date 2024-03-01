import React from "react";
import { UserProps } from "@/types/UserProps";

interface CelebrationsModeProps {
  /** Pass collection of users to display. */
  users: UserProps[];
}

const CelebrationsMode: React.FC<CelebrationsModeProps> = ({ users = [] }) => {
  return (
    <section className="flex-1 flex-col px-12 py-4">
      {users.length > 0 && (
        <ul className="flex flex-col gap-4">
          {users.map((user) => (
            <li
              key={user.user_id}
              className="flex items-center justify-between"
            >
              <h4>{user.user_name}</h4>
              <p className="text-grey">{user.user_birthday}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CelebrationsMode;
