import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import {
  Months,
  datasetOptions,
  dataGraph1,
  dataGraph2,
  gradientChartOptionsConfiguration,
  Cities,
  GraphsDataSet,
} from "../utils/graphData";

const MainGraph = ({ loans, payments, expenses }) => {
  const [actualYear, setActualYear] = useState(new Date().getFullYear());
  const handleYear = ({ target: { value } }) => {
    setActualYear(value);
  };
  var dataGraph12 = GraphsDataSet(loans, payments, expenses, actualYear)[0];
  const [option, setOption] = useState({
    selectedOption: "1",
  });
  const { selectedOption } = option;
  const handleOption = e => {
    setOption({ ...option, selectedOption: e.target.value });
  };

  const dataLine = {
    labels: Months,
    datasets: [
      {
        ...datasetOptions,
        label: `${
          selectedOption == "0"
            ? "Pagos Cobrada"
            : selectedOption == "1"
            ? " Prestamo Pagado"
            : selectedOption == "2"
            ? "Total Gastos"
            : "Total Beneficios"
        } } `,
        data: dataGraph12[parseInt(selectedOption)],
      },
    ],
  };

  const dataLine2 = {
    labels: Cities,
    datasets: [
      {
        ...datasetOptions,
        label: `${
          selectedOption == "0"
            ? "Pagos Cobrada"
            : selectedOption == "1"
            ? " Prestamo Pagado"
            : selectedOption == "2"
            ? "Total Gastos"
            : "Total Beneficios"
        } } `,
        data: dataGraph2[parseInt(selectedOption)],
      },
    ],
  };
  return (
    <div className='card card-chart'>
      <div className='card- pl-4 pt-4'>
        <div className='row'>
          <div className='col-sm-6 text-white'>
            <div className='text-muted mb-2'>
              {`${
                selectedOption == "0"
                  ? "Pagos Cobrada"
                  : selectedOption == "1"
                  ? " Prestamo Pagado"
                  : "Gastos"
              } por meses del ${actualYear}`}

              <h4>
                Seleccionar Ano:
                <input
                  type='number'
                  value={actualYear}
                  onChange={handleYear}
                  className='my-2  text-white'
                  style={{
                    border: "none",
                    backgroundColor: " #27293d ",
                    webkitAppearance: "none",
                    webkitAppearance: "none",
                    outline: "none",
                    width: "75px",
                    textAlign: "center",
                  }}
                />
              </h4>
            </div>
            <div className='h4'>
              RD$
              {dataGraph12[parseInt(selectedOption)].reduce(
                (sum, el) => sum + el,
                0
              )}
            </div>
          </div>
          <div className='col-sm-6 '>
            <div className='row'>
              <div className='col-sm-12 d-flex justify-content-end pr-4 '>
                <form className='btn-group '>
                  <label
                    className={`${
                      selectedOption == "0" && "active"
                    } btn btn-sm btn-ouline-purple `}
                  >
                    <input
                      value='0'
                      checked={selectedOption == "0"}
                      onChange={handleOption}
                      type='radio'
                      className='d-none '
                    />
                    <span className='d-none d-md-block'>Pagos</span>
                    <span className='d-sm-block d-md-none'>
                      <i className='fa fa-pied-piper-pp' />
                    </span>
                  </label>
                  <label
                    className={`${
                      selectedOption == "1" && "active"
                    } btn btn-sm  btn-ouline-purple `}
                  >
                    <input
                      value='1'
                      checked={selectedOption == "1"}
                      onChange={handleOption}
                      type='radio'
                      className='d-none'
                    />
                    <span className='d-none d-md-block'>Prestamo</span>
                    <span className='d-sm-block d-md-none'>
                      <i className='fa fa-pinterest' />
                    </span>
                  </label>

                  <label
                    className={`${
                      selectedOption == "2" && "active"
                    } btn btn-sm btn-ouline-purple `}
                  >
                    <input
                      value='2'
                      checked={selectedOption == "2"}
                      onChange={handleOption}
                      type='radio'
                      className='d-none'
                    />
                    <span className='d-none d-md-block'>Gastos</span>
                    <span className='d-sm-block d-md-none'>
                      <i className='fa fa-sort-amount-desc' />
                    </span>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MDBContainer className='py-2'>
        <Line data={dataLine} options={gradientChartOptionsConfiguration} />
      </MDBContainer>
    </div>
  );
};
export default MainGraph;
