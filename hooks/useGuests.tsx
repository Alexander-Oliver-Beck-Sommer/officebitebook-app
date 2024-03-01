import { supabase } from "@/components/Supabase/supabaseClient";
import { useState, useEffect } from "react";

const useGuests = () => {
  const addGuest = async (
    userId: string,
    name: string,
    department: string,
    weekNumber: number,
    startDate: string,
    endDate: string,
  ) => {
    const { error } = await supabase.from("guests").insert([
      {
        user_id: userId,
        name: name,
        department: department,
        week_number: weekNumber,
        start_date: startDate,
        end_date: endDate,
      },
    ]);
    if (error) {
      console.log("Error adding guest", error);
    }
  };

  const getGuestsFromWeek = async (weekNumber: number) => {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("week_number", weekNumber);
    return data;
  };

  const deleteGuest = async (guestId: string, userId: string) => {
    const { error } = await supabase
      .from("guests")
      .delete()
      .eq("guest_id", guestId)
      .eq("user_id", userId);
    if (error) {
      console.log("Error deleting guest", error);
    }
  };

  return {
    addGuest,
    getGuestsFromWeek,
    deleteGuest,
  };
};

export default useGuests;
