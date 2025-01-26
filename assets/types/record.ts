enum EnumRecordMode {
  CREATOR = 'creator',
  EDITOR = 'editor',
}

enum EnumRecordType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

interface IRecordForm {
  id: string;
  category: string;
  price: number;
  store: string;
  time: number;
  note: string;
  tags: string[];
}

interface IRecordEncode {
  c: string; // category
  p: number; // price
  s?: string; // store
  t: number; // time
  n?: string; // note
  tg?: string[]; // tags
}

interface IRecordSeries {
  time: {
    year: number;
    month: number;
    date: number | null;
  };
  storage: IRecordForm[];
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

export type {
  IRecordForm,
  IRecordEncode,
  IRecordSeries,
  ICalendarValue,
  ITimeStampValue,
};

export { EnumRecordMode, EnumRecordType };
