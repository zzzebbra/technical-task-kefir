import { parseISO, format, isToday, formatDistanceToNowStrict } from 'date-fns';
import { ru } from 'date-fns/locale'
import { DATE_FORMAT } from 'src/constants/date';

export const formateDateToFriendlyFormat = (date: string): string => {
  const parsedDate = parseISO(date);

  if (isToday(parsedDate)) {
    return `${formatDistanceToNowStrict(parsedDate, { locale: ru })} назад`;
  }

  return format(parsedDate, DATE_FORMAT.FRIENDLY_FORMAT);
}
