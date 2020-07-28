const month = {
  name: " ",
  number: 0,
  day: [],
};
const createMonth = number => {};

const Months = [
  null,
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Jullio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const allMonths = year => {
  const numberofDays = (monthpos, year) => {
    const BixYear = year => {
      if (year % 4 != 0) return false;
      if (year % 100 != 0) return false;
      if (year % 400 != 0) return false;
      return true;
    };
    const monthswith31days = [0, 2, 4, 6, 7, 9, 11];
    if (monthpos === 1) return BixYear(year) ? 29 : 28;
    return monthswith31days.join().includes(monthpos) ? 31 : 30;
  };

  return Months.map((month, idx) => {
    return { name: month, number: idx, days: numberofDays(idx, year) };
  });
};

console.log(allMonths(2004));

