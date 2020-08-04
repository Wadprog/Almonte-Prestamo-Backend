import React, { useState } from "react";
import { allMonths } from "../../utils/month";
import { Form, Col } from "react-bootstrap";
import moment from "moment";
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
  const [city, setCity] = useState("Todas");

  const handleSelect = number => {
    setselected(number);
    setMaxDays(parseInt(months[number - 1].days)); // we unshifted to remove the null month now we account by removing 1
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
    <div className='pt-3 mb-5'>
      <div className='d-flex'>
        <div className=''>
          <div>
            <div className='py-3' style={{ backgroundColor: " #27293d " }}>
              <div className='d-flex justify-content-around '>
                {selected > 1 && (
                  <div
                    onClick={() => {
                      handleSelect(selected - 1);
                    }}
                  >
                    <i className=' text-white fa-2x fa fa-arrow-left'></i>
                  </div>
                )}

                <div className='text-white'>
                  <h4>
                    {" "}
                    {months[selected - 1].name}
                    <input
                      type='text'
                      value={selectedYear}
                      onChange={handleSelectYear}
                      className='my-2  text-white'
                      style={{
                        border: "none",
                        backgroundColor: " #27293d ",
                        webkitAppearance: "none",
                        webkitAppearance: "none",
                        outline: "none",
                        width: "60px",
                        textAlign: "center",
                      }}
                    />
                  </h4>
                </div>

                {selected < 12 && (
                  <div
                    onClick={() => {
                      handleSelect(selected + 1);
                    }}
                  >
                    <i className=' text-white fa-2x fa fa-arrow-right'></i>
                  </div>
                )}
              </div>
            </div>
            <div
              className=' pt-5 px-3  mt-0'
              style={{ backgroundColor: "#F8F8F8" }}
            >
              <div className='row'>{days}</div>
            </div>
          </div>
        </div>

        <div
          className=' ml-5 col-xs-12 col-sm-6 col-md-7 w-100 h-100 px-2 py-5'
          style={{ backgroundColor: " #27293d " }}
        >
          <div className='d-flex pb-3'>
            <h4 className='text-white mr-3'>Ciudad:</h4>

            <Form.Control
              value={city}
              as='select'
              onChange={e => {
                setCity(e.target.value);
              }}
              style={{
                border: "none",
                backgroundColor: " #27293d ",
                webkitAppearance: "none",
                webkitAppearance: "none",
                outline: "none",
                width: "60px",
                textAlign: "center",
                color: "white",
                width: "100px",
              }}
              className='h4'
            >
              <option>Todas</option>
              {getUniquecities(loans).map(city => (
                <option value={city}>{city}</option>
              ))}
            </Form.Control>
          </div>

          <div className=' h-100'>
            <DayDetails
              date={`${selected}/${selectedDay}/${selectedYear}`}
              city={city}
              loans={loans}
              payments={payments}
              expenses={expenses}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
const getUniquecities = loans => {
  console.log(loans);

  const cities = loans.reduce(
    (unique, loan) =>
      unique.includes(loan.client.ciudad)
        ? unique
        : [...unique, loan.client.ciudad],
    []
  );
  return cities;
};
