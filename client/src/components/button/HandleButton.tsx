import { FC } from 'react';

interface IHandleButton {
  name: string;
  onHandleFunction?: () => void
}

const HandleButton: FC<IHandleButton> = ({ 
  name,
  onHandleFunction
}) => {
  return (
    <button 
      className="bg-standswork-lovely-purple-500 w-full hover:bg-standswork-lovely-purple-500/90 h-[40px] rounded-xl text-white"
      onClick={onHandleFunction}
    >
      {name}
    </button>
  )
}

export default HandleButton;