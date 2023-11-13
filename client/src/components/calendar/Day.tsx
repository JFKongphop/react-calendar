import dayjs from "dayjs";
import { 
  useContext, 
  useState, 
  useEffect, 
  FC 
} from "react";
import GlobalContext from "@/context/GlobalContext";
import { DaySelected } from "./type/type";
import { useNavigate } from "react-router-dom";
import { StateEvents } from "@/context/ContextWrapper";
import ShortEventList from "./DataList/ShortEventList";

interface IDay {
  day: DaySelected;
  rowIdx: number;
}

const Day:FC<IDay> = ({ 
  day, 
  rowIdx 
}) => {
  const [dayEvents, setDayEvents] = useState<StateEvents[]>([]);
  const navigate = useNavigate();

  const {
    filteredEvents,
    monthIndex,
    setDaySelected,
  } = useContext(GlobalContext);
  

  useEffect(() => {
    const events: StateEvents[] = filteredEvents.filter(
      (evt: any) =>
        dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );
    setDayEvents(events);
  }, [filteredEvents, day]);  
  
  const dateEventHandler = () => {
    setDaySelected(day);
    const dateString = day?.$d
      .toString()
      .split(' ')
      .slice(1, 4)
      .join(' ');

    const datePage = dateString
      ?.toLocaleLowerCase()
      .split(' ')
      .join('-');
  
    navigate(`/calendar/${datePage}`);
  }

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-calendar-main-theme text-white rounded-full w-7 font-bold'
      : '';
  }

  const displayMonth = (format: string) => {
    return dayjs(
      new Date(dayjs().year()
      , monthIndex)
    ).format(format);
  }

  const displayCurrentMonth: boolean = 
    displayMonth('MMM') === (day as any).format('MMM');


  // console.log(dayEvents)
  
  return (
    <div 
      className="border border-calendar-minor-theme flex flex-col"
    >
      <header className="flex flex-col items-center" >
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {(day as any).format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
        >
          {(day as any).format("DD")}
        </p>
        {/* {displayCurrentMonth ? 
          (
            <p
              className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
            >
              {(day as any).format("DD")}
            </p>
          )
          :
          (
            <p/>
          )
        } */}
      </header>
      <div
        className="flex-1 flex flex-col gap-[2px] cursor-pointer"
        onClick={dateEventHandler}
      >
        {dayEvents.slice(0, 3).map((
          event, 
          index
        ) => (
          <ShortEventList 
            key={index} 
            title={event.title} 
          />
        ))}
        {dayEvents && dayEvents.length > 3 && 
          <p 
            className="text-calendar-main-theme px-1 text-[14px]"
          >
            ...เพิ่มเติม
          </p>
        }
      </div>
      {/* {displayCurrentMonth ?
        (
          <div
            className="flex-1 flex flex-col gap-[2px] cursor-pointer"
            onClick={dateEventHandler}
          >
            {dayEvents.slice(0, 3).map((
              event, 
              index
            ) => (
              <ShortEventList 
                key={index} 
                title={event.title} 
              />
            ))}
            {dayEvents && dayEvents.length > 3 && 
              <p 
                className="text-standswork-zeus-black-100 px-1 text-[14px]"
              >
                ...เพิ่มเติม
              </p>
            }
          </div>
        )
        :
        (
          <div className="flex-1" />
        )
      } */}
    </div>
  );
}

export default Day;