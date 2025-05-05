import { Period } from "./Period";

export interface Edition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  year: number;
  periods: Period[];
}
