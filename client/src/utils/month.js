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
    const monthswith31days = [1, 3, 5, 7, 8, 10, 12];
    if (monthpos == 2) return BixYear(year) ? 29 : 28;
    return monthswith31days.join().includes(monthpos) ? 31 : 30;
  };

  return Months.map((month, idx) => {
    if (month != null)
      return { name: month, number: idx, days: numberofDays(idx + 1, year) };
  });
};

console.log(allMonths(2004));
