export interface UnpublishedDates {
  id: string; // UUID - Primary Key
  user_id: string; // UUID
  date: string; // date
  created_at: string; // timestamptz
}
