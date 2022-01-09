export interface rateBody {
  rate: number;
}

export interface monthlyRateBody extends rateBody {
  month: string;
}

export interface workDayType {
  _id: string;
  month: string;
  day: string;
  startOfWork: string;
  endOfWork: string;
  tipCash: number;
  tipCard: number;
  receipts: number;
}
export interface singleMonthlyRate extends monthlyRateBody {
  _id: string;
  workDays: workDayType[];
}

export interface calculateEarningsType {
  startOfWork: string;
  endOfWork: string;
  tipCash: number;
  tipCard: number;
  receipts: number;
}
export interface workDayBody extends calculateEarningsType {
  date: string;
}

export interface singleDayProps extends workDayBody {
  _id: string;
  userId: string;
  month: string;
  day: string;
}
