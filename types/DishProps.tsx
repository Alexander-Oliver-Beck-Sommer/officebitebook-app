export interface DishProps {
  dish_id: string; // UUID - Primary Key
  user_id: string; // UUID
  menu_id: string[]; // jsonb that contains UUIDs of menu objects
  title: string; // text
  subtitle: string; // text
  description: string; // text
  recipe: string; // text
  thumbnail_url: string; // text
  thumbnail_file: File; // this is not an actual field in the table.
  created_at: string; // text
}
