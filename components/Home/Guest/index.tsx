import UserAddIcon from "@/components/Icons/UserAddIcon";
import useGuests from "@/hooks/useGuests";
import { useState, useEffect } from "react";
import Accordion from "@/components/Accordion";
import useDateCalculator from "@/hooks/useDateCalculator";
import ContentModal from "@/components/Modals/ContentModal";

type GuestProps = {
  isVisible?: boolean;
  toggle?: () => void;
  userId?: string;
  weekNumber?: number;
};

const Guest = ({
  isVisible = false,
  toggle = () => {},
  userId = "",
  weekNumber = 0,
}: GuestProps) => {
  const { addGuest, getGuestsFromWeek, deleteGuest } = useGuests();
  const { currentDate, formatDate } = useDateCalculator();
  const [guests, setGuests] = useState([]);
  const [guestOpen, setGuestOpen] = useState(false);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [addGuestAccordion, setAddGuestAccordion] = useState(false);

  const handleAccordionToggle = (id) => {
    if (openAccordionId === id) {
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(id);
    }
  };

  const handleDeleteGuest = (userId: string, guestId: string) => {
    deleteGuest(guestId, userId);
    const newGuests = guests.filter((guest) => guest.guest_id !== guestId);
    setGuests(newGuests);
  };

  useEffect(() => {
    const fetchGuests = async () => {
      const retrievedGuests = await getGuestsFromWeek(weekNumber);
      setGuests(retrievedGuests);
    };
    fetchGuests();
  }, [guests]);

  const submitForm = (form) => {
    form.preventDefault();
    const name = form.target.guestName.value.trim();
    const department = form.target.guestDepartment.value.trim();
    const startDate = form.target.guestStartDate.value;
    const endDate = form.target.guestEndDate.value;

    if (
      !userId ||
      !name ||
      !department ||
      !weekNumber ||
      !startDate ||
      !endDate
    ) {
      form.target.guestName.value = "";
      form.target.guestDepartment.value = "";
    } else {
      addGuest(userId, name, department, weekNumber, startDate, endDate);
      const newGuest = {
        user_id: userId,
        name: name,
        department: department,
        week_number: weekNumber,
        start_date: startDate,
        end_date: endDate,
      };
      setGuests([...guests, newGuest]);
      form.target.guestName.value = "";
      form.target.guestDepartment.value = "";
      form.target.guestStartDate.value = "";
      form.target.guestEndDate.value = "";
      setAddGuestAccordion(!addGuestAccordion);
    }
  };

  const handleGuestAccordion = () => {
    setAddGuestAccordion(!addGuestAccordion);
  };

  const blurOut = addGuestAccordion
    ? "visible opacity-95"
    : "invisible opacity-0";

  return (
    <ContentModal
      visibility={isVisible}
      toggle={toggle}
      title="Guestlist"
      size="medium"
    >
      <ul
        className={`flex h-full flex-1 flex-col gap-5 overflow-y-auto p-5 md:px-10`}
      >
        {guests.length > 0 ? (
          guests.map((guest, index) => (
            <li key={index} className="animate-fade-up animate-ease-in-out">
              <Accordion
                count={index + 1}
                variant="guest"
                text={guest.name}
                deleteToggle={() => handleDeleteGuest(userId, guest.guest_id)}
                deleteDisabled={userId === guest.user_id ? false : true}
                id={guest.guest_id}
                accordionState={openAccordionId === guest.guest_id}
                setAccordionState={() => handleAccordionToggle(guest.guest_id)}
              >
                <ul className="flex flex-col gap-3 p-3">
                  <li>
                    <p className="mb-1 text-sm md:text-base">Department</p>
                    <p className="text-sm text-grey md:text-base">
                      {guest.department}
                    </p>
                  </li>
                  <li>
                    <p className="mb-1 text-sm md:text-base">Duration</p>
                    <p className="text-sm text-grey md:text-base">
                      {formatDate(guest.start_date)}
                      {" - "}
                      {formatDate(guest.end_date)}
                    </p>
                  </li>
                </ul>
              </Accordion>
            </li>
          ))
        ) : (
          <p>No guests</p>
        )}
        <div
          onClick={handleGuestAccordion}
          className={`absolute inset-0 bg-dark-100 transition-all duration-300 ease-in-out ${blurOut}`}
        ></div>
      </ul>
      <footer className="absolute bottom-0 z-50 w-full">
        <Accordion
          text="Add Guests"
          variant="add-guest"
          accordionState={addGuestAccordion}
          setAccordionState={handleGuestAccordion}
          id="add-guest-accordion"
        >
          <form onSubmit={submitForm}>
            <div className="flex grid-cols-2 flex-col gap-5 p-5 md:grid md:px-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="guestName" className="text-grey">
                  <p>Name</p>
                </label>
                <input
                  autoComplete="off"
                  placeholder="Enter name"
                  required
                  aria-label="Enter the guest's name"
                  id="guestName"
                  type="text"
                  className="rounded border-2 border-dark-500 bg-dark-100 p-3 outline-none placeholder:opacity-100 placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:opacity-0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="guestDepartment" className="text-grey">
                  <p>Department</p>
                </label>
                <input
                  autoComplete="off"
                  placeholder="Enter department"
                  required
                  aria-label="Enter the guest's department"
                  id="guestDepartment"
                  type="text"
                  className="rounded border-2 border-dark-500 bg-dark-100 p-3 outline-none placeholder:opacity-100 placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:opacity-0"
                />
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="guestStartDate" className="text-grey">
                    <p>Start Date</p>
                  </label>
                  <input
                    autoComplete="off"
                    placeholder="Enter starting date"
                    required
                    aria-label="Enter for how long the guest will stay"
                    id="guestStartDate"
                    type="date"
                    defaultValue={currentDate}
                    className="rounded border-2 border-dark-500 bg-dark-100 p-3 outline-none placeholder:opacity-100 placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:opacity-0"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="guestEndDate" className="text-grey">
                    <p>End Date</p>
                  </label>
                  <input
                    autoComplete="off"
                    placeholder="Enter ending date"
                    required
                    aria-label="Enter for how long the guest will stay"
                    id="guestEndDate"
                    type="date"
                    defaultValue={currentDate}
                    className="rounded border-2 border-dark-500 bg-dark-100 p-3 outline-none placeholder:opacity-100 placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:opacity-0"
                  />
                </div>
              </div>
              <button
                type="submit"
                value="Submit"
                className="col-start-2 mt-2.5 flex items-center justify-center gap-2 rounded border-2 border-dark-500 bg-dark-100 fill-grey p-3 text-grey outline-0 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:fill-dark-100 hover:text-dark-100 focus-visible:border-primary focus-visible:bg-primary focus-visible:fill-dark-100 focus-visible:text-dark-100"
              >
                <h4>Add Guest</h4>
                <UserAddIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </Accordion>
      </footer>
    </ContentModal>
  );
};

export default Guest;
