import moment from "moment";

interface TimeDifference {
  value: number;
  unit: string;
}

export const getTimeDifference = (startTime: string): TimeDifference => {
  const start = moment(startTime);
  const end = moment();

  const diffInSeconds = end.diff(start, "seconds");
  const diffInMinutes = end.diff(start, "minutes");
  const diffInHours = end.diff(start, "hours");
  const diffInDays = end.diff(start, "days");
  const diffInWeeks = end.diff(start, "weeks");
  const diffInMonths = end.diff(start, "months");
  const diffInYears = end.diff(start, "years");

  if (diffInYears >= 1) {
    return { value: diffInYears, unit: "years" };
  } else if (diffInMonths >= 1) {
    return { value: diffInMonths, unit: "months" };
  } else if (diffInWeeks >= 1) {
    return { value: diffInWeeks, unit: "weeks" };
  } else if (diffInDays >= 1) {
    return { value: diffInDays, unit: "days" };
  } else if (diffInHours >= 1) {
    return { value: diffInHours, unit: "hours" };
  } else if (diffInMinutes >= 1) {
    return { value: diffInMinutes, unit: "minutes" };
  } else {
    return { value: diffInSeconds, unit: "seconds" };
  }
};
