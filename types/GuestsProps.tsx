export interface GuestsProps {
  guest_id: string; // UUID - Primary Key
  user_id: string; // UUID
  name: string; // text
  department: string; // text
  week_number: number; // int8
  created_at: string; // timestamptz
  start_date: string; // date
  end_date: string; // date
}
