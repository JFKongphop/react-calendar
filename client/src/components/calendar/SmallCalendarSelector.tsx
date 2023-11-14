import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import  { 
  useEffect, 
  useState,
  Fragment,
  FC
} from "react";
import { getMonth } from "@/utils/getMonth";
import type { DaySelected } from "./type/type";
import MonthSlideHandler from "../button/MonthSlideHandler";
import SmallDate from "./DataList/SmallDate";

interface ISmallCalendarSelector {
  daySelectedEvent: Dayjs;
  onDaySelected: (day: Dayjs) => void;
}

const SmallCalendarSelector: FC<ISmallCalendarSelector> = ({
  daySelectedEvent,
  onDaySelected,
}) => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);
  
  const handlePrevMonth = () => {
    setMonthIndex((month) => month - 1);
  }
  
  const handleNextMonth = () => {
    setMonthIndex((month) => month + 1);
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
    <div
      className="flex flex-col gap-4 border-2 border-calendar-minor-theme rounded-md w-full p-2"
    >
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
                <SmallDate
                  day={day}
                  type={'selector'}
                  currentMonthIdx={currentMonthIdx}
                  daySelectedEvent={daySelectedEvent}
                  onDaySelected={onDaySelected}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendarSelector;