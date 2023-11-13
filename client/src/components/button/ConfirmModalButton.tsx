import  { FC } from 'react';

interface IConfirmModalButton {
  name: string;
  type: 'confirm' | 'reject';
  onConfirmHandle: () => void;
}

const ConfirmModalButton: FC<IConfirmModalButton> = ({
  name,
  type,
  onConfirmHandle,
}) => {
  let buttonTypeColor: string = '';
  if (type === 'confirm') {
    buttonTypeColor = 
    'bg-standswork-success hover:bg-standswork-success/80 focus-visible:outline-standswork-success';
  }
  if (type === 'reject') {
    buttonTypeColor =
    'bg-standswork-error hover:bg-standswork-error/80 focus-visible:outline-standswork-error';
  }

  return (
    <button
      type="button"
      className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonTypeColor}`}
      onClick={onConfirmHandle}
    >
      {name}
    </button>
  )
}

export default ConfirmModalButton;