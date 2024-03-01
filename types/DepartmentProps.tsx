export interface DepartmentProps {
  department_id: string; // UUID - Primary Key
  owner_id: string; // UUID
  name: string; // text
  description: string; // text
  status: string; // text
  users_collection: string[]; // jsonb
  users_invited: string[]; // jsonb
  users_count: number; // int8
  custom_roles: string[]; // jsonb
  logo_image: string; // text
  cover_image: string; // text
  updated_at: string; // timestamptz
  created_at: string; // timestamptz
}
