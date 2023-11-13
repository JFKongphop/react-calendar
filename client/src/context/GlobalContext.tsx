import { 
  createContext,
  Dispatch, 
  SetStateAction 
} from "react";
import { 
  ActionEvent, 
  StateEvents 
} from "./ContextWrapper";
import { DaySelected } from "@/components/calendar/type/type";

export interface IGlobalContext {
  monthIndex: number;
  smallCalendarMonth: number;
  showEventModal: boolean;
  daySelected: DaySelected | null;
  savedEvents: StateEvents[];
  selectedEvent: StateEvents | null;
  filteredEvents: StateEvents[];
  setMonthIndex: (index: number) => void;
  setSmallCalendarMonth: (index: number) => void;
  setDaySelected: (day: DaySelected) => void;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
  dispatchCalEvent: ({ type, payload }: ActionEvent) => void;
  setSelectedEvent: Dispatch<SetStateAction<StateEvents | null>>;
}

const GlobalContext = createContext<IGlobalContext>({
  monthIndex: 0,
  smallCalendarMonth: 0,
  showEventModal: false,
  daySelected: null,
  savedEvents: [],
  selectedEvent: null,
  filteredEvents: [],
  setMonthIndex: () => {},
  setSmallCalendarMonth: () => {},
  setDaySelected: () => {},
  setShowEventModal: () => {},
  dispatchCalEvent: () => {},
  setSelectedEvent: () => {},
});

export default GlobalContext;
