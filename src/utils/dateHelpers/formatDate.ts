import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import duration, { DurationUnitType } from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(isBetween);

const currentTimezone = process.env.NEXT_PUBLIC_TIMEZONE || 'Asia/Kuala_Lumpur';
export const formatDateWithLocale = (date: dayjs.ConfigType, locale: string, template: string) => {
  return dayjs(date).locale(locale).format(template);
};
export const parseToDayjs = (date: dayjs.ConfigType, template?: string) => {
  return template ? dayjs(date, template).tz(currentTimezone) : dayjs(date).tz(currentTimezone);
};
export const formatDateWithTimezone = (date: dayjs.ConfigType, template: string) => {
  return dayjs(date).tz(currentTimezone).format(template);
};
export const formatDuration = (duration: number, unit: DurationUnitType, template: string) => {
  return dayjs.duration(duration, unit).format(template);
};
