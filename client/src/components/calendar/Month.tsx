import { 
  FC,
  Fragment
} from "react";
import Day from "./Day";
import { DaySelected } from "./type/type";

interface IMonth {
  month: DaySelected[][];
}

const Month: FC<IMonth> = ({ month }) => {
  return (
    <div className="border-none flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default Month;