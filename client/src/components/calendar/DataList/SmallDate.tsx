import GlobalContext from '@/context/GlobalContext';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DaySelected } from '../type/type';

interface ISmallDate {
  day: Dayjs | DaySelected;
  currentMonthIdx: number;
}

const SmallDate: FC<ISmallDate> = ({
  day,
  currentMonthIdx,
}) => {
  const { 
    daySelected,
    setSmallCalendarMonth,
    setDaySelected,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  const dateEventHandler = (day: DaySelected) => {
    setSmallCalendarMonth(currentMonthIdx);
    setDaySelected(day);
    const timestamp = day.valueOf() as number;
    const date = new Date(timestamp);
  
    const options = {
      year: 'numeric' as const,
      month: 'short' as const,
      day: 'numeric' as const,
      timeZone: 'Asia/Bangkok',
    };
  
    const formatter = new Intl.DateTimeFormat('en-Us', options);
    const dateString = formatter.format(date).replace(',', '');
    const datePage = dateString
      ?.toLocaleLowerCase()
      .split(' ')
      .join('-');    

    navigate(`/calendar/${datePage}`);
  }

  

  const getDayClass = (day: Dayjs | DaySelected) => {
    const format = 'DD-MM-YY';
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    const today = dayjs().format('DD-MM-YY')
    
    if (today === currDay) {
      return 'bg-calendar-main-theme rounded-full text-white font-bold';
    }

    if (slcDay === currDay) {
      return 'bg-calendar-minor-theme rounded-full text-calendar-main-theme font-bold';
    }

    return '';
  }


  return (
    <button
      onClick={() => dateEventHandler(day as DaySelected)}
      className={`py-1 w-full ${getDayClass(day as Dayjs)}`}
    >
      <span className="text-sm">{(day as Dayjs).format("D")}</span>
    </button>
  )
}

export default SmallDate;