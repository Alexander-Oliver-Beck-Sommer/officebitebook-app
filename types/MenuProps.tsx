export interface MenuProps {
  menu_id: string; // UUID - Primary Key
  user_id: string; // UUID
  department_id: string; // UUID
  title: string; // text
  location: string; // text
  date: string; // date
  start_time: string; // text
  end_time: string; // text
  week: number; // int8
  locked: boolean; // boolean
  published: boolean; // boolean
  dishes: string[]; // jsonb that contains UUIDs of dish objects
  accepted_participants: string[]; // jsonb that contains UUIDs of user objects
  declined_participants: string[]; // jsonb that contains UUIDs of user objects
  created_at: string; // timestamptz
}
