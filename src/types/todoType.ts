export interface WordsPeriod {
  readonly start: string | null;
  readonly end: string | null;
}

export type Datekey = 'startDate' | 'stopDate' | 'completeDate';

export interface Status {
  id: string;
  status: string;
  dateKey?: Datekey;
}

export interface Task {
  id: string;
  title: string;
  status: string;
  createdDate: string;
  startDate?: string;
  stopDate?: string;
  completeDate?: string;
  workPeriods: WordsPeriod[];
  startWorkTime: string;
  attempts: number | null;
  totalTime: number | null;
  averageTime: number | null;
  formattedAverageTime: string;
  formattedTotalTime: string;
}
