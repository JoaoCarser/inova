import { useState } from "react";

export interface FilterState {
  title: string;
  status: string[];
  department: string[];
}

export const useProjectFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    title: "",
    status: [],
    department: [],
  });

  return { filters, setFilters };
};
