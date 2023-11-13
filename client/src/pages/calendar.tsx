import CalendarHeader from '@/components/calendar/CalendarHeader';
import Sidebar from '@/components/calendar/Sidebar';
import GlobalContext from '@/context/GlobalContext';
import { getMonth } from '@/utils/getMonth';
import { useContext, useEffect, useState } from 'react'
import Month from '@/components/calendar/Month';
import CreateMeet from '@/components/calendar/modal/CreateMeet';

const calendar = () => {
  const [currenMonth, setCurrentMonth] = useState<any>(getMonth());
  const { 
    monthIndex,
    showEventModal
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);


  return (
    <>
      <CreateMeet 
        showModal={showEventModal}
      />
      <div className="h-screen flex flex-col w-full">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar 
            dayEvents={[]}
            type={'all'} 
          />
          <Month month={currenMonth} />
        </div>
      </div>
    </>
  )
}

export default calendar