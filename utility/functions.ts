import {parse} from "date-fns";
import slugify from "slugify";

export const DAYS_IS_NEW = 30

export const waitSecond = async (sec: number = 1) => {
  await new Promise(resolve => setTimeout(resolve, sec*1000))
}

export const formatStringToData = (data: string) => parse(data, 'yyyy-MM-dd', new Date())

export function dateDiffInDays(start: Date, end: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export const convertTextForUrl = (text: string) => {
  return slugify(text)
}

export const validateFiles = (value: FileList) => {
  if (value.length < 1) {
    return false
  }
  for (const file of Array.from(value)) {
    const fsMb = file.size / (1024 * 1024)
    const MAX_FILE_SIZE = 10
    if (fsMb > MAX_FILE_SIZE) {
      return false
    }
  }
  return true
}