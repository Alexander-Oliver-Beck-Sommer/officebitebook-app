import { useEffect, useState } from "react";

const useUtilities = () => {
  const [accordionId, setAccordionId] = useState<string | null>(null);

  // Boolean-based function that can disable scroll on the body - primarily used with modals.
  const disableBodyScroll = (isDisabled: boolean) => {
    useEffect(() => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = isDisabled ? "hidden" : "";
      }

      return () => {
        if (typeof window !== "undefined") {
          document.body.style.overflow = "";
        }
      };
    }, [isDisabled]);
  };

  // Simple function used to maintain accordions and keep only one accordion open at a time.
  const handleAccordion = (id: string) => {
    if (accordionId == id) {
      setAccordionId(null);
    } else {
      setAccordionId(id);
    }
  };

  const calculateCardButtonPosition = (startTime: string): number => {
    const baseTime = new Date();
    baseTime.setHours(8, 0, 0);

    const menuTime = new Date();
    const [hours, minutes] = startTime.split(":");
    menuTime.setHours(parseInt(hours), parseInt(minutes), 0);

    return ((menuTime - baseTime) / (1000 * 60 * 30)) * 40;
  };

  const calculateCardButtonHeight = (
    startTime: string,
    endTime: string,
  ): number => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0);

    return ((endDate - startDate) / (1000 * 60 * 30)) * 40;
  };

  return {
    disableBodyScroll,
    handleAccordion,
    accordionId,
    calculateCardButtonPosition,
    calculateCardButtonHeight,
  };
};

export default useUtilities;
