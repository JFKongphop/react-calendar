import CalendarHeader from '@/components/calendar/CalendarHeader';
import Sidebar from '@/components/calendar/Sidebar';
import GlobalContext from '@/context/GlobalContext';
import { getMonth } from '@/utils/getMonth';
import { useContext, useEffect, useState } from 'react'
import Month from '@/components/calendar/Month';
import CreateMeet from '@/components/calendar/modal/CreateMeet';
import { useContractRead } from 'wagmi'
import { calendarABI } from '@/abi/calendar';

const calendar = () => {
  const [currenMonth, setCurrentMonth] = useState<any>(getMonth());
  const { 
    monthIndex,
    showEventModal
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const calendarEvents = useContractRead({
    address: '0xbF641DC13778536C666700DA9f3457856bC9A423',
    abi: calendarABI,
    functionName: 'getDayEvent',
    args: ['1699894800000-1699981199999']
  });

  useEffect(() => {
    console.log(calendarEvents.data)
  }, []);


  return (
    <>
      <CreateMeet 
        showModal={showEventModal}
      />
      <div className="h-screen flex flex-col w-full">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar/>
          <Month month={currenMonth} />
        </div>
      </div>
    </>
  )
}

export default calendar