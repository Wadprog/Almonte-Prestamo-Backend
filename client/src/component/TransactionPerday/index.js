import React, { useState } from "react";
import { allMonths } from "../../utils/month";
import { Form } from "react-bootstrap";
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
    <div className=''>
      <div className='row no-gutters'>
        <div className=' cols-xs-12 col-sm-6 col-md-5'>
          <div>
            <div
              style={{ backgroundColor: " #27293d !important" }}
            >
              <div className='row  '>
                <div className='form-group ml-auto'>
                  <h6>Selecciona el Ano</h6>
                  <input
                    type='text'
                    value={selectedYear}
                    onChange={handleSelectYear}
                    className='my-2 '
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

            <div
              className=' pt-5 px-3  mt-0'
              style={{ backgroundColor: "#F8F8F8" }}
            >
              <div className='row'>{days}</div>
            </div>
          </div>
        </div>

        <div className=' col-xs-12 col-sm-6 col-md-7 w-100 h-100 px-2 bg-warning'>
          <div className='row'>
            <div className='col-x2-12'>
              <Form>
                <Form.Group>
                  <Form.Label> Seleciona Ciudad</Form.Label>
                  <Form.Control
                    value={city}
                    as='select'
                    onChange={e => {
                      setCity(e.target.value);
                    }}
                  >
                    <option>Todas</option>
                    {getUniquecities(loans).map(city => (
                      <option value={city}>{city}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div className='col h-100'>
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
