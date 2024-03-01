import ContentModal from "@/components/Modals/ContentModal";
import Details from "./Details";
import Dish from "./Dish";
import TextButton from "@/components/Buttons/TextButton";
import useUtilities from "@/hooks/useUtilities";
import DishProps from "@/types/DishProps";

type MenuEditorProps = {
  visibility?: boolean;
  loading?: boolean;
  closeToggle?: () => void;
  saveToggle?: () => void;
  // Details Fields:
  title?: string;
  setTitle?: (newTitle: string) => void;
  location?: string;
  setLocation?: (newLocation: string) => void;
  date?: string;
  setDate?: (newDate: string) => void;
  startTime?: string;
  setStartTime?: (newStartTime: string) => void;
  endTime?: string;
  setEndTime?: (newEndTime: string) => void;
  addNewDishToMenu?: () => void;
  // Dishes:
  dishes?: DishProps[];
  removeDishFromMenu?: (dishId: string) => void;
  removeMenu?: () => void;
  eraseDishesFromMenu?: () => void;
  menuId?: string;
};

const MenuEditor = ({
  visibility = false,
  loading = false,
  closeToggle = () => {},
  saveToggle = () => {},
  title = "",
  setTitle = () => {},
  location = "",
  setLocation = () => {},
  date = "",
  setDate = () => {},
  startTime = "",
  setStartTime = () => {},
  endTime = "",
  setEndTime = () => {},
  addNewDishToMenu = () => {},
  dishes = [],
  removeDishFromMenu = () => {},
  removeMenu = () => {},
  eraseDishesFromMenu = () => {},
  menuId = "",
}: MenuEditorProps) => {
  const { disableBodyScroll, handleAccordion, accordionId } = useUtilities();
  disableBodyScroll(visibility);

  return (
    <ContentModal
      visibility={visibility}
      loading={loading}
      title={title}
      toggle={closeToggle}
      showAddDishButton={true}
      addDishToggle={addNewDishToMenu}
      showDeleteButton={true}
      deleteToggle={removeMenu}
      showEraseButton={true}
      eraseToggle={eraseDishesFromMenu}
    >
      <div className="grid flex-1 grid-rows-1xauto overflow-hidden">
        <div className="grid grid-cols-30X70 overflow-y-auto ">
          <Details
            title={title}
            setTitle={setTitle}
            location={location}
            setLocation={setLocation}
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
          <div className="relative overflow-hidden">
            <ul className="absolute inset-0 flex flex-col gap-5 overflow-y-auto px-10 py-5">
              {dishes.map((dish, index) => {
                return (
                  <Dish
                    removeToggle={() => removeDishFromMenu(dish.dish_id)}
                    key={dish.dish_id}
                    menuId={menuId}
                    count={index + 1}
                    dishId={dish.dish_id}
                    title={dish.title}
                    subtitle={dish.subtitle}
                    description={dish.description}
                    thumbnailUrl={dish.thumbnail_url}
                    recipe={dish.recipe}
                    accordionState={accordionId === dish.dish_id}
                    handleAccordion={() =>
                      handleAccordion(
                        accordionId === dish.dish_id ? null : dish.dish_id,
                      )
                    }
                  />
                );
              })}
            </ul>
          </div>
        </div>
        <footer className="sticky bottom-0 flex items-center justify-end gap-5 bg-dark-300 p-5 md:px-10">
          <TextButton
            color="red"
            text="Cancel"
            icon="close"
            label="Cancel all changes"
            toolTip={true}
            toggle={closeToggle}
          />
          <TextButton
            text="Save"
            icon="save"
            label="Save all changes"
            toolTip={true}
            toggle={saveToggle}
          />
        </footer>
      </div>
    </ContentModal>
  );
};

export default MenuEditor;
