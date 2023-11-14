import { FC } from "react";

interface ISubmitEventButton {
  title: string;
  onSubmitEvent: () => void;
}

const SubmitEventButton: FC<ISubmitEventButton> = ({
  title,
  onSubmitEvent
}) => {
  return (
    <button 
      className="bg-calendar-main-theme w-full hover:bg-calendar-main-theme/90 h-[40px] rounded-md text-white border font-semibold"
      onClick={onSubmitEvent}
    >
      {title}
    </button>
  )
}

export default SubmitEventButton