import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { monthIndexData } from "@/redux/selector/monthIndex.selector";
import { addMonthIndexState } from "@/redux/slice/monthIndex.slice";

import MonthSlideHandler from "../button/MonthSlideHandler";
import CalendarRangeDropdown from "../dropdown/CalendarRangeDropdown";

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const monthIndex = useSelector(monthIndexData);

  const handlePrevMonth = useCallback(() => {
    dispatch(addMonthIndexState(monthIndex - 1));
  }, [monthIndex])
  
  const handleNextMonth = useCallback(() => {
    dispatch(addMonthIndexState(monthIndex + 1));
  }, [monthIndex])


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