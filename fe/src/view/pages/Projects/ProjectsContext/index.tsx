import { createContext, useState } from "react";
import { useEffect, useMemo } from "react";
import { Role } from "@/app/entities/Role";
import { useAuth } from "@/app/hooks/useAuth";
import { useProjects } from "@/app/hooks/projects/useProjects";
import { useProjectsByUserId } from "@/app/hooks/projects/useProjectsByUserId";
import { FilterState, useProjectFilters } from "@/app/hooks/useProjectFilters";
import { Project } from "@/app/entities/Project";
import { User } from "@/app/entities/User";

interface ProjectsContextValue {
  isLoading: boolean;
  projects: Project[];
  handleClearFilters: () => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filters: FilterState;
  user: User | undefined;
}

export const ProjectsContext = createContext({} as ProjectsContextValue);

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { filters, setFilters } = useProjectFilters();

  const {
    projects: allProjects,
    isFetchingProjects,
    refechProjects,
  } = useProjects(user?.role!, filters);

  const {
    projects: userProjects,
    isFetchingProjects: isFetchingUserProjects,
    refechProjects: refechUserProjects,
  } = useProjectsByUserId(user?.id!, filters);

  useEffect(() => {
    refechProjects();
    refechUserProjects();
  }, [filters]);

  const isLoading = isFetchingProjects || isFetchingUserProjects;

  const projects = useMemo(() => {
    if (user?.role === Role.EVALUATION_COMMITTEE || user?.role === Role.MARKETING) {
      return allProjects;
    }
    return userProjects;
  }, [user?.role, allProjects, userProjects]);

  const handleClearFilters = () => {
    setFilters({ title: "", status: [], department: [] });
  };

  console.log("projects", projects);

  return (
    <ProjectsContext.Provider
      value={{
        isLoading,
        handleClearFilters,
        projects,
        filters,
        setFilters,
        user,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
