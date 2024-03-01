import { useEffect, useState } from "react";
import TextInput from "@/components/Inputs/TextInput";

type DetailsProps = {
  title?: string;
  setTitle?: (newTitle: string) => void;
  isTitleValid?: boolean;
  location?: string;
  setLocation?: (newLocation: string) => void;
  isLocationValid?: boolean;
  date?: string;
  setDate?: (newDate: string) => void;
  isDateValid?: boolean;
  startTime?: string;
  setStartTime?: (newStartTime: string) => void;
  isStartTimeValid?: boolean;
  endTime?: string;
  setEndTime?: (newEndTime: string) => void;
  isEndTimeValid?: boolean;
};

const Details = ({
  title = "",
  setTitle = () => {},
  isTitleValid = false,
  location = "",
  setLocation = () => {},
  isLocationValid = false,
  date = "",
  setDate = () => {},
  isDateValid = false,
  startTime = "",
  setStartTime = () => {},
  isStartTimeValid = false,
  endTime = "",
  setEndTime = () => {},
  isEndTimeValid = false,
}: DetailsProps) => {
  const [titleInput, setTitleInput] = useState(title);
  const [locationInput, setLocationInput] = useState(location);
  const [dateInput, setDateInput] = useState(date);
  const [startTimeInput, setStartTimeInput] = useState(startTime);
  const [endTimeInput, setEndTimeInput] = useState(endTime);

  const handleTitleChange = (newValue: string) => {
    setTitleInput(newValue);
    if (setTitle) {
      setTitle(newValue);
    }
  };

  const handleLocationChange = (newValue: string) => {
    setLocationInput(newValue);
    if (setLocation) {
      setLocation(newValue);
    }
  };

  const handleDateChange = (newValue: string) => {
    setDateInput(newValue);
    if (setDate) {
      setDate(newValue);
    }
  };

  const handleStartTimeChange = (newValue: string) => {
    setStartTimeInput(newValue);
    if (setStartTime) {
      setStartTime(newValue);
    }
  };

  const handleEndTimeChange = (newValue: string) => {
    setEndTimeInput(newValue);
    if (setEndTime) {
      setEndTime(newValue);
    }
  };

  useEffect(() => {
    setTitleInput(title);
    setLocationInput(location);
    setDateInput(date);
    setStartTimeInput(startTime);
    setEndTimeInput(endTime);
  }, [title, location, date, startTime, endTime]);

  return (
    <ul className="my-0.5 flex flex-col gap-5 bg-dark-300 px-10 py-5">
      <li>
        <TextInput
          variant="text"
          name="Title"
          label="Title"
          valueChange={handleTitleChange}
          value={titleInput}
          valid={isTitleValid}
          required={true}
        />
      </li>
      <li>
        <TextInput
          variant="text"
          name="Location"
          label="Location"
          valueChange={handleLocationChange}
          valid={isLocationValid}
          value={locationInput}
          required={true}
        />
      </li>
      <li>
        <TextInput
          variant="date"
          name="Date"
          label="Date"
          valueChange={handleDateChange}
          valid={isDateValid}
          value={dateInput}
          required={true}
        />
      </li>
      <li>
        <TextInput
          variant="time"
          name="Start time"
          label="Start time"
          valueChange={handleStartTimeChange}
          valid={isStartTimeValid}
          value={startTimeInput}
          required={true}
        />
      </li>
      <li>
        <TextInput
          variant="time"
          name="End time"
          label="End time"
          valueChange={handleEndTimeChange}
          valid={isEndTimeValid}
          value={endTimeInput}
          required={true}
        />
      </li>
    </ul>
  );
};

export default Details;
