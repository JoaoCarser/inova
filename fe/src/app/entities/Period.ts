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
  startDate: string;
  endDate: string;
  type: PeriodType;
  editionId: string;
}

export const periodTypeLabels: Record<PeriodType, string> = {
  [PeriodType.SUBSCRIPTION]: "Inscrição",
  [PeriodType.AVALIATION]: "Avaliação",
  [PeriodType.RESUBSCRIPTION]: "Reinscrição",
  [PeriodType.REAVALIATION]: "Reavaliação",
  [PeriodType.FINAL]: "Final",
  [PeriodType.INACTIVE]: "Inativo",
};

export const periodTypeColors: Record<
  PeriodType,
  { bg: string; text: string; border: string }
> = {
  [PeriodType.SUBSCRIPTION]: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  [PeriodType.AVALIATION]: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
  },
  [PeriodType.RESUBSCRIPTION]: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  [PeriodType.REAVALIATION]: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  [PeriodType.FINAL]: {
    bg: "bg-secondaryColor-100",
    text: "text-secondaryColor-700",
    border: "border-secondaryColor-200",
  },
  [PeriodType.INACTIVE]: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-200",
  },
};
