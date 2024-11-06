'use client';

import {
  FC, useEffect, useState,
} from 'react';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { DateRangePicker as NextDateRangePicker } from '@nextui-org/date-picker';

type DateRangePickerType = {
  onChangeCalendarRange: (value: string[]) => void
  defaultRange?: string[]
}

const DateRangePicker: FC<DateRangePickerType> = ({ onChangeCalendarRange, defaultRange }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const INIT_CALENDAR = {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  };

  const [calendarValue, setCalendarValue] = useState(INIT_CALENDAR);

  const covertDateToISO = (value) => {
    const { start, end } = value;
    return [
      `${start.year}-${start.month}-${start.day}`,
      `${end.year}-${end.month}-${end.day}`,
    ];
  };

  const onChangeCalendar = (value) => {
    setCalendarValue(value);
    if (typeof onChangeCalendarRange === 'function') onChangeCalendarRange(covertDateToISO(value));
  };

  useEffect(() => {
    if (defaultRange) {
      onChangeCalendar({
        start: parseDate(formatDate(defaultRange[0])),
        end: parseDate(formatDate(defaultRange[1])),
      });
    }
  }, [defaultRange]);

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '11px' }}>
      <NextDateRangePicker
        variant="bordered"
        classNames={{
          calendar: 'bg-white shadow-lg',

        }}
        value={calendarValue}
        onChange={onChangeCalendar}
      />

    </div>

  );
};
export default DateRangePicker;
