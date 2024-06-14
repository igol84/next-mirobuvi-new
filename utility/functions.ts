import {parse} from "date-fns";
import slugify from "slugify";
import _ from "lodash";

export const DAYS_IS_NEW = 30
const RATE = 0.16
const PROM_RATE = 0.16

export const waitSecond = async (sec: number = 1) => {
  await new Promise(resolve => setTimeout(resolve, sec * 1000))
}


export const countRatePrice = (price: number) => {
  return _.ceil(price / (1 - RATE), -1)
}
export const countPrice = (price: number, discount: number, userDiscount?: number) => {
  if (discount)
    return countRatePrice(_.ceil(price * (1 - discount / 100), -1))
  if (userDiscount)
    return countRatePrice(_.ceil(price * (1 - userDiscount / 100), -1))
  return countRatePrice(price)
}


export const countPromPrice = (price: number, discount: number) => {
  const countPromRatePrice = (price: number) => {
    return _.ceil(price / (1 - PROM_RATE), -1)
  }
  if (discount)
    return countPromRatePrice(_.ceil(price * (1 - discount / 100), -1))
  return countPromRatePrice(price)
}


export const countUserDiscount = (summa: number): number => {
  if (summa >= 10000) return 10
  if (summa >= 5000) return 7
  if (summa >= 2500) return 5
  return 3
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
  return slugify(text, {lower: true})
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