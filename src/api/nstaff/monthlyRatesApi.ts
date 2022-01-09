import { monthlyRateBody, rateBody } from "../../types/nstaff";
import { nStaffMonthlyRatesAccessInstance } from "./nstaffInstance";

export const getSingleMonthlyRate = (month: string | undefined) =>
  nStaffMonthlyRatesAccessInstance.get(`/getOne/${month}`);

export const getAllMonthlyRates = () => nStaffMonthlyRatesAccessInstance.get(`/getAll`);

export const createMonthlyRate = (body: monthlyRateBody) => nStaffMonthlyRatesAccessInstance.post(`/create`, body);

export const updateMonthlyRate = (body: rateBody, monthlyRateId: string) =>
  nStaffMonthlyRatesAccessInstance.patch(`/update/${monthlyRateId}`, body);
