import { FC, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import GlobalContext from '@/context/GlobalContext';
import { DaySelected } from '../calendar/type/type';

interface ISmallDate {
  day: Dayjs | DaySelected;
  currentMonthIdx: number;
  type: 'navigate' | 'selector';
  daySelectedEvent?: Dayjs;
  onDaySelected: (day: Dayjs) => void;
}

const SmallDate: FC<ISmallDate> = ({
  day,
  currentMonthIdx,
  type,
  daySelectedEvent,
  onDaySelected
}) => {
  const [selectedDay, setSelectedDay] = useState<Dayjs>();

  const { 
    daySelected,
    setSmallCalendarMonth,
    setDaySelected,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { day_date } = useParams();

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
    const today = dayjs().format('DD-MM-YY');
    const dayParam = dayjs(day_date).format('DD-MM-YY').toLowerCase();
  
    let scheduleDay: string = '';
    if (daySelectedEvent) {
      scheduleDay = (daySelectedEvent as unknown as Dayjs).format(format);
    }

    if (type === 'navigate') {
      if (today === currDay) {
        return 'bg-calendar-main-theme rounded-full text-white font-bold';
      }
  
      if (slcDay === currDay || dayParam === currDay) {
        return 'bg-calendar-minor-theme rounded-full text-calendar-main-theme font-bold';
      }
    }
    if (type === 'selector') {
      if (scheduleDay === currDay) {
        return 'bg-calendar-minor-theme rounded-full text-calendar-main-theme font-bold'
      }
    } 

    return '';
  }
  
  switch (type) {
    case 'navigate':
      return (
        <button
          onClick={() => dateEventHandler(day as DaySelected)}
          className={`py-1 w-full ${getDayClass(day as Dayjs)}`}
        >
          <span className="text-sm">{(day as Dayjs).format("D")}</span>
        </button>
      )
    case 'selector':
      return (
        <button
          onClick={() => onDaySelected(day as Dayjs)}
          className={`py-1 w-full ${getDayClass(day as Dayjs)}`}
        >
          <span className="text-sm">{(day as Dayjs).format("D")}</span>
        </button>
      )
  }
}

export default SmallDate;