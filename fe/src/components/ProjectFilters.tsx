import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { translatedDepartments } from "@/app/utils/translatedDepartments";
import { Search, Filter, X } from "lucide-react";
import { StatusProject } from "@/app/entities/StatusProject";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Translate status values for display
const statusOptions = [
  { value: StatusProject.DRAFT, label: "Rascunho" },
  { value: StatusProject.SUBMITTED, label: "Submetido" },
  { value: StatusProject.UNDER_REVIEW, label: "Em Avaliação" },
  { value: StatusProject.REVIEWED, label: "Avaliado" },
];

interface ProjectFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  title: string;
  status: string[];
  department: string[];
}

export function ProjectFilters({ onFilterChange }: ProjectFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    title: "",
    status: [],
    department: [],
  });

  // Apply filters when they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Toggle status filter
  const toggleStatusFilter = (status: string) => {
    setFilters((prev) => {
      if (prev.status.includes(status)) {
        return {
          ...prev,
          status: prev.status.filter((s) => s !== status),
        };
      } else {
        return {
          ...prev,
          status: [...prev.status, status],
        };
      }
    });
  };

  // Toggle department filter
  const toggleDepartmentFilter = (department: string) => {
    setFilters((prev) => {
      if (prev.department.includes(department)) {
        return {
          ...prev,
          department: prev.department.filter((d) => d !== department),
        };
      } else {
        return {
          ...prev,
          department: [...prev.department, department],
        };
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      title: "",
      status: [],
      department: [],
    });
  };

  // Get label for status
  const getStatusLabel = (value: string) => {
    return (
      statusOptions.find((option) => option.value === value)?.label || value
    );
  };

  // Get label for department
  const getDepartmentLabel = (value: string) => {
    return (
      translatedDepartments.find((option) => option.value === value)?.label ||
      value
    );
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.title !== "" ||
    filters.status.length > 0 ||
    filters.department.length > 0;

  return (
    <div className="space-y-4 bg-white rounded-lg border p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search by title */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar projetos por título..."
            value={filters.title}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, title: e.target.value }))
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
              {filters.status.length +
                filters.department.length +
                (filters.title ? 1 : 0)}
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
          {/* Status filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Status</h3>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status.value}`}
                    checked={filters.status.includes(status.value)}
                    onCheckedChange={() => toggleStatusFilter(status.value)}
                  />
                  <Label
                    htmlFor={`status-${status.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {status.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Department filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Departamento</h3>
            <div className="space-y-2">
              {translatedDepartments.map((department) => (
                <div
                  key={department.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`department-${department.value}`}
                    checked={filters.department.includes(department.value)}
                    onCheckedChange={() =>
                      toggleDepartmentFilter(department.value)
                    }
                  />
                  <Label
                    htmlFor={`department-${department.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {department.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-4">
          {filters.title && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Título: {filters.title}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => setFilters((prev) => ({ ...prev, title: "" }))}
              />
            </Badge>
          )}

          {filters.status.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="flex items-center gap-1"
            >
              Status: {getStatusLabel(status)}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => toggleStatusFilter(status)}
              />
            </Badge>
          ))}

          {filters.department.map((department) => (
            <Badge
              key={department}
              variant="secondary"
              className="flex items-center gap-1"
            >
              Departamento: {getDepartmentLabel(department)}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => toggleDepartmentFilter(department)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
