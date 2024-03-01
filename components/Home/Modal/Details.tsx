import IconButton from "../../Buttons/IconButton";

type DetailsProps = {
  location?: string;
  date?: date;
  startTime?: string;
  endTime?: string;
  isDetailsOpen?: boolean;
  toggle?: () => void;
};

const Details = ({
  location = "",
  date = "",
  startTime = "",
  endTime = "",
  isDetailsOpen = false,
  toggle = () => {},
}: DetailsProps) => {
  return (
    <section className="md:hidden">
      <div className="flex items-center justify-between bg-dark-300 px-4 pb-4 md:px-8">
        <p className="text-grey">Details</p>
        <div className="flex">
          <IconButton
            className={isDetailsOpen ? "-rotate-180 fill-white" : ""}
            toggle={toggle}
            icon="arrow-down"
            label={isDetailsOpen ? "Collapse" : "Expand"}
            variant="icon"
            toolTip={true}
            name="Expand/Collapse"
          />
        </div>
      </div>
      <div
        className={`grid bg-dark-300 transition-all duration-300 ease-in-out ${
          isDetailsOpen
            ? "visible grid-rows-[1fr] opacity-100"
            : "invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-4 px-4 pb-4 md:px-8">
            <li className="grid grid-cols-1Xauto items-center">
              <h5>Place:</h5>
              <p className="truncate text-sm font-normal text-grey">
                {location}
              </p>
            </li>
            <li className="grid grid-cols-1Xauto items-center">
              <h5>Date & Time</h5>
              <p className="truncate text-sm font-normal text-grey">
                {date} | {startTime} - {endTime}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Details;
