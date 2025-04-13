"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { translatedDepartments } from "@/app/utils/translatedDepartments";
import { Search, Filter, X } from "lucide-react";
import { StatusProject } from "@/app/entities/StatusProject";
import { Badge } from "@/components/ui/badge";

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

  // Add a status filter
  const addStatusFilter = (status: string) => {
    if (!filters.status.includes(status)) {
      setFilters((prev) => ({
        ...prev,
        status: [...prev.status, status],
      }));
    }
  };

  // Add a department filter
  const addDepartmentFilter = (department: string) => {
    if (!filters.department.includes(department)) {
      setFilters((prev) => ({
        ...prev,
        department: [...prev.department, department],
      }));
    }
  };

  // Remove a status filter
  const removeStatusFilter = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.filter((s) => s !== status),
    }));
  };

  // Remove a department filter
  const removeDepartmentFilter = (department: string) => {
    setFilters((prev) => ({
      ...prev,
      department: prev.department.filter((d) => d !== department),
    }));
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
    return statusOptions.find((option) => option.value === value)?.label || value;
  };

  // Get label for department
  const getDepartmentLabel = (value: string) => {
    return translatedDepartments.find((option) => option.value === value)?.label || value;
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.title !== "" || filters.status.length > 0 || filters.department.length > 0;

  return (
    <div className="mb-6 space-y-4 bg-white rounded-lg border p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search by title */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar projetos por título..."
            value={filters.title}
            onChange={(e) => setFilters((prev) => ({ ...prev, title: e.target.value }))}
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
            <Badge variant="secondary" className="ml-1 bg-primary/20 text-primary">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          {/* Status filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select onValueChange={addStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Departamento</label>
            <Select onValueChange={addDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um departamento" />
              </SelectTrigger>
              <SelectContent>
                {translatedDepartments.map((department) => (
                  <SelectItem key={department.value} value={department.value}>
                    {department.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Badge key={status} variant="secondary" className="flex items-center gap-1">
              Status: {getStatusLabel(status)}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => removeStatusFilter(status)}
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
                onClick={() => removeDepartmentFilter(department)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
