import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import { FC } from "react";
import { StateEvents } from "@/context/ContextWrapper";
import SmallEvent from "./SmallEvent";

interface ISidebar {
  type: 'all' | 'day';
  dayEvents: StateEvents[];
}

const Sidebar:FC<ISidebar> = ({ 
  type,
  dayEvents
}) => {
  const showDayDate: boolean = type === 'day';
  return (
    <aside className="border-r border-t h-full p-5 w-64">
      <CreateEventButton />
      {/* {showDayDate ? 
        (
          <CreateEventButton />
        )
        :
        (
          <div className="h-11"/>
        )
      } */}
      <SmallCalendar />
      {/* {showDayDate &&
        (
          <SmallEvent dayEvents={dayEvents} />
        )
      } */}
    </aside>
  );
}

export default  Sidebar