"use client";
import React from "react";
import Accordion from "@/components/Accordion";
import InputField from "@/components/InputField";

interface DishProps {
  /** Number of the dish object inside the dishes array. */
  count?: number;
  /** State of the accordion. */
  accordionState?: boolean;
  /** Function to handle the accordion state. */
  handleAccordion?: (state: boolean) => void;
  /** Function to remove the accordion. */
  removeToggle?: () => void;
  /** Id of the dish. */
  dishId?: string;
  /** Title of the dish. */
  title?: string;
  /** Subtitle of the dish. */
  subtitle?: string;
  /** Description of the dish. */
  description?: string;
  /** Recipe of the dish. */
  recipe?: string;
  /** Thumbnail of the dish - default value will always be a url to display a background image. */
  thumbnailUrl?: string;
}

const Dish: React.FC<DishProps> = ({
  count = 0,
  accordionState,
  handleAccordion,
  removeToggle,
  dishId,
  title,
  subtitle,
  description,
  recipe,
  thumbnailUrl,
}) => {
  return (
    <Accordion
      variant="dish"
      text={title || "Dish"}
      count={count}
      deleteToggle={removeToggle}
      accordionState={accordionState}
      setAccordionState={handleAccordion}
      id={`dish-${count}`}
    >
      <form data-dish-id={dishId}>
        <ul className="flex auto-rows-max grid-cols-2 flex-col gap-x-10 gap-y-5 p-5 lg:grid">
          <li>
            <InputField
              label="Change the title of the dish"
              name="Title"
              placeholder="Title"
              defaultValue={title}
              id={`dish-${count}-title`}
              required
            />
          </li>
          <li>
            <InputField
              label="Change the subtitle of the dish"
              name="Subtitle"
              placeholder="Subtitle"
              defaultValue={subtitle}
              id={`dish-${count}-subtitle`}
            />
          </li>
          <li>
            <InputField
              label="Change the description of the dish"
              name="Description"
              placeholder="Description"
              defaultValue={description}
              id={`dish-${count}-description`}
              type="textarea"
            />
          </li>
          <li>
            <InputField
              label="Change thumbnail of the dish"
              name="Thumbnail"
              defaultValue={thumbnailUrl}
              id={`dish-${count}-thumbnail`}
              type="file"
            />
          </li>
          <li className="col-span-2">
            <InputField
              label="Change the recipe of the dish"
              name="Recipe"
              placeholder="https://example.com"
              defaultValue={recipe}
              id={`dish-${count}-recipe`}
              type="url"
            />
          </li>
        </ul>
      </form>
    </Accordion>
  );
};

export default Dish;
