import { useContext } from "react";
import { CurrentEditionContext } from "../contexts/CurrentEditionContext";

export const useCurrentEdition = () => {
  return useContext(CurrentEditionContext);
};
