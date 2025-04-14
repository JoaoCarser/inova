export enum PeriodType {
  SUBSCRIPTION = "SUBSCRIPTION",
  AVALIATION = "AVALIATION",
  RESUBSCRIPTION = "RESUBSCRIPTION",
  REAVALIATION = "REAVALIATION",
  FINAL = "FINAL",
  INACTIVE = "INACTIVE",
}

export interface Period {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: PeriodType;
}
