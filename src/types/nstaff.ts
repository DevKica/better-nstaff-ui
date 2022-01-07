export interface rateBody {
  rate: number;
}

export interface monthlyRateBody extends rateBody {
  month: string;
}

export interface singleMonthlyRate extends monthlyRateBody {
  _id: string;
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
