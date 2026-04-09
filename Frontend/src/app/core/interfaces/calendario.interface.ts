export interface Holiday {
    date: string;
    name: string;
}

export interface CalendarMonth {
    month: number;
    days: (number | null)[];
}

export interface CalendarState {
    year: number;
    months: (number | null)[][];
    holidays: Holiday[];
    selectedHoliday: Holiday | null;
}

export interface CalendarEvent {
      date: string;
  name: string;
  type: 'holiday' | 'vacation' | 'absence' | 'sick';
}