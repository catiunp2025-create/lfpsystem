export function getLastMonthRange(months: number) {
  const now = new Date();
  return {
    startDate: new Date(now.getFullYear(), now.getMonth() - (months - 1)),

    endDate: new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    ),
  };
}
