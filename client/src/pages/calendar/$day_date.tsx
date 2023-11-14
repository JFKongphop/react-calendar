import CalendarHeader from '@/components/calendar/CalendarHeader';
import EventList from '@/components/calendar/DataList/EventList';
import LineList from '@/components/calendar/DataList/LineList';
import TimeLabelList from '@/components/calendar/DataList/TimeLabelList';
import CreateMeet from '@/components/calendar/modal/CreateMeet';
import Sidebar from '@/components/calendar/Sidebar';
import GlobalContext from '@/context/GlobalContext';
import CalendarEventCard from '@/components/card/CalendarEventCard';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const day_timestamp = () => {
  const [scheduleInnerHeight, setScheduleInnerHeight] = useState<number>(0);
  const { day_date } = useParams();

  const { 
    showEventModal ,
    filteredEvents,
  } = useContext(GlobalContext);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const date = dayjs(
    capitalizeFirstLetter(day_date!), 
    { format: 'MMM-DD-YYYY' }
  );
  const startOfDayTimestamp = date.startOf('day').valueOf();
  const endOfDayTimestamp = date.endOf('day').valueOf();
  
  const events = filteredEvents.filter(
    (data) => 
      data.startTimestamp >= startOfDayTimestamp 
      && data.endTimestamp <= endOfDayTimestamp
  );

  const scheduleInnerRef = useRef<any>();
  useEffect(() => {
    if (scheduleInnerRef.current) {
      const divHeight = scheduleInnerRef.current.clientHeight;
      setScheduleInnerHeight(divHeight * .925);
    }
  }, []);
  

  return (
    <div 
      className="h-screen"
      ref={scheduleInnerRef}
    >
      <CreateMeet 
        showModal={showEventModal}
      />
      <CalendarHeader />
      <div 
        className="flex flex-row w-full"
        style={{ height: scheduleInnerHeight }}
      >
        <div style={{ height: scheduleInnerHeight }}>
          <Sidebar/>
        </div>
        <CalendarEventCard innerHeight={scheduleInnerHeight}>        
          {
            events.map((data) => (
              <EventList 
                key={data.title}
                title={data.title}
                startTimestamp={data.startTimestamp}
                endTimestamp={data.endTimestamp}
              />
            ))
          }
          <div className="w-[5%] flex flex-col">
            {Array.from({ length: 24 }).map((_, index) => (
              <TimeLabelList 
                key={index}
                index={index} 
              />
            ))}

          </div>
          <div className="w-[95%] border-l">
            {Array.from({ length: 24 }).map((_, index) => (
              <LineList key={index} />
            ))}
          </div>
        </CalendarEventCard>
      </div>
    </div>
  )
}

export default day_timestamp;