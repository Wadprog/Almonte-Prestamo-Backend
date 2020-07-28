import React, { useState } from "react";
import { allMonths } from "../../utils/month";

import moment from "moment";
import Month from "./Month";
import Day from "./Day";
import DayDetails from "./DayDetails";

const Calendar = ({ payments, loans, expenses }) => {
  const [selectedYear, setSelectedYear] = useState(moment().year());
  let months = allMonths(selectedYear);
  months.shift();

  const [selected, setselected] = useState(moment().month() + 1);
  const [maxDays, setMaxDays] = useState(
    parseInt(months[moment().month() + 1].days)
  );

  const [selectedDay, setselectedDay] = useState(parseInt(moment().date()));

  const handleSelect = number => {
    setselected(number);
    setMaxDays(parseInt(months[number].days));
  };

  const handleSelectYear = ({ target: { value } }) => {
    setSelectedYear(value);
  };
  const handleSelectDay = number => {
    setselectedDay(number);
  };
  let days = [];
  for (var i = 1; i < maxDays + 1; i++) {
    days.push(
      <div key={i} className='col-sm-2'>
        <Day number={i} selected={selectedDay} handleSelect={handleSelectDay} />
      </div>
    );
  }
  return (
    <div className=' container p-5'>
      <div className='row bg-secondary p-5' style={{ overflowX: "scroll" }}>
        <div className='row'>
          <div className='ml-auto'>
            <input
              type='text'
              value={selectedYear}
              onChange={handleSelectYear}
            />
          </div>
        </div>
        <div className='row'>
          {months.map(month => (
            <div className='col-sm-4'>
              <Month
                {...month}
                selected={selected}
                handleSelect={handleSelect}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='row p-5 mt-0' style={{ backgroundColor: "#F8F8F8" }}>
        {days}
      </div>

      <div>
        <DayDetails
          date={`${selected}/${selectedDay}/${selectedYear}`}
          loans={loans}
          payments={payments}
          expenses={expenses}
        />
      </div>
    </div>
  );
};

export default Calendar;
