export interface UserProps {
  user_id: string; // UUID - Primary Key
  user_email: string; // text
  user_name: string; // text
  user_phone: string; // text
  user_birthday: string; // text
  user_role: string; // text
  user_avatar: string; // text
  user_diet: string; // text
  user_allergies: string; // text
  created_at: string; // timestamptz
  updated_at: string; // timestamptz
}
