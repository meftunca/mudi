import dayjs from 'dayjs';
import relTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relTime);

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export const formatDistanceToNow = (
  date: Date,
  withSuffix: boolean = false
) => {
  return dayjs(date).fromNow(!withSuffix);
};

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'LL';

  return date ? dayjs(date).format(fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'LLL';

  return date ? dayjs(date).format(fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? dayjs(new Date(date)).unix() : '';
}

export function fToNow(date: InputValue) {
  return date ? formatDistanceToNow(new Date(date), true) : '';
}
