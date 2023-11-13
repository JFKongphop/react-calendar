import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import  { 
  useContext, 
  useEffect, 
  useState,
  Fragment
} from "react";
import GlobalContext from "@/context/GlobalContext";
import { getMonth } from "@/utils/getMonth";
import type { DaySelected } from "./type/type";
import MonthSlideHandler from "../button/MonthSlideHandler";
import SmallDate from "./DataList/SmallDate";

const SmallCalendarSelector = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());  

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setMonthIndex
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  const displayMonth = (format: string) => {
    return dayjs(
      new Date(dayjs().year()
      , currentMonthIdx)
    ).format(format);
  }

  const [monthName, year] = displayMonth('MMMM YYYY').split(' ');
  const firstDayOfMonth = dayjs(`${Number(year)}-${monthName}-01`)
  .startOf('day');
  const lastDayOfMonth = dayjs(`${Number(year)}-${monthName}-01`)
  .endOf('day');

  const firstDayByMonthTimestamp = firstDayOfMonth.valueOf();
  const lastDayByMonthTimestamp = lastDayOfMonth.valueOf();
  
  return (
    <div className="mt-9 flex flex-col gap-4 border rounded-md shadow-xl">
      <header className="flex justify-between">
        <MonthSlideHandler 
          type={'left'}
          onSlideMonth={handlePrevMonth}
        />
        <p className="text-standswork-zeus-black-100 font-bold">
          {displayMonth('MMMM YYYY')}
        </p>
        <MonthSlideHandler 
          type={'right'}
          onSlideMonth={handleNextMonth}
        />
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day: Dayjs, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, index) => (
          <Fragment key={index}>
            {row.map((
              day: Dayjs | DaySelected,
              index: number
            ) => (
              <div key={index}>
                {(displayMonth("MMM") === day.format("MMM")) ?
                  (
                    <SmallDate 
                      day={day}
                      currentMonthIdx={currentMonthIdx}
                    />
                  )
                  :
                  (
                    <div className=""></div>
                  )
                }
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendarSelector;