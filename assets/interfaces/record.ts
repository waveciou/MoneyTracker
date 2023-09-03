interface IRecordForm {
  id: string;
  price: number;
  store: string;
  time: number;
  note: string;
  tags: string[];
}

interface ICalendarValue {
  year: number;
  month: number;
  date: number;
}

interface ITimeStampValue extends ICalendarValue {
  hour: number;
  minute: number;
}

export type { IRecordForm, ICalendarValue, ITimeStampValue };
