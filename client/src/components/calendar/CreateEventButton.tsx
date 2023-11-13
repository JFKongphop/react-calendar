import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";

const CreateEventButton = () => {
  const { setShowEventModal } = useContext(GlobalContext);

  const showEventModal = () => {
    setShowEventModal(true);
  }

  return (
    <button
      onClick={showEventModal}
      className="border-2 border-calendar-minor-theme px-6 py-2 rounded-full flex items-center justify-center text-calendar-main-theme"
    >
      <span className="font-semibold">Create</span>
    </button>
  );
}

export default CreateEventButton;