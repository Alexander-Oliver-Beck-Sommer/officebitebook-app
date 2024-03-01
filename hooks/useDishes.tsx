import { supabase } from "@/components/Supabase/supabaseClient";
import { DishProps } from "@/types/DishProps";
import { useState, useEffect } from "react";

const useDishes = () => {
  const getDish = async (dishId: string) => {
    const { data, error } = await supabase
      .from("dishes")
      .select("*")
      .eq("dish_id", dishId);

    if (error) {
      throw new Error("Error fetching dish");
      console.log("Error fetching dish:", error);
    }

    return data;
  };

  const getDishesFromMenu = async (menuId: string) => {
    const { data, error } = await supabase
      .from("dishes")
      .select("*")
      .contains("menu_id", `["${menuId}"]`);

    if (error) {
      throw new Error("Error fetching the menus dishes");
      console.log("Error fetching the menus dishes:", error);
    }

    return data;
  };

  const insertDish = async (dish: DishProps) => {
    const {
      dish_id,
      user_id,
      menu_id,
      title,
      subtitle,
      description,
      recipe,
      thumbnail_url,
    } = dish;

    let dishToInsert = {
      dish_id,
      user_id,
      menu_id,
      title,
      subtitle,
      description,
      recipe,
    };

    // Conditionally add thumbnail_url if it exists
    if (thumbnail_url) {
      dishToInsert = { ...dishToInsert, thumbnail_url };
    }

    const { error } = await supabase.from("dishes").upsert([dishToInsert]);

    if (error) {
      console.error("Error uploading dish:", error);
      throw new Error("Error uploading dish");
    }
  };

  const updateDish = async (dishId: string, dish: DishProps) => {
    const { error } = await supabase
      .from("dishes")
      .update({
        menu_id: dish.menu_id,
        title: dish.title,
        subtitle: dish.subtitle,
        description: dish.description,
        thumbnail_url: dish.thumbnail_url,
        recipe: dish.recipe,
      })
      .eq("dish_id", dishId);

    if (error) {
      throw new Error("Error updating dish");
      console.log("Error updating dish:", error);
    }
  };

  const deleteDish = async (dishId: string) => {
    const { error } = await supabase
      .from("dishes")
      .delete()
      .eq("dish_id", dishId);

    if (error) {
      throw new Error("Error deleting dish");
      console.log("Error deleting dish:", error);
    }
  };

  return {
    getDish,
    getDishesFromMenu,
    insertDish,
    updateDish,
    deleteDish,
  };
};

export default useDishes;
