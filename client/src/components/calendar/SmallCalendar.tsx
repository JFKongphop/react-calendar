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

const SmallCalendar = () => {
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
  const startDayOfMonth = dayjs(`${Number(year)}-${monthName}-01`)
  .startOf('month');
  const endDayOfMonth = dayjs(`${Number(year)}-${monthName}-01`)
  .endOf('month');

  const startDayByMonthTimestamp = startDayOfMonth.valueOf();
  const endDayByMonthTimestamp = endDayOfMonth.valueOf();

  console.log('month', startDayByMonthTimestamp, endDayByMonthTimestamp);
  
  return (
    <div className="mt-9 flex flex-col gap-4 text-calendar-main-theme">
      <header className="flex justify-between items-center">
        <MonthSlideHandler 
          type={'left'}
          onSlideMonth={handlePrevMonth}
        />
        <p className="font-bold">
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
                <SmallDate 
                  day={day}
                  type={'navigate'}
                  onDaySelected={() =>{}}
                  currentMonthIdx={currentMonthIdx}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendar;