import { 
  Fragment, 
  FC,
} from 'react';
import { 
  Dialog, 
  Transition 
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from "react";
import GlobalContext, { IGlobalContext } from "@/context/GlobalContext";
import { DaySelected, IMeetEvent, TimeRatio } from "../type/type";
import { defaultValues } from "../type/initialState";
import { useForm } from "react-hook-form";
import TimeEventInput from '@/components/input/calendar/TimeEventInput';
import SmallCalendarSelector from '../SmallCalendarSelector';

interface ICreateMeet { showModal: boolean; }

const CreateMeet: FC<ICreateMeet> = ({ showModal }) => {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext<IGlobalContext>(GlobalContext);

  const { 
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<IMeetEvent>({defaultValues})

  const [timeRatioStart, setTimeRatioStart] = useState<TimeRatio>('00');
  const [openTimeRatioStart, setOpenTimeRatioStart] = useState<boolean>(false);
  const [timeRatioEnd, setTimeRatioEnd] = useState<TimeRatio>('00');
  const [openTimeRatioEnd, setOpenTimeRatioEnd] = useState<boolean>(false);

  const convertDateToUnix = (
    time: string,
    ratio: TimeRatio
  ) => {
    const day = (daySelected as any)
      .format("MMM DD YYYY") + ` ${time}:${ratio}`;
  
    return new Date(day).getTime();
  }

  const onSubmit = async (data: IMeetEvent) => {
    const {
      title,
      startHour,
      endHour
    } = data;

    const calendarEvent = {
      title,
      day: (daySelected as DaySelected).valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      startTimestamp: convertDateToUnix(startHour, timeRatioStart),
      endTimestamp: convertDateToUnix(endHour, timeRatioEnd),
    };
    
    
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
    reset(defaultValues);
    setTimeRatioStart('00');
    setTimeRatioEnd('00');

  }

    const toggleTimeRatioStart = () => {
    setOpenTimeRatioStart(!openTimeRatioStart);
  }

  const timeRatioStartSelectorHandler = (time: TimeRatio) => {
    toggleTimeRatioStart();
    setTimeRatioStart(time);
  }

  const toggleTimeRatioEnd = () => {
    setOpenTimeRatioEnd(!openTimeRatioEnd);
  }

  const timeRatioEndSelectorHandler = (time: TimeRatio) => {
    toggleTimeRatioEnd();
    setTimeRatioEnd(time);
  }

  const closeModalHandler = () => {
    setShowEventModal(false)
  }

  
  
  return (
    <Transition.Root 
      show={showModal} 
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10 text-calendar-main-theme"
        onClose={closeModalHandler}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 hidden bg-calendar-main-theme bg-opacity-75 transition-opacity md:block" 
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div 
            className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel 
                className="flex w-[400px] h-[500px] transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
              >
                <div 
                  className="relative flex flex-col w-full items-center overflow-hidden bg-white p-4 rounded-xl gap-4"
                >
                  <div 
                    className="flex flex-row justify-between items-center w-full border-b-2 border-calendar-minor-theme pb-2"
                  >
                    <p className="font-medium text-xl">นัดหมายการประชุม</p>
                    <button
                      type="button"
                      onClick={closeModalHandler}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>

                  </div>
                  <div
                    className="w-full text-md flex flex-row justify-between relative"
                  >
                    <p>วันที่</p>
                    <p>{(daySelected as any).format("dddd, MMMM DD")}</p>
                    {/* <div className=" absolute z-200 bg-white right-0">
                      <SmallCalendarSelector />

                    </div> */}
                  </div>
                  <div className="w-full gap-2 flex flex-col">
                    <label 
                      className="flex justify-start items-center text-md"
                    >
                      หัวข้อ
                    </label>
                    <input
                      type="text" 
                      className="w-full p-2 focus:outline-none border-2 border-calendar-minor-theme rounded-md"
                      {...register('title')}
                    />
                  </div>
                  <div className="w-full">
                    <TimeEventInput
                      title={"From"}
                      control={control}
                      name="startHour"
                      openTimeRatio={openTimeRatioStart}
                      timeRatioSelected={timeRatioStart}
                      onRatioSelector={timeRatioStartSelectorHandler}
                      ontoggleTimeSelector={toggleTimeRatioStart}
                    />
                  </div>
                  <div className="w-full">
                    <TimeEventInput
                      title={"To"}
                      control={control}
                      name="endHour"
                      openTimeRatio={openTimeRatioEnd}
                      timeRatioSelected={timeRatioEnd}
                      onRatioSelector={timeRatioEndSelectorHandler}
                      ontoggleTimeSelector={toggleTimeRatioEnd}
                    />
                  </div>
                  <div className="w-full absolute bottom-0">
                    <div className="p-4">
                      <button 
                        className="bg-calendar-main-theme w-full hover:bg-calendar-main-theme/90 h-[40px] rounded-md text-white border"
                        onClick={handleSubmit(onSubmit)}
                      >
                        สร้างการประชุม
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateMeet;

