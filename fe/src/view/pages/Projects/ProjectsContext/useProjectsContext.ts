import { useContext } from "react";
import { ProjectsContext } from ".";

export const useProjectsContext = () => {
  return useContext(ProjectsContext);
};
