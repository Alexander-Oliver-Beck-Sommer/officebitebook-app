import UnderlineButton from "../../Buttons/UnderlineButton";
import ImageButton from "@/components/Buttons/ImageButton";
import IconButton from "../../Buttons/IconButton";

type DishProps = {
  count?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  recipe?: string;
  thumbnailUrl?: string;
  thumbnailToggle?: () => void;
  accordionOpen: boolean;
  accordionToggle: () => void;
};

const Dish = ({
  count = 0,
  title = "",
  subtitle = "",
  description = "",
  recipe = "",
  thumbnailUrl = "",
  thumbnailToggle = () => {},
  accordionOpen,
  accordionToggle = () => {},
}: DishProps) => {
  return (
    <li
      className="
          border-dark-500 lg:rounded lg:border-2 lg:bg-dark-200"
    >
      <div className="grid grid-cols-auto1Xauto items-center gap-4 border-b-2 border-dark-500 pb-4 lg:grid-cols-autoX1 lg:items-end lg:border-0 lg:bg-dark-100 lg:p-4">
        <ImageButton
          toggle={thumbnailToggle}
          label={`Inspect thumbnail for ${title}`}
          url={thumbnailUrl}
          size="responsive"
          toolTip={true}
        />
        <div className="flex flex-col justify-center overflow-hidden">
          <h3 className="text-grey">#{count}</h3>
          <p className="truncate lg:text-lg">{title}</p>
        </div>
        <IconButton
          className={
            accordionOpen ? "-rotate-180 fill-white lg:hidden" : "lg:hidden"
          }
          toggle={accordionToggle}
          icon="arrow-down"
          label="Click to expand and collapse the dish"
          variant="icon"
          toolTip={true}
          name="Expand/Collapse"
        />
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          accordionOpen
            ? "visible grid-rows-[1fr] opacity-100"
            : "invisible grid-rows-[0fr] opacity-0 lg:visible lg:grid-rows-[1fr] lg:opacity-100"
        }`}
      >
        <div className="overflow-hidden ">
          <ul className="flex flex-col gap-8 pt-4 lg:p-4 lg:py-4">
            {title && (
              <li>
                <p className="mb-1 text-sm font-medium">Title</p>
                <p className="text-sm text-grey">{title}</p>
              </li>
            )}
            {subtitle && (
              <li>
                <p className="mb-1 text-sm font-medium">Subtitle</p>
                <p className="text-sm text-grey">{subtitle}</p>
              </li>
            )}
            {description && (
              <li>
                <p className="mb-1 text-sm font-medium">Description</p>
                <p className="text-sm text-grey">{description}</p>
              </li>
            )}
            {recipe && (
              <li>
                <p className="mb-1 text-sm font-medium">Recipe</p>
                <a
                  href={recipe}
                  target="_blank"
                  aria-label="Open link"
                  className="text-sm text-grey underline underline-offset-4 transition-all duration-300 ease-in-out hover:text-white"
                >
                  {recipe}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default Dish;
