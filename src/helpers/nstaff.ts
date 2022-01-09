import { cardTipTax, taxToKitchen } from "../constants/taxes";
import { calculateEarningsType } from "../types/nstaff";
import { hourDiff } from "./hourDiff";

export const calculateDayEarnings = (data: calculateEarningsType, rate: number) => {
  return roundTo2Decimals(
    rate * hourDiff(data.startOfWork, data.endOfWork) +
      data.tipCard * cardTipTax +
      data.tipCash -
      data.receipts * taxToKitchen
  );
};

export const roundTo2Decimals = (e: number) => Math.round(e * 100) / 100;
