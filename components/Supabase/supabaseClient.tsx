import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (typeof supabaseUrl !== "string") {
  throw new Error("Supabase URL is not defined in environment variables.");
}

if (typeof supabaseKey !== "string") {
  throw new Error("Supabase Key is not defined in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
