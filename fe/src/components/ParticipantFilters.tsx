import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { translatedDepartments } from "@/app/utils/translatedDepartments";
import { Search, Filter, X } from "lucide-react";
import { StatusProject } from "@/app/entities/StatusProject";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useBases } from "@/app/hooks/bases/useBases";

// Translate status values for display
const statusOptions = [
  { value: StatusProject.DRAFT, label: "Rascunho" },
  { value: StatusProject.SUBMITTED, label: "Submetido" },
  { value: StatusProject.UNDER_REVIEW, label: "Em Avaliação" },
  { value: StatusProject.REVIEWED, label: "Avaliado" },
];

interface ParticipantFiltersProps {
  onFilterChange: (filters: ParticipantFilterState) => void;
}

export interface ParticipantFilterState {
  name: string;
  base: string[];
}

export function ParticipantFilters({
  onFilterChange,
}: ParticipantFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<ParticipantFilterState>({
    name: "",
    base: [],
  });

  const { bases, isFetchingBases } = useBases();

  // Apply filters when they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const toggleBaseFilter = (base: string) => {
    setFilters((prev) => {
      if (prev.base.includes(base)) {
        return {
          ...prev,
          base: prev.base.filter((b) => b !== base),
        };
      } else {
        return {
          ...prev,
          base: [...prev.base, base],
        };
      }
    });
  };

  // Toggle department filter

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      name: "",
      base: [""],
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.name !== "" || filters.base.length > 0;

  return (
    <div className="space-y-4 bg-white rounded-lg border p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search by title */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar participantes por nome..."
            value={filters.name}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
            className="pl-10"
          />
        </div>

        {/* Filter toggle button */}
        <Button
          variant={isExpanded ? "secondary" : "outline"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-1 bg-primary/20 text-primary"
            >
              {(filters.name ? 1 : 0) + (filters.base ? 1 : 0)}
            </Badge>
          )}
        </Button>

        {/* Clear filters button (only shown when filters are active) */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Limpar filtros
          </Button>
        )}
      </div>

      {/* Expanded filter options */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
          {/* Department filter */}
          {!isFetchingBases && (
            <div>
              <h3 className="text-sm font-medium mb-3">Base</h3>
              <div className="space-y-2">
                {bases.map((base) => (
                  <div key={base.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`base-${base.name}`}
                      checked={filters.base.includes(base.name)}
                      onCheckedChange={() => toggleBaseFilter(base.name)}
                    />
                    <Label
                      htmlFor={`base-${base.name}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {base.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-4">
          {filters.name && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Nome: {filters.name}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setFilters((prev) => ({ ...prev, name: "" }))}
              />
            </Badge>
          )}

          {filters.base.map((base) => (
            <Badge variant="secondary" className="flex items-center gap-1">
              Base: {base}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setFilters((prev) => ({ ...prev, base: [] }))}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
