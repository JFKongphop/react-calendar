import {
  FC,
  useState,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

interface IContextWrapper {
  children: ReactNode;
} 

export type StateEvents = {
  day: number;
  id: number;
  title: string;
  startTimestamp: number;
  endTimestamp: number;
}

export type ActionEvent = {
  type: 'push' | 'update' | 'delete';
  payload: any
};

const savedEventsReducer = (
  state: StateEvents[], 
  { type, payload }: ActionEvent
) => {
  switch (type) {
    case "push":      
      return [...state, payload];
    case "update":
      return state.map((evt) =>
        evt.id === payload.id ? payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

console.log(dayjs())

const ContextWrapper: FC<IContextWrapper> = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<any>(null);
  const [daySelected, setDaySelected] = useState<any>(dayjs());
  const [showEventModal, setShowEventModal] = useState<any>(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        filteredEvents: savedEvents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;