export const calculatePercentageAvailable = (
  capacityUsed: number,
  maxCapacity: number
) => {
  console.log(typeof capacityUsed);

  let calculate = 100 - (capacityUsed / maxCapacity) * 100;

  return Number(calculate.toFixed(1));
};
