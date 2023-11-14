import ShowEventModalButton from "../button/ShowEventModalButton";
import SmallCalendar from "./SmallCalendar";
import { FC } from "react";
import { StateEvents } from "@/context/ContextWrapper";


const Sidebar = () => {
  return (
    <aside className="border-r border-t h-full p-5 w-64">
      <ShowEventModalButton />
      <SmallCalendar />
    </aside>
  );
}

export default  Sidebar