import {intervalToDuration, parse} from "date-fns";

export const DAYS_IS_NEW = 30

export const waitSecond = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
}

export const formatStringToData = (data: string) => parse(data, 'yyyy-MM-dd', new Date())

export function dateDiffInDays(start: Date, end: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}