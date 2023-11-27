import { StateEvents } from '@/context/ContextWrapper';
import { FC } from 'react';
import SmallEventList from '../card/SmallEventList';

interface ISmallEvent {
  dayEvents: StateEvents[]
}

const SmallEvent: FC<ISmallEvent> = ({
  dayEvents
}) => {
  return (
    <div 
      className="w-full h-[320px] mt-4 flex flex-col "
    >
      <p 
        className="text-[18px] font-bold text-standswork-zeus-black-100"
      >
        การประชุมวันนี้
      </p>
      <div className="flex flex-col gap-1 overflow-y-auto mt-1 p-1">
        {
          dayEvents.map((data) => (
            <SmallEventList 
              key={data.title} 
              title={data.title}
            />
          ))
        }
      </div>
    </div>
  )
}

export default SmallEvent;