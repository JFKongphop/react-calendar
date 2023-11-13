import { useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "@/context/GlobalContext";
import MonthSlideHandler from "../button/MonthSlideHandler";
import CalendarRangeDropdown from "../dropdown/CalendarRangeDropdown";

const CalendarHeader = () => {
  const { 
    monthIndex, 
    setMonthIndex 
  } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  }
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <header 
      className="px-4 py-2 flex items-center border-b text-calendar-main-theme border-calendar-minor-theme relative"
    >
      <h2 className="mr-10 text-xl font-bold">
        Calendar
      </h2>
      <CalendarRangeDropdown />
      <div className="flex flex-row gap-4 mx-4">
        <MonthSlideHandler 
          type={'left'}
          onSlideMonth={handlePrevMonth}
        />
        <MonthSlideHandler 
          type={'right'}
          onSlideMonth={handleNextMonth}
        />
      </div>
      <h2 className="ml-4 text-xl font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}

export default CalendarHeader;